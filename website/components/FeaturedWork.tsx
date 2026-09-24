"use client";

import React from "react";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  techStack: string[];
  featured?: boolean;
  link: string;
}

interface FeaturedWorkProps {
  projects?: ProjectItem[];
}

export default function FeaturedWork({ projects: initialProjects }: FeaturedWorkProps) {
  const defaultProjects: ProjectItem[] = [
    {
      id: "1",
      title: "Adnix Agency Interface",
      description:
        "A sleek, conversion-optimized marketing agency platform featuring service catalogs and high-performance lead generation patterns.",
      category: "Agency & Corporate",
      techStack: ["React.js", "Next.js", "Tailwind CSS"],
      featured: true,
      link: "https://github.com/harshitasharma/adnix-agency-interface"
    },
    {
      id: "2",
      title: "TheBank – Enterprise Fintech Ecosystem",
      description:
        "High-concurrency banking dashboard built with Next.js App Router, Express API, Apache Kafka event streams, and PostgreSQL database.",
      category: "Custom Software",
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Apache Kafka"],
      featured: true,
      link: "https://github.com/harshitasharma/thebank-web"
    },
    {
      id: "3",
      title: "FlavorByte POS & Digital Menu",
      description:
        "Real-time restaurant management app supporting table side QR ordering, live order statuses, and POS receipt printing.",
      category: "Restaurant & Hospitality",
      techStack: ["React.js", "Express.js", "Node.js", "MongoDB"],
      featured: true,
      link: "https://github.com/harshitasharma/flavorbyte-restaurant"
    }
  ];

  const hasInitial = initialProjects && initialProjects.length > 0;
  const [liveProjects, setLiveProjects] = React.useState<ProjectItem[]>(hasInitial ? initialProjects : defaultProjects);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5005";

  React.useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      setLiveProjects(initialProjects);
      return;
    }
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          if (data.data && data.data.length > 0) {
            setLiveProjects(data.data.slice(0, 3));
            return;
          }
        }
        setLiveProjects(defaultProjects);
      } catch (err) {
        setLiveProjects(defaultProjects);
      }
    };
    fetchProjects();
  }, [initialProjects]);

  const displayProjects = liveProjects.length > 0 ? liveProjects.slice(0, 3) : defaultProjects.slice(0, 3);


  return (
    <section id="projects" className="w-full bg-[#FAF7F2] py-20 border-b border-amber-900/10">
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 md:px-14 space-y-12">
        {/* Top Section Header */}
        <div className="text-center space-y-3">
          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FAF6F0] text-[#D97706] border border-[#D97706]/30 text-xs font-bold uppercase tracking-widest"
            style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
          >
            <span className="text-xs">✨</span> PORTFOLIO
          </div>

          <h2
            className="text-4xl sm:text-5xl font-black text-[#3b1400] tracking-tight uppercase"
            style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
          >
            Featured <span className="text-[#D97706]">Work</span>
          </h2>

          <p
            className="text-[#3b1400] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            Selected projects that demonstrate my technical expertise in modern web development.
          </p>
        </div>

        {/* 3 Project Cards Grid matching reference screenshot */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {displayProjects.map((proj, index) => (
            <div
              key={proj.id}
              className="bg-white p-7 shadow-sm border border-[#D97706]/20 flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all group"
            >
              {/* Top Row: Icon & FEATURED Badge */}
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 bg-[#FAF6F0] border border-[#D97706]/20 flex items-center justify-center text-[#D97706]">
                  {index === 1 ? (
                    /* Stack / Layers icon for 3D Configurator */
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  ) : (
                    /* Globe icon for Fintech & ERP */
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="1.8" />
                    </svg>
                  )}
                </div>

                <span
                  className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-[#FAF6F0] text-[#D97706] border border-[#D97706]/20"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  FEATURED
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3
                  className="text-lg sm:text-xl font-bold text-[#3b1400] group-hover:text-[#D97706] transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  <a href={`/projects/${proj.id}`}>{proj.title}</a>
                </h3>

                <p
                  className="text-[#3b1400] text-xs sm:text-sm leading-relaxed font-medium"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  {proj.description}
                </p>
              </div>

              {/* Tech Stack Pills & Footer Live Demo Link */}
              <div className="space-y-6 pt-4 border-t border-[#D97706]/15">
                <div className="flex flex-wrap gap-2">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[10px] font-bold bg-[#FAF6F0] text-[#703513] border border-[#D97706]/20"
                      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Action Row */}
                <div className="flex items-center justify-between pt-2">
                  <a
                    href={`/projects/${proj.id}`}
                    className="inline-flex items-center gap-2 text-xs font-black text-[#D97706] hover:text-[#B45309] transition-colors uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                  >
                    <span>CASE STUDY</span>
                    <span className="text-sm">&rarr;</span>
                  </a>

                  {proj.link && proj.link.trim() !== "" && proj.link.trim() !== "#" && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#703513] hover:text-[#D97706] font-mono"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center pt-4">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#3b1400] text-[#3b1400] hover:bg-[#3b1400] hover:text-white font-black text-xs uppercase tracking-wider transition-all rounded-full"
            style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
          >
            <span>VIEW ALL PROJECTS</span>
            <span className="text-sm">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

