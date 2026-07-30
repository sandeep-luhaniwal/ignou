"use client";

import React, { useState, useEffect } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import InputWithLabel from "@/components/ui/InputWithLabel";
import MainButton from "@/components/ui/MainButton";
import Card from "@/components/ui/Card";
import { CheckCircle, Send, User, Phone, Mail, BookOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { submitQueryRequest, resetQueryState } from "@/store/slices/queriesSlice";

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
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert("Please fill in all required fields.");
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
    <Card border className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-cta/5 rounded-full blur-xl pointer-events-none" />
      
      {success ? (
        <div className="text-center py-12 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-light-green text-green rounded-full flex items-center justify-center mb-6 shadow-xs animate-bounce">
            <CheckCircle size={32} />
          </div>
          <Heading level={3} bold mainblack className="mb-4 text-2xl tracking-tight">
            Message Sent Successfully!
          </Heading>
          <Paragraph sm gray className="leading-relaxed mb-8 max-w-md mx-auto text-center">
            Thank you for reaching out, <span className="font-semibold text-main-black">{formData.name}</span>. We have received your message and our academic coordinator will reply to you at <span className="font-semibold text-main-black">{formData.email}</span> shortly.
          </Paragraph>
          <MainButton className="w-full sm:w-auto px-8 py-3 justify-center" onClick={handleReset}>
            Send Another Message
          </MainButton>
        </div>
      ) : (
        <>
          <Heading level={3} bold mainblack className="mb-2 text-2xl tracking-tight">
            Send Us a Message
          </Heading>
          <Paragraph sm gray className="mb-8 leading-relaxed">
            Please fill out this form to connect with our support team.
          </Paragraph>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                label="Phone Number *"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                label="Subject / Topic"
                placeholder="e.g. Solved Assignment BCA"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                labelmedium
                lightwhite
                icon={<BookOpen size={16} className="text-main-gray" />}
              />
            </div>

            <InputWithLabel
              label="Your Message *"
              placeholder="Write your query details here (e.g. semester, course code, special requests)..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              isTextArea
              rows={4}
              labelmedium
              lightwhite
            />

            <MainButton
              type="submit"
              disabled={loading}
              className="w-full justify-center py-3.5 text-base shadow-md font-bold hover:shadow-lg transition-all"
            >
              {loading ? "Sending Message..." : (
                <span className="flex items-center gap-2">
                  <Send size={16} /> Send Message
                </span>
              )}
            </MainButton>
          </form>
        </>
      )}
    </Card>
  );
}
