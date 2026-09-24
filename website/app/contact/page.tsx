"use client";

import React, { useState, FormEvent } from "react";
import { FaLinkedinIn, FaGithub, FaPaperPlane, FaUpRightFromSquare } from "react-icons/fa6";
import CommonQuestions from "@/components/CommonQuestions";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5005";

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      const names = Array.from(files).map((f) => f.name);
      setFileNames(names);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitStatus({ type: "error", text: "Please fill in all required fields (Name, Email, Message)." });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    let fullMsg = message.trim();
    if (subject.trim()) {
      fullMsg = `[Subject: ${subject.trim()}]\n${fullMsg}`;
    }
    if (fileNames.length > 0) {
      fullMsg = `${fullMsg}\n\n[Attachments: ${fileNames.join(", ")}]`;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: fullMsg,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && (data?.success !== false)) {
        setSubmitStatus({
          type: "success",
          text: data?.message || "Thank you! Your message has been sent successfully. Harshita will get back to you shortly.",
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setFileNames([]);
      } else {
        setSubmitStatus({
          type: "error",
          text: data?.message || "Failed to transmit message. Please ensure backend server is online or email directly.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        text: "Network error. Please verify backend connection or email directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "What's your typical project timeline?",
      a: "Most web applications and portfolio builds take between 2 to 6 weeks, depending on complexity, feature scope, and feedback cycles.",
    },
    {
      q: "Do you work with international clients?",
      a: "Yes! I collaborate with clients globally across North America, Europe, and Asia using async updates, Loom demos, and flexible communication hours.",
    },
    {
      q: "What tech stack do you specialize in?",
      a: "My core expertise lies in the MERN Stack (MongoDB, Express.js, React, Node.js), Next.js 15 App Router, TypeScript, Tailwind CSS, and Three.js 3D web graphics.",
    },
    {
      q: "How do we get started on a new project?",
      a: "Simply fill out the contact form on this page or email me directly at harshita.sh2202@gmail.com with your project brief. I'll schedule a discovery call within 24 hours!",
    },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen text-[#2D1E18]">
      <main className="pt-8 pb-20 max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 space-y-20">
        {/* Top Hero Banner matching reference screenshot */}
        <div className="relative text-center space-y-5 max-w-3xl mx-auto border-b border-amber-900/10 pb-12 pt-4">
          {/* Subtle Warm Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-amber-900/10 shadow-xs text-[#D97706] text-xs font-bold font-poppins rounded-full uppercase tracking-wider">
            <span>✨</span>
            <span>GET IN TOUCH</span>
          </div>

          <h1
            className="relative z-10 text-4xl sm:text-6xl font-black text-[#2D1E18] tracking-tight leading-tight uppercase"
            style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
          >
            Let's Build Something <span className="text-[#D97706]">Great</span>
          </h1>

          <p
            className="relative z-10 text-base sm:text-lg text-[#703513] font-normal max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
          </p>
        </div>

        {/* Main Split Section: Left Info / Right Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-amber-900/10 shadow-xs rounded-full">
                <span className="text-amber-600 text-xs">✨</span>
                <span
                  className="text-[11px] font-bold uppercase tracking-widest text-amber-800"
                  style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                >
                  CONTACT
                </span>
              </div>

              <h2
                className="text-4xl sm:text-5xl font-black text-[#2D1E18] tracking-tight leading-[1.1] uppercase"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                Let's build <br />
                <span className="text-[#D97706]">something great.</span>
              </h2>

              <p
                className="text-sm text-[#703513] leading-relaxed max-w-md font-normal"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                Available for freelance work, full-time engineering roles, and high-impact digital opportunities. Let's turn your vision into a high-performance reality.
              </p>
            </div>

            {/* Direct Contact Details Rows */}
            <div className="space-y-5 pt-2">
              {/* Email Card */}
              <div className="flex items-center gap-4 py-1 group">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] flex items-center justify-center text-[#D97706] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider text-[#703513] block"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    EMAIL ME
                  </span>
                  <a
                    href="mailto:harshita.sh2202@gmail.com"
                    className="block font-bold text-sm sm:text-base text-[#2D1E18] hover:text-[#D97706] transition-colors"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    harshita.sh2202@gmail.com
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 py-1 group">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] flex items-center justify-center text-[#D97706] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider text-[#703513] block"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    LOCATION
                  </span>
                  <p
                    className="font-bold text-sm sm:text-base text-[#2D1E18]"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    Gurugram, Haryana
                  </p>
                </div>
              </div>

              {/* Call Me Card */}
              <div className="flex items-center gap-4 py-1 group">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] flex items-center justify-center text-[#D97706] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider text-[#703513] block"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    CALL ME
                  </span>
                  <a
                    href="tel:+918168562974"
                    className="block font-bold text-sm sm:text-base text-[#2D1E18] hover:text-[#D97706] transition-colors"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    +91 8168562974
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Status Pill Badge */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-amber-900/10 shadow-xs rounded-full">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span
                    className="text-xs font-bold text-[#2D1E18]"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    Available for Freelance &amp; Full-time
                  </span>
                </div>
                <span className="text-amber-900/20">|</span>
                <a
                  href="#contact-form"
                  className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                >
                  WORK WITH ME <span className="text-[10px]">⚡</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div id="contact-form" className="lg:col-span-7 bg-white border border-amber-900/15 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            {submitStatus && (
              <div
                className={`p-4 rounded-xl text-xs font-bold ${submitStatus.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-600/30 text-emerald-800"
                    : "bg-rose-500/10 border border-rose-600/30 text-rose-800"
                  }`}
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                {submitStatus.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#3D271D]"
                    style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                  >
                    FULL NAME
                  </label>
                  <div className="relative">
                    <svg className="w-4 h-4 text-amber-900/50 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#FAF6F0] border border-amber-900/15 rounded-2xl text-xs sm:text-sm font-medium text-[#2D1E18] focus:outline-none focus:border-[#D97706] focus:bg-white transition-all placeholder:text-amber-900/50"
                      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#3D271D]"
                    style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                  >
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <svg className="w-4 h-4 text-amber-900/50 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#FAF6F0] border border-amber-900/15 rounded-2xl text-xs sm:text-sm font-medium text-[#2D1E18] focus:outline-none focus:border-[#D97706] focus:bg-white transition-all placeholder:text-amber-900/50"
                      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: File Attachment Optional with Drag & Drop */}
              <div className="space-y-2">
                <label
                  className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#3D271D]"
                  style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                >
                  ATTACHMENTS (OPTIONAL)
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-4 transition-all text-center cursor-pointer ${isDragging
                      ? "border-[#D97706] bg-[#D97706]/10 scale-[1.01]"
                      : "border-amber-900/20 bg-[#FAF6F0] hover:border-[#D97706] hover:bg-white"
                    }`}
                >
                  <input
                    type="file"
                    id="contact-file-upload"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="contact-file-upload" className="cursor-pointer block w-full h-full">
                    <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
                      <svg className="w-6 h-6 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      {fileNames.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                          {fileNames.map((fn, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-white border border-amber-900/15 rounded-lg text-xs font-bold text-[#2D1E18] shadow-xs">
                              📎 {fn}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <>
                          <p
                            className="text-xs sm:text-sm font-bold text-[#2D1E18]"
                            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                          >
                            Drag & drop files here or <span className="text-[#D97706] underline">browse</span>
                          </p>
                          <p
                            className="text-[11px] font-medium text-[#703513]/70"
                            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                          >
                            Supports Images, PDF, ZIP (Multiple files allowed)
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Row 3: Subject */}
              <div className="space-y-2">
                <label
                  className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#3D271D]"
                  style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                >
                  SUBJECT
                </label>
                <div className="relative">
                  <svg className="w-4 h-4 text-amber-900/50 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Hiring"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-[#FAF6F0] border border-amber-900/15 rounded-2xl text-xs sm:text-sm font-medium text-[#2D1E18] focus:outline-none focus:border-[#D97706] focus:bg-white transition-all placeholder:text-amber-900/50"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  />
                </div>
              </div>

              {/* Row 4: Your Message */}
              <div className="space-y-2">
                <label
                  className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#3D271D]"
                  style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                >
                  YOUR MESSAGE
                </label>
                <div className="relative">
                  <svg className="w-4 h-4 text-amber-900/50 absolute left-4 top-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-[#FAF6F0] border border-amber-900/15 rounded-2xl text-xs sm:text-sm font-medium text-[#2D1E18] focus:outline-none focus:border-[#D97706] focus:bg-white transition-all placeholder:text-amber-900/50 resize-none"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  />
                </div>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md shadow-[#D97706]/20 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 mt-2"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                <span>{isSubmitting ? "SENDING..." : "SEND MESSAGE"}</span>
                <svg className="w-4 h-4 text-white transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13" strokeWidth="2.5" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" strokeWidth="2.5" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* "Connect Everywhere" Social Cards Row */}
        <div className="border-t border-amber-900/10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-4 space-y-3">
              <h2
                className="text-3xl sm:text-4xl font-black text-[#2D1E18] tracking-tight uppercase leading-tight"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                Connect <br />
                <span className="text-[#D97706]">Everywhere</span>
              </h2>
              <p
                className="text-xs sm:text-sm text-[#703513] leading-relaxed max-w-sm"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                I'm active across various platforms. Feel free to follow my work, star my repositories, or send a direct message for a quick chat.
              </p>
            </div>

            {/* Right 3 Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/in/harshita-sharma-b44548346/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF6F0] border border-amber-900/10 rounded-3xl p-6 flex flex-col justify-between h-[180px] hover:border-[#D97706] hover:shadow-lg transition-all group"
              >
                <div>
                  <FaLinkedinIn className="w-6 h-6 text-[#0A66C2]" />
                </div>
                <div className="space-y-0.5">
                  <h3
                    className="font-bold text-base text-[#2D1E18] group-hover:text-[#D97706] transition-colors"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    LinkedIn
                  </h3>
                  <p className="text-xs text-[#703513]/70 font-medium">@harshitasharma</p>
                </div>
                <div>
                  <FaUpRightFromSquare className="w-3.5 h-3.5 text-stone-400/70 group-hover:text-[#D97706] transition-colors" />
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href="https://github.com/Harshita284"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF6F0] border border-amber-900/10 rounded-3xl p-6 flex flex-col justify-between h-[180px] hover:border-[#D97706] hover:shadow-lg transition-all group"
              >
                <div>
                  <FaGithub className="w-6 h-6 text-[#2D1E18]" />
                </div>
                <div className="space-y-0.5">
                  <h3
                    className="font-bold text-base text-[#2D1E18] group-hover:text-[#D97706] transition-colors"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    GitHub
                  </h3>
                  <p className="text-xs text-[#703513]/70 font-medium">@Harshita284</p>
                </div>
                <div>
                  <FaUpRightFromSquare className="w-3.5 h-3.5 text-stone-400/70 group-hover:text-[#D97706] transition-colors" />
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:harshita.sh2202@gmail.com"
                className="bg-[#FAF6F0] border border-amber-900/10 rounded-3xl p-6 flex flex-col justify-between h-[180px] hover:border-[#D97706] hover:shadow-lg transition-all group"
              >
                <div>
                  <FaPaperPlane className="w-6 h-6 text-[#D97706]" />
                </div>
                <div className="space-y-0.5">
                  <h3
                    className="font-bold text-base text-[#2D1E18] group-hover:text-[#D97706] transition-colors"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    Email
                  </h3>
                  <p className="text-xs text-[#703513]/70 font-medium truncate">harshita.sh2202@gmail.com</p>
                </div>
                <div>
                  <FaUpRightFromSquare className="w-3.5 h-3.5 text-stone-400/70 group-hover:text-[#D97706] transition-colors" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Common Questions (FAQ) Section */}
        <div className="border-t border-amber-900/10 pt-8">
          <CommonQuestions />
        </div>
      </main>
    </div>
  );
}
