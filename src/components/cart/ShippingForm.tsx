"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import InputWithLabel from "@/components/ui/InputWithLabel";
import Card from "@/components/ui/Card";

interface ShippingProps {
  name: string;
  phone: string;
  address: string;
  pincode: string;
  onChange: (field: string, value: string) => void;
}

export const ShippingForm: React.FC<ShippingProps> = ({
  name,
  phone,
  address,
  pincode,
  onChange,
}) => {
  return (
    <Card border className=" !border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] text-left flex flex-col gap-4 animate-fade-in">
      <Heading small mainblack bold>
        Shipping & Delivery Address
      </Heading>

      <div className="space-y-3.5">
        {/* Full Name */}
        <InputWithLabel
          label="Full Name"
          required
          placeholder="e.g. Rahul Sharma"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          xs
          labelxs
          labelbold
        />

        {/* WhatsApp Phone */}
        <InputWithLabel
          label="WhatsApp Phone Number"
          required
          type="tel"
          placeholder="e.g. +91 98765 43210"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          xs
          labelxs
          labelbold
        />

        {/* Pincode */}
        <InputWithLabel
          label="Area Pincode"
          required
          maxLength={6}
          placeholder="e.g. 110001"
          value={pincode}
          onChange={(e) => onChange("pincode", e.target.value)}
          xs
          labelxs
          labelbold
        />

        {/* Full Address */}
        <InputWithLabel
          label="Complete Delivery Address"
          required
          isTextArea
          rows={3}
          placeholder="Flat/House No, Building, Street, Area, Landmark"
          value={address}
          onChange={(e) => onChange("address", e.target.value)}
          xs
          labelxs
          labelbold
          labelClassName=""
          inputClassName=" !resize-none"
        />
      </div>
    </Card>
  );
};

export default ShippingForm;
