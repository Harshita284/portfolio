"use client";

import React, { useState } from "react";

interface CallToActionProps {
  email?: string;
}

export default function CallToAction({
  email = "harshita.sh2202@gmail.com",
}: CallToActionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cta" className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 py-8 sm:py-12">
      <div className="w-full bg-[#231106] border border-[#52270D] rounded-2xl p-10 sm:p-16 lg:p-20 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
          {/* Main Heading */}
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
          >
            Ready to build <br className="hidden sm:inline" />
            <span className="text-[#D97706]">something great?</span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base text-[#D4B39D] max-w-xl mx-auto leading-relaxed font-normal"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            I'm available for freelance work and full-time opportunities. Let's turn your vision into a high-performance reality.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {/* Start a Conversation Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-sm sm:text-base rounded-lg shadow-lg shadow-[#D97706]/20 transition-all duration-300"
              style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
            >
              <span>Start a Conversation</span>
              <svg className="w-4 h-4 text-white transform rotate-45" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </a>

            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#170a03] hover:bg-[#2e1507] border border-[#52270D] text-white font-bold text-sm sm:text-base rounded-lg transition-all duration-300"
              style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <span>Copy Email</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
