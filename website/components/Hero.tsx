"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 md:px-14 pt-4 sm:pt-8 pb-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left Column: Text & Content */}
      <div className="lg:col-span-7 xl:col-span-8 space-y-6">
        {/* Location Tag */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#703513] tracking-wide" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
          <svg className="w-4 h-4 text-[#703513] fill-current" viewBox="0 0 24 24">
            <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 7 13 8 16 1-3 8-10.75 8-16 0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
          </svg>
          <span className="text-[#703513]">Gurugram, Haryana</span>
        </div>

        {/* Main Heading (Orbitron font for titles matching reference screenshot) */}
        <div className="space-y-2">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-[#3b1400] uppercase"
            style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
          >
            HI, I'M <span className="text-[#D97706]">HARSHITA</span>
          </h1>

          {/* Small horizontal accent block */}
          <div className="w-12 h-1 bg-[#3b1400] my-3"></div>

          <div className="space-y-1">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#D97706] uppercase inline-block border-b-2 border-[#D97706] pb-1"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              EXPERT MERN STACK
            </h2>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#3b1400] uppercase"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              DEVELOPER.
            </h2>
          </div>
        </div>

        {/* Bio Paragraph */}
        <div className="pt-2 text-[#3b1400]" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
          <p
            style={{
              fontSize: "clamp(0.97rem, 2.2vw, 1.12rem)",
              marginBottom: "10px",
              lineHeight: 1.75,
              fontWeight: 450,
              opacity: 1,
              transform: "none",
              color: "#3b1400"
            }}
          >
            I'm a <strong className="text-[#3b1400] font-semibold">Full Stack Developer based in Gurugram, Haryana</strong> specializing in <strong className="text-[#3b1400] font-semibold">Node.js, Express.js, React.js, Next.js, PostgreSQL, MongoDB, and Apache Kafka</strong> to build high-performance products. I ship resilient web applications ranging from <strong className="text-[#3b1400] font-semibold">microservice architectures</strong> and <strong className="text-[#3b1400] font-semibold">event-driven communication pipelines</strong> to <strong className="text-[#3b1400] font-semibold">full-stack web platforms</strong>.
          </p>

          <p
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              marginBottom: "10px",
              lineHeight: 1.75,
              fontWeight: 500,
              color: "#3b1400"
            }}
          >
            Building secure, scalable distributed applications with seamless integrations (Razorpay, DigiLocker, Google Maps).
          </p>
        </div>

        {/* Tech Stack Tag Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            "React.js",
            "Next.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "PostgreSQL",
            "MySQL",
            "Apache Kafka",
            "Redis",
            "Tailwind CSS",
            "Postman",
          ].map((tech, idx) => (
            <span
              key={idx}
              className="px-4 py-1.5 text-xs font-bold bg-[#FAF6F0] text-[#703513] border border-amber-900/10 shadow-2xs rounded-full"
              style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons & Social Icons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link
            href="/projects"
            className="px-7 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold text-xs tracking-wider uppercase shadow-md transition-all flex items-center gap-2 active:scale-[0.98] rounded-full"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            <span>See My Work</span>
            <span className="text-sm">&rarr;</span>
          </Link>

          <Link
            href="/contact"
            className="px-7 py-3.5 border border-[#D97706] text-[#703513] bg-white hover:bg-amber-500/10 font-bold text-xs tracking-wider uppercase transition-all shadow-2xs rounded-full"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            Get in Touch
          </Link>

          {/* Social Icon Quick Links */}
          <div className="flex items-center gap-2 ml-1">
            <a
              href="https://github.com/Harshita284"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="w-11 h-11 border border-amber-900/15 bg-[#FAF6F0] flex items-center justify-center text-[#703513] hover:bg-[#D97706] hover:text-white transition-all shadow-2xs rounded-full"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/harshita-sharma-b44548346/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="w-11 h-11 border border-amber-900/15 bg-[#FAF6F0] flex items-center justify-center text-[#703513] hover:bg-[#D97706] hover:text-white transition-all shadow-2xs rounded-full"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Stats Grid matching reference image */}
        <div className="pt-3 flex flex-wrap items-center gap-8 sm:gap-10 border-t border-amber-900/10">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#D97706]" style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}>
              15+
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-[#703513] uppercase tracking-wider mt-1" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
              PROJECTS SHIPPED
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#D97706]" style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}>
              2+
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-[#703513] uppercase tracking-wider mt-1" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
              YEARS BUILDING
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#D97706]" style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}>
              9+
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-[#703513] uppercase tracking-wider mt-1" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
              TECH STACK
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Magazine Cover Frame Card */}
      <div className="lg:col-span-5 xl:col-span-4 w-full max-w-[440px] lg:max-w-[460px] mx-auto lg:ml-auto relative">
        <div className="relative p-3 bg-white border-2 border-amber-600/30 shadow-2xl space-y-4 rounded-[32px]">
          {/* Magazine Cover Container */}
          <div className="relative h-[460px] sm:h-[490px] w-full bg-[#1c140c] overflow-hidden flex items-center justify-center group rounded-[24px]">
            <Image
              src="/harshita.jpg"
              alt="Harshita Sharma — Fullstack MERN Developer"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30"></div>

            {/* Top Right Orange Badge: MERN FULL-STACK */}
            <div
              className="absolute top-4 right-4 bg-[#D97706] text-white px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-lg rounded-full"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              MERN FULL-STACK
            </div>

            {/* Magazine Title Overlay (HARSHITA) */}
            <div className="absolute bottom-22 sm:bottom-24 left-4 right-4 text-white text-center space-y-1.5 pointer-events-none">
              <h3
                className="text-3xl sm:text-4xl font-black tracking-widest uppercase text-[#FBBF24] drop-shadow-md"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                HARSHITA
              </h3>
              <p
                className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-100 drop-shadow-sm"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                FULLSTACK ENGINEER &amp; MERN ARCHITECT
              </p>
            </div>

            {/* Bottom Left Badge: 2+ YRS EXP. */}
            <div className="absolute bottom-3 left-3 bg-white text-[#3b1400] px-3.5 py-2 shadow-xl border border-amber-900/15 z-10 rounded-2xl">
              <div
                className="text-base font-black leading-none text-[#D97706]"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                2+
              </div>
              <div
                className="text-[9px] font-bold uppercase tracking-wider text-[#703513] mt-0.5"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                YRS EXP.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
