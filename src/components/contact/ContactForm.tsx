"use client";

import React, { useState, useEffect } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import InputWithLabel from "@/components/ui/InputWithLabel";
import Card from "@/components/ui/Card";
import { Send, User, Phone, Mail, BookOpen, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { submitQueryRequest, resetQueryState } from "@/store/slices/queriesSlice";
import { toast } from "react-hot-toast";

const SuccessCheckIcon = () => (
  <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function ContactForm() {
  const dispatch = useAppDispatch();
  const { loading, success } = useAppSelector((state) => state.queries);

  useEffect(() => {
    return () => {
      dispatch(resetQueryState());
    };
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    dispatch(
      submitQueryRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: "contact",
        message: `Subject: ${formData.subject || "General Contact Inquiry"}\n\n${formData.message}`,
      })
    );
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    dispatch(resetQueryState());
  };

  return (
    <Card border className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-white shadow-xl shadow-slate-100 border-border-white">
      {/* Decorative Gradient Blob */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue/5 rounded-full blur-2xl pointer-events-none" />
      
      {success ? (
        <div className="text-center py-12 flex flex-col items-center justify-center relative z-10">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100 animate-bounce">
            <SuccessCheckIcon />
          </div>
          <Heading level={3} bold mainblack className="mb-3 text-2xl tracking-tight">
            Message Sent Successfully!
          </Heading>
          <Paragraph sm gray className="leading-relaxed mb-8 max-w-md mx-auto text-center">
            Thank you for reaching out, <span className="font-bold text-main-black">{formData.name}</span>. We have received your inquiry and our counseling coordinator will get in touch at <span className="font-bold text-main-black">{formData.email}</span> shortly.
          </Paragraph>
          <button
            onClick={handleReset}
            className="px-8 py-3.5 bg-orange text-white font-bold rounded-xl shadow-md hover:bg-orange/90 active:scale-98 transition-all cursor-pointer text-sm border-none"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <Heading level={3} bold mainblack className="text-xl sm:text-2xl tracking-tight">
              Send Us a Message
            </Heading>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-orange bg-orange/10 px-3 py-1 rounded-full">
              <Sparkles size={12} /> Direct Desk
            </span>
          </div>
          <Paragraph sm gray className="mb-7 leading-relaxed text-xs sm:text-sm">
            Fill in your course details below and our team will get back to you with custom guidance.
          </Paragraph>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputWithLabel
                label="Full Name *"
                placeholder="e.g. Amit Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                labelmedium
                lightwhite
                icon={<User size={16} className="text-main-gray" />}
              />
              <InputWithLabel
                label="Phone / WhatsApp Number *"
                placeholder="e.g. 9876543210"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                labelmedium
                lightwhite
                icon={<Phone size={16} className="text-main-gray" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputWithLabel
                label="Email Address *"
                placeholder="e.g. amit@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                labelmedium
                lightwhite
                icon={<Mail size={16} className="text-main-gray" />}
              />
              <InputWithLabel
                label="Subject / Program Topic"
                placeholder="e.g. Solved Assignment BCA / MCA Project"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                labelmedium
                lightwhite
                icon={<BookOpen size={16} className="text-main-gray" />}
              />
            </div>

            <InputWithLabel
              label="Your Message / Requirement *"
              placeholder="Please specify your course code, semester, session (e.g. July 2024 - Jan 2025), or questions..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              isTextArea
              rows={4}
              labelmedium
              lightwhite
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-orange hover:bg-orange/90 active:scale-98 transition-all shadow-lg shadow-orange/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-none mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Submit Inquiry</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </Card>
  );
}
