"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Paragraph from "@/components/ui/Paragraph";
import { CreditCard, Calendar, CheckCircle2, FileText, Package } from "lucide-react";

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
  createdAt: string;
}

interface PaymentHistoryProps {
  orders: Order[];
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ orders }) => {
  return (
    <Card
      border
      className="!border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] text-left transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-green/10 text-green flex items-center justify-center shrink-0">
            <CreditCard size={16} />
          </div>
          <div>
            <Paragraph mainblack bold xl className="tracking-tight">
              Payment History
            </Paragraph>
            <Paragraph gray xs medium>
              View your transaction invoices and billing details.
            </Paragraph>
          </div>
        </div>
        
        <span className="bg-gray-100 text-main-black text-[10px] font-black px-3 py-1.5 rounded-xl border border-gray-200">
          {orders.length} Transactions
        </span>
      </div>

      {orders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={order._id}
                className="p-5 border border-gray-150 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-gray-300 transition-all bg-white"
              >
                {/* Left side: Order info */}
                <div className="flex-grow flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-gray font-bold font-mono bg-gray-50 border border-gray-150 px-2 py-0.5 rounded-md">
                      Ref: #{order._id.substring(order._id.length - 8).toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-gray font-medium">
                      <Calendar size={11} />
                      {orderDate}
                    </span>
                    {order.deliveryType === "PDF" ? (
                      <span className="text-[9px] bg-orange/10 text-orange font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                        <FileText size={10} /> Instant PDF
                      </span>
                    ) : (
                      <span className="text-[9px] bg-blue/10 text-blue font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                        <Package size={10} /> Handwritten Delivery
                      </span>
                    )}
                  </div>

                  {/* Items summary */}
                  <div className="mt-1">
                    <Paragraph mainblack bold sm>
                      {order.items.map((item) => `${item.code} (${item.quantity}x)`).join(", ")}
                    </Paragraph>
                    <Paragraph gray xs className="mt-0.5 leading-relaxed text-[11px]">
                      {order.items.map((item) => item.title).join(", ")}
                    </Paragraph>
                  </div>
                </div>

                {/* Right side: Amount and status */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0 md:pl-4 md:border-l md:border-gray-100">
                  <div className="text-left md:text-right">
                    <span className="text-lg font-black text-orange">₹{order.grandTotal}</span>
                    <span className="text-[9px] text-gray block">Inclusive of GST</span>
                  </div>

                  <span className="bg-[#E6FAE5] text-green border border-green/20 text-[9px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1">
                    <CheckCircle2 size={11} className="stroke-2.5" />
                    PAID
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <CreditCard size={24} />
          </div>
          <Paragraph mainblack bold base className="mb-1">
            No Transactions
          </Paragraph>
          <Paragraph gray xs className="max-w-xs leading-relaxed mb-6">
            You haven't made any purchases or payments yet.
          </Paragraph>
        </div>
      )}
    </Card>
  );
};

export default PaymentHistory;
