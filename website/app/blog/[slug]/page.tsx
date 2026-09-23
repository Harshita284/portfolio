"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

interface ArticleDetail {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  snippet: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      codeSnippet?: string;
    }[];
    conclusion: string;
  };
}

const ARTICLE_DATABASE: Record<string, ArticleDetail> = {
  "mastering-nextjs-15-server-components": {
    slug: "mastering-nextjs-15-server-components",
    title: "Mastering Next.js 15 Server Components & Caching Strategies",
    category: "Architecture",
    date: "August 20, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    snippet: "A practical guide to leveraging React Server Components, ISR, and granular cache revalidation in high-traffic Next.js 15 applications.",
    content: {
      intro:
        "Next.js 15 fundamentally transforms frontend web architecture by shifting data fetching and rendering logic directly onto the server. Server Components (RSC) allow developers to ship zero JavaScript bundles for static component subtrees while offering instantaneous initial page rendering speeds.",
      sections: [
        {
          heading: "1. The Server Component Paradigm Shift",
          body:
            "Unlike traditional React Single Page Applications (SPAs) where client-side JavaScript fetches JSON payloads from REST endpoints, Next.js Server Components run exclusively at request time or build time on the Node.js server. This eliminates client-side hydration overhead for static UI elements.",
          codeSnippet: `// app/blog/[slug]/page.tsx - Next.js Server Component
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = await fetchArticleBySlug(params.slug, {
    next: { revalidate: 3600 } // Incremental Static Regeneration every hour
  });

  return (
    <article className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold">{article.title}</h1>
    </article>
  );
}`,
        },
        {
          heading: "2. Granular Cache Control & Revalidation",
          body:
            "Next.js 15 replaces global fetch caching with explicit control using 'use cache' directives and tags. By coupling fetch calls with revalidateTag('articles'), administrative CMS updates immediately purge outdated edge cache nodes globally without restarting server instances.",
        },
        {
          heading: "3. Measuring Core Web Vitals Impact",
          body:
            "By offloading complex data transformations and markdown parsers to server-side execution, Largest Contentful Paint (LCP) drops significantly, routinely achieving Lighthouse performance scores above 98/100.",
        },
      ],
      conclusion:
        "Adopting React Server Components in Next.js 15 enables developers to build rich, data-intensive applications while maintaining instantaneous response times and optimal search engine indexability.",
    },
  },
  "building-3d-configurators-threejs": {
    slug: "building-3d-configurators-threejs",
    title: "Building High-Performance 3D Configurators with Three.js",
    category: "3D Web",
    date: "July 14, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    snippet: "How to optimize WebGL shaders, GLTF model textures, and React Three Fiber state for smooth 60fps interactive web experiences.",
    content: {
      intro:
        "3D WebGL configurators allow e-commerce platforms to offer studio-quality product visualizers directly inside mobile and desktop web viewports. Maintaining smooth 60fps frame rates requires strict memory management and shader optimization.",
      sections: [
        {
          heading: "1. GLTF Asset Optimization & Draco Compression",
          body:
            "Uncompressed 3D models can easily exceed 50MB, causing unacceptable mobile load times. Applying Draco mesh compression reduces geometry payloads by up to 85% while retaining crisp surface polygon details.",
          codeSnippet: `import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}`,
        },
        {
          heading: "2. Dynamic Material Swapping in React Three Fiber",
          body:
            "Decoupling textures into shared PBR material instances allows real-time material swaps (e.g. leather, suede, mesh) without triggering expensive scene graph re-renders.",
        },
      ],
      conclusion:
        "Through disciplined asset compression and WebGL canvas state isolation, interactive 3D configurators deliver unmatched customer engagement with zero performance compromises.",
    },
  },
};

export default function BlogSingleArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = React.use(params);
  const slugKey = (unwrappedParams?.slug || "").toLowerCase();

  const article = ARTICLE_DATABASE[slugKey] || {
    slug: slugKey,
    title: slugKey
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    category: "Architecture",
    date: "August 20, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    snippet: "Exploring modern web development techniques, clean architecture patterns, and high-performance fullstack engineering.",
    content: {
      intro:
        "Building scalable web applications demands a clear focus on modern UI patterns, efficient data serialization, and robust API security. This article covers practical techniques learned from building enterprise fullstack applications.",
      sections: [
        {
          heading: "1. Clean Code & Modular Architecture",
          body:
            "Structuring code into decoupled component layers simplifies feature maintenance and enables parallel development across large engineering teams.",
          codeSnippet: `// Example Clean Architecture Pattern
export interface UserPayload {
  id: string;
  name: string;
  email: string;
}`,
        },
        {
          heading: "2. Performance Profiling & Optimization",
          body:
            "Continuously measuring network payload sizes and client render cycles ensures consistent sub-second page loads across all viewports.",
        },
      ],
      conclusion:
        "Applying these core engineering principles ensures software resilience and long-term maintainability.",
    },
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen text-[#2D1E18]">
      <main className="pt-8 pb-20 max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
        {/* Top Breadcrumb & Article Header */}
        <div className="space-y-4 border-b border-amber-900/10 pb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 hover:text-amber-900 transition-colors font-poppins"
            >
              <span>&larr; BACK TO BLOG</span>
            </Link>
            <span className="text-amber-900/30 font-mono text-xs">/</span>
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-600/30 text-amber-800 text-[11px] font-bold tracking-widest font-mono rounded-full uppercase">
              {article.category}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-5xl font-black text-[#2D1E18] tracking-tight leading-tight uppercase"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {article.title}
          </h1>

          {/* Author Meta Strip */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#703513] font-mono pt-2">
            <div className="flex items-center gap-2">
              <img src="/logo.jpg" alt="Harshita Sharma" className="w-7 h-7 rounded-full border border-amber-600/40" />
              <span className="font-bold text-[#2D1E18]">Harshita Sharma</span>
            </div>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full h-[320px] sm:h-[450px] rounded-2xl overflow-hidden shadow-md border border-amber-900/15">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body Content */}
        <article className="space-y-8 text-base text-[#422E24] leading-relaxed font-poppins">
          {/* Introduction */}
          <p className="text-lg sm:text-xl font-medium text-[#2D1E18] leading-relaxed border-l-4 border-[#D97706] pl-5 bg-amber-500/5 py-3 rounded-r-xl">
            {article.content.intro}
          </p>

          {/* Content Sections */}
          {article.content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4 pt-4">
              <h2
                className="text-2xl font-bold text-[#2D1E18] font-orbitron uppercase"
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                {sec.heading}
              </h2>
              <p className="text-[#523A2E] leading-relaxed">{sec.body}</p>

              {sec.codeSnippet && (
                <div className="my-6 rounded-xl bg-[#1A0E08] border border-amber-900/30 p-5 overflow-x-auto shadow-lg">
                  <div className="flex items-center justify-between border-b border-amber-900/30 pb-2 mb-3">
                    <span className="text-[11px] font-bold text-amber-400 font-mono uppercase">Code Snippet</span>
                    <span className="text-[10px] text-amber-200/50 font-mono">TypeScript / Next.js</span>
                  </div>
                  <pre className="text-xs text-amber-100/90 font-mono leading-relaxed">{sec.codeSnippet}</pre>
                </div>
              )}
            </div>
          ))}

          {/* Conclusion */}
          <div className="pt-6 border-t border-amber-900/10 space-y-3">
            <h3 className="text-xl font-bold text-[#2D1E18] font-orbitron uppercase">Conclusion</h3>
            <p className="text-[#523A2E] leading-relaxed">{article.content.conclusion}</p>
          </div>
        </article>

        {/* Author Bio Box */}
        <div className="bg-white border border-amber-900/15 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
          <img
            src="/logo.jpg"
            alt="Harshita Sharma"
            className="w-16 h-16 rounded-full border-2 border-[#D97706] shadow-sm flex-shrink-0"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-bold text-base text-[#2D1E18] font-orbitron">Written by Harshita Sharma</h4>
            <p className="text-xs text-[#703513] leading-relaxed">
              Full Stack MERN Developer &amp; Microservices Engineer based in Gurugram, Haryana. Specializing in Node.js, Express.js, React.js, Next.js, PostgreSQL, MongoDB, and Apache Kafka.
            </p>
          </div>
        </div>

        {/* Back to Blog Button */}
        <div className="pt-4 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md"
          >
            <span>&larr; Explore All Articles</span>
          </Link>
        </div>
      </main>

      {/* Global Call to Action Section */}
      <CallToAction />
    </div>
  );
}
