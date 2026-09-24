"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaArrowLeft,
  FaBolt,
  FaUpRightFromSquare,
  FaFolderOpen,
  FaCode,
  FaCircleCheck,
  FaLightbulb,
  FaCircleExclamation,
  FaCheck,
  FaLayerGroup,
  FaCalendarDays,
  FaUserCheck,
  FaTag,
  FaComments,
  FaHashtag
} from "react-icons/fa6";
import CallToAction from "@/components/CallToAction";

interface Project {
  id: string;
  slug?: string;
  title: string;
  tagline?: string;
  description: string;
  overview?: string;
  category: string;
  role?: string;
  year?: string;
  techStack: string[];
  keywords?: string[];
  highlights?: string[];
  architecture?: string;
  styling?: string;
  challenges?: { problem: string; solution: string }[];
  image?: string;
  images?: string[];
  link?: string;
  sourceCode?: string;
  featured?: boolean;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const idOrSlug = (params?.id as string) || "comfystride-3d-configurator";

  const [project, setProject] = useState<Project | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5005";

  useEffect(() => {
    fetchProjectDetail();
  }, [idOrSlug]);

  const galleryImages = (project?.images && project.images.length > 0)
    ? project.images
    : [project?.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"];

  // Automatic image slideshow timer
  useEffect(() => {
    if (!project || galleryImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [project, galleryImages.length]);

  const fetchProjectDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/projects/${idOrSlug}`);
      if (res.ok) {
        const data = await res.json();
        const p = data.data;
        if (p) {
          setProject(p);
          setCurrentImgIndex(0);
        } else {
          setFallbackProject();
        }
      } else {
        setFallbackProject();
      }
    } catch {
      setFallbackProject();
    } finally {
      setLoading(false);
    }
  };

  const setFallbackProject = () => {
    const fallback: Project = {
      id: "3",
      slug: "comfystride-3d-configurator",
      title: "ComfyStride 3D Configurator",
      tagline: "An Immersive 3D footwear customization engine utilizing Three.js and R3F for high-fidelity product interaction and real-time rendering.",
      description: "Solved complex GLTF compression and real-time texture mapping challenges. Engineered a dynamic state management system to handle hundreds of material combinations without compromising frame rates.",
      overview: "Solved complex GLTF compression and real-time texture mapping challenges. Engineered a dynamic state management system to handle hundreds of material combinations without compromising frame rates.\n\nDesigned with a 'mobile-first' approach and optimized for search engines, ComfyStride 3D Configurator showcases Harshita Sharma's expertise in bringing complex backend logic with immersive frontend interactivity.",
      category: "Enterprise Web App",
      role: "Fullstack Architect",
      year: "2026",
      techStack: ["React Three Fiber", "Three.js", "R3F", "Zustand", "Tailwind CSS"],
      keywords: ["3D WebGL", "React Three Fiber", "Customizer", "Zustand", "Tailwind CSS"],
      highlights: [
        "Interactive 3D model with real-time material rendering",
        "Custom texture UV mapping for hyper-fidelity lighting",
        "Dynamic state management with Zustand",
        "Fast Server View Animation for internal component mounting"
      ],
      architecture: "Full-stack React Three Fiber architecture with Zustand for state management and optimal rendering performance.",
      styling: "Vanilla CSS and Tailwind CSS for custom design system, responsive layout and fluid motion.",
      challenges: [
        {
          problem: "High memory usage on mobile devices due to large 3D assets.",
          solution: "Utilizing GLTF-Transform for mesh compression and texture resizing, reducing initial load size by 70%."
        },
        {
          problem: "Syncing 3D state with Next.js UI components without lag.",
          solution: "Implemented Zustand state updates decoupled from React re-renders to ensure silky-smooth 60fps interactions."
        }
      ],
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
      ],
      link: "https://adnix-demo.vercel.app",
      featured: true
    };
    setProject(fallback);
    setCurrentImgIndex(0);
  };

  if (loading) {
    return (
      <div
        className="w-full min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center font-poppins text-xs text-[#703513]"
        style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
      >
        Loading Project Case Study...
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className="w-full min-h-[70vh] bg-[#FAF8F5] flex flex-col items-center justify-center space-y-4"
        style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
      >
        <h2 className="text-xl font-bold text-[#2D1E18]">Project Not Found</h2>
        <Link
          href="/projects"
          className="px-5 py-2.5 bg-[#D97706] text-white font-bold text-xs uppercase tracking-wider rounded-full inline-flex items-center gap-2"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>Back to All Projects</span>
        </Link>
      </div>
    );
  }

  const defaultChallenges = [
    {
      problem: "High memory usage on mobile devices due to large 3D assets.",
      solution: "Utilizing GLTF-Transform for mesh compression and texture resizing, reducing initial load size by 70%."
    },
    {
      problem: "Syncing 3D state with Next.js UI components without lag.",
      solution: "Implemented Zustand state updates decoupled from React re-renders to ensure silky-smooth 60fps interactions."
    }
  ];

  const challengesList = (project.challenges && project.challenges.length > 0) ? project.challenges : defaultChallenges;

  return (
    <div
      className="w-full bg-[#FDFBF7] min-h-screen text-[#2D1E18]"
      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
    >
      <main className="pt-2 sm:pt-4 pb-16 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top 2-Column Hero Showcase matching exact reference mockup design */}
        <section className="pt-2 pb-8 mb-16 sm:mb-24 mt-4">
          {/* Top Breadcrumb Navigation (Shifted slightly right into target position) */}
          <div className="mb-8 sm:mb-12 pl-4 sm:pl-10 lg:pl-16">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-white hover:bg-[#FAF6F0] border-2 border-[#D97706]/40 hover:border-[#D97706] text-[#D97706] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              <FaArrowLeft className="w-3.5 h-3.5 text-[#D97706]" />
              <span>BACK TO PROJECTS</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (6 cols): Badge, Title, Description, Action Buttons */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              {/* Case Study Pill Badge */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF6F0] border border-[#D97706]/30 text-[#D97706] text-xs font-bold rounded-full uppercase tracking-wider shadow-2xs">
                  <FaBolt className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>PROJECT CASE STUDY</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-5 sm:space-y-6">
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3b1400] tracking-tight uppercase leading-tight"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  {project.title}
                </h1>

                <p
                  className="text-base sm:text-lg lg:text-xl text-[#703513] font-medium leading-relaxed"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  {project.tagline || project.description}
                </p>
              </div>

              {/* Action Buttons: Live Demo & Source Code */}
              <div className="flex flex-wrap items-center gap-4 pt-3 sm:pt-4">
                {project.link && project.link.trim() !== "" && project.link.trim() !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xs tracking-wider uppercase rounded-xl shadow-md transition-all inline-flex items-center gap-2.5 active:scale-95 cursor-pointer font-orbitron"
                  >
                    <span>View Live Demo</span>
                    <FaUpRightFromSquare className="w-3.5 h-3.5 text-white" />
                  </a>
                )}

                <a
                  href={project.sourceCode || "https://github.com/Harshita284"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 bg-white border-2 border-[#D97706] hover:bg-[#FAF6F0] text-[#D97706] font-black text-xs tracking-wider uppercase rounded-xl shadow-xs transition-all inline-flex items-center gap-2.5 active:scale-95 cursor-pointer font-orbitron"
                >
                  <span>Source Code</span>
                  <FaCode className="w-3.5 h-3.5 text-[#D97706]" />
                </a>
              </div>
            </div>

            {/* Right Column (7 cols): Full width Browser Frame Mockup Showcase Container */}
            <div className="lg:col-span-6 w-full">
              <div className="relative w-full bg-white border border-[#3b1400]/15 rounded-[7px] p-3 sm:p-4 shadow-xl overflow-hidden group">

                {/* Browser Window Header Bar */}
                <div className="flex items-center justify-between px-2 pb-2 border-b border-stone-100">
                  {/* Window Dots / Title */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                    </div>
                    <span className="text-[11px] font-mono text-stone-400 hidden sm:inline-block pl-2">
                      {project.slug || "project-preview"}
                    </span>
                  </div>

                  {/* Category Pill Badge on top right of window mockup */}
                  <div className="px-3 py-1 bg-[#D97706] text-white text-[10px] font-black uppercase tracking-wider font-orbitron shadow-xs rounded-full">
                    {project.category}
                  </div>
                </div>

                {/* Main Screenshot Box */}
                <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[370px] rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 mt-2">
                  <img
                    key={currentImgIndex}
                    src={galleryImages[currentImgIndex] || project.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"}
                    alt={`${project.title} screenshot ${currentImgIndex + 1}`}
                    className="w-full h-full object-cover object-top rounded-2xl transition-all duration-700 ease-in-out transform group-hover:scale-102"
                  />

                  {/* Slide Counter Overlay on image bottom left */}
                  {galleryImages.length > 0 && (
                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-xs font-extrabold font-mono rounded-full border border-white/20 shadow-md">
                      {currentImgIndex + 1} / {galleryImages.length}
                    </div>
                  )}
                </div>

                {/* Bottom Gallery Toolbar inside browser mockup: Indicator dots (left) & Thumbnails (right) */}
                <div className="flex items-center justify-between  gap-3 pt-3 px-1 mt-1 border-t border-stone-100">
                  {/* Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    {galleryImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImgIndex(idx)}
                        className={`rounded-full transition-all cursor-pointer ${currentImgIndex === idx
                            ? "w-6 h-2 bg-[#D97706]"
                            : "w-2.5 h-2.5 bg-amber-900/20 hover:bg-[#D97706]/50"
                          }`}
                        title={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Horizontal Thumbnail Cards Strip */}
                  {galleryImages.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto max-w-[65%] py-1 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {galleryImages.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImgIndex(idx)}
                          className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${currentImgIndex === idx
                              ? "border-[#D97706] ring-2 ring-[#D97706]/30 scale-105 shadow-sm"
                              : "border-stone-200 opacity-60 hover:opacity-100"
                            }`}
                        >
                          <img src={imgUrl} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover object-top" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column Lower Section: Project Overview & Technical Specs vs. Sidebar Stack Details */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-20 pt-4">

          {/* Left Column (9 Cols): Project Overview & Technical Implementation */}
          <div className="lg:col-span-9 space-y-12 sm:space-y-14">

            {/* Project Overview */}
            <div className="space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-sm bg-[#FAF6F0] border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0">
                  <FaFolderOpen className="w-3.5 h-3.5 text-[#D97706]" />
                </div>
                <h2
                  className="text-xl sm:text-2xl font-black text-[#3b1400] uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Project Overview
                </h2>
              </div>

              <div
                className="text-sm sm:text-base text-[#703513] leading-relaxed space-y-5 font-medium"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                {(project.overview || project.description).split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Technical Implementation */}
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-sm bg-[#FAF6F0] border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0 font-mono font-bold text-xs">
                  &lt;&gt;
                </div>
                <h2
                  className="text-xl sm:text-2xl font-black text-[#3b1400] uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Technical Implementation
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Architecture Card */}
                <div className="p-5 bg-transparent border border-amber-900/20 rounded-sm space-y-2 hover:border-[#D97706]/40 transition-all">
                  <h3
                    className="font-bold text-sm sm:text-base text-[#3b1400] uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                  >
                    Architecture
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-[#703513] leading-relaxed font-medium"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    {project.architecture || "Built using React Three Fiber for robust state management and optimal rendering performance."}
                  </p>
                </div>

                {/* Styling Card */}
                <div className="p-5 bg-transparent border border-amber-900/20 rounded-sm space-y-2 hover:border-[#D97706]/40 transition-all">
                  <h3
                    className="font-bold text-sm sm:text-base text-[#3b1400] uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                  >
                    Styling
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-[#703513] leading-relaxed font-medium"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    {project.styling || "Leveraged Tailwind CSS and Framer Motion for a fluid, responsive, and high-fidelity UI."}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features Section matching Image 1 */}
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-sm bg-[#FAF6F0] border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0">
                  <FaCircleCheck className="w-3.5 h-3.5 text-[#D97706]" />
                </div>
                <h2
                  className="text-xl sm:text-2xl font-black text-[#3b1400] uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Key Features
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 pt-1">
                {(project.highlights && project.highlights.length > 0
                  ? project.highlights
                  : [
                    "Interactive 3D model with real-time material swapping",
                    "Custom environment mapping for high-fidelity lighting",
                    "Dynamic state management with Zustand",
                    "Exploded view animation for internal component inspection"
                  ]
                ).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FAF6F0] border border-[#D97706]/40 flex items-center justify-center text-[#D97706] flex-shrink-0 mt-0.5">
                      <FaCircleCheck className="w-3 h-3 text-[#D97706]" />
                    </div>
                    <span
                      className="text-xs sm:text-sm font-medium text-[#703513] leading-relaxed"
                      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Challenges & Solutions Section (Matching Reference Image 2 exact design) */}
            {challengesList.length > 0 && (
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#FAF6F0] border border-[#D97706] flex items-center justify-center text-[#D97706] font-mono font-bold text-xs flex-shrink-0">
                    !
                  </div>
                  <h2
                    className="text-xl sm:text-2xl font-black text-[#3b1400] uppercase tracking-tight"
                    style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                  >
                    Challenges &amp; Solutions
                  </h2>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {challengesList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 bg-white border border-amber-900/10 border-l-4 border-l-[#D97706] rounded-2xl space-y-3.5 shadow-2xs"
                    >
                      {/* Problem Block */}
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider font-mono block">
                          THE PROBLEM
                        </span>
                        <p className="text-sm sm:text-base font-extrabold text-[#2D1E18]">
                          {item.problem}
                        </p>
                      </div>

                      {/* Solution Block */}
                      <div className="space-y-1 pt-1">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-mono block">
                          THE SOLUTION
                        </span>
                        <p className="text-xs sm:text-sm text-[#703513] leading-relaxed font-medium">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (3 Cols): Narrow Compact Sidebar Stack Details Card & CTA Box */}
          <div className="lg:col-span-3 space-y-5 sticky top-28 w-full max-w-[320px] mx-auto lg:ml-auto">

            {/* Stack Details Card with bg-transparent, rounded-sm & compact padding */}
            <div className="p-5 bg-white sm:bg-transparent border border-amber-900/20 rounded-sm space-y-5 shadow-xs">
              <h3
                className="text-base font-black text-[#3b1400] uppercase tracking-wide border-b border-amber-900/10 pb-2.5"
                style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
              >
                Stack Details
              </h3>

              {/* Tech Badges Pills with rounded-sm */}
              <div className="flex flex-wrap gap-1.5">
                {(project.techStack || []).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#FAF6F0] border border-[#D97706]/20 text-[11px] font-bold text-[#D97706] rounded-sm"
                    style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metadata Items List */}
              <div className="space-y-3 pt-2 border-t border-amber-900/10 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-sm bg-[#FAF6F0] border border-[#D97706]/20 flex items-center justify-center text-[#D97706]">
                    <FaCalendarDays className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-[#703513]/70 uppercase tracking-widest block font-mono">YEAR</span>
                    <span className="font-bold text-[#3b1400] text-xs font-poppins">{project.year || "2026"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-sm bg-[#FAF6F0] border border-[#D97706]/20 flex items-center justify-center text-[#D97706]">
                    <FaUserCheck className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-[#703513]/70 uppercase tracking-widest block font-mono">ROLE</span>
                    <span className="font-bold text-[#3b1400] text-xs font-poppins">{project.role || "Fullstack Architect"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-sm bg-[#FAF6F0] border border-[#D97706]/20 flex items-center justify-center text-[#D97706]">
                    <FaTag className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-[#703513]/70 uppercase tracking-widest block font-mono">CATEGORY</span>
                    <span className="font-bold text-[#3b1400] text-xs font-poppins">{project.category || "Enterprise Web App"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interested in this project? CTA Card with rounded-sm */}
            <div className="p-5 bg-[#231106] border border-[#D97706]/30 rounded-sm text-white space-y-3.5 shadow-xl">
              <div className="space-y-1.5">
                <h4
                  className="text-base font-black uppercase text-[#D97706] tracking-tight"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Interested in this project?
                </h4>
                <p
                  className="text-[11px] text-[#D4B39D] leading-relaxed font-normal"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  Available for new collaborations, custom development, and high-impact fullstack roles.
                </p>
              </div>

              <Link
                href="/contact"
                className="w-full py-2.5 px-3 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xs tracking-wider uppercase text-center rounded-sm block transition-all shadow-md active:scale-[0.99] font-orbitron"
              >
                Let's Talk &rarr;
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Call to Action Banner */}
        <CallToAction />
      </main>
    </div>
  );
}
