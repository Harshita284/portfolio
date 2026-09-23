"use client";

import React from "react";

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  initial: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    quote:
      '"Harshita is a rare developer who understands both the "how" and the "why" of product development. She took our complex ERP requirements and turned them into a fluid, user-centric experience."',
    name: "Alex Rivera",
    role: "Product Manager @ TechFlow",
    initial: "A",
  },
  {
    quote:
      '"The 3D configurator Harshita built for us has significantly increased our conversion rates. Her attention to detail in Three.js performance is truly world-class."',
    name: "Sarah Chen",
    role: "Founder of LuxeRetail",
    initial: "S",
  },
  {
    quote:
      '"I have worked with many developers, but Harshita stands out for her ability to handle high-concurrency backend challenges without missing a beat on the frontend polish."',
    name: "Michael Smyth",
    role: "CTO @ FinCore",
    initial: "M",
  },
];

interface TestimonialsProps {
  testimonials?: TestimonialItem[];
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
}

export default function Testimonials({
  testimonials = defaultTestimonials,
  badgeText = "SUCCESS STORIES",
  titlePrefix = "Wall of ",
  titleHighlight = "Love",
  subtitle = "Feedback from high-impact collaborations and enterprise-scale project partners.",
}: TestimonialsProps) {
  return (
    <section id="testimonials" className="w-full py-12 sm:py-16 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#FFF8F0] border border-[#F3E2CE] shadow-2xs">
            <svg
              className="w-3.5 h-3.5 text-[#D97706]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
            </svg>
            <span
              className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D97706]"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              {badgeText}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#3b1400]"
            style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
          >
            {titlePrefix}
            <span className="text-[#D97706]">{titleHighlight}</span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base text-[#703513]/85 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            {subtitle}
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white border border-[#F3E7DB] rounded-xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#D97706]/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D97706]/10"
            >
              {/* Quote Watermark Icon */}
              <div className="absolute top-6 right-7 text-5xl font-serif text-[#F4ECE3] group-hover:text-[#EEDBC9] transition-colors pointer-events-none select-none font-black leading-none">
                ””
              </div>

              {/* Quote Text */}
              <p
                className="text-xs sm:text-sm text-[#703513] italic leading-relaxed pt-2 pr-6"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                {item.quote}
              </p>

              {/* Author Info Row */}
              <div className="flex items-center gap-3.5 pt-8 mt-6 border-t border-[#F3E7DB]">
                {/* Initial Badge Square */}
                <div
                  className="w-10 h-10 bg-[#D97706] text-white flex items-center justify-center font-black text-sm rounded-sm flex-shrink-0 shadow-xs"
                  style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                >
                  {item.initial}
                </div>

                {/* Name & Role */}
                <div className="space-y-0.5">
                  <h4
                    className="font-bold text-[#3b1400] text-sm sm:text-base leading-tight"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    {item.name}
                  </h4>
                  <p
                    className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
