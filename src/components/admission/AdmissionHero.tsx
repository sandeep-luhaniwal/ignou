"use client";

import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import InputWithLabel from "@/components/ui/InputWithLabel";
import DropDownMenu from "@/components/ui/DropDownMenu";
import MainButton from "@/components/ui/MainButton";
import { CheckCircle, Sparkles, User, Phone } from "lucide-react";
import { useAppDispatch } from "@/store";
import { submitQueryRequest } from "@/store/slices/queriesSlice";

const courseOptions = [
  { label: "BCA (Computer Applications)", value: "BCA" },
  { label: "MCA (Computer Applications)", value: "MCA" },
  { label: "MBA (Business Administration)", value: "MBA" },
  { label: "B.Com (Bachelor of Commerce)", value: "BCOM" },
  { label: "M.Com (Master of Commerce)", value: "MCOM" },
  { label: "BA (Bachelor of Arts)", value: "BA" },
  { label: "MA (Master of Arts)", value: "MA" },
  { label: "B.Sc (Bachelor of Science)", value: "BSC" }
];

export default function AdmissionHero() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "BCA",
    message: ""
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in Name and WhatsApp Number.");
      return;
    }

    dispatch(
      submitQueryRequest({
        name: formData.name,
        phone: formData.phone,
        email: "admission.lead@ignou.ac.in", // Placeholder email as not gathered by UI
        type: "admission",
        message: `Target Course: ${formData.course}\nMessage: ${formData.message || "N/A"}`,
      })
    );

    setSuccess(true);
    setTimeout(() => {
      const text = encodeURIComponent(
        `Hello IGNOU POWER, I want to inquire about IGNOU Admissions 2026:\n` +
        `- Name: ${formData.name}\n` +
        `- Phone: ${formData.phone}\n` +
        `- Target Course: ${formData.course}\n` +
        `- Message: ${formData.message || "N/A"}`
      );
      window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
    }, 1000);
  };

  return (
    <section className="bg-linear-to-b from-slate-50 to-slate-100 border-b border-border-white py-16 md:py-20 px-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 opacity-5 bg-orange/5 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <Badge orange roundedfull className="mb-6 px-4.5 py-1.5 font-bold uppercase tracking-wider text-xs shadow-xs">
            July 2026 Admissions Open
          </Badge>

          <Heading level={1} big bold mainblack className="mb-6 leading-tight">
            Hassle-Free <br />
            <span className="text-orange-gradient font-black">IGNOU Admissions</span> 2026
          </Heading>

          <Paragraph base gray className="mb-10 max-w-xl leading-relaxed">
            Don't get lost in complex registration steps. Get professional end-to-end guidance for course selection, document optimization, and guaranteed fee submission.
          </Paragraph>

          {/* Features Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-cta shrink-0" size={18} />
              <span className="text-xs font-extrabold text-main-black uppercase tracking-wider">100% Application Verification</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-cta shrink-0" size={18} />
              <span className="text-xs font-extrabold text-main-black uppercase tracking-wider">Official Course Mapping</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-cta shrink-0" size={18} />
              <span className="text-xs font-extrabold text-main-black uppercase tracking-wider">Rejection Prevention Vetting</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-cta shrink-0" size={18} />
              <span className="text-xs font-extrabold text-main-black uppercase tracking-wider">24/7 WhatsApp Support Desk</span>
            </div>
          </div>
        </div>

        {/* Right Column (Form Card) */}
        <div className="lg:col-span-5 w-full">
          <Card border className="p-8 md:p-10 bg-white shadow-xl rounded-4xl! relative">
            {success ? (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={32} />
                </div>
                <Heading level={3} bold mainblack className="mb-4 text-2xl tracking-tight">
                  Consultation Requested!
                </Heading>
                <Paragraph sm gray className="leading-relaxed mb-6">
                  Thank you, {formData.name}. We are preparing your curriculum checklist and redirecting you to our admissions coordinator desk.
                </Paragraph>
                <MainButton className="w-full" onClick={() => setSuccess(false)}>
                  Submit Another Inquiry
                </MainButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-cta animate-pulse" size={22} />
                  <Heading level={3} bold mainblack className="text-xl md:text-2xl tracking-tight">
                    Free Consultation
                  </Heading>
                </div>
                <Paragraph sm gray className="mb-6">
                  Enter your details below to secure your seat guidance.
                </Paragraph>

                <InputWithLabel
                  label="Your Name *"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  icon={<User size={18} />}
                />

                <InputWithLabel
                  label="Phone Number *"
                  name="phone"
                  required
                  placeholder="Enter your WhatsApp number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  icon={<Phone size={18} />}
                />

                <div className="w-full">
                  <label className="text-xs font-bold text-main-black block mb-2 uppercase tracking-wide">
                    Target Course Program *
                  </label>
                  <DropDownMenu
                    options={courseOptions}
                    placeholder="Select your program"
                    value={formData.course}
                    onChange={(val) => setFormData((prev) => ({ ...prev, course: String(val) }))}
                    containerClassName="w-full"
                    buttonClassName="w-full py-3"
                  />
                </div>

                <InputWithLabel
                  label="Questions or Message (Optional)"
                  name="message"
                  placeholder="Ask about fees, eligibility, documents, or timelines..."
                  value={formData.message}
                  onChange={handleInputChange}
                  isTextArea
                  rows={3}
                />

                <div className="pt-2">
                  <MainButton type="submit" className="w-full justify-center py-4 text-base font-bold shadow-md  transition-all">
                    Book Free Consultation
                  </MainButton>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
