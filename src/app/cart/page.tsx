"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartItem } from "@/components/cart/types";
import CartItemsList from "@/components/cart/CartItemsList";
import DeliverySelector from "@/components/cart/DeliverySelector";
import OrderSummary from "@/components/cart/OrderSummary";
import CheckoutSuccess from "@/components/cart/CheckoutSuccess";
import { useCart } from "@/context/CartContext";
import { loadRazorpayScript } from "@/lib/razorpay";
import { useAppDispatch, useAppSelector } from "@/store";
import { createOrderRequest, resetOrderState } from "@/store/slices/ordersSlice";

const ShoppingCartPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState<"PDF" | "Handwritten">("PDF");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      alert(orderError);
      dispatch(resetOrderState());
    }
  }, [orderError, dispatch]);

  // Sync state from localStorage on mount
  useEffect(() => {
    // Check login state
    const savedLogin = localStorage.getItem("ignou_logged_in");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }

    const savedDelivery = localStorage.getItem("ignou_cart_delivery");
    const savedPromo = localStorage.getItem("ignou_cart_promo");

    if (savedDelivery) {
      setDeliveryType(savedDelivery as "PDF" | "Handwritten");
    }

    if (savedPromo) {
      setAppliedPromo(savedPromo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ignou_cart_delivery", deliveryType);
  }, [deliveryType]);

  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem("ignou_cart_promo", appliedPromo);
    } else {
      localStorage.removeItem("ignou_cart_promo");
    }
  }, [appliedPromo]);

  const handleApplyPromo = (code: string): boolean => {
    if (code === "IGNOU10" || code === "WELCOME50") {
      setAppliedPromo(code);
      return true;
    }
    return false;
  };

  const handleCheckout = async () => {
    // If not logged in, redirect to the sign-in page
    if (!isLoggedIn) {
      const destination = deliveryType === "Handwritten" ? "/cart/address" : "/cart";
      router.push(`/auth/sign-in?redirect=${encodeURIComponent(destination)}`);
      return;
    }

    if (deliveryType === "Handwritten") {
      router.push("/cart/address");
      return;
    }

    // Load Razorpay SDK
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay Payment gateway SDK. Please check your internet connection.");
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
      description: `Purchase of ${cartItems.length} solved assignment(s)`,
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
  const shippingFee = deliveryType === "Handwritten" ? cartItems.reduce((acc, item) => acc + 60 * item.quantity, 0) : 0;
  const discount = appliedPromo === "IGNOU10" ? Math.round(subtotal * 0.1) : appliedPromo === "WELCOME50" ? Math.min(50, subtotal) : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  return (
    <div className="bg-[#FAFBFD] min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange/5 rounded-full blur-[150px] pointer-events-none" />
      <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 xl:px-0 py-10 lg:py-16 relative z-10 flex flex-col justify-center items-center">
        {checkoutSuccess ? (
          <div className="w-full max-w-md">
            <CheckoutSuccess />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="w-full flex justify-center items-center py-6 md:py-10">
            <CartItemsList items={cartItems} onQuantityChange={updateQuantity} onRemove={removeFromCart} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
            <div className="lg:col-span-8 flex flex-col gap-8">
              <CartItemsList items={cartItems} onQuantityChange={updateQuantity} onRemove={removeFromCart} />
              {cartItems.length > 0 && <DeliverySelector deliveryType={deliveryType} onChange={setDeliveryType} />}
            </div>
            {cartItems.length > 0 && (
              <div className="lg:col-span-4">
                <OrderSummary subtotal={subtotal} shippingFee={shippingFee} discount={discount} grandTotal={grandTotal} appliedPromo={appliedPromo} onApplyPromo={handleApplyPromo} onRemovePromo={() => setAppliedPromo(null)} onCheckout={handleCheckout} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShoppingCartPage;
