"use client";

import React, { useState } from "react";
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "harshita.sh2202@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const techStack = [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Apache Kafka",
    "Redis",
    "Tailwind CSS",
  ];

  return (
    <footer className="w-full bg-[#0a0502] text-white pt-16 pb-8 border-t border-amber-900/20 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
        {/* Top Giant Header Branding Section */}
        <div className="space-y-6">
          {/* Big Giant Name Banner matching reference screenshot */}
          <div
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-wider uppercase flex flex-wrap items-center gap-x-5 leading-none"
            style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
          >
            <span className="text-white">HARSHITA</span>
            <span
              style={{
                WebkitTextStroke: "2.5px #D97706",
                color: "transparent",
              }}
            >
              SHARMA
            </span>
          </div>

          {/* Tagline Paragraph */}
          <p
            className="text-sm sm:text-base text-stone-300 max-w-4xl leading-relaxed font-normal"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            Full Stack MERN &amp; Microservices Developer — crafting high-performance digital systems, event-driven pipelines, and scalable APIs from <strong className="text-[#D97706] font-bold">Gurugram, Haryana</strong>.
          </p>

          {/* Tech Stack Pills Row matching reference screenshot */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-sm bg-[#160d06] border border-amber-900/30 text-stone-300 text-xs font-bold tracking-wider uppercase transition-all hover:border-[#D97706] hover:text-[#D97706]"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-amber-900/20 my-8"></div>

        {/* Middle 4-Column Grid Section matching reference screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Column 1: Brand Logo, Tagline & Socials */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm overflow-hidden border border-amber-900/30 shadow-sm flex-shrink-0 bg-white flex items-center justify-center p-0.5">
                <img
                  src="/logo.jpg"
                  alt="Harshita Sharma Logo"
                  className="w-full h-full object-cover rounded-2xs"
                />
              </div>
              <span
                className="font-black text-base text-white tracking-widest uppercase"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                HARSHITA
              </span>
            </div>

            <p
              className="text-xs text-stone-400 leading-relaxed font-normal"
              style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
            >
              Building products that perform at the intersection of engineering precision and creative design.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2 pt-1">
              {/* GitHub */}
              <a
                href="https://github.com/Harshita284"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-sm bg-[#160d06] border border-amber-900/30 flex items-center justify-center text-stone-400 hover:text-[#D97706] hover:border-[#D97706] transition-colors cursor-pointer"
              >
                <FaGithub className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/harshita-sharma-b44548346/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-sm bg-[#160d06] border border-amber-900/30 flex items-center justify-center text-stone-400 hover:text-[#D97706] hover:border-[#D97706] transition-colors cursor-pointer"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-sm bg-[#160d06] border border-amber-900/30 flex items-center justify-center text-stone-400 hover:text-[#D97706] hover:border-[#D97706] transition-colors cursor-pointer"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-sm bg-[#160d06] border border-amber-900/30 flex items-center justify-center text-stone-400 hover:text-[#D97706] hover:border-[#D97706] transition-colors cursor-pointer"
              >
                <FaEnvelope className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: NAVIGATE */}
          <div className="space-y-4">
            <h4
              className="text-xs font-black tracking-widest text-white uppercase"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              NAVIGATE
            </h4>
            <ul
              className="space-y-2.5 text-xs text-stone-300"
              style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
            >
              <li><a href="/" className="hover:text-[#D97706] transition-colors flex items-center gap-2 cursor-pointer"><span className="text-[#D97706] font-mono font-bold">›</span> Home</a></li>
              <li><a href="#about" className="hover:text-[#D97706] transition-colors flex items-center gap-2 cursor-pointer"><span className="text-[#D97706] font-mono font-bold">›</span> About</a></li>
              <li><a href="#projects" className="hover:text-[#D97706] transition-colors flex items-center gap-2 cursor-pointer"><span className="text-[#D97706] font-mono font-bold">›</span> Projects</a></li>
              <li><a href="/blog" className="hover:text-[#D97706] transition-colors flex items-center gap-2 cursor-pointer"><span className="text-[#D97706] font-mono font-bold">›</span> Blog</a></li>
              <li><a href="/contact" className="hover:text-[#D97706] transition-colors flex items-center gap-2 cursor-pointer"><span className="text-[#D97706] font-mono font-bold">›</span> Contact</a></li>
            </ul>
          </div>

          {/* Column 3: EXPERTISE */}
          <div className="space-y-4">
            <h4
              className="text-xs font-black tracking-widest text-white uppercase"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              EXPERTISE
            </h4>
            <ul
              className="space-y-2.5 text-xs text-stone-300"
              style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
            >
              <li>
                <a href="/expertise/react-nextjs" className="hover:text-[#D97706] hover:translate-x-1 transition-all flex items-center gap-2 cursor-pointer">
                  <span className="text-[#D97706] font-mono font-bold">›</span> React &amp; Next.js
                </a>
              </li>
              <li>
                <a href="/expertise/react-nextjs" className="hover:text-[#D97706] hover:translate-x-1 transition-all flex items-center gap-2 cursor-pointer">
                  <span className="text-[#D97706] font-mono font-bold">›</span> Three.js / R3F
                </a>
              </li>
              <li>
                <a href="/expertise/node-js" className="hover:text-[#D97706] hover:translate-x-1 transition-all flex items-center gap-2 cursor-pointer">
                  <span className="text-[#D97706] font-mono font-bold">›</span> Node &amp; Express
                </a>
              </li>
              <li>
                <a href="/expertise/mongodb" className="hover:text-[#D97706] hover:translate-x-1 transition-all flex items-center gap-2 cursor-pointer">
                  <span className="text-[#D97706] font-mono font-bold">›</span> MongoDB
                </a>
              </li>
              <li>
                <a href="/expertise/system-architecture" className="hover:text-[#D97706] hover:translate-x-1 transition-all flex items-center gap-2 cursor-pointer">
                  <span className="text-[#D97706] font-mono font-bold">›</span> UI/UX Design
                </a>
              </li>
              <li>
                <a href="/expertise/system-architecture" className="hover:text-[#D97706] hover:translate-x-1 transition-all flex items-center gap-2 cursor-pointer">
                  <span className="text-[#D97706] font-mono font-bold">›</span> Docker / CI-CD
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: LET'S WORK */}
          <div className="space-y-4">
            <h4
              className="text-xs font-black tracking-widest text-white uppercase"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              LET'S WORK
            </h4>
            <p
              className="text-xs text-stone-400 leading-relaxed font-normal"
              style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
            >
              Have a project in mind? I'm available for freelance and full-time opportunities.
            </p>

            {/* Interactive Email Box */}
            <div
              onClick={handleCopyEmail}
              className="w-full px-3.5 py-3 rounded-sm bg-[#160d06] border border-amber-900/30 text-xs font-medium text-[#D97706] flex items-center justify-between cursor-pointer hover:border-[#D97706] transition-colors"
              style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
            >
              <div className="flex items-center gap-2 overflow-hidden truncate">
                <FaEnvelope className="w-3.5 h-3.5 flex-shrink-0 text-[#D97706]" />
                <span className="truncate font-semibold text-[#D97706]">{email}</span>
              </div>
              <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider flex-shrink-0 ml-1">
                {copied ? "COPIED!" : ""}
              </span>
            </div>

            {/* Action HIRE ME Button */}
            <a
              href={`mailto:${email}`}
              className="w-full py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xs uppercase tracking-widest rounded-sm transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-[#D97706]/20"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              <span>⚡ HIRE ME</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

        {/* Bottom SEO & Copyright Bar */}
        <div className="pt-8 border-t border-amber-900/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
            &copy; {new Date().getFullYear()} <strong className="text-white font-bold" style={{ fontFamily: "var(--font-orbitron)" }}>HARSHITA SHARMA</strong> &bull; Crafted with <span className="text-[#D97706]">⚡</span> in Gurugram, Haryana
          </div>

          <div className="flex items-center gap-2 text-[11px]" style={{ fontFamily: "var(--font-poppins)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-medium">All systems operational</span>
          </div>

          <button
            onClick={scrollToTop}
            className="px-3.5 py-1.5 rounded-sm bg-[#160d06] border border-amber-900/30 hover:border-[#D97706] text-stone-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>&uarr; TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
