"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  image?: string;
  images?: string[];
  link?: string;
  sourceCode?: string;
  featured?: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5005";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/projects`);
      if (res.ok) {
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setProjects(data.data);
          setFilteredProjects(data.data);
        } else {
          setFallbackProjects();
        }
      } else {
        setFallbackProjects();
      }
    } catch {
      setFallbackProjects();
    } finally {
      setLoading(false);
    }
  };


  const setFallbackProjects = () => {
    const fallback: Project[] = [
      {
        id: "1",
        slug: "adnix-agency-interface",
        title: "Adnix Agency Interface",
        tagline: "A sleek, conversion-optimized marketing agency platform featuring service catalogs and high-performance lead generation patterns.",
        description: "Designed with a 'Mobile First' approach and optimized for search engines, Adnix Agency Interface showcases expertise in bridging complex backend logic with immersive frontend interactivity.",
        category: "Agency & Corporate",
        role: "Fullstack Architect",
        year: "2026",
        techStack: ["React 19", "Tailwind CSS", "Framer Motion", "Next.js 15"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        featured: true
      },
      {
        id: "2",
        slug: "thebank-fintech-ecosystem",
        title: "TheBank Fintech Ecosystem",
        tagline: "Enterprise digital banking landing page & real-time analytics dashboard.",
        description: "High-concurrency banking dashboard built with Next.js 15 App Router, Socket.io real-time streaming, and Chart.js telemetry visualization.",
        category: "Custom Software",
        role: "Lead UI Architect",
        year: "2026",
        techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Express API"],
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
        featured: true
      },
      {
        id: "3",
        slug: "comfystride-3d-configurator",
        title: "ComfyStride 3D Configurator",
        tagline: "Immersive 3D footwear customization engine with real-time WebGL rendering.",
        description: "Interactive 3D product visualizer allowing customers to customize shoe materials, colors, and soles in real-time.",
        category: "E-Commerce",
        role: "3D Web Developer",
        year: "2025",
        techStack: ["React 19", "Three.js", "React Three Fiber", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        featured: true
      },
      {
        id: "4",
        slug: "osv-school-management-erp",
        title: "OSV School ERP & Admin Portal",
        tagline: "Mission-critical academic ERP platform for school administration, grading, and attendance.",
        description: "Comprehensive web portal handling student admissions, fee tracking, gradebooks, and automated attendance reports.",
        category: "CRM & ERP",
        role: "Backend Lead",
        year: "2025",
        techStack: ["MongoDB", "Express.js", "React", "Node.js"],
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
        featured: false
      }
    ];
    setProjects(fallback);
    setFilteredProjects(fallback);
  };

  useEffect(() => {
    let result = projects;

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.tagline || "").toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.techStack || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    setFilteredProjects(result);
  }, [activeCategory, searchQuery, projects]);

  const categories = ["All", "CRM & ERP", "E-Commerce", "Web & Mobile Apps", "Restaurant & Hospitality", "Custom Software", "Agency & Corporate"];

  return (
    <div className="w-full bg-[#fffbf5] min-h-screen py-10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
        {/* Top Header Banner */}
        <div className="space-y-4 border-b border-amber-900/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-600/30 text-amber-700 text-xs font-bold uppercase tracking-widest font-mono rounded-full">
            <span>📁 PORTFOLIO ARCHIVES</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#3b1400] tracking-tight"
            style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
          >
            FEATURED <span className="text-[#D97706]">PROJECTS</span> &amp; CASE STUDIES
          </h1>

          <p
            className="text-sm sm:text-base text-[#703513] max-w-3xl leading-relaxed"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            Explore a curated showcase of web applications, 3D configurators, enterprise ERP platforms, and full-stack digital ecosystems engineered by Harshita Sharma.
          </p>
        </div>

        {/* Category Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold transition-all rounded-full ${
                  activeCategory === cat
                    ? "bg-[#D97706] text-white shadow-md"
                    : "bg-white border border-amber-900/15 text-[#703513] hover:border-[#D97706]"
                }`}
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar Input */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, skills, tech..."
              className="w-full px-4 py-2.5 bg-white border border-amber-900/20 text-xs text-[#1c1917] focus:outline-none focus:border-[#D97706] rounded-full pl-9"
              style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
            />
            <svg
              className="w-4 h-4 text-[#703513] absolute left-3 top-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-20 text-center text-[#703513] font-mono text-sm animate-pulse">
            Loading projects showcase...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white border border-amber-900/10 p-10">
            <h3 className="text-lg font-bold text-[#3b1400]">No matching projects found</h3>
            <p className="text-xs text-[#703513]">Try clearing your search query or selecting a different category filter.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-[#D97706] text-white font-bold text-xs uppercase tracking-wider rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const detailUrl = `/projects/${project.slug || project.id}`;

              return (
                <div
                  key={project.id}
                  className="bg-white border-2 border-[#3b1400]/25 rounded-2xl overflow-hidden group hover:border-[#D97706] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Project Screenshot Banner Image */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#1c140c] border-b border-amber-900/15">
                      <img
                        src={project.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-[#D97706] text-white text-[10px] font-black uppercase tracking-wider font-orbitron shadow-md rounded-full">
                        {project.category}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-[#703513] font-mono font-medium">
                          <span>{project.role || "Fullstack Architect"}</span>
                          <span>{project.year || "2026"}</span>
                        </div>

                        <h3
                          className="text-base sm:text-lg font-black text-[#3b1400] group-hover:text-[#D97706] transition-colors leading-snug line-clamp-1"
                          style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                        >
                          <Link href={detailUrl}>{project.title}</Link>
                        </h3>

                        <p
                          className="text-xs text-[#703513] leading-relaxed line-clamp-2"
                          style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                        >
                          {project.tagline || project.description}
                        </p>
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(project.techStack || []).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 bg-[#FAF6F0] border border-amber-900/15 text-[10px] font-semibold text-[#703513] rounded-md"
                            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="p-4 sm:p-5 pt-0 flex items-center justify-between border-t border-amber-900/10 mt-2">
                    <Link
                      href={detailUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-[#D97706] uppercase tracking-wider group-hover:translate-x-1 transition-transform font-orbitron"
                    >
                      <span>VIEW CASE STUDY</span>
                      <span>&rarr;</span>
                    </Link>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#703513] hover:text-[#D97706] font-mono"
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Banner */}
        <CallToAction />
      </div>
    </div>
  );
}
