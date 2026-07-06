"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import MainButton from "@/components/ui/MainButton";
import { Check } from "lucide-react";
import Card from "@/components/ui/Card";

export const CheckoutSuccess: React.FC = () => {
  return (
    <Card border className="max-w-md mx-auto  p-8 text-center shadow-lg my-10">
      <div className="w-16 h-16 bg-green/10 text-green rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={32} />
      </div>
      <Heading mainblack bold center className="mb-3">
        Order Placed Successfully!
      </Heading>
      <Paragraph gray sm center className="mb-8 leading-relaxed">
        Thank you for your order. We are compiling your solved reference files. You will receive an instant download link in your registered email inbox.
      </Paragraph>
      <MainButton url="/" className="w-full justify-center">
        Continue Studying
      </MainButton>
    </Card>
  );
};

export default CheckoutSuccess;
