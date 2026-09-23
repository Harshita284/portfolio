"use client";

import React from "react";

export interface SkillCategory {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  skills: string[];
}

const defaultCategories: SkillCategory[] = [
  {
    title: "Languages",
    subtitle: "Core Syntax",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: ["JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    subtitle: "UI & Frameworks",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    skills: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Backend & Security",
    subtitle: "Server Logic",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    skills: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "JWT Authentication",
      "Role-Based Access Control",
    ],
  },
  {
    title: "Databases",
    subtitle: "Data Storage",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Schema Design",
      "Query Handling & Data Loading",
    ],
  },
  {
    title: "Messaging & Caching",
    subtitle: "Event-Driven",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    skills: ["Apache Kafka (Event-Driven)", "Redis In-Memory Store"],
  },
  {
    title: "Architecture",
    subtitle: "System Design",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    skills: [
      "Microservices",
      "API Design",
      "Scalable Architecture",
      "Caching Strategies",
    ],
  },
  {
    title: "Integrations",
    subtitle: "Third-Party Services",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-6 8a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1z" />
      </svg>
    ),
    skills: [
      "Razorpay",
      "Google Maps",
      "DigiLocker",
      "OTP / SMS Gateways",
      "Cloudinary",
    ],
  },
  {
    title: "Tools & Practice",
    subtitle: "Workflow",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: [
      "Git & GitHub",
      "Postman & API Testing",
      "Debugging",
      "Performance Optimization",
    ],
  },
];

interface CapabilitiesProps {
  categories?: SkillCategory[];
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
}

export default function Capabilities({
  categories = defaultCategories,
  badgeText = "EXPERTISE",
  titlePrefix = "Technical ",
  titleHighlight = "Capabilities",
  subtitle = "A complete breakdown of my engineering competencies, databases, microservices, and integrations.",
}: CapabilitiesProps) {
  return (
    <section id="capabilities" className="w-full py-12 sm:py-16 bg-transparent">
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
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
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

        {/* 8 Skill Cards Grid (4 columns on lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 pt-2">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group bg-white border border-[#F3E7DB] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#D97706]/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D97706]/10"
            >
              <div>
                {/* Column Header */}
                <div className="flex items-center gap-3.5 pb-6 border-b border-[#F3E7DB]">
                  {/* Icon Badge */}
                  <div className="w-11 h-11 rounded-lg bg-[#FAF5EE] border border-[#EEDECB] flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#FFF3E5] group-hover:border-[#D97706]/30">
                    {cat.icon}
                  </div>

                  <div>
                    <h3
                      className="text-lg sm:text-xl font-black text-[#3b1400] leading-snug tracking-tight font-orbitron group-hover:text-[#D97706] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                    >
                      {cat.title}
                    </h3>
                    <p
                      className="text-[11px] font-bold text-[#3b1400] uppercase tracking-wider mt-0.5"
                      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                    >
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skill Items Rows */}
                <div className="space-y-2.5 mt-6">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#F3E9DF] flex items-center gap-3 transition-all duration-200 hover:bg-[#FFF8F0] hover:border-[#D97706]/30"
                    >
                      {/* Checkmark Icon */}
                      <svg
                        className="w-4 h-4 text-[#D97706] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>

                      {/* Skill Name */}
                      <span
                        className="text-xs sm:text-sm font-semibold text-[#3b1400]"
                        style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                      >
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
