"use client";

import React from "react";
import { CreditCard, Calendar, CheckCircle2, XCircle, Clock, FileText, Package, Hash, Sparkles } from "lucide-react";

interface OrderItem {
  id: string;
  code: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  deliveryType: "PDF" | "Handwritten";
  subtotal: number;
  shippingFee: number;
  discount: number;
  grandTotal: number;
  paymentStatus?: "Paid" | "Pending" | "Failed" | string;
  orderStatus?: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  createdAt: string;
}

interface PaymentHistoryProps {
  orders: Order[];
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ orders }) => {
  return (
    <div className="rounded-xl bg-glass p-5 sm:p-6 ring-1 ring-glass-edge  backdrop-blur-xl text-left transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5 pb-4 border-b border-border/70">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-linear-to-br from-azure/25 to-rose/20 text-azure-deep flex items-center justify-center shrink-0 ring-1 ring-azure/30">
            <CreditCard className="size-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight">
              Payment History
            </h3>
            <p className="text-xs text-ink/60 font-medium">
              View your transaction invoices and billing details.
            </p>
          </div>
        </div>

        <span className="bg-surface-strong text-foreground text-xs font-bold px-3 py-1.5 rounded-lg ring-1 ring-border/80 w-fit self-start sm:self-auto shadow-2xs">
          {orders.length} Transactions
        </span>
      </div>

      {orders.length > 0 ? (
        <div className="flex flex-col gap-3.5">
          {orders.map((order) => {
            const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            const status = (order.paymentStatus || "Paid").toLowerCase();
            const isPaid = status === "paid";
            const isFailed = status === "failed";
            const isPending = status === "pending";

            return (
              <div
                key={order._id}
                className="group p-4 sm:p-5 rounded-xl bg-surface-strong/90 ring-1 ring-border/80 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:ring-azure/50 hover:bg-glass transition-all duration-200 shadow-2xs hover:shadow-md"
              >
                {/* Left side: Order info */}
                <div className="grow flex flex-col gap-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-foreground font-bold font-mono bg-paper ring-1 ring-border px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Hash className="size-3 text-azure-deep" />
                      Ref: #{order._id.substring(order._id.length - 8).toUpperCase()}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-ink/60 font-medium">
                      <Calendar className="size-3 text-ink/45" />
                      {orderDate}
                    </span>

                    {order.deliveryType === "PDF" ? (
                      <span className="text-[11px] bg-azure-soft/40 text-azure-deep font-bold px-2 py-0.5 rounded-md ring-1 ring-azure/25 flex items-center gap-1">
                        <FileText className="size-3" /> Instant PDF
                      </span>
                    ) : (
                      <span className="text-[11px] bg-rose-soft/40 text-rose-deep font-bold px-2 py-0.5 rounded-md ring-1 ring-rose/25 flex items-center gap-1">
                        <Package className="size-3" /> Handwritten
                      </span>
                    )}
                  </div>

                  {/* Items summary */}
                  <div className="mt-0.5">
                    <h4 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                      {order.items
                        .map((item) => {
                          const isHex = (str?: string) => Boolean(str && /^[0-9a-fA-F]{24}$/i.test(str.trim()));
                          const code = item.code && !isHex(item.code) ? item.code : "";
                          const title =
                            item.title && !isHex(item.title)
                              ? item.title
                              : code
                                ? `${code} Solved Assignment`
                                : "Solved Assignment";
                          return `${code || title} (${item.quantity}x)`;
                        })
                        .join(", ")}
                    </h4>
                  </div>
                </div>

                {/* Right side: Amount and dynamic status */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0 md:pl-5 md:border-l md:border-border/70">
                  <div className="text-left md:text-right">
                    <span className="text-base sm:text-lg font-black text-rose-deep">₹{order.grandTotal}</span>
                    <span className="text-[10.5px] text-ink/50 block">All inclusive</span>
                  </div>

                  {isPaid && (
                    <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/25 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5" />
                      PAID
                    </span>
                  )}

                  {isFailed && (
                    <span className="bg-rose-500/10 text-rose-deep ring-1 ring-rose-500/25 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <XCircle className="size-3.5" />
                      FAILED
                    </span>
                  )}

                  {isPending && (
                    <span className="bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/25 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <Clock className="size-3.5 animate-pulse" />
                      PENDING
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="size-14 bg-azure-soft/25 text-azure-deep rounded-2xl flex items-center justify-center mb-4 ring-1 ring-azure/25 shadow-inner">
            <CreditCard className="size-7" />
          </div>
          <h4 className="font-bold text-base text-foreground mb-1">
            No Transactions Yet
          </h4>
          <p className="text-xs text-ink/60 max-w-xs leading-relaxed">
            You haven't made any purchases or payments yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;


