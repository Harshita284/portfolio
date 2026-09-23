"use client";

import React from "react";

export interface PrincipleItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const defaultPrinciples: PrincipleItem[] = [
  {
    title: "Engineering Precision",
    description:
      "No room for technical debt; I build for long-term scalability and clean architecture.",
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Technological Agility",
    description:
      "Constant adaptation to the bleeding edge of web standards to deliver future-proof solutions.",
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
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Data-Driven UX",
    description:
      "Every pixel is an outcome of rigorous user-flow analysis and conversion-focused logic.",
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
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: "Scalability DNA",
    description:
      "Architecting from day one to handle tomorrow's traffic—built for high concurrency.",
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
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
];

interface EthosProps {
  principles?: PrincipleItem[];
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
  stats?: Array<{ value: string; label: string }>;
}

export default function Ethos({
  principles = defaultPrinciples,
  badgeText = "ETHOS",
  titlePrefix = "Built with ",
  titleHighlight = "Purpose",
  subtitle = "My work is guided by a set of core principles that ensure every project I undertake is not just functional, but exceptional in its impact and execution.",
  stats = [
    { value: "100%", label: "COMMITMENT" },
    { value: "99.9%", label: "UPTIME FOCUS" },
  ],
}: EthosProps) {
  return (
    <section id="ethos" className="w-full py-12 sm:py-16 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Title, Subtitle & 2 Stat Boxes */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
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
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
                className="text-4xl sm:text-5xl font-black tracking-tight text-[#3b1400] leading-tight"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                {titlePrefix}
                <span className="text-[#D97706]">{titleHighlight}</span>
              </h2>

              {/* Subtitle */}
              <p
                className="text-sm sm:text-base text-[#3b1400] font-medium leading-relaxed"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                {subtitle}
              </p>
            </div>

            {/* 2 Stat Boxes */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#F3E7DB] rounded-xl p-6 space-y-1.5 transition-all duration-300 hover:border-[#D97706]/40 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="text-3xl sm:text-4xl font-black text-[#D97706]"
                    style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] font-black uppercase tracking-wider text-[#3b1400]"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Principle Cards 2x2 Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white border border-[#F3E7DB] rounded-xl p-7 flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-[#D97706]/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D97706]/10"
              >
                {/* Icon Badge */}
                <div className="w-11 h-11 rounded-lg bg-[#FAF5EE] border border-[#EEDECB] flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#FFF3E5] group-hover:border-[#D97706]/30">
                  {item.icon}
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3
                    className="text-base sm:text-lg font-black text-[#3b1400] leading-snug tracking-tight font-orbitron group-hover:text-[#D97706] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs sm:text-[13px] text-[#3b1400] font-medium leading-relaxed"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
