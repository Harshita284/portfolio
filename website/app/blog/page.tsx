"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { FaPenNib, FaMagnifyingGlass } from "react-icons/fa6";

interface Article {
  id: string;
  slug: string;
  title: string;
  snippet: string;
  content?: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const FALLBACK_ARTICLES: Article[] = [
  {
    id: "1",
    slug: "mastering-nextjs-15-server-components",
    title: "Mastering Next.js 15 Server Components & Caching Strategies",
    snippet: "A practical guide to leveraging React Server Components, ISR, and granular cache revalidation in high-traffic Next.js 15 applications.",
    date: "August 20, 2026",
    readTime: "5 min read",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "2",
    slug: "building-3d-configurators-threejs",
    title: "Building High-Performance 3D Configurators with Three.js",
    snippet: "How to optimize WebGL shaders, GLTF model textures, and React Three Fiber state for smooth 60fps interactive web experiences.",
    date: "July 14, 2026",
    readTime: "7 min read",
    category: "3D Web",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "3",
    slug: "scaling-express-apis-redis-mongodb",
    title: "Scaling Express.js APIs with Redis Caching & MongoDB Aggregations",
    snippet: "Techniques for optimizing Node.js backend throughput under high concurrent user load using distributed memory caches.",
    date: "June 02, 2026",
    readTime: "6 min read",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "4",
    slug: "framer-motion-micro-interactions",
    title: "Designing Micro-Interactions with Framer Motion 12",
    snippet: "Creating smooth layout transitions, gestures, and fluid spring physics animations that captivate users without dropped frames.",
    date: "May 18, 2026",
    readTime: "4 min read",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "5",
    slug: "optimizing-3d-asset-pipelines",
    title: "Optimizing 3D Asset Pipelines for Web Browsers",
    snippet: "Draco compression, texture atlas baking, and LOD management strategies for complex 3D e-commerce configurators.",
    date: "April 29, 2026",
    readTime: "8 min read",
    category: "3D Web",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "6",
    slug: "docker-logging-microservices",
    title: "EFK Stack & Docker Logging in Microservice Environments",
    snippet: "Setting up centralized Elasticsearch, Fluentd, and Kibana telemetry logging for distributed Node.js clusters.",
    date: "April 11, 2026",
    readTime: "6 min read",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "7",
    slug: "multi-tenant-mongodb-architecture",
    title: "Multi-Tenant Database Architecture in MongoDB",
    snippet: "Comparing schema isolation models: separate databases vs shared collection tenant keys in MERN enterprise portals.",
    date: "March 24, 2026",
    readTime: "9 min read",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "8",
    slug: "realtime-telemetry-websockets",
    title: "Real-Time Telemetry Dashboards with WebSockets",
    snippet: "Streaming high-frequency fintech data streams over Socket.io with canvas graph rendering and zero memory leaks.",
    date: "February 15, 2026",
    readTime: "5 min read",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "9",
    slug: "react-19-production-patterns",
    title: "Zero to Hero: Production Ready React 19 Patterns",
    snippet: "Leveraging useActionState, optimistic UI updates, and new compiler capabilities in modern React web applications.",
    date: "January 30, 2026",
    readTime: "7 min read",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "10",
    slug: "offline-pwa-architecture-logistics",
    title: "Offline-First Mobile PWA Architecture for Logistics",
    snippet: "Building service worker background sync queues and IndexedDB persistent storage for field driver mobile apps.",
    date: "January 10, 2026",
    readTime: "6 min read",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "11",
    slug: "ci-cd-automated-testing-mern",
    title: "Continuous Integration & Automated Testing in MERN Stack",
    snippet: "Setting up GitHub Actions CI pipelines for static typechecking, unit tests, and automated Vercel deployments.",
    date: "December 18, 2025",
    readTime: "5 min read",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "12",
    slug: "mastering-core-web-vitals",
    title: "Mastering Core Web Vitals for E-Commerce Conversions",
    snippet: "How optimizing LCP, INP, and CLS scores increased organic search impressions and sales checkout velocity.",
    date: "November 28, 2025",
    readTime: "6 min read",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];

export default function BlogListPage() {
  const [articles, setArticles] = useState<Article[]>(FALLBACK_ARTICLES);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(FALLBACK_ARTICLES);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5005";

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/articles`);
      if (res.ok) {
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          // Merge API data with default images if needed
          const merged = data.data.map((item: Article, idx: number) => ({
            ...item,
            slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            image: item.image || FALLBACK_ARTICLES[idx % FALLBACK_ARTICLES.length].image,
          }));
          setArticles(merged);
          setFilteredArticles(merged);
        }
      }
    } catch {
      // Use fallback
    }
  };

  useEffect(() => {
    let result = articles;

    if (activeCategory !== "All") {
      result = result.filter((a) => a.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.snippet.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    setFilteredArticles(result);
  }, [activeCategory, searchQuery, articles]);

  const categories = ["All", "Architecture", "Frontend", "3D Web", "Backend", "DevOps"];

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen text-[#2D1E18]">
      <main className="pt-8 pb-20 max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
        {/* Hero Section Banner matching reference design */}
        <div className="text-center space-y-4 max-w-4xl mx-auto border-b border-amber-900/10 pb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-600/30 text-amber-800 text-xs font-bold uppercase tracking-widest font-mono rounded-full">
            <FaPenNib className="w-3.5 h-3.5 text-[#D97706]" />
            <span>PUBLICATIONS &amp; WRITINGS</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl font-extrabold text-[#2D1E18] tracking-tight uppercase leading-tight"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            Technical <span className="text-[#D97706]">Insights &amp;</span> <br className="hidden sm:inline" />
            Digital Craftsmanship.
          </h1>

          <p
            className="text-base sm:text-lg text-[#703513] font-normal max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Deep dives into Next.js 15, MERN stack performance, 3D WebGL graphics, and scalable system architecture.
          </p>
        </div>

        {/* Filter Pills & Search Bar Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/70 border border-amber-900/10 rounded-2xl p-4 sm:p-6 shadow-xs">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold tracking-wide rounded-full transition-all duration-200 select-none ${isActive
                      ? "bg-[#D97706] text-white shadow-md shadow-[#D97706]/20"
                      : "bg-white border border-amber-900/15 text-[#703513] hover:border-[#D97706] hover:text-[#D97706]"
                    }`}
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <svg
              className="w-4 h-4 text-amber-900/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-900/15 rounded-xl text-xs text-[#2D1E18] focus:outline-none focus:border-[#D97706] transition-colors placeholder:text-amber-900/40 font-poppins"
            />
          </div>
        </div>

        {/* Blog Cards Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white/60 border border-amber-900/10 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto text-[#D97706] mb-2">
              <FaMagnifyingGlass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#2D1E18] font-orbitron">No Articles Found</h3>
            <p className="text-xs text-[#703513]">Try searching for different keywords or select another category.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-2 px-4 py-2 bg-[#D97706] text-white text-xs font-bold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white border border-amber-900/15 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col group"
              >
                {/* Thumbnail Image with Category Badge */}
                <div className="relative w-full h-52 bg-slate-900 overflow-hidden flex-shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#2D1E18]/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest font-mono rounded-md">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Card Body */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Meta Row (Date & Read Time) */}
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[#8C6D58] font-mono">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    {/* Article Title */}
                    <h2
                      className="text-lg font-bold text-[#2D1E18] group-hover:text-[#D97706] transition-colors leading-snug line-clamp-2"
                      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                    >
                      <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                    </h2>

                    {/* Article Snippet */}
                    <p
                      className="text-xs text-[#664C3F] leading-relaxed line-clamp-3 font-normal"
                      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                    >
                      {article.snippet}
                    </p>
                  </div>

                  {/* Read Article Link */}
                  <div className="pt-2 border-t border-amber-900/10">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706] group-hover:translate-x-1 transition-transform"
                      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                    >
                      <span>Read Article</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Pagination & Count Status */}
        <div className="border-t border-amber-900/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-[#703513] font-mono">
            Showing {filteredArticles.length} of {articles.length} published articles
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-5 py-2.5 bg-white border border-amber-900/15 text-[#703513] hover:border-[#D97706] hover:text-[#D97706] font-bold text-xs rounded-xl transition-all shadow-xs"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>
      </main>

      {/* Global Call to Action Section */}
      <CallToAction />
    </div>
  );
}
