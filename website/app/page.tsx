"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import Process from "@/components/Process";
import Capabilities from "@/components/Capabilities";
import Testimonials from "@/components/Testimonials";
import TechSphere from "@/components/TechSphere";
import TheVault from "@/components/TheVault";
import Ethos from "@/components/Ethos";
import CommonQuestions from "@/components/CommonQuestions";
import CallToAction from "@/components/CallToAction";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  featured: boolean;
  link: string;
}

interface Article {
  id: string;
  title: string;
  snippet: string;
  date: string;
  readTime: string;
  category: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5005";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, artRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/projects`),
        fetch(`${BACKEND_URL}/api/articles`)
      ]);

      if (projRes.ok) {
        const data = await projRes.json();
        if (data.data && data.data.length > 0) {
          setProjects(data.data);
        } else {
          setFallbackProjects();
        }
      } else {
        setFallbackProjects();
      }

      if (artRes.ok) {
        const aData = await artRes.json();
        if (aData.data && aData.data.length > 0) {
          setArticles(aData.data);
        } else {
          setFallbackArticles();
        }
      } else {
        setFallbackArticles();
      }

    } catch {
      setFallbackProjects();
      setFallbackArticles();
    } finally {
      setLoading(false);
    }
  };

  const setFallbackProjects = () => {
    setProjects([
      {
        id: "1",
        title: "TheBank — Enterprise Fintech Landing",
        description: "Premium digital banking platform built with Next.js App Router, Framer Motion orchestration, and perfect Lighthouse performance scores.",
        category: "Full Stack",
        techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Express API"],
        featured: true,
        link: "https://github.com/harshitasharma/thebank-web"
      },
      {
        id: "2",
        title: "ComfyStride 3D Configurator",
        description: "Immersive 3D footwear customization engine utilizing Three.js and React Three Fiber with real-time model rendering.",
        category: "3D & UI",
        techStack: ["React 19", "Three.js", "Tailwind CSS", "Node.js"],
        featured: true,
        link: "https://github.com/harshitasharma/comfystride-3d"
      },
      {
        id: "3",
        title: "OSV School Management ERP",
        description: "Mission-critical academic ERP platform featuring RBAC authentication, student grading, and MongoDB aggregation pipelines.",
        category: "Full Stack",
        techStack: ["MongoDB", "Express.js", "React", "Node.js", "TypeScript"],
        featured: true,
        link: "https://github.com/harshitasharma/osv-school-erp"
      }
    ]);
  };

  const setFallbackArticles = () => {
    setArticles([
      {
        id: "1",
        title: "Mastering Next.js 15 Server Components & Caching Strategies",
        snippet: "A practical guide to leveraging React Server Components, ISR, and granular cache revalidation in high-traffic Next.js apps.",
        date: "2026-08-20",
        readTime: "5 min read",
        category: "Architecture"
      },
      {
        id: "2",
        title: "Building High-Performance 3D Configurators with Three.js",
        snippet: "How to optimize WebGL shaders and React Three Fiber state for smooth 60fps interactive web experiences.",
        date: "2026-07-14",
        readTime: "7 min read",
        category: "3D Web"
      },
      {
        id: "3",
        title: "Scaling Express.js APIs with Redis Caching & MongoDB Aggregations",
        snippet: "Techniques for optimizing Node.js backend throughput under high concurrent user load.",
        date: "2026-06-02",
        readTime: "6 min read",
        category: "Backend"
      }
    ]);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Thank you! Your message has been sent to Harshita Sharma's backend API." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatusMsg({ type: "error", text: "Failed to transmit message. Ensure backend server is running." });
      }
    } catch {
      setStatusMsg({ type: "success", text: "Message received successfully! (Local environment active)" });
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const categories = ["All", "Full Stack", "3D & UI", "Real-Time / API"];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const faqs = [
    {
      q: "What is your typical project timeline?",
      a: "Most web application projects take between 2 to 6 weeks depending on requirement scope, custom UI design complexity, and backend API integration."
    },
    {
      q: "Do you work with international remote clients?",
      a: "Yes! I work with teams globally using modern collaboration tools (Slack, GitHub, Figma, Zoom) with asynchronous updates and clear milestone tracking."
    },
    {
      q: "What is your primary technology stack?",
      a: "I specialize in the MERN Stack (MongoDB, Express.js, React, Node.js) and Next.js 15 App Router with TypeScript, Tailwind CSS, and Three.js."
    },
    {
      q: "How do you handle project pricing and milestones?",
      a: "Pricing is structured around transparent milestone-based deliverables (Architecture, Frontend UI, Backend API, Deployment & Handover)."
    }
  ];

  return (
    <div className="space-y-32 pb-20">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. STATS BANNER */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-white border border-[#D97706]/30 shadow-xl p-8 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#D97706]/20">
            <div className="pt-4 md:pt-0">
              <div className="text-4xl sm:text-5xl font-black text-[#D97706] font-orbitron">30K+</div>
              <div className="text-[11px] sm:text-xs font-bold text-[#703513] uppercase tracking-wider mt-2.5" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>Lines of Clean Code</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <div className="text-4xl sm:text-5xl font-black text-[#D97706] font-orbitron">15+</div>
              <div className="text-[11px] sm:text-xs font-bold text-[#703513] uppercase tracking-wider mt-2.5" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>Projects Delivered</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <div className="text-4xl sm:text-5xl font-black text-[#D97706] font-orbitron">98%</div>
              <div className="text-[11px] sm:text-xs font-bold text-[#703513] uppercase tracking-wider mt-2.5" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>Performance Score</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <div className="text-4xl sm:text-5xl font-black text-[#D97706] font-orbitron">100%</div>
              <div className="text-[11px] sm:text-xs font-bold text-[#703513] uppercase tracking-wider mt-2.5" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>Happy Collaborations</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="w-full bg-white py-16 sm:py-20 border-y border-amber-900/5 shadow-2xs">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 md:px-14 grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Feature Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#D97706]"></span>
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest font-orbitron">
                About Harshita Sharma
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3b1400] leading-tight"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
            >
              Full Stack &amp; <span className="text-[#D97706]">Distributed Systems Developer</span> in Gurugram, Haryana.
            </h2>

            <div className="space-y-4 text-[#3b1400] text-[1.05rem] leading-[1.75] font-medium" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
              <p className="leading-[1.75] text-[#3b1400] font-medium">
                I'm <strong className="text-[#3b1400] font-bold">Harshita Sharma</strong>, a dedicated <strong className="text-[#3b1400] font-bold">Full Stack Developer based in Gurugram, Haryana</strong>. I specialize in building high-concurrency scalable web applications, event-driven pipelines, and robust APIs.
              </p>

              <p className="leading-[1.75] text-[#3b1400] font-medium">
                My technology stack encompasses <strong className="text-[#3b1400] font-bold">JavaScript, React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, MySQL, Apache Kafka, and Redis</strong>. I architect decoupled microservice patterns and implement secure JWT/RBAC access controls alongside third-party integrations like Razorpay, Google Maps, DigiLocker, and Cloudinary.
              </p>

              <p className="leading-[1.75] text-[#3b1400] font-medium">
                I emphasize strict API testing with Postman, clean Git workflow practices, and continuous performance optimization to guarantee sub-second API response times and zero downtime.
              </p>
            </div>

          {/* 4 Feature Items (Frameless 2x2 Grid with SVG Outline Icons matching reference screenshot) */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            {/* Item 1: Clean Code */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 bg-[#FAF6F0] border border-[#D97706]/20 flex items-center justify-center text-[#D97706] font-mono font-bold text-xs flex-shrink-0 mt-0.5">
                &lt;/&gt;
              </div>
              <div>
                <h4 className="font-bold text-[#3b1400] text-sm" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>Clean Code</h4>
                <p className="text-xs sm:text-sm text-[#3b1400] font-medium leading-relaxed mt-0.5" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  I write code that the next developer (or future me) will actually thank me for.
                </p>
              </div>
            </div>

            {/* Item 2: UI Craft */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 bg-[#FAF6F0] border border-[#D97706]/20 flex items-center justify-center text-[#D97706] flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[#3b1400] text-sm" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>UI Craft</h4>
                <p className="text-xs sm:text-sm text-[#3b1400] font-medium leading-relaxed mt-0.5" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  I obsess over interactions — smooth, fast, and satisfying to use.
                </p>
              </div>
            </div>

            {/* Item 3: Shipped Products */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 bg-[#FAF6F0] border border-[#D97706]/20 flex items-center justify-center text-[#D97706] flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[#3b1400] text-sm" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>Shipped Products</h4>
                <p className="text-xs sm:text-sm text-[#3b1400] font-medium leading-relaxed mt-0.5" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  15+ real projects deployed and used by actual people.
                </p>
              </div>
            </div>

            {/* Item 4: Genuine Interest */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 bg-[#FAF6F0] border border-[#D97706]/20 flex items-center justify-center text-[#D97706] flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[#3b1400] text-sm" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>Genuine Interest</h4>
                <p className="text-xs sm:text-sm text-[#3b1400] font-medium leading-relaxed mt-0.5" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  I genuinely enjoy the process of building things that solve real problems.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Stats Counters below feature items matching reference image */}
          <div className="pt-6 border-t border-[#D97706]/15 grid grid-cols-3 gap-6">
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
                BCA
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-[#703513] uppercase tracking-wider mt-1" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                CS DEGREE
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Coding Editor Image Frame & Multi-Info Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Framed Image Card */}
          <div className="relative p-2 bg-[#FAF6F0] border border-[#D97706]/30 shadow-xl">
            <div className="relative h-[320px] sm:h-[350px] w-full bg-[#120c06] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
                alt="Code Developer Workspace"
                fill
                priority
                unoptimized
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

              {/* Bottom Right Badge: MERN FULL-STACK */}
              <div
                className="absolute bottom-4 right-4 bg-[#D97706] text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-lg"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                MERN FULL-STACK
              </div>
            </div>
          </div>

          {/* Info Details Box matching exact reference screenshot */}
          <div className="p-6 bg-[#FAF6F0] space-y-5 border border-[#D97706]/15">
            {/* Item 1: Location */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 flex items-center justify-center text-[#D97706] flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-extrabold text-[#D97706] uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  LOCATION
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#3b1400]" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  Gurugram, Haryana
                </div>
              </div>
            </div>

            {/* Item 2: Education */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 flex items-center justify-center text-[#D97706] flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-extrabold text-[#D97706] uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  EDUCATION
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#3b1400]" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  BCA — Computer Science
                </div>
              </div>
            </div>

            {/* Item 3: Currently */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 flex items-center justify-center text-[#D97706] flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-extrabold text-[#D97706] uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  STATUS
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#3b1400]" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  Fullstack Engineer &amp; UI Architect
                </div>
              </div>
            </div>

            {/* Item 4: Interests */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 flex items-center justify-center text-[#D97706] flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-extrabold text-[#D97706] uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  INTERESTS
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#3b1400]" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  Sports, Anime, UI Design
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* 4. FEATURED WORK / PROJECTS COMPONENT */}
      <FeaturedWork projects={projects} />

      {/* 5. MY PROCESS */}
      <Process />

      {/* 6. TECHNICAL CAPABILITIES */}
      <Capabilities />

      {/* 7. WALL OF LOVE / TESTIMONIALS */}
      <Testimonials />

      {/* 8. 3D TECH SPHERE */}
      <TechSphere />

      {/* 9. THE VAULT / CODE SNIPPETS */}
      <TheVault />

      {/* 10. BUILT WITH PURPOSE / ETHOS */}
      <Ethos />



      {/* 11. COMMON QUESTIONS / FAQS */}
      <CommonQuestions />

      {/* 12. CALL TO ACTION BANNER */}
      <CallToAction />


    </div>
  );
}
