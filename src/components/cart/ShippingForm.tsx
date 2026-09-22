"use client";

import React, { useMemo } from "react";
import { User, Phone, MapPin, Mailbox, Landmark, Map } from "lucide-react";
import SearchableSelect from "@/components/ui/SearchableSelect";
import {
  ALL_INDIAN_STATES,
  getDistrictsForState,
} from "@/data/indiaStatesDistricts";

interface ShippingProps {
  name: string;
  phone: string;
  address: string;
  pincode: string;
  state?: string;
  district?: string;
  onChange: (field: string, value: string) => void;
}

export const ShippingForm: React.FC<ShippingProps> = ({
  name,
  phone,
  address,
  pincode,
  state = "",
  district = "",
  onChange,
}) => {
  // Prevent non-numeric characters from being typed
  const handleNumericKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: navigation, edit, and control keys
    if (
      [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(e.key) ||
      // Allow shortcuts: Ctrl/Cmd + A, C, V, X, Z
      ((e.ctrlKey || e.metaKey) && ["a", "c", "v", "x", "z"].includes(e.key.toLowerCase()))
    ) {
      return;
    }

    // Disallow if not a digit (0-9)
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Filter WhatsApp phone input to strictly numbers only & max 10 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange("phone", numericValue);
  };

  // Filter Area Pincode to strictly numbers only & max 6 digits
  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, 6);
    onChange("pincode", numericValue);
  };

  // Dynamically compute districts for the selected state
  const districtOptions = useMemo(() => {
    return getDistrictsForState(state);
  }, [state]);

  const handleStateChange = (selectedState: string) => {
    onChange("state", selectedState);
    // Reset district if state changed
    onChange("district", "");
  };

  return (
    <div className="rounded-xl bg-glass p-5 sm:p-6 ring-1 ring-glass-edge  backdrop-blur-xl text-left flex flex-col gap-5">
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
            Shipping & Delivery Address
          </h3>
          <p className="text-xs text-ink/60 font-medium mt-0.5">
            Enter your state, district and address for fast handwritten assignment dispatch.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5 flex items-center gap-1.5">
            <User className="size-3.5 text-azure-deep" />
            <span>Full Name *</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full rounded-lg bg-surface-strong px-4 py-2.5 text-sm text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure/50 transition-all"
          />
        </div>

        {/* WhatsApp Phone */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-ink/80 flex items-center gap-1.5">
              <Phone className="size-3.5 text-emerald-600" />
              <span>WhatsApp Phone Number *</span>
            </label>
            <span className="text-[11px] font-semibold text-ink/50">
              {phone ? `${phone.length}/10 digits` : "Only 10 numbers"}
            </span>
          </div>

          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-xs font-bold text-ink/60 select-none pointer-events-none bg-paper px-1.5 py-0.5 rounded ring-1 ring-border/80">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              maxLength={10}
              placeholder="9876543210"
              value={phone}
              onKeyDown={handleNumericKeyDown}
              onChange={handlePhoneChange}
              className="w-full rounded-lg bg-surface-strong pl-16 pr-4 py-2.5 text-sm font-medium tracking-wide text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure/50 transition-all font-mono"
            />
          </div>
          <p className="text-[11px] text-ink/50 mt-1">
            Dispatch tracking updates & delivery confirmation will be sent on WhatsApp.
          </p>
        </div>

        {/* State & District Grid Selection */}
        <div className="relative z-30 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* State Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5 flex items-center gap-1.5">
              <Landmark className="size-3.5 text-purple-600" />
              <span>State / Union Territory *</span>
            </label>
            <SearchableSelect
              value={state}
              onChange={handleStateChange}
              options={ALL_INDIAN_STATES}
              placeholder="Select State / UT"
              searchPlaceholder="Search 36 States/UTs..."
            />
          </div>

          {/* District Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5 flex items-center gap-1.5">
              <Map className="size-3.5 text-rose-deep" />
              <span>District *</span>
            </label>
            <SearchableSelect
              value={district}
              onChange={(val) => onChange("district", val)}
              options={districtOptions}
              disabled={!state}
              placeholder={state ? "Select District" : "Select State first"}
              searchPlaceholder={`Search district in ${state || "state"}...`}
            />
          </div>
        </div>

        {/* Pincode */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-ink/80 flex items-center gap-1.5">
              <Mailbox className="size-3.5 text-amber-600" />
              <span>Area Pincode *</span>
            </label>
            <span className="text-[11px] font-semibold text-ink/50">
              {pincode ? `${pincode.length}/6 digits` : "6 digits"}
            </span>
          </div>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            maxLength={6}
            placeholder="e.g. 110001"
            value={pincode}
            onKeyDown={handleNumericKeyDown}
            onChange={handlePincodeChange}
            className="w-full rounded-lg bg-surface-strong px-4 py-2.5 text-sm font-medium tracking-wide text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure/50 transition-all font-mono"
          />
        </div>

        {/* Full Address */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5 flex items-center gap-1.5">
            <MapPin className="size-3.5 text-rose-deep" />
            <span>Complete Delivery Address (House/Street/Landmark) *</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="House/Flat No., Building Name, Street/Road, Landmark"
            value={address}
            onChange={(e) => onChange("address", e.target.value)}
            className="w-full resize-none rounded-lg bg-surface-strong px-4 py-2.5 text-sm text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure/50 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;



