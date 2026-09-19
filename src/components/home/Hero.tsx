"use client";

import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { ArrowRight } from "lucide-react";
import MainButton from "../ui/MainButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const heroImages = [
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop"
];

const Hero = () => {
  return (
    <section
      className="relative py-10 min-h-[calc(100vh-108px)] flex items-center overflow-hidden bg-main-black text-white"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-main-black to-main-black/95" />
      <div className="absolute top-0 right-0 w-150 h-150 bg-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-yellow/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 xl:px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Heading, Description, and Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Title */}
            <Heading level={1} white big extrabold className="mb-6">
              100% Accurate
              <span className="text-orange-gradient font-black"> IGNOU Solved Assignments</span>
            </Heading>

            {/* Description */}
            <Paragraph white base className="mb-10">
              Boost your grades with premium, easy-to-copy assignments solved by top educators. Download instant PDFs or order neat handwritten copies delivered straight to your home.
            </Paragraph>

            <div className="flex flex-wrap gap-4 items-center">
              <MainButton url="/assignments">
                <span>Get Solved Assignments</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </MainButton>
              <MainButton mainblack url="/admission">
                Order Handwritten
              </MainButton>
            </div>
          </div>

          {/* Right Column: Premium Study Related Slider */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Glowing Backdrop */}
            <div className="absolute w-70 h-70 bg-orange/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative rounded-4xl overflow-hidden border-2 border-white/10 shadow-2xl w-full aspect-4/3 max-w-125 bg-white/5 [--swiper-theme-color:#FF6A00] [--swiper-pagination-bullet-inactive-color:#fff] [--swiper-pagination-bullet-inactive-opacity:0.3]">
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                className="w-full h-full"
              >
                {heroImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`IGNOU Study Workspace ${index + 1}`}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
