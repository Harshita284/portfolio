"use client";

import React from "react";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const defaultSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Architectural Strategy",
    description:
      "Mapping out highly scalable system designs and technical feasibility studies for complex digital goals.",
    icon: (
      <svg
        className="w-5 h-5 text-[#D97706]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "UX Engineering",
    description:
      "Precision crafting of high-fidelity interfaces that balance aesthetic beauty with functional cognitive flow.",
    icon: (
      <svg
        className="w-5 h-5 text-[#D97706]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.5 7.5" />
        <circle cx="11" cy="11" r="1.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Full-Stack Orchestration",
    description:
      "Transmuting designs into high-performance code using advanced React patterns and robust Node architectures.",
    icon: (
      <svg
        className="w-5 h-5 text-[#D97706]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Performance Launch",
    description:
      "Rigorous testing, SEO optimization, and deploying to cloud infrastructure for global impact.",
    icon: (
      <svg
        className="w-5 h-5 text-[#D97706]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 01-3.95 2z" />
        <path d="M9 12l-2 2" />
        <path d="M15 9l-2 2" />
      </svg>
    ),
  },
];

interface ProcessProps {
  steps?: ProcessStep[];
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
}

export default function Process({
  steps = defaultSteps,
  badgeText = "WORKFLOW",
  titlePrefix = "My ",
  titleHighlight = "Process",
  subtitle = "A structured approach to turning complex ideas into high-performance digital realities.",
}: ProcessProps) {
  return (
    <section id="process" className="w-full py-12 sm:py-16 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          {/* Workflow Badge */}
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
              <rect x="3" y="3" width="6" height="6" rx="1" />
              <rect x="15" y="3" width="6" height="6" rx="1" />
              <rect x="9" y="15" width="6" height="6" rx="1" />
              <path d="M6 9v3a2 2 0 002 2h4m6-5v3a2 2 0 01-2 2h-4" />
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
            className="text-sm sm:text-base text-[#3b1400] font-medium max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            {subtitle}
          </p>
        </div>

        {/* 4 Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative bg-white border border-[#F3E7DB] rounded-xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#D97706]/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D97706]/10"
            >
              {/* Card Header Row */}
              <div className="flex items-start justify-between w-full">
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-lg bg-[#FAF5EE] border border-[#EEDECB] flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#FFF3E5] group-hover:border-[#D97706]/30">
                  {step.icon}
                </div>

                {/* Faint Step Number Watermark */}
                <span
                  className="text-5xl font-black text-[#F4ECE3] group-hover:text-[#EEDBC9] transition-colors duration-300 select-none pointer-events-none leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                >
                  {step.number}
                </span>
              </div>

              {/* Card Content Body */}
              <div className="pt-8 space-y-2.5">
                <h3
                  className="text-lg sm:text-xl font-black text-[#3b1400] leading-snug tracking-tight group-hover:text-[#D97706] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-xs sm:text-[13px] text-[#3b1400] font-medium leading-relaxed"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
