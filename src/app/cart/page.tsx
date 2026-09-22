"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItemsList from "@/components/cart/CartItemsList";
import DeliverySelector from "@/components/cart/DeliverySelector";
import OrderSummary from "@/components/cart/OrderSummary";
import CheckoutSuccess, { VerifiedDownload } from "@/components/cart/CheckoutSuccess";
import { useCart } from "@/context/CartContext";
import { loadRazorpayScript } from "@/lib/razorpay";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

const ShoppingCartPage = () => {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState<"PDF" | "Handwritten">("PDF");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [verifiedDownloads, setVerifiedDownloads] = useState<VerifiedDownload[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // 1. Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed to load Razorpay SDK. Please check your internet connection.");
        setIsProcessing(false);
        return;
      }

      // 2. Create pending order in Backend
      const orderPayload = {
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
      };

      const orderRes = await api.orders.create(orderPayload);
      const createdOrderId = orderRes?.order?._id || orderRes?._id;
      const razorpayOrderId = orderRes?.razorpayOrderId || orderRes?.order?.razorpayOrderId;

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Tedre00XjhZDpM";
      const userEmail = localStorage.getItem("ignou_user_email") || "";
      const userName = localStorage.getItem("ignou_user_name") || "";

      const options = {
        key: keyId,
        amount: grandTotal * 100, // paise
        currency: "INR",
        name: "IGNOU Solved Assignments",
        description: `Purchase of ${cartItems.length} solved assignment(s)`,
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment security...", { id: "verify-order" });

            // 3. Cryptographic Verification on Backend
            const verifyRes = await api.orders.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.dismiss("verify-order");

            if (verifyRes?.success !== false) {
              toast.success("Payment verified successfully! Solved PDFs are ready.");

              const downloadsList: VerifiedDownload[] =
                verifyRes?.downloads ||
                (verifyRes?.order?.items || []).map((it: any) => ({
                  productId: it.productId || it.id,
                  code: it.code,
                  title: it.title,
                  fileUrl: it.fileUrl,
                }));

              setVerifiedDownloads(downloadsList);

              // Auto-open download link if available
              downloadsList.forEach((item) => {
                if (item.fileUrl) {
                  window.open(item.fileUrl, "_blank");
                }
              });

              clearCart();
              localStorage.removeItem("ignou_cart_promo");
              setCheckoutSuccess(true);
            } else {
              toast.error(verifyRes?.message || "Payment verification failed.");
            }
          } catch (verifyErr: any) {
            toast.dismiss("verify-order");
            toast.error(verifyErr.message || "Payment verification failed. Please contact support.");
            console.error("Payment verification error:", verifyErr);
          } finally {
            setIsProcessing(false);
          }
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
            setIsProcessing(false);
            console.log("Razorpay checkout dismissed");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setIsProcessing(false);
        toast.error(response.error?.description || "Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err: any) {
      setIsProcessing(false);
      toast.error(err.message || "Could not initialize checkout. Please try again.");
      console.error("Checkout initiation error:", err);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = deliveryType === "Handwritten" ? cartItems.reduce((acc, item) => acc + 60 * item.quantity, 0) : 0;
  const discount = appliedPromo === "IGNOU10" ? Math.round(subtotal * 0.1) : appliedPromo === "WELCOME50" ? Math.min(50, subtotal) : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
      {checkoutSuccess ? (
        <div className="w-full max-w-lg mx-auto">
          <CheckoutSuccess downloads={verifiedDownloads} deliveryType={deliveryType} />
        </div>
      ) : cartItems.length === 0 ? (
        <div className="w-full flex justify-center items-center py-6 md:py-12">
          <CartItemsList items={cartItems} onQuantityChange={updateQuantity} onRemove={removeFromCart} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <CartItemsList items={cartItems} onQuantityChange={updateQuantity} onRemove={removeFromCart} />
            {cartItems.length > 0 && <DeliverySelector deliveryType={deliveryType} onChange={setDeliveryType} />}
          </div>
          {cartItems.length > 0 && (
            <div className="lg:col-span-4 sticky top-20 self-start w-full">
              <OrderSummary
                subtotal={subtotal}
                shippingFee={shippingFee}
                discount={discount}
                grandTotal={grandTotal}
                appliedPromo={appliedPromo}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={() => setAppliedPromo(null)}
                onCheckout={handleCheckout}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;

