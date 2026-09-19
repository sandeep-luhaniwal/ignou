"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CartItem } from "@/components/cart/types";
import ShippingForm from "@/components/cart/ShippingForm";
import OrderSummary from "@/components/cart/OrderSummary";
import CheckoutSuccess from "@/components/cart/CheckoutSuccess";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { useCart } from "@/context/CartContext";
import { loadRazorpayScript } from "@/lib/razorpay";
import { useAppDispatch, useAppSelector } from "@/store";
import { createOrderRequest, resetOrderState } from "@/store/slices/ordersSlice";

const AddressPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { clearCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryType, setDeliveryType] = useState<"PDF" | "Handwritten">("Handwritten");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [shipping, setShipping] = useState({ name: "", phone: "", address: "", pincode: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { success: orderSuccess, error: orderError } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (orderSuccess) {
      setCheckoutSuccess(true);
      clearCart();
      localStorage.removeItem("ignou_cart_promo");
      dispatch(resetOrderState());
    }
  }, [orderSuccess, clearCart, dispatch]);

  useEffect(() => {
    if (orderError) {
      setErrorMessage(orderError);
      dispatch(resetOrderState());
    }
  }, [orderError, dispatch]);

  // Sync state from localStorage on mount
  useEffect(() => {
    // Check login gate protection
    const savedLogin = localStorage.getItem("ignou_logged_in");
    if (savedLogin !== "true") {
      router.push("/auth/sign-in?redirect=/cart/address");
      return;
    }

    const savedCart = localStorage.getItem("ignou_cart_items");
    const savedDelivery = localStorage.getItem("ignou_cart_delivery");
    const savedPromo = localStorage.getItem("ignou_cart_promo");

    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
        if (parsed.length === 0) {
          router.push("/cart");
        }
      } catch (e) {
        router.push("/cart");
      }
    } else {
      router.push("/cart");
    }

    if (savedDelivery) {
      setDeliveryType(savedDelivery as "PDF" | "Handwritten");
    }

    if (savedPromo) {
      setAppliedPromo(savedPromo);
    }
  }, [router]);

  const handleApplyPromo = (code: string): boolean => {
    if (code === "IGNOU10" || code === "WELCOME50") {
      setAppliedPromo(code);
      localStorage.setItem("ignou_cart_promo", code);
      return true;
    }
    return false;
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    localStorage.removeItem("ignou_cart_promo");
  };

  const handleCheckout = async () => {
    setErrorMessage(null);

    if (!shipping.name.trim() || !shipping.phone.trim() || !shipping.address.trim() || !shipping.pincode.trim()) {
      setErrorMessage("Please fill in all the shipping details to proceed.");
      return;
    }

    if (shipping.pincode.trim().length !== 6 || isNaN(Number(shipping.pincode))) {
      setErrorMessage("Please enter a valid 6-digit Pincode.");
      return;
    }

    if (shipping.phone.trim().length < 10) {
      setErrorMessage("Please enter a valid WhatsApp Phone Number.");
      return;
    }

    // Load Razorpay SDK
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setErrorMessage("Failed to load Razorpay Payment gateway SDK. Please check your internet connection.");
      return;
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo12345";
    const userEmail = localStorage.getItem("ignou_user_email") || "";
    const userName = localStorage.getItem("ignou_user_name") || "";

    const options = {
      key: keyId,
      amount: grandTotal * 100, // paise
      currency: "INR",
      name: "IGNOU Solved Assignments",
      description: `Purchase of ${cartItems.length} solved assignment(s) (Handwritten delivery)`,
      handler: function (response: any) {
        dispatch(
          createOrderRequest({
            items: cartItems.map((item) => ({
              id: item.id,
              code: item.code,
              price: item.price,
              quantity: item.quantity,
            })),
            deliveryType,
            shippingAddress: {
              name: shipping.name,
              phone: shipping.phone,
              address: shipping.address,
              pincode: shipping.pincode,
            },
            subtotal,
            shippingFee,
            discount,
            grandTotal,
          })
        );
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: shipping.phone,
      },
      theme: {
        color: "#F97316", // orange
      },
      modal: {
        ondismiss: function () {
          console.log("Razorpay payment modal closed by user");
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = cartItems.reduce((acc, item) => acc + 60 * item.quantity, 0);
  const discount = appliedPromo === "IGNOU10" ? Math.round(subtotal * 0.1) : appliedPromo === "WELCOME50" ? Math.min(50, subtotal) : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  return (
    <div className="bg-dark-white min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-150 h-150 bg-orange/5 rounded-full blur-3xl pointer-events-none" />
      <main className="grow max-w-300 mx-auto w-full px-4 xl:px-0 py-10 lg:py-16 relative z-10">
        {checkoutSuccess ? (
          <CheckoutSuccess />
        ) : (
          <div className="flex flex-col gap-6">
            {/* Header back navigation */}
            <div className="flex items-center gap-3">
              <Link
                href="/cart"
                className="w-10 h-10 rounded-xl bg-white border border-gray-150 flex items-center justify-center text-gray-500 hover:text-orange hover:border-orange transition-all shadow-sm"
              >
                <ArrowLeft size={18} />
              </Link>
              <div>
                <Heading mainblack bold className="text-left">
                  Delivery Address
                </Heading>
                <Paragraph gray sm className="text-left leading-relaxed">
                  Provide your details for handwritten solved assignment delivery.
                </Paragraph>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
              <div className="lg:col-span-8 flex flex-col gap-6">
                {errorMessage && (
                  <div className="flex items-center gap-2.5 text-xs text-red font-semibold bg-red/5 p-3.5 rounded-2xl border border-red/10 text-left">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <ShippingForm
                  name={shipping.name}
                  phone={shipping.phone}
                  address={shipping.address}
                  pincode={shipping.pincode}
                  onChange={(f, v) => setShipping((prev) => ({ ...prev, [f]: v }))}
                />
              </div>

              {cartItems.length > 0 && (
                <div className="lg:col-span-4">
                  <OrderSummary
                    subtotal={subtotal}
                    shippingFee={shippingFee}
                    discount={discount}
                    grandTotal={grandTotal}
                    appliedPromo={appliedPromo}
                    onApplyPromo={handleApplyPromo}
                    onRemovePromo={handleRemovePromo}
                    onCheckout={handleCheckout}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddressPage;
