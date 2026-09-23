"use client";

import React from "react";

export interface QuestionItem {
  icon: React.ReactNode;
  question: string;
  answer: string;
}

const defaultQuestions: QuestionItem[] = [
  {
    question: "What is your typical project timeline?",
    answer: "Most projects take between 2-6 weeks depending on complexity and requirements.",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, I work with clients globally using remote collaboration tools and clear communication.",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    question: "What are your primary technologies?",
    answer: "I specialize in the MERN stack (MongoDB, Express, React, Node) and Next.js for high-performance apps.",
    icon: (
      <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    question: "How do you handle project pricing?",
    answer: "Pricing is project-based, tailored to the specific scope and goals of your business.",
    icon: (
      <span className="text-base font-extrabold text-[#D97706] font-mono">$</span>
    ),
  },
];

interface CommonQuestionsProps {
  questions?: QuestionItem[];
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
}

export default function CommonQuestions({
  questions = defaultQuestions,
  titlePrefix = "Common ",
  titleHighlight = "Questions",
  subtitle = "Everything you need to know before we start working together.",
}: CommonQuestionsProps) {
  return (
    <section id="faqs" className="w-full py-16">
      <div className="max-w-[1360px] mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-2.5">
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight text-[#2D1E18] uppercase"
            style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
          >
            {titlePrefix}
            <span className="text-[#D97706]">{titleHighlight}</span>
          </h2>

          <p
            className="text-xs sm:text-sm text-[#703513] max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            {subtitle}
          </p>
        </div>

        {/* 4 Cards Grid Layout (3 in Row 1, 1 in Row 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="bg-white border border-amber-900/10 rounded-3xl p-7 flex flex-col justify-between space-y-4 hover:border-[#D97706]/40 transition-all shadow-xs"
            >
              <div className="space-y-3">
                {/* Icon */}
                <div className="flex items-center text-[#D97706]">
                  {q.icon}
                </div>

                {/* Question */}
                <h3
                  className="text-base font-bold text-[#2D1E18] leading-snug tracking-tight"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  {q.question}
                </h3>

                {/* Answer */}
                <p
                  className="text-xs sm:text-[13px] text-[#703513] leading-relaxed"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  {q.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
