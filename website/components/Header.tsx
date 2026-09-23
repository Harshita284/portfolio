"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  FaGlobe,
  FaRocket,
  FaBolt,
  FaDatabase,
  FaServer,
  FaCode,
  FaLayerGroup,
  FaShieldHalved,
  FaArrowRight
} from "react-icons/fa6";

interface HeaderProps {
  logoText?: string;
  activePath?: string;
}

export default function Header({ logoText = "HARSHITA", activePath }: HeaderProps) {
  const pathname = usePathname() || "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Dynamically determine active nav item based on URL pathname
  const getActiveItem = () => {
    if (activePath) return activePath;
    if (pathname.startsWith("/expertise")) return "Expertise";
    if (pathname.startsWith("/projects")) return "Projects";
    if (pathname.startsWith("/blog")) return "Blog";
    if (pathname.startsWith("/contact")) return "Contact";
    return "Home";
  };

  const activeItem = getActiveItem();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "Expertise", href: "/#about", hasDropdown: true },
    { name: "Projects", href: "/projects", hasDropdown: false },
    { name: "Blog", href: "/blog", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false }
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full pointer-events-none"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div
        className="pointer-events-auto bg-white border flex items-center justify-between relative border-amber-900/10"
        style={{
          width: isScrolled ? "100%" : "calc(100% - 3rem)",
          maxWidth: isScrolled ? "100%" : "72rem",
          marginTop: isScrolled ? "0px" : "1.25rem",
          padding: isScrolled ? "10px 48px" : "12px 32px",
          borderRadius: "0px",
          boxShadow: isScrolled ? "0 10px 30px rgba(0,0,0,0.08)" : "0 4px 20px rgba(0,0,0,0.05)",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        }}
      >
        {/* Logo Section */}
        <a
          href="#"
          className="flex items-center gap-2.5 sm:gap-3 group text-decoration-none select-none"
        >
          {/* Custom Circular Logo Image */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-amber-500/40 shadow-sm group-hover:border-amber-500 transition-colors flex-shrink-0 bg-white">
            <img
              src="/logo.jpg"
              alt="Harshita Sharma Logo"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Logo Name Text - Orbitron Font Specifically for HARSHITA */}
          <span
            className="font-extrabold text-base sm:text-lg tracking-wider text-[#2D1E18] uppercase"
            style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
          >
            {logoText}
          </span>
        </a>

        {/* Right Section: Navigation Links + Vertical Divider + CTA Button */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-1.5 lg:gap-3">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              const isDropdownOpen = activeDropdown === item.name;

              return (
                <div
                  key={item.name}
                  className="relative py-1"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                >
                  <a
                    href={item.href}
                    className="hover:text-[#D97706]"
                    style={{
                      padding: "10px 24px",
                      borderRadius: "0px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: isActive || isDropdownOpen ? "#D97706" : "#703513",
                      fontWeight: 600,
                      fontSize: "0.92rem",
                      textDecoration: "none",
                      transition: "0.3s",
                      background: isActive || isDropdownOpen ? "rgba(217, 119, 6, 0.05)" : "transparent",
                      border: isActive || isDropdownOpen ? "1px solid #D97706" : "1px solid transparent",
                      position: "relative",
                      fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    }}
                  >
                    {item.name}

                    {item.hasDropdown && (
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180 text-[#D97706]" : "text-[#703513]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Thin Vertical Separator Line */}
          <div className="w-px h-6 bg-amber-900/15 mx-2 hidden lg:block"></div>

          {/* Right Action CTA Button */}
          <a
            href="/contact"
            className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center gap-2 active:scale-[0.98]"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            {/* Mail Icon */}
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>LET'S TALK</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#3D271D] hover:text-[#D97706] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mega Dropdown Panel for Expertise (100% MERN Stack Focused) */}
      {activeDropdown === "Expertise" && (
        <div
          className="pointer-events-auto w-full mt-0 -mt-px bg-white border border-t-0 border-amber-900/10 shadow-2xl p-8 animate-in fade-in slide-in-from-top-1 duration-200 text-[#1C1917]"
          onMouseEnter={() => setActiveDropdown("Expertise")}
          onMouseLeave={() => setActiveDropdown(null)}
          style={{
            width: isScrolled ? "100%" : "calc(100% - 3rem)",
            maxWidth: isScrolled ? "100%" : "72rem",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Frontend Architecture (MERN Frontend) */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706] mb-6 font-orbitron flex items-center gap-2">
                <span className="text-[#D97706] font-bold text-sm">|</span>
                <span>FRONTEND ARCHITECTURE</span>
              </h4>
              <div className="space-y-4">
                <a
                  href="/expertise/react-nextjs"
                  className="flex items-center gap-3.5 group p-2 hover:bg-[#FAF6F0]/60 transition-all rounded-sm cursor-pointer"
                >
                  <div className="w-11 h-11 bg-[#FAF6F0] border border-amber-900/10 flex items-center justify-center text-[#D97706] flex-shrink-0 rounded-sm group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <FaGlobe className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-[#2D1E18] group-hover:text-[#D97706] transition-colors font-poppins">
                      React &amp; Next.js
                    </h5>
                    <p className="text-xs text-[#703513]/75 font-medium mt-0.5">Modern UI &amp; SSR Apps</p>
                  </div>
                </a>

                <a
                  href="/expertise/three-js"
                  className="flex items-center gap-3.5 group p-2 hover:bg-[#FAF6F0]/60 transition-all rounded-sm cursor-pointer"
                >
                  <div className="w-11 h-11 bg-[#FAF6F0] border border-amber-900/10 flex items-center justify-center text-[#D97706] flex-shrink-0 rounded-sm group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <FaRocket className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-[#2D1E18] group-hover:text-[#D97706] transition-colors font-poppins">
                      Three.js &amp; R3F
                    </h5>
                    <p className="text-xs text-[#703513]/75 font-medium mt-0.5">3D Interactive Engines</p>
                  </div>
                </a>

                <a
                  href="/expertise/react-nextjs"
                  className="flex items-center gap-3.5 group p-2 hover:bg-[#FAF6F0]/60 transition-all rounded-sm cursor-pointer"
                >
                  <div className="w-11 h-11 bg-[#FAF6F0] border border-amber-900/10 flex items-center justify-center text-[#D97706] flex-shrink-0 rounded-sm group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <FaLayerGroup className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-[#2D1E18] group-hover:text-[#D97706] transition-colors font-poppins">
                      Redux &amp; State Systems
                    </h5>
                    <p className="text-xs text-[#703513]/75 font-medium mt-0.5">Global State &amp; Toolkit</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Column 2: Backend & API Engineering (MERN Backend) */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706] mb-6 font-orbitron flex items-center gap-2">
                <span className="text-[#D97706] font-bold text-sm">|</span>
                <span>BACKEND &amp; API ENGINEERING</span>
              </h4>
              <div className="space-y-4">
                <a
                  href="/expertise/node-js"
                  className="flex items-center gap-3.5 group p-2 hover:bg-[#FAF6F0]/60 transition-all rounded-sm cursor-pointer"
                >
                  <div className="w-11 h-11 bg-[#FAF6F0] border border-amber-900/10 flex items-center justify-center text-[#D97706] font-mono font-bold text-sm flex-shrink-0 rounded-sm group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    &gt;_
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-[#2D1E18] group-hover:text-[#D97706] transition-colors font-poppins">
                      Node.js &amp; Express
                    </h5>
                    <p className="text-xs text-[#703513]/75 font-medium mt-0.5">Scalable Server Architecture</p>
                  </div>
                </a>

                <a
                  href="/expertise/mongodb"
                  className="flex items-center gap-3.5 group p-2 hover:bg-[#FAF6F0]/60 transition-all rounded-sm cursor-pointer"
                >
                  <div className="w-11 h-11 bg-[#FAF6F0] border border-amber-900/10 flex items-center justify-center text-[#D97706] flex-shrink-0 rounded-sm group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <FaDatabase className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-[#2D1E18] group-hover:text-[#D97706] transition-colors font-poppins">
                      MongoDB Database
                    </h5>
                    <p className="text-xs text-[#703513]/75 font-medium mt-0.5">NoSQL Data &amp; Schemas</p>
                  </div>
                </a>

                <a
                  href="/expertise/express-js"
                  className="flex items-center gap-3.5 group p-2 hover:bg-[#FAF6F0]/60 transition-all rounded-sm cursor-pointer"
                >
                  <div className="w-11 h-11 bg-[#FAF6F0] border border-amber-900/10 flex items-center justify-center text-[#D97706] flex-shrink-0 rounded-sm group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <FaServer className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-[#2D1E18] group-hover:text-[#D97706] transition-colors font-poppins">
                      RESTful APIs &amp; Auth
                    </h5>
                    <p className="text-xs text-[#703513]/75 font-medium mt-0.5">JWT &amp; Security Protocols</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Column 3: Fullstack MERN Suite */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706] mb-6 font-orbitron flex items-center gap-2">
                <span className="text-[#D97706] font-bold text-sm">|</span>
                <span>FULLSTACK MERN SUITE</span>
              </h4>
              <div className="space-y-4">
                <a
                  href="/expertise/mern-stack"
                  className="flex items-center gap-3.5 group p-2 hover:bg-[#FAF6F0]/60 transition-all rounded-sm cursor-pointer"
                >
                  <div className="w-11 h-11 bg-[#FAF6F0] border border-amber-900/10 flex items-center justify-center text-[#D97706] flex-shrink-0 rounded-sm group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <FaCode className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-[#2D1E18] group-hover:text-[#D97706] transition-colors font-poppins">
                      Complete MERN Stack
                    </h5>
                    <p className="text-xs text-[#703513]/75 font-medium mt-0.5">End-to-End MERN Apps</p>
                  </div>
                </a>

                <a
                  href="/expertise/typescript"
                  className="flex items-center gap-3.5 group p-2 hover:bg-[#FAF6F0]/60 transition-all rounded-sm cursor-pointer"
                >
                  <div className="w-11 h-11 bg-[#FAF6F0] border border-amber-900/10 flex items-center justify-center text-[#D97706] flex-shrink-0 rounded-sm group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <FaShieldHalved className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-[#2D1E18] group-hover:text-[#D97706] transition-colors font-poppins">
                      TypeScript Systems
                    </h5>
                    <p className="text-xs text-[#703513]/75 font-medium mt-0.5">End-to-End Type Safety</p>
                  </div>
                </a>

                <a
                  href="/expertise/system-architecture"
                  className="flex items-center gap-3.5 group p-2 hover:bg-[#FAF6F0]/60 transition-all rounded-sm cursor-pointer"
                >
                  <div className="w-11 h-11 bg-[#FAF6F0] border border-amber-900/10 flex items-center justify-center text-[#D97706] flex-shrink-0 rounded-sm group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <FaBolt className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-[#2D1E18] group-hover:text-[#D97706] transition-colors font-poppins">
                      System Architecture
                    </h5>
                    <p className="text-xs text-[#703513]/75 font-medium mt-0.5">High Performance Patterns</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Banner Strip */}
          <div className="border-t border-amber-900/10 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-semibold text-[#703513]/80">
              Pushing the boundaries of what's possible in the MERN web ecosystem.
            </p>
            <a
              href="/projects"
              className="px-5 py-2.5 bg-[#FAF6F0] hover:bg-[#D97706] hover:text-white text-[#D97706] font-bold text-xs tracking-wide transition-all border border-amber-600/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Projects</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}



      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden pointer-events-auto w-full bg-white border-b border-amber-900/15 shadow-xl p-5 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "0px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: isActive ? "#D97706" : "#6b2e0a",
                    fontWeight: 700,
                    fontSize: "0.98rem",
                    textDecoration: "none",
                    transition: "0.3s",
                    background: isActive ? "rgba(217, 119, 6, 0.05)" : "transparent",
                    border: isActive ? "1px solid #D97706" : "1px solid transparent",
                    position: "relative",
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  }}
                >
                  {item.name}
                </a>
              );
            })}
            <a
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 w-full px-5 py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2"
              style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>LET'S TALK</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
