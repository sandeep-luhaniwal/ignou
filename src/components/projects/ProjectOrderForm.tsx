"use client";

import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Card from "@/components/ui/Card";
import DropDownMenu from "@/components/ui/DropDownMenu";
import SwitchCase from "@/components/ui/SwitchCase";
import MainButton from "@/components/ui/MainButton";
import Badge from "@/components/ui/Badge";
import InputWithLabel from "@/components/ui/InputWithLabel";
import { User, Phone, Mail, FileText, Check, Sparkles } from "lucide-react";
import { useAppDispatch } from "@/store";
import { submitQueryRequest } from "@/store/slices/queriesSlice";

const programOptions = [
  { label: "BCA Computer Project (BCSP-064)", value: "BCA" },
  { label: "MCA Computer Project (MCSP-060)", value: "MCA" },
  { label: "MBA Finance/HR Project (MMPP-001)", value: "MBA" },
  { label: "MA Sociology/History Project", value: "MA" }
];

export default function ProjectOrderForm() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: "BCA"
  });
  const [uniqueSynopsis, setUniqueSynopsis] = useState(true);
  const [includeSourceCode, setIncludeSourceCode] = useState(true);
  const [includeViva, setIncludeViva] = useState(true);
  const [ordered, setOrdered] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numeric = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numeric }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and WhatsApp Number.");
      return;
    }

    dispatch(
      submitQueryRequest({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || "project.lead@ignou.ac.in",
        type: "project",
        message: `Program: ${formData.program}\nUnique Synopsis: ${uniqueSynopsis ? "Yes" : "No"}\nSource Code: ${includeSourceCode ? "Yes" : "No"}\nViva Prep: ${includeViva ? "Yes" : "No"}`,
      })
    );

    setOrdered(true);
    setTimeout(() => {
      const text = encodeURIComponent(
        `Hello IGNOU POWER, I want to request Project Help:\n` +
        `- Name: ${formData.name}\n` +
        `- Phone: ${formData.phone}\n` +
        `- Email: ${formData.email || "N/A"}\n` +
        `- Program: ${formData.program}\n` +
        `- Unique Synopsis Guarantee: ${uniqueSynopsis ? "Yes" : "No"}\n` +
        `- Source Code: ${includeSourceCode ? "Yes" : "No"}\n` +
        `- Viva Prep: ${includeViva ? "Yes" : "No"}`
      );
      window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
    }, 1000);
  };

  return (
    <Card border className="p-6 md:p-8 bg-white shadow-xl rounded-4xl! relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cta/5 rounded-full blur-2xl pointer-events-none" />

      {ordered ? (
        <div className="text-center py-12 flex flex-col items-center justify-center my-auto">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <Check size={32} />
          </div>
          <Heading level={3} bold mainblack className="mb-4 text-2xl tracking-tight">
            Redirecting to Support...
          </Heading>
          <Paragraph sm gray className="leading-relaxed mb-6 max-w-sm mx-auto">
            We are preparing your custom configuration parameters and redirecting you to our project coordinator desk.
          </Paragraph>
          <MainButton className="w-full sm:w-auto px-8" onClick={() => setOrdered(false)}>
            Configure New Project
          </MainButton>
        </div>
      ) : (
        <form onSubmit={handleOrder} className="flex flex-col h-full">
          <div className="flex items-center gap-2.5 mb-2">
            <Sparkles className="text-cta animate-pulse" size={22} />
            <Heading level={3} bold mainblack className="text-xl md:text-2xl tracking-tight">
              Project Configurator
            </Heading>
          </div>
          <Paragraph sm gray className="mb-6">
            Configure your custom thesis requirements and get instant support quotes.
          </Paragraph>

          <div className="space-y-4 flex-1">
            {/* Input Details */}
            <InputWithLabel
              label="Full Name *"
              name="name"
              required
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              icon={<User size={18} />}
            />

            <InputWithLabel
              label="WhatsApp Number *"
              name="phone"
              required
              placeholder="Enter your WhatsApp number"
              value={formData.phone}
              onChange={handleInputChange}
              icon={<Phone size={18} />}
            />

            <InputWithLabel
              label="Email Address (Optional)"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              icon={<Mail size={18} />}
            />

            {/* Program Dropdown Selection */}
            <div>
              <label className="text-xs font-bold text-main-black block mb-2 uppercase tracking-wide">
                Target Program Course Code *
              </label>
              <DropDownMenu
                options={programOptions}
                placeholder="Select your program stream"
                value={formData.program}
                onChange={(val) => setFormData((prev) => ({ ...prev, program: String(val) }))}
                containerClassName="w-full"
                buttonClassName="w-full py-3"
              />
            </div>

            {/* Config Options with SwitchCase */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 bg-light-white rounded-xl border border-border-white">
                <div>
                  <h5 className="text-xs font-bold text-main-black">Unique Synopsis Guarantee</h5>
                  <p className="text-xs text-gray">Avoids duplicate topic rejections</p>
                </div>
                <SwitchCase value={uniqueSynopsis} onChange={setUniqueSynopsis} size="md" />
              </div>

              <div className="flex items-center justify-between p-3 bg-light-white rounded-xl border border-border-white">
                <div>
                  <h5 className="text-xs font-bold text-main-black">Include Source Code & DB</h5>
                  <p className="text-xs text-gray">Full project software files</p>
                </div>
                <SwitchCase value={includeSourceCode} onChange={setIncludeSourceCode} size="md" />
              </div>

              <div className="flex items-center justify-between p-3 bg-light-white rounded-xl border border-border-white">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-xs font-bold text-main-black">Viva-Voce Questions Guide</h5>
                    <Badge xs className="font-extrabold text-sm tracking-wider uppercase">Free</Badge>
                  </div>
                  <p className="text-xs text-gray">Comprehensive viva prep booklet</p>
                </div>
                <SwitchCase value={includeViva} onChange={setIncludeViva} size="md" />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border-white">
            <MainButton
              type="submit"
              className="w-full justify-center py-4 text-base font-bold shadow-md  transition-all"
            >
              Get Project Estimate
            </MainButton>
          </div>
        </form>
      )}
    </Card>
  );
}
