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
import { api } from "@/lib/api";
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
  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    state: "",
    district: "",
    address: "",
    pincode: "",
  });
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

    if (
      !shipping.name.trim() ||
      !shipping.phone.trim() ||
      !shipping.address.trim() ||
      !shipping.pincode.trim() ||
      !shipping.state.trim() ||
      !shipping.district.trim()
    ) {
      setErrorMessage("Please fill in all shipping details, including State & District.");
      return;
    }

    if (shipping.phone.trim().length < 10) {
      setErrorMessage("Please enter a valid 10-digit WhatsApp Phone Number.");
      return;
    }

    if (shipping.pincode.trim().length !== 6 || isNaN(Number(shipping.pincode))) {
      setErrorMessage("Please enter a valid 6-digit Pincode.");
      return;
    }

    // Load Razorpay SDK
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setErrorMessage("Failed to load Razorpay Payment gateway SDK. Please check your internet connection.");
      return;
    }

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          id: item.id,
          code: item.code,
          price: item.price,
          quantity: item.quantity,
        })),
        deliveryType,
        shippingAddress: {
          name: shipping.name.trim(),
          phone: shipping.phone.trim(),
          state: shipping.state.trim(),
          district: shipping.district.trim(),
          address: `${shipping.address.trim()}, ${shipping.district.trim()}, ${shipping.state.trim()} - ${shipping.pincode.trim()}`,
          pincode: shipping.pincode.trim(),
        },
        subtotal,
        shippingFee,
        discount,
        grandTotal,
      };

      const orderRes = await api.orders.create(orderPayload);
      const razorpayOrderId = orderRes?.razorpayOrderId || orderRes?.order?.razorpayOrderId;

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Tedre00XjhZDpM";
      const userEmail = localStorage.getItem("ignou_user_email") || "";
      const userName = localStorage.getItem("ignou_user_name") || shipping.name;

      const options = {
        key: keyId,
        amount: grandTotal * 100, // paise
        currency: "INR",
        name: "IGNOU Solved Assignments",
        description: `Purchase of ${cartItems.length} solved assignment(s) (Handwritten delivery)`,
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          try {
            setErrorMessage(null);
            const verifyRes = await api.orders.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes?.success !== false) {
              clearCart();
              localStorage.removeItem("ignou_cart_promo");
              setCheckoutSuccess(true);
            } else {
              setErrorMessage(verifyRes?.message || "Payment verification failed.");
            }
          } catch (verifyErr: any) {
            setErrorMessage(verifyErr.message || "Payment verification failed.");
          }
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
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setErrorMessage(response.error?.description || "Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initiate payment. Please try again.");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = cartItems.reduce((acc, item) => acc + 60 * item.quantity, 0);
  const discount = appliedPromo === "IGNOU10" ? Math.round(subtotal * 0.1) : appliedPromo === "WELCOME50" ? Math.min(50, subtotal) : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 relative z-30">
      {checkoutSuccess ? (
        <div className="w-full max-w-lg mx-auto">
          <CheckoutSuccess deliveryType="Handwritten" />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Header back navigation */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="w-10 h-10 rounded-lg bg-surface-strong ring-1 ring-border flex items-center justify-center text-ink/70 hover:text-azure-deep hover:bg-glass transition-all shadow-xs"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-foreground text-left">
                Delivery Address
              </h2>
              <p className="text-xs sm:text-sm text-ink/65 text-left">
                Provide your details for handwritten solved assignment delivery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
            <div className="lg:col-span-8 flex flex-col gap-6">
              {errorMessage && (
                <div className="flex items-center gap-2.5 text-xs text-rose-deep font-semibold bg-rose-soft/20 p-3.5 rounded-lg ring-1 ring-rose-deep/20 text-left">
                  <AlertCircle className="size-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <ShippingForm
                name={shipping.name}
                phone={shipping.phone}
                state={shipping.state}
                district={shipping.district}
                address={shipping.address}
                pincode={shipping.pincode}
                onChange={(f, v) => setShipping((prev) => ({ ...prev, [f]: v }))}
              />
            </div>

            {cartItems.length > 0 && (
              <div className="lg:col-span-4 sticky top-20">
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
    </div>
  );
};

export default AddressPage;
