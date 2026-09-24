"use client";

import { useEffect, useState, FormEvent } from "react";

export interface Project {
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

export interface ExpertiseItem {
  id: string;
  slug: string;
  title: string;
  badge: string;
  category: string;
  tagline: string;
  philosophy: string;
  deepDive: string;
  metrics?: { value: string; label: string }[];
  codeSnippet?: { title: string; language: string; code: string };
  concepts?: { title: string; subtitle: string; desc: string }[];
  tools: string[];
  skills: string[];
  bestPractices?: string[];
  workflow?: { number: string; title: string; desc: string }[];
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  snippet: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
  featured: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"projects" | "expertise" | "blogs" | "inbox">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [expertise, setExpertise] = useState<ExpertiseItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Editing IDs
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingExpertiseId, setEditingExpertiseId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // 1. Project Form State
  const [pTitle, setPTitle] = useState("");
  const [pSlug, setPSlug] = useState("");
  const [pTagline, setPTagline] = useState("");
  const [pCategory, setPCategory] = useState("E-Commerce");
  const [pRole, setPRole] = useState("Fullstack Architect");
  const [pYear, setPYear] = useState("2026");
  const [pTechStackStr, setPTechStackStr] = useState("React.js, Next.js, Node.js, Express.js, MongoDB");
  const [pKeywordsStr, setPKeywordsStr] = useState("E-Commerce, Web App, UI/UX");
  const [pDescription, setPDescription] = useState("");
  const [pOverview, setPOverview] = useState("");
  const [pArchitecture, setPArchitecture] = useState("");
  const [pStyling, setPStyling] = useState("");
  const [pHighlightsStr, setPHighlightsStr] = useState("");
  const [pImage, setPImage] = useState("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80");
  const [pImagesStr, setPImagesStr] = useState("");
  const [pLink, setPLink] = useState("https://adnix-demo.vercel.app");
  const [pSourceCode, setPSourceCode] = useState("https://github.com/harshitasharma");
  const [pFeatured, setPFeatured] = useState(true);
  const [pProb1, setPProb1] = useState("High memory usage on mobile devices due to large 3D assets.");
  const [pSol1, setPSol1] = useState("Utilizing GLTF-Transform for mesh compression and texture resizing, reducing initial load size by 70%.");
  const [pProb2, setPProb2] = useState("Syncing 3D state with Next.js UI components without lag.");
  const [pSol2, setPSol2] = useState("Implemented Zustand state updates decoupled from React re-renders to ensure silky-smooth 60fps interactions.");

  // 2. Expertise Form State
  const [eTitle, setETitle] = useState("");
  const [eSlug, setESlug] = useState("");
  const [eBadge, setEBadge] = useState("FRONTEND ARCHITECTURE");
  const [eCategory, setECategory] = useState("Frontend");
  const [eTagline, setETagline] = useState("");
  const [ePhilosophy, setEPhilosophy] = useState("");
  const [eDeepDive, setEDeepDive] = useState("");
  const [eToolsStr, setEToolsStr] = useState("React.js, Next.js, Tailwind CSS");
  const [eSkillsStr, setESkillsStr] = useState("Server Components, SSR & ISR");
  const [eBestPracticesStr, setEBestPracticesStr] = useState("Always validate server payload schemas.\nWrap async server components in Suspense.");
  // Metrics (4 items)
  const [eM1Val, setEM1Val] = useState("< 0.8s");
  const [eM1Lbl, setEM1Lbl] = useState("LCP LOAD TIME");
  const [eM2Val, setEM2Val] = useState("100%");
  const [eM2Lbl, setEM2Lbl] = useState("LIGHTHOUSE SCORE");
  const [eM3Val, setEM3Val] = useState("70%");
  const [eM3Lbl, setEM3Lbl] = useState("BUNDLE REDUCTION");
  const [eM4Val, setEM4Val] = useState("0 ms");
  const [eM4Lbl, setEM4Lbl] = useState("LAYOUT SHIFT (CLS)");
  // Code Snippet
  const [eCodeTitle, setECodeTitle] = useState("Next.js Server Action & Type-Safe Mutation");
  const [eCodeLang, setECodeLang] = useState("typescript");
  const [eCodeSnippet, setECodeSnippet] = useState(`'use server';\n\nimport { revalidateTag } from 'next/cache';\n\nexport async function updateAction(formData: FormData) {\n  await db.update();\n  revalidateTag('data');\n}`);
  // Concepts (2 items)
  const [eC1Title, setEC1Title] = useState("React Server Components");
  const [eC1Sub, setEC1Sub] = useState("Zero Bundle Size");
  const [eC1Desc, setEC1Desc] = useState("Executing data fetch logic on server for zero client-side JavaScript overhead.");
  const [eC2Title, setEC2Title] = useState("Server Actions");
  const [eC2Sub, setEC2Sub] = useState("Type-Safe RPC");
  const [eC2Desc, setEC2Desc] = useState("Native mutation functions replacing custom API endpoints and boilerplate.");
  // Workflow Steps (4 items)
  const [eW1Num, setEW1Num] = useState("1");
  const [eW1Title, setEW1Title] = useState("Modular Component Architecture");
  const [eW1Desc, setEW1Desc] = useState("Decoupled, reusable UI elements built with atomic principles.");
  const [eW2Num, setEW2Num] = useState("2");
  const [eW2Title, setEW2Title] = useState("Predictable State Management");
  const [eW2Desc, setEW2Desc] = useState("Structured state orchestration ensuring single source of truth.");
  const [eW3Num, setEW3Num] = useState("3");
  const [eW3Title, setEW3Title] = useState("Performance-First Optimization");
  const [eW3Desc, setEW3Desc] = useState("Sub-second LCP, zero layout shifts, and aggressive SSR caching.");
  const [eW4Num, setEW4Num] = useState("4");
  const [eW4Title, setEW4Title] = useState("Strict TypeScript Typing");
  const [eW4Desc, setEW4Desc] = useState("End-to-end type safety eliminating runtime bugs.");

  // 3. Blog Form State
  const [bTitle, setBTitle] = useState("");
  const [bSlug, setBSlug] = useState("");
  const [bCategory, setBCategory] = useState("Frontend");
  const [bReadTime, setBReadTime] = useState("5 min read");
  const [bSnippet, setBSnippet] = useState("");
  const [bContent, setBContent] = useState("");
  const [bTagsStr, setBTagsStr] = useState("Next.js, React.js, Performance");
  const [bFeatured, setBFeatured] = useState(true);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5005";

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\.js/g, "-js")
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handlePTitleChange = (val: string) => {
    setPTitle(val);
    setPSlug(generateSlug(val));
  };

  const handleETitleChange = (val: string) => {
    setETitle(val);
    if (!editingExpertiseId) {
      setESlug(generateSlug(val));
    }
  };

  const handleBTitleChange = (val: string) => {
    setBTitle(val);
    setBSlug(generateSlug(val));
  };

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleCloudinaryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;
        const res = await fetch(`${BACKEND_URL}/api/upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });
        const data = await res.json();
        if (data.success && data.url) {
          if (isGallery) {
            setPImagesStr((prev) => (prev ? `${prev}\n${data.url}` : data.url));
          } else {
            setPImage(data.url);
          }
          alert("☁️ Image uploaded to Cloudinary successfully!");
        } else {
          alert(data.message || "Cloudinary upload failed.");
        }
      } catch (err: any) {
        alert(err.message || "Error uploading image to Cloudinary.");
      } finally {
        setIsUploadingImage(false);
      }
    };
  };

  useEffect(() => {
    fetchAllData();

    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes("add-project")) {
        setActiveTab("projects");
        resetProjectForm();
        setProjectSubView("form");
      } else if (hash.includes("projects")) {
        setActiveTab("projects");
        setProjectSubView("list");
      } else if (hash.includes("expertise")) {
        setActiveTab("expertise");
      } else if (hash.includes("blogs")) {
        setActiveTab("blogs");
      } else if (hash.includes("inbox") || hash.includes("messages")) {
        setActiveTab("inbox");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projRes, expRes, blogRes, msgRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/projects`),
        fetch(`${BACKEND_URL}/api/expertise`),
        fetch(`${BACKEND_URL}/api/blogs`),
        fetch(`${BACKEND_URL}/api/messages`)
      ]);

      if (projRes.ok) {
        const d = await projRes.json();
        setProjects(d.data || []);
      }
      if (expRes.ok) {
        const d = await expRes.json();
        setExpertise(d.data || []);
      }
      if (blogRes.ok) {
        const d = await blogRes.json();
        setBlogs(d.data || []);
      }
      if (msgRes.ok) {
        const d = await msgRes.json();
        setMessages(d.data || []);
      }
    } catch (e) {
      console.error("Fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  // Reset Handlers
  const resetProjectForm = () => {
    setEditingProjectId(null);
    setPTitle("");
    setPSlug("");
    setPTagline("");
    setPCategory("E-Commerce");
    setPRole("Fullstack Architect");
    setPYear("2026");
    setPTechStackStr("React.js, Next.js, Node.js, Express.js, MongoDB");
    setPKeywordsStr("E-Commerce, Web App");
    setPDescription("");
    setPOverview("");
    setPArchitecture("");
    setPStyling("");
    setPHighlightsStr("");
    setPImage("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80");
    setPImagesStr("");
    setPLink("https://adnix-demo.vercel.app");
    setPSourceCode("https://github.com/harshitasharma");
    setPFeatured(true);
    setPProb1("High memory usage on mobile devices due to large 3D assets.");
    setPSol1("Utilizing GLTF-Transform for mesh compression and texture resizing, reducing initial load size by 70%.");
    setPProb2("Syncing 3D state with Next.js UI components without lag.");
    setPSol2("Implemented Zustand state updates decoupled from React re-renders to ensure silky-smooth 60fps interactions.");
  };

  const resetExpertiseForm = () => {
    setEditingExpertiseId(null);
    setETitle("");
    setESlug("");
    setEBadge("FRONTEND ARCHITECTURE");
    setECategory("Frontend");
    setETagline("");
    setEPhilosophy("");
    setEDeepDive("");
    setEToolsStr("React.js, Next.js, Tailwind CSS");
    setESkillsStr("Server Components, SSR & ISR");
    setEBestPracticesStr("Always validate server payload schemas.\nWrap async server components in Suspense.");
    setEM1Val("< 0.8s"); setEM1Lbl("LCP LOAD TIME");
    setEM2Val("100%"); setEM2Lbl("LIGHTHOUSE SCORE");
    setEM3Val("70%"); setEM3Lbl("BUNDLE REDUCTION");
    setEM4Val("0 ms"); setEM4Lbl("LAYOUT SHIFT (CLS)");
    setECodeTitle("Implementation Snippet");
    setECodeLang("typescript");
    setECodeSnippet("// Code snippet here");
    setEC1Title("React Server Components"); setEC1Sub("Zero Bundle Size"); setEC1Desc("Executing data fetch logic on server for zero client-side JavaScript overhead.");
    setEC2Title("Server Actions"); setEC2Sub("Type-Safe RPC"); setEC2Desc("Native mutation functions replacing custom API endpoints and boilerplate.");
    setEW1Num("1"); setEW1Title("Modular Component Architecture"); setEW1Desc("Decoupled, reusable UI elements built with atomic principles.");
    setEW2Num("2"); setEW2Title("Predictable State Management"); setEW2Desc("Structured state orchestration ensuring single source of truth.");
    setEW3Num("3"); setEW3Title("Performance-First Optimization"); setEW3Desc("Sub-second LCP, zero layout shifts, and aggressive SSR caching.");
    setEW4Num("4"); setEW4Title("Strict TypeScript Typing"); setEW4Desc("End-to-end type safety eliminating runtime bugs.");
  };

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBTitle("");
    setBSlug("");
    setBCategory("Frontend");
    setBReadTime("5 min read");
    setBSnippet("");
    setBContent("");
    setBTagsStr("Next.js, React.js, Performance");
    setBFeatured(true);
  };

  // Edit Trigger Handlers
  const handleEditProject = (p: Project) => {
    setEditingProjectId(p.id);
    setPTitle(p.title || "");
    setPSlug(p.slug || "");
    setPTagline(p.tagline || "");
    setPCategory(p.category || "Full Stack");
    setPRole(p.role || "Fullstack Architect");
    setPYear(p.year || "2026");
    setPTechStackStr((p.techStack || []).join(", "));
    setPKeywordsStr((p.keywords || []).join(", "));
    setPDescription(p.description || "");
    setPOverview(p.overview || "");
    setPArchitecture(p.architecture || "");
    setPStyling(p.styling || "");
    setPHighlightsStr((p.highlights || []).join("\n"));
    setPImage(p.image || "");
    setPImagesStr((p.images || []).join("\n"));
    setPLink(p.link || "");
    setPSourceCode(p.sourceCode || "");
    setPFeatured(p.featured ?? true);
    const ch = p.challenges || [];
    setPProb1(ch[0]?.problem || "High memory usage on mobile devices due to large 3D assets.");
    setPSol1(ch[0]?.solution || "Utilizing GLTF-Transform for mesh compression and texture resizing, reducing initial load size by 70%.");
    setPProb2(ch[1]?.problem || "Syncing 3D state with Next.js UI components without lag.");
    setPSol2(ch[1]?.solution || "Implemented Zustand state updates decoupled from React re-renders to ensure silky-smooth 60fps interactions.");
  };

  const handleEditExpertise = (e: ExpertiseItem) => {
    setEditingExpertiseId(e.id);
    setETitle(e.title || "");
    setESlug(e.slug || "");
    setEBadge(e.badge || "FULLSTACK ARCHITECTURE");
    setECategory(e.category || "Frontend");
    setETagline(e.tagline || "");
    setEPhilosophy(e.philosophy || "");
    setEDeepDive(e.deepDive || "");
    setEToolsStr((e.tools || []).join(", "));
    setESkillsStr((e.skills || []).join(", "));
    setEBestPracticesStr((e.bestPractices || []).join("\n"));
    
    const m = e.metrics || [];
    setEM1Val(m[0]?.value || "< 0.8s"); setEM1Lbl(m[0]?.label || "LCP LOAD TIME");
    setEM2Val(m[1]?.value || "100%"); setEM2Lbl(m[1]?.label || "LIGHTHOUSE SCORE");
    setEM3Val(m[2]?.value || "70%"); setEM3Lbl(m[2]?.label || "BUNDLE REDUCTION");
    setEM4Val(m[3]?.value || "0 ms"); setEM4Lbl(m[3]?.label || "LAYOUT SHIFT (CLS)");
    
    const cs = e.codeSnippet;
    setECodeTitle(cs?.title || "Implementation Snippet");
    setECodeLang(cs?.language || "typescript");
    setECodeSnippet(cs?.code || "// Code snippet here");
    
    const conc = e.concepts || [];
    setEC1Title(conc[0]?.title || "React Server Components");
    setEC1Sub(conc[0]?.subtitle || "Zero Bundle Size");
    setEC1Desc(conc[0]?.desc || "Executing data fetch logic on server for zero client-side JavaScript overhead.");
    setEC2Title(conc[1]?.title || "Server Actions");
    setEC2Sub(conc[1]?.subtitle || "Type-Safe RPC");
    setEC2Desc(conc[1]?.desc || "Native mutation functions replacing custom API endpoints and boilerplate.");

    const wf = e.workflow || [];
    setEW1Num(wf[0]?.number || "1"); setEW1Title(wf[0]?.title || "Modular Component Architecture"); setEW1Desc(wf[0]?.desc || "Decoupled, reusable UI elements built with atomic principles.");
    setEW2Num(wf[1]?.number || "2"); setEW2Title(wf[1]?.title || "Predictable State Management"); setEW2Desc(wf[1]?.desc || "Structured state orchestration ensuring single source of truth.");
    setEW3Num(wf[2]?.number || "3"); setEW3Title(wf[2]?.title || "Performance-First Optimization"); setEW3Desc(wf[2]?.desc || "Sub-second LCP, zero layout shifts, and aggressive SSR caching.");
    setEW4Num(wf[3]?.number || "4"); setEW4Title(wf[3]?.title || "Strict TypeScript Typing"); setEW4Desc(wf[3]?.desc || "End-to-end type safety eliminating runtime bugs.");
  };

  // Sub-view toggle for Projects
  const [projectSubView, setProjectSubView] = useState<"list" | "form">("list");
  const [isDragging, setIsDragging] = useState(false);

  const openNewProjectForm = () => {
    resetProjectForm();
    setProjectSubView("form");
    if (typeof window !== "undefined") window.location.hash = "#add-project";
  };

  const openEditProjectForm = (p: Project) => {
    handleEditProject(p);
    setProjectSubView("form");
    if (typeof window !== "undefined") window.location.hash = "#add-project";
  };

  // Drag and Drop & File Input Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Helper to resize & compress uploaded images in browser before sending to backend
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawUrl = e.target?.result as string;
        if (!rawUrl) return resolve("");
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1400;
          const MAX_HEIGHT = 1400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", 0.82);
            resolve(compressed);
          } else {
            resolve(rawUrl);
          }
        };
        img.onerror = () => resolve(rawUrl);
        img.src = rawUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const processImageFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (fileArray.length === 0) {
      alert("Please drop valid image files (PNG, JPG, WebP, GIF).");
      return;
    }

    for (const file of fileArray) {
      const compressedDataUrl = await compressImage(file);
      if (compressedDataUrl) {
        setPImagesStr(prev => (prev ? prev.trim() + "\n" + compressedDataUrl : compressedDataUrl));
        setPImage(prev => (!prev || prev.includes("unsplash") ? compressedDataUrl : prev));
      }
    }
  };

  const handleDropImages = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImageFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processImageFiles(e.target.files);
    }
  };

  const parseImageUrls = (rawStr: string): string[] => {
    if (!rawStr || !rawStr.trim()) return [];
    if (rawStr.includes("data:image/")) {
      return rawStr
        .split("\n")
        .map(s => s.trim())
        .filter(s => s.length > 20 || s.startsWith("http"));
    }
    return rawStr
      .split(/[\n,]/)
      .map(s => s.trim())
      .filter(Boolean);
  };

  const removeGalleryImage = (imgUrl: string) => {
    const list = parseImageUrls(pImagesStr);
    const updated = list.filter(u => u !== imgUrl);
    setPImagesStr(updated.join("\n"));
    if (pImage === imgUrl) {
      setPImage(updated[0] || "");
    }
  };

  const handleEditBlog = (b: BlogItem) => {
    setEditingBlogId(b.id);
    setBTitle(b.title || "");
    setBSlug(b.slug || "");
    setBCategory(b.category || "Frontend");
    setBReadTime(b.readTime || "5 min read");
    setBSnippet(b.snippet || "");
    setBContent(b.content || "");
    setBTagsStr((b.tags || []).join(", "));
    setBFeatured(b.featured ?? true);
  };

  // Submit Handlers
  const handleSaveProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!pTitle || !pDescription) {
      alert("Please fill in both Project Title and Description.");
      return;
    }

    // Clean slug if user pasted a URL like "https://www.dilbahars.com/"
    let cleanSlug = pSlug ? pSlug.trim() : pTitle;
    cleanSlug = cleanSlug.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
    if (cleanSlug.includes('/')) {
      const parts = cleanSlug.split('/').filter(Boolean);
      if (parts.length > 0) cleanSlug = parts[0];
    }
    cleanSlug = cleanSlug.replace(/\.(com|org|net|io|co|in|app|dev|xyz|tech|online)$/i, '');
    cleanSlug = cleanSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const galleryImages = parseImageUrls(pImagesStr);
    if (pImage && !galleryImages.includes(pImage)) {
      galleryImages.unshift(pImage);
    }

    const challengesList = [];
    if (pProb1.trim() || pSol1.trim()) {
      challengesList.push({ problem: pProb1.trim(), solution: pSol1.trim() });
    }
    if (pProb2.trim() || pSol2.trim()) {
      challengesList.push({ problem: pProb2.trim(), solution: pSol2.trim() });
    }

    const payload = {
      title: pTitle,
      slug: cleanSlug,
      tagline: pTagline || pDescription.slice(0, 120),
      description: pDescription,
      overview: pOverview || pDescription,
      category: pCategory,
      role: pRole,
      year: pYear,
      techStack: pTechStackStr.split(',').map(s => s.trim()).filter(Boolean),
      keywords: pKeywordsStr.split(',').map(s => s.trim()).filter(Boolean),
      highlights: pHighlightsStr.split('\n').map(s => s.trim()).filter(Boolean),
      architecture: pArchitecture,
      styling: pStyling,
      challenges: challengesList,
      image: pImage || (galleryImages[0] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'),
      images: galleryImages,
      link: pLink,
      sourceCode: pSourceCode,
      featured: pFeatured
    };

    try {
      const url = editingProjectId ? `${BACKEND_URL}/api/projects/${editingProjectId}` : `${BACKEND_URL}/api/projects`;
      const method = editingProjectId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(editingProjectId ? "✅ Project updated successfully!" : "✅ Project saved & published to Database successfully!");
        fetchAllData();
        resetProjectForm();
        setProjectSubView("list");
      } else {
        alert("❌ Failed to save project: " + (data.message || "Unknown server error"));
      }
    } catch (err: any) {
      console.error("Save error", err);
      alert("❌ Network Error: Could not connect to backend server (" + BACKEND_URL + ")");
    }
  };

  const handleSaveExpertise = async (e: FormEvent) => {
    e.preventDefault();
    if (!eTitle || !eTagline) {
      alert("Please fill in Title and Tagline.");
      return;
    }
    const cleanSlug = generateSlug(eSlug || eTitle);

    const metricsList = [
      { value: eM1Val.trim(), label: eM1Lbl.trim() },
      { value: eM2Val.trim(), label: eM2Lbl.trim() },
      { value: eM3Val.trim(), label: eM3Lbl.trim() },
      { value: eM4Val.trim(), label: eM4Lbl.trim() }
    ].filter(m => m.value || m.label);

    const conceptsList = [];
    if (eC1Title.trim()) {
      conceptsList.push({ title: eC1Title.trim(), subtitle: eC1Sub.trim(), desc: eC1Desc.trim() });
    }
    if (eC2Title.trim()) {
      conceptsList.push({ title: eC2Title.trim(), subtitle: eC2Sub.trim(), desc: eC2Desc.trim() });
    }

    const workflowList = [];
    if (eW1Title.trim()) workflowList.push({ number: eW1Num || "1", title: eW1Title.trim(), desc: eW1Desc.trim() });
    if (eW2Title.trim()) workflowList.push({ number: eW2Num || "2", title: eW2Title.trim(), desc: eW2Desc.trim() });
    if (eW3Title.trim()) workflowList.push({ number: eW3Num || "3", title: eW3Title.trim(), desc: eW3Desc.trim() });
    if (eW4Title.trim()) workflowList.push({ number: eW4Num || "4", title: eW4Title.trim(), desc: eW4Desc.trim() });

    const payload = {
      title: eTitle,
      slug: cleanSlug,
      badge: eBadge || "FULLSTACK ARCHITECTURE",
      category: eCategory,
      tagline: eTagline,
      philosophy: ePhilosophy || eTagline,
      deepDive: eDeepDive || eTagline,
      metrics: metricsList,
      codeSnippet: {
        title: eCodeTitle || `${eTitle} Implementation`,
        language: eCodeLang || "typescript",
        code: eCodeSnippet
      },
      concepts: conceptsList,
      tools: eToolsStr.split(',').map(s => s.trim()).filter(Boolean),
      skills: eSkillsStr.split(',').map(s => s.trim()).filter(Boolean),
      bestPractices: eBestPracticesStr.split('\n').map(s => s.trim()).filter(Boolean),
      workflow: workflowList
    };

    try {
      const url = editingExpertiseId ? `${BACKEND_URL}/api/expertise/${editingExpertiseId}` : `${BACKEND_URL}/api/expertise`;
      const method = editingExpertiseId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(editingExpertiseId ? "✅ Expertise updated successfully!" : "✅ Expertise saved & published to Database successfully!");
        fetchAllData();
        resetExpertiseForm();
      } else {
        alert("❌ Error: " + (data.message || "Failed to save expertise"));
      }
    } catch (err: any) {
      console.error("Expertise save error", err);
      alert("❌ Network Error connecting to backend.");
    }
  };

  const handleSaveBlog = async (e: FormEvent) => {
    e.preventDefault();
    if (!bTitle || !bSnippet) {
      alert("Please fill in Title and Snippet.");
      return;
    }
    const payload = {
      title: bTitle,
      slug: bSlug || bTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      snippet: bSnippet,
      content: bContent || bSnippet,
      category: bCategory,
      readTime: bReadTime,
      tags: bTagsStr.split(',').map(s => s.trim()).filter(Boolean),
      featured: bFeatured
    };

    try {
      const url = editingBlogId ? `${BACKEND_URL}/api/blogs/${editingBlogId}` : `${BACKEND_URL}/api/blogs`;
      const method = editingBlogId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("✅ Blog article published successfully!");
        fetchAllData();
        resetBlogForm();
      } else {
        alert("❌ Error: " + (data.message || "Failed to save blog"));
      }
    } catch (err: any) {
      console.error("Blog save error", err);
      alert("❌ Network Error connecting to backend.");
    }
  };

  // Delete Handlers
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`${BACKEND_URL}/api/projects/${id}`, { method: "DELETE" });
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleDeleteExpertise = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expertise item?")) return;
    await fetch(`${BACKEND_URL}/api/expertise/${id}`, { method: "DELETE" });
    setExpertise(prev => prev.filter(e => e.id !== id));
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog article?")) return;
    await fetch(`${BACKEND_URL}/api/blogs/${id}`, { method: "DELETE" });
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    await fetch(`${BACKEND_URL}/api/messages/${id}`, { method: "DELETE" });
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";

  return (
    <div className="flex min-h-screen">
      {/* Interactive Left Sidebar */}
      <aside className="w-64 bg-[#231106] hidden md:flex flex-col justify-between p-6 border-r border-[#52270D] shadow-2xl z-20 flex-shrink-0">
        <div className="space-y-8">
          {/* Brand Header */}
          <div className="flex items-center gap-3.5 pb-6 border-b border-[#52270D]">
            <div className="w-10 h-10 rounded-lg bg-[#D97706] flex items-center justify-center font-black text-white font-orbitron shadow-md shadow-[#D97706]/30">
              HS
            </div>
            <div>
              <h2 className="font-extrabold text-white text-sm tracking-wide font-orbitron uppercase">Admin Console</h2>
              <p className="text-[11px] text-[#D97706] font-semibold mt-0.5">Harshita Sharma</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setActiveTab("projects"); setProjectSubView("list"); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-poppins text-left cursor-pointer ${
                activeTab === "projects" && projectSubView === "list"
                  ? "bg-[#D97706] text-white shadow-md shadow-[#D97706]/20 font-extrabold"
                  : "text-[#D4B39D] hover:text-white hover:bg-[#381a09]"
              }`}
            >
              <svg className="w-4 h-4 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Dashboard Overview</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab("projects"); setProjectSubView("list"); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-poppins text-left cursor-pointer ${
                activeTab === "projects" && projectSubView === "list"
                  ? "text-white font-bold bg-[#381a09]"
                  : "text-[#D4B39D] hover:text-white hover:bg-[#381a09]"
              }`}
            >
              <svg className="w-4 h-4 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <span>Manage Projects</span>
            </button>

            <button
              type="button"
              onClick={openNewProjectForm}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white shadow-md shadow-[#D97706]/20 transition-all font-poppins text-left cursor-pointer font-bold ${
                projectSubView === "form" ? "ring-2 ring-amber-300" : ""
              }`}
            >
              <span className="text-base font-black">+</span>
              <span>Add New Project</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("expertise")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-poppins text-left cursor-pointer ${
                activeTab === "expertise"
                  ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20"
                  : "text-[#D4B39D] hover:text-white hover:bg-[#381a09]"
              }`}
            >
              <span className="text-sm">💡</span>
              <span>Manage Expertise</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-poppins text-left cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20"
                  : "text-[#D4B39D] hover:text-white hover:bg-[#381a09]"
              }`}
            >
              <span className="text-sm">✍️</span>
              <span>Manage Blogs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("inbox")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-poppins text-left cursor-pointer ${
                activeTab === "inbox"
                  ? "bg-[#B45309] text-white font-bold shadow-md shadow-[#B45309]/20"
                  : "text-[#D4B39D] hover:text-white hover:bg-[#381a09]"
              }`}
            >
              <svg className="w-4 h-4 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Inbox Messages</span>
            </button>

            <a
              href={websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#D97706] hover:bg-[#381a09] border border-[#52270D] transition-all font-poppins mt-4 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10z" />
              </svg>
              <span>Launch Portfolio &rarr;</span>
            </a>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#52270D] text-[11px] text-[#D4B39D] flex items-center justify-between font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>System Online</span>
          </span>
          <span>Port 3001</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FAF8F5]">
        {/* Top Bar */}
        <header className="h-16 border-b border-[#F3E7DB] px-6 sm:px-8 flex items-center justify-between bg-white shadow-xs z-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
            <h1 className="text-sm font-black text-[#3b1400] font-orbitron uppercase tracking-wide">
              Harshita Sharma &bull; Admin Console
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-md bg-[#FAF6F0] text-[#3b1400] border border-[#F3E2CE] font-semibold">
              API Gateway: <code className="text-[#D97706] font-bold">{BACKEND_URL}</code>
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-10 font-poppins">
      {/* Overview Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          onClick={() => { setActiveTab("projects"); setProjectSubView("list"); window.location.hash = "#projects"; }}
          className={`p-6 rounded-xl bg-white border-l-4 border-l-[#D97706] border border-[#F3E7DB] shadow-sm cursor-pointer transition-all hover:scale-[1.01] ${
            activeTab === "projects" ? "ring-2 ring-[#D97706]" : "hover:border-[#D97706]/40"
          }`}
        >
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#D97706] font-orbitron">Portfolio Projects</p>
          <h3 className="text-3xl font-black text-[#3b1400] font-orbitron">{projects.length}</h3>
          <p className="text-xs text-[#703513] font-medium">Full Stack &amp; Microservices</p>
        </div>

        <div
          onClick={() => { setActiveTab("expertise"); window.location.hash = "#expertise"; }}
          className={`p-6 rounded-xl bg-white border-l-4 border-l-indigo-600 border border-[#F3E7DB] shadow-sm cursor-pointer transition-all hover:scale-[1.01] ${
            activeTab === "expertise" ? "ring-2 ring-indigo-600" : "hover:border-indigo-500/40"
          }`}
        >
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 font-orbitron">Expertise Items</p>
          <h3 className="text-3xl font-black text-[#3b1400] font-orbitron">{expertise.length}</h3>
          <p className="text-xs text-indigo-600 font-medium">Core Tech Competencies</p>
        </div>

        <div
          onClick={() => { setActiveTab("blogs"); window.location.hash = "#blogs"; }}
          className={`p-6 rounded-xl bg-white border-l-4 border-l-emerald-600 border border-[#F3E7DB] shadow-sm cursor-pointer transition-all hover:scale-[1.01] ${
            activeTab === "blogs" ? "ring-2 ring-emerald-600" : "hover:border-emerald-500/40"
          }`}
        >
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 font-orbitron">Blog Articles</p>
          <h3 className="text-3xl font-black text-[#3b1400] font-orbitron">{blogs.length}</h3>
          <p className="text-xs text-emerald-600 font-medium">Technical Insights &amp; Guides</p>
        </div>

        <div
          onClick={() => { setActiveTab("inbox"); window.location.hash = "#inbox"; }}
          className={`p-6 rounded-xl bg-white border-l-4 border-l-[#B45309] border border-[#F3E7DB] shadow-sm cursor-pointer transition-all hover:scale-[1.01] ${
            activeTab === "inbox" ? "ring-2 ring-[#B45309]" : "hover:border-[#B45309]/40"
          }`}
        >
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#B45309] font-orbitron">Client Inquiries</p>
          <h3 className="text-3xl font-black text-[#3b1400] font-orbitron">{messages.length}</h3>
          <p className="text-xs text-[#B45309] font-medium">Contact Form Submissions</p>
        </div>
      </section>

      {/* Tab Selector Navigation Bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#F3E7DB] pb-4">
        {[
          { key: "projects", label: "📁 Manage Projects", count: projects.length, hash: "#projects" },
          { key: "expertise", label: "💡 Manage Expertise", count: expertise.length, hash: "#expertise" },
          { key: "blogs", label: "✍️ Manage Blogs", count: blogs.length, hash: "#blogs" },
          { key: "inbox", label: "📬 Contact Inbox", count: messages.length, hash: "#inbox" },
        ].map((tab) => (
          <button
            type="button"
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key as any);
              if (tab.key === "projects") setProjectSubView("list");
              window.location.hash = tab.hash;
            }}
            className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider font-orbitron transition-all cursor-pointer ${
              activeTab === tab.key
                ? "bg-[#D97706] text-white shadow-md shadow-[#D97706]/20"
                : "bg-white border border-[#F3E7DB] text-[#3b1400] hover:border-[#D97706]/40"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* ---------------- 1. PROJECTS MANAGER TAB ---------------- */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          {/* Subview 1: Full-Width Projects List Table */}
          {projectSubView === "list" && (
            <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#F3E7DB] shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F3E7DB]">
                <div>
                  <h2 className="text-xl font-black text-[#3b1400] font-orbitron uppercase flex items-center gap-2.5">
                    <span className="text-[#D97706]">📁</span> Portfolio Projects ({projects.length})
                  </h2>
                  <p className="text-xs text-[#703513] font-medium mt-0.5">
                    Manage your portfolio case studies, tech stacks, and live demo links.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openNewProjectForm}
                  className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md transition-all font-orbitron flex items-center gap-2 cursor-pointer"
                >
                  <span>➕ Add New Project</span>
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="p-12 text-center bg-[#FAF8F5] border border-dashed border-[#F3E2CE] rounded-2xl space-y-3">
                  <span className="text-3xl">📁</span>
                  <p className="text-sm font-bold text-[#3b1400]">No projects found in database</p>
                  <button
                    type="button"
                    onClick={openNewProjectForm}
                    className="px-5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase rounded-lg font-orbitron cursor-pointer"
                  >
                    + Create First Project
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className="p-5 bg-[#FAF8F5] border border-[#F3E7DB] rounded-2xl flex flex-col justify-between gap-4 hover:border-[#D97706]/50 transition-all shadow-2xs group"
                    >
                      <div className="space-y-3">
                        {/* Cover Image Thumbnail */}
                        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#1c140c] border border-amber-900/10">
                          <img
                            src={p.image || (p.images && p.images[0]) || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80")}
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            <span className="px-2.5 py-1 bg-[#231106]/80 backdrop-blur-md text-[#D97706] text-[10px] font-bold font-mono uppercase rounded-md border border-[#D97706]/30">
                              {p.category}
                            </span>
                            {p.featured && (
                              <span className="px-2 py-1 bg-emerald-600/90 text-white text-[10px] font-bold font-mono rounded-md shadow-xs">
                                ★ Featured
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h4 className="font-black text-[#3b1400] text-base font-orbitron group-hover:text-[#D97706] transition-colors">
                            {p.title}
                          </h4>
                          <p className="text-xs text-[#703513] line-clamp-2 mt-1 leading-relaxed">
                            {p.tagline || p.description}
                          </p>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {(p.techStack || []).slice(0, 5).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-white border border-[#F3E7DB] text-[10px] font-mono text-[#703513] rounded-md"
                            >
                              {t}
                            </span>
                          ))}
                          {(p.techStack || []).length > 5 && (
                            <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#D97706] font-bold">
                              +{(p.techStack || []).length - 5}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-[#F3E7DB]">
                        <button
                          onClick={() => openEditProjectForm(p)}
                          className="flex-1 py-2 bg-white border border-[#D97706]/40 hover:bg-[#FFF8F0] text-[#D97706] text-xs font-extrabold uppercase rounded-lg transition-all font-orbitron text-center cursor-pointer"
                        >
                          ✏️ Edit Project
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="px-3 py-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg transition-all cursor-pointer"
                          title="Delete Project"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Subview 2: Full-Width Dedicated Project Form Page */}
          {projectSubView === "form" && (
            <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#F3E7DB] shadow-sm space-y-8">
              {/* Header & Navigation Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F3E7DB]">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => { setProjectSubView("list"); window.location.hash = "#projects"; }}
                    className="px-4 py-2 bg-[#FAF6F0] border border-[#F3E2CE] hover:bg-white text-[#3b1400] hover:text-[#D97706] font-bold text-xs uppercase tracking-wider rounded-lg transition-all font-orbitron flex items-center gap-2 cursor-pointer"
                  >
                    <span>&larr; Back to Projects List</span>
                  </button>
                  <div>
                    <h2 className="text-xl font-black text-[#3b1400] font-orbitron uppercase flex items-center gap-2.5">
                      <span className="text-[#D97706]">{editingProjectId ? "✏️" : "➕"}</span>
                      {editingProjectId ? `Edit Project: ${pTitle}` : "Create New Project Case Study"}
                    </h2>
                    <p className="text-xs text-[#703513] font-medium mt-0.5">
                      Fill in the complete project details, Drag &amp; Drop images, tech stack, and case study sections below.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => { setProjectSubView("list"); window.location.hash = "#projects"; }}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase rounded-lg transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProject}
                    className="px-6 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all font-orbitron cursor-pointer"
                  >
                    {editingProjectId ? "Save Changes →" : "Publish Project →"}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-8 text-xs font-medium">
                {/* 1. Basic Details */}
                <div className="p-6 bg-[#FAF8F5] border border-[#F3E7DB] rounded-2xl space-y-5">
                  <h3 className="text-sm font-black text-[#3b1400] font-orbitron uppercase tracking-wider text-[#D97706] flex items-center gap-2">
                    <span>📌</span> Section 1: Basic Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={pTitle}
                        onChange={(e) => handlePTitleChange(e.target.value)}
                        placeholder="Dilbahar's E-Commerce"
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706] font-semibold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">URL Slug</label>
                      <input
                        type="text"
                        value={pSlug}
                        onChange={(e) => setPSlug(e.target.value)}
                        placeholder="dilbahars-ecommerce"
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706] font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Tagline / Subtitle</label>
                    <input
                      type="text"
                      value={pTagline}
                      onChange={(e) => setPTagline(e.target.value)}
                      placeholder="A modern e-commerce platform for seamless online shopping..."
                      className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Category</label>
                      <select
                        value={pCategory}
                        onChange={(e) => setPCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706] font-bold"
                      >
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="CRM & ERP">CRM & ERP</option>
                        <option value="Web & Mobile Apps">Web & Mobile Apps</option>
                        <option value="Custom Software">Custom Software</option>
                        <option value="Agency & Corporate">Agency & Corporate</option>
                        <option value="Fintech & Banking">Fintech & Banking</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Role</label>
                      <input
                        type="text"
                        value={pRole}
                        onChange={(e) => setPRole(e.target.value)}
                        placeholder="Fullstack Architect"
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Year</label>
                      <input
                        type="text"
                        value={pYear}
                        onChange={(e) => setPYear(e.target.value)}
                        placeholder="2026"
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Skills / Tech Stack (comma separated)</label>
                      <input
                        type="text"
                        value={pTechStackStr}
                        onChange={(e) => setPTechStackStr(e.target.value)}
                        placeholder="React.js, Next.js, Node.js, Express.js, MongoDB, Redux, JWT"
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">SEO Keywords (comma separated)</label>
                      <input
                        type="text"
                        value={pKeywordsStr}
                        onChange={(e) => setPKeywordsStr(e.target.value)}
                        placeholder="E-Commerce, Web App, UI/UX, Razorpay"
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Short Description *</label>
                    <textarea
                      rows={2}
                      required
                      value={pDescription}
                      onChange={(e) => setPDescription(e.target.value)}
                      placeholder="Short summary of the project for cards and search..."
                      className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Detailed Project Overview (Multi-paragraph)</label>
                    <textarea
                      rows={4}
                      value={pOverview}
                      onChange={(e) => setPOverview(e.target.value)}
                      placeholder="Expanded case study overview. Use blank lines between paragraphs..."
                      className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

                {/* 2. Technical Implementation & Features */}
                <div className="p-6 bg-[#FAF8F5] border border-[#F3E7DB] rounded-2xl space-y-5">
                  <h3 className="text-sm font-black text-[#3b1400] font-orbitron uppercase tracking-wider text-[#D97706] flex items-center gap-2">
                    <span>⚙️</span> Section 2: Technical Architecture &amp; Key Highlights
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Architecture Breakdown</label>
                      <textarea
                        rows={3}
                        value={pArchitecture}
                        onChange={(e) => setPArchitecture(e.target.value)}
                        placeholder="Built with Next.js & React frontend, Node.js & Express REST API, MongoDB Atlas..."
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Styling &amp; Motion Details</label>
                      <textarea
                        rows={3}
                        value={pStyling}
                        onChange={(e) => setPStyling(e.target.value)}
                        placeholder="Styled using custom responsive Tailwind tokens, fluid micro-interactions..."
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Key Highlights &amp; Features (1 Feature Per Line)</label>
                    <textarea
                      rows={4}
                      value={pHighlightsStr}
                      onChange={(e) => setPHighlightsStr(e.target.value)}
                      placeholder="Integrated Razorpay Payment Gateway & BlueDart Order Tracking API&#10;Developed JWT authentication & Role-Based Access Control (RBAC)&#10;Mobile-first responsive UI built for 60fps performance"
                      className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706] font-mono text-xs"
                    />
                  </div>
                </div>

                {/* 3. Drag & Drop Multi-Image Dropzone & Gallery */}
                <div className="p-6 bg-[#FAF8F5] border border-[#F3E7DB] rounded-2xl space-y-6">
                  <h3 className="text-sm font-black text-[#3b1400] font-orbitron uppercase tracking-wider text-[#D97706] flex items-center gap-2">
                    <span>🖼️</span> Section 3: Drag &amp; Drop Multi-Image Upload &amp; Gallery
                  </h3>

                  {/* Drag and Drop Dropzone Box */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropImages}
                    className={`p-8 border-2 border-dashed rounded-2xl text-center transition-all ${
                      isDragging
                        ? "border-[#D97706] bg-[#FFF8F0] scale-[1.01]"
                        : "border-[#D97706]/40 bg-white hover:border-[#D97706]"
                    }`}
                  >
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-14 h-14 mx-auto rounded-full bg-[#D97706]/15 text-[#D97706] flex items-center justify-center text-2xl font-bold">
                        📁
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#3b1400] text-sm font-orbitron">
                          Drag &amp; Drop Image Files Here
                        </h4>
                        <p className="text-xs text-[#703513] mt-1">
                          Drop multiple JPG, PNG, or WebP screenshot images directly from your computer.
                        </p>
                      </div>

                      <div className="pt-2 flex justify-center">
                        <label className="px-5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all font-orbitron">
                          Browse Files
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileInputChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Live Thumbnails Grid */}
                  {(() => {
                    const galleryList = pImagesStr.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
                    if (galleryList.length === 0 && !pImage) return null;
                    return (
                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-xs text-[#3b1400] uppercase tracking-wider font-orbitron flex items-center gap-2">
                          <span>📸</span> Uploaded Images Gallery ({galleryList.length})
                        </h4>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {galleryList.map((imgUrl, idx) => {
                            const isMainCover = pImage === imgUrl;
                            return (
                              <div
                                key={idx}
                                className={`relative p-2 bg-white rounded-xl border-2 space-y-2 group transition-all ${
                                  isMainCover ? "border-[#D97706] shadow-md ring-2 ring-[#D97706]/20" : "border-[#F3E7DB]"
                                }`}
                              >
                                <div className="relative w-full h-28 rounded-lg overflow-hidden bg-black">
                                  <img src={imgUrl} alt={`Uploaded ${idx + 1}`} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                  {isMainCover && (
                                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#D97706] text-white text-[9px] font-bold font-mono rounded">
                                      ★ Main Cover
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5">
                                  {!isMainCover && (
                                    <button
                                      type="button"
                                      onClick={() => setPImage(imgUrl)}
                                      className="flex-1 py-1 bg-amber-500/10 hover:bg-[#D97706] hover:text-white text-[#D97706] text-[10px] font-bold rounded transition-all cursor-pointer"
                                    >
                                      Set Cover
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => removeGalleryImage(imgUrl)}
                                    className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold rounded cursor-pointer"
                                    title="Delete Image"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Cloudinary File Upload & Manual URL Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[#3b1400] font-bold uppercase text-[10px]">Main Cover Image (Cloudinary or URL)</label>
                        <label className="cursor-pointer text-[10px] font-bold text-[#D97706] hover:underline flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                          <span>☁️ {isUploadingImage ? "Uploading..." : "Upload File to Cloudinary"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCloudinaryFileUpload(e, false)}
                            disabled={isUploadingImage}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={pImage}
                        onChange={(e) => setPImage(e.target.value)}
                        placeholder="https://res.cloudinary.com/dpnoynz7a/..."
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706] font-mono text-xs"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[#3b1400] font-bold uppercase text-[10px]">Gallery Screenshots (Cloudinary or URLs)</label>
                        <label className="cursor-pointer text-[10px] font-bold text-[#D97706] hover:underline flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                          <span>☁️ {isUploadingImage ? "Uploading..." : "Add Image to Cloudinary"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCloudinaryFileUpload(e, true)}
                            disabled={isUploadingImage}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <textarea
                        rows={3}
                        value={pImagesStr}
                        onChange={(e) => setPImagesStr(e.target.value)}
                        placeholder="https://res.cloudinary.com/dpnoynz7a/...&#10;https://res.cloudinary.com/dpnoynz7a/..."
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706] font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Links & Actions */}
                <div className="p-6 bg-[#FAF8F5] border border-[#F3E7DB] rounded-2xl space-y-5">
                  <h3 className="text-sm font-black text-[#3b1400] font-orbitron uppercase tracking-wider text-[#D97706] flex items-center gap-2">
                    <span>🔗</span> Section 4: Demo Links &amp; Showcase Visibility
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">Live Demo Link</label>
                      <input
                        type="text"
                        value={pLink}
                        onChange={(e) => setPLink(e.target.value)}
                        placeholder="https://www.dilbahars.com/"
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#3b1400] font-bold mb-1.5 uppercase text-[10px]">GitHub Repository Link</label>
                      <input
                        type="text"
                        value={pSourceCode}
                        onChange={(e) => setPSourceCode(e.target.value)}
                        placeholder="https://github.com/harshitasharma/dilbahars"
                        className="w-full px-4 py-3 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-xl focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="pFeatured"
                      checked={pFeatured}
                      onChange={(e) => setPFeatured(e.target.checked)}
                      className="w-5 h-5 accent-[#D97706] rounded cursor-pointer"
                    />
                    <label htmlFor="pFeatured" className="text-[#3b1400] font-bold text-xs cursor-pointer">
                      Feature on Main Portfolio Showcase &amp; Hero Carousel
                    </label>
                  </div>
                </div>

                {/* 5. Challenges & Solutions */}
                <div className="p-6 bg-[#FAF8F5] border border-[#F3E7DB] rounded-2xl space-y-5">
                  <h3 className="text-sm font-black text-[#3b1400] font-orbitron uppercase tracking-wider text-[#D97706] flex items-center gap-2">
                    <span>💡</span> Section 5: Key Challenges &amp; Solutions
                  </h3>

                  <div className="space-y-4">
                    {/* Challenge 1 */}
                    <div className="p-4 bg-white border border-[#F3E2CE] rounded-xl space-y-3">
                      <h4 className="font-bold text-[#D97706] uppercase text-[11px]">Challenge #1</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">The Problem #1</label>
                          <textarea
                            rows={2}
                            value={pProb1}
                            onChange={(e) => setPProb1(e.target.value)}
                            placeholder="High memory usage on mobile devices due to large 3D assets."
                            className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">The Solution #1</label>
                          <textarea
                            rows={2}
                            value={pSol1}
                            onChange={(e) => setPSol1(e.target.value)}
                            placeholder="Utilizing GLTF-Transform for mesh compression and texture resizing..."
                            className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Challenge 2 */}
                    <div className="p-4 bg-white border border-[#F3E2CE] rounded-xl space-y-3">
                      <h4 className="font-bold text-[#D97706] uppercase text-[11px]">Challenge #2</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">The Problem #2</label>
                          <textarea
                            rows={2}
                            value={pProb2}
                            onChange={(e) => setPProb2(e.target.value)}
                            placeholder="Syncing 3D state with Next.js UI components without lag."
                            className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">The Solution #2</label>
                          <textarea
                            rows={2}
                            value={pSol2}
                            onChange={(e) => setPSol2(e.target.value)}
                            placeholder="Implemented Zustand state updates decoupled from React re-renders..."
                            className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Action Bar */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#F3E7DB]">
                  <button
                    type="button"
                    onClick={() => setProjectSubView("list")}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase rounded-xl transition-all cursor-pointer"
                  >
                    Cancel / Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold uppercase tracking-wider rounded-xl shadow-lg transition-all font-orbitron cursor-pointer"
                  >
                    {editingProjectId ? "Save Changes →" : "Save & Publish Project →"}
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      )}

      {/* ---------------- 2. EXPERTISE MANAGER TAB ---------------- */}
      {activeTab === "expertise" && (
        <div className="grid lg:grid-cols-12 gap-8">
          <section className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-white border border-[#F3E7DB] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3E7DB]">
              <h2 className="text-lg font-black text-[#3b1400] font-orbitron uppercase flex items-center gap-2">
                <span className="text-[#D97706]">{editingExpertiseId ? "✏️" : "💡"}</span>
                {editingExpertiseId ? "Edit Expertise Item" : "Add New Expertise Item"}
              </h2>
              {editingExpertiseId && (
                <button onClick={resetExpertiseForm} className="text-xs text-[#D97706] hover:underline font-bold">
                  + Create New Instead
                </button>
              )}
            </div>

            <form onSubmit={handleSaveExpertise} className="space-y-6 text-xs font-medium">
              {/* Section 1: Basic Information */}
              <div className="p-4 bg-[#FAF8F5] border border-[#F3E7DB] rounded-xl space-y-4">
                <h3 className="font-bold text-[#D97706] uppercase text-[11px] font-orbitron">Section 1: Basic Info &amp; Header Badge</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Title *</label>
                    <input
                      type="text"
                      required
                      value={eTitle}
                      onChange={(e) => handleETitleChange(e.target.value)}
                      placeholder="React.js & Next.js"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">URL Slug</label>
                    <input
                      type="text"
                      value={eSlug}
                      onChange={(e) => setESlug(e.target.value)}
                      placeholder="react-nextjs"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706] font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Category</label>
                    <select
                      value={eCategory}
                      onChange={(e) => setECategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Databases">Databases</option>
                      <option value="Messaging & Caching">Messaging & Caching</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Integrations">Integrations</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Badge Banner Text</label>
                    <input
                      type="text"
                      value={eBadge}
                      onChange={(e) => setEBadge(e.target.value)}
                      placeholder="FRONTEND ARCHITECTURE"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Subtitle / Tagline *</label>
                  <input
                    type="text"
                    required
                    value={eTagline}
                    onChange={(e) => setETagline(e.target.value)}
                    placeholder="Architecting high-performance web applications with React 19 & Next.js 15..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                  />
                </div>
              </div>

              {/* Section 2: Technical Philosophy & Deep Dive */}
              <div className="p-4 bg-[#FAF8F5] border border-[#F3E7DB] rounded-xl space-y-4">
                <h3 className="font-bold text-[#D97706] uppercase text-[11px] font-orbitron">Section 2: Philosophy &amp; Deep-Dive Analysis</h3>
                <div>
                  <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Technical Philosophy</label>
                  <textarea
                    rows={2}
                    value={ePhilosophy}
                    onChange={(e) => setEPhilosophy(e.target.value)}
                    placeholder="Specializing in Next.js 15 App Router, React Server Components..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Deep-Dive Architectural Analysis</label>
                  <textarea
                    rows={3}
                    value={eDeepDive}
                    onChange={(e) => setEDeepDive(e.target.value)}
                    placeholder="Next.js 15 introduces granular caching and PPR (Partial Prerendering)..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                  />
                </div>
              </div>

              {/* Section 3: Quantitative Key Metrics */}
              <div className="p-4 bg-[#FAF8F5] border border-[#F3E7DB] rounded-xl space-y-4">
                <h3 className="font-bold text-[#D97706] uppercase text-[11px] font-orbitron">Section 3: Key Performance Metrics (4 Metrics)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[9px]">M1 Value</label>
                    <input type="text" value={eM1Val} onChange={(e) => setEM1Val(e.target.value)} placeholder="< 0.8s" className="w-full px-3 py-2 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg text-xs" />
                  </div>
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[9px]">M1 Label</label>
                    <input type="text" value={eM1Lbl} onChange={(e) => setEM1Lbl(e.target.value)} placeholder="LCP LOAD TIME" className="w-full px-3 py-2 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg text-xs" />
                  </div>

                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[9px]">M2 Value</label>
                    <input type="text" value={eM2Val} onChange={(e) => setEM2Val(e.target.value)} placeholder="100%" className="w-full px-3 py-2 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg text-xs" />
                  </div>
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[9px]">M2 Label</label>
                    <input type="text" value={eM2Lbl} onChange={(e) => setEM2Lbl(e.target.value)} placeholder="LIGHTHOUSE SCORE" className="w-full px-3 py-2 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg text-xs" />
                  </div>

                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[9px]">M3 Value</label>
                    <input type="text" value={eM3Val} onChange={(e) => setEM3Val(e.target.value)} placeholder="70%" className="w-full px-3 py-2 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg text-xs" />
                  </div>
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[9px]">M3 Label</label>
                    <input type="text" value={eM3Lbl} onChange={(e) => setEM3Lbl(e.target.value)} placeholder="BUNDLE REDUCTION" className="w-full px-3 py-2 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg text-xs" />
                  </div>

                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[9px]">M4 Value</label>
                    <input type="text" value={eM4Val} onChange={(e) => setEM4Val(e.target.value)} placeholder="0 ms" className="w-full px-3 py-2 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg text-xs" />
                  </div>
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[9px]">M4 Label</label>
                    <input type="text" value={eM4Lbl} onChange={(e) => setEM4Lbl(e.target.value)} placeholder="LAYOUT SHIFT (CLS)" className="w-full px-3 py-2 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg text-xs" />
                  </div>
                </div>
              </div>

              {/* Section 4: Core Architectural Concepts */}
              <div className="p-4 bg-[#FAF8F5] border border-[#F3E7DB] rounded-xl space-y-4">
                <h3 className="font-bold text-[#D97706] uppercase text-[11px] font-orbitron">Section 4: Core Architectural Concepts</h3>
                
                {/* Concept 1 */}
                <div className="p-3 bg-white border border-[#F3E2CE] rounded-lg space-y-2">
                  <h4 className="font-bold text-[#3b1400] text-xs">Concept #1</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={eC1Title} onChange={(e) => setEC1Title(e.target.value)} placeholder="Title (e.g. React Server Components)" className="px-3 py-2 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded text-xs" />
                    <input type="text" value={eC1Sub} onChange={(e) => setEC1Sub(e.target.value)} placeholder="Subtitle (e.g. Zero Bundle Size)" className="px-3 py-2 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded text-xs" />
                  </div>
                  <textarea rows={2} value={eC1Desc} onChange={(e) => setEC1Desc(e.target.value)} placeholder="Description..." className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded text-xs" />
                </div>

                {/* Concept 2 */}
                <div className="p-3 bg-white border border-[#F3E2CE] rounded-lg space-y-2">
                  <h4 className="font-bold text-[#3b1400] text-xs">Concept #2</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={eC2Title} onChange={(e) => setEC2Title(e.target.value)} placeholder="Title (e.g. Server Actions)" className="px-3 py-2 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded text-xs" />
                    <input type="text" value={eC2Sub} onChange={(e) => setEC2Sub(e.target.value)} placeholder="Subtitle (e.g. Type-Safe RPC)" className="px-3 py-2 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded text-xs" />
                  </div>
                  <textarea rows={2} value={eC2Desc} onChange={(e) => setEC2Desc(e.target.value)} placeholder="Description..." className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded text-xs" />
                </div>
              </div>

              {/* Section 5: Battle-Tested Code Snippet */}
              <div className="p-4 bg-[#FAF8F5] border border-[#F3E7DB] rounded-xl space-y-4">
                <h3 className="font-bold text-[#D97706] uppercase text-[11px] font-orbitron">Section 5: Production Code Snippet</h3>
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" value={eCodeTitle} onChange={(e) => setECodeTitle(e.target.value)} placeholder="Snippet Title" className="col-span-2 px-3 py-2 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg text-xs" />
                  <input type="text" value={eCodeLang} onChange={(e) => setECodeLang(e.target.value)} placeholder="Language (typescript)" className="px-3 py-2 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg text-xs font-mono" />
                </div>
                <div>
                  <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[9px]">Code Body</label>
                  <textarea
                    rows={5}
                    value={eCodeSnippet}
                    onChange={(e) => setECodeSnippet(e.target.value)}
                    placeholder="// Paste production code snippet here..."
                    className="w-full px-3.5 py-2.5 bg-[#120c06] text-amber-200 border border-[#D97706]/30 rounded-lg focus:outline-none font-mono text-xs leading-relaxed"
                  />
                </div>
              </div>

              {/* Section 6: Tools, Skills & Best Practices */}
              <div className="p-4 bg-[#FAF8F5] border border-[#F3E7DB] rounded-xl space-y-4">
                <h3 className="font-bold text-[#D97706] uppercase text-[11px] font-orbitron">Section 6: Tools, Skills &amp; Standards</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Associated Tools (comma-separated)</label>
                    <input
                      type="text"
                      value={eToolsStr}
                      onChange={(e) => setEToolsStr(e.target.value)}
                      placeholder="React.js, Next.js, Tailwind CSS"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Skills &amp; Capabilities (comma-separated)</label>
                    <input
                      type="text"
                      value={eSkillsStr}
                      onChange={(e) => setESkillsStr(e.target.value)}
                      placeholder="Server Components, SSR & ISR"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Production Best Practices &amp; Standards (1 per line)</label>
                  <textarea
                    rows={3}
                    value={eBestPracticesStr}
                    onChange={(e) => setEBestPracticesStr(e.target.value)}
                    placeholder="Keep 'use client' directives isolated strictly at leaves.&#10;Enforce Zod schema validation on Server Actions."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                  />
                </div>
              </div>

              {/* Section 7: Strategic Implementation Workflow */}
              <div className="p-4 bg-[#FAF8F5] border border-[#F3E7DB] rounded-xl space-y-4">
                <h3 className="font-bold text-[#D97706] uppercase text-[11px] font-orbitron">Section 7: Strategic Implementation Workflow (4 Steps)</h3>
                
                {/* Step 1 */}
                <div className="p-3 bg-white border border-[#F3E2CE] rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="text" value={eW1Num} onChange={(e) => setEW1Num(e.target.value)} placeholder="1" className="w-10 px-2 py-1 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-center font-bold text-xs" />
                    <input type="text" value={eW1Title} onChange={(e) => setEW1Title(e.target.value)} placeholder="Step 1 Title (e.g. Modular Component Architecture)" className="flex-1 px-3 py-1.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-xs font-bold" />
                  </div>
                  <input type="text" value={eW1Desc} onChange={(e) => setEW1Desc(e.target.value)} placeholder="Step 1 Description..." className="w-full px-3 py-1.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-xs" />
                </div>

                {/* Step 2 */}
                <div className="p-3 bg-white border border-[#F3E2CE] rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="text" value={eW2Num} onChange={(e) => setEW2Num(e.target.value)} placeholder="2" className="w-10 px-2 py-1 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-center font-bold text-xs" />
                    <input type="text" value={eW2Title} onChange={(e) => setEW2Title(e.target.value)} placeholder="Step 2 Title (e.g. Predictable State Management)" className="flex-1 px-3 py-1.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-xs font-bold" />
                  </div>
                  <input type="text" value={eW2Desc} onChange={(e) => setEW2Desc(e.target.value)} placeholder="Step 2 Description..." className="w-full px-3 py-1.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-xs" />
                </div>

                {/* Step 3 */}
                <div className="p-3 bg-white border border-[#F3E2CE] rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="text" value={eW3Num} onChange={(e) => setEW3Num(e.target.value)} placeholder="3" className="w-10 px-2 py-1 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-center font-bold text-xs" />
                    <input type="text" value={eW3Title} onChange={(e) => setEW3Title(e.target.value)} placeholder="Step 3 Title (e.g. Performance-First Optimization)" className="flex-1 px-3 py-1.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-xs font-bold" />
                  </div>
                  <input type="text" value={eW3Desc} onChange={(e) => setEW3Desc(e.target.value)} placeholder="Step 3 Description..." className="w-full px-3 py-1.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-xs" />
                </div>

                {/* Step 4 */}
                <div className="p-3 bg-white border border-[#F3E2CE] rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="text" value={eW4Num} onChange={(e) => setEW4Num(e.target.value)} placeholder="4" className="w-10 px-2 py-1 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-center font-bold text-xs" />
                    <input type="text" value={eW4Title} onChange={(e) => setEW4Title(e.target.value)} placeholder="Step 4 Title (e.g. Strict TypeScript Typing)" className="flex-1 px-3 py-1.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-xs font-bold" />
                  </div>
                  <input type="text" value={eW4Desc} onChange={(e) => setEW4Desc(e.target.value)} placeholder="Step 4 Description..." className="w-full px-3 py-1.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] text-xs" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold uppercase tracking-wider rounded-xl shadow-md font-orbitron text-xs cursor-pointer"
              >
                {editingExpertiseId ? "Update Expertise →" : "Save & Publish Expertise →"}
              </button>
            </form>
          </section>

          {/* Expertise List */}
          <section className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-white border border-[#F3E7DB] shadow-sm space-y-4">
            <h2 className="text-lg font-black text-[#3b1400] font-orbitron uppercase">Expertise Competencies ({expertise.length})</h2>
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {expertise.map((exp) => (
                <div key={exp.id} className="p-4 bg-[#FAF8F5] border border-[#F3E7DB] rounded-xl flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-700 text-[10px] font-bold font-mono uppercase">{exp.category}</span>
                    <h4 className="font-bold text-[#3b1400] text-sm font-orbitron mt-1">{exp.title}</h4>
                    <p className="text-xs text-[#703513] line-clamp-2">{exp.tagline}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {(exp.tools || []).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white border border-[#F3E7DB] text-[10px] font-mono text-[#703513]">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button onClick={() => handleEditExpertise(exp)} className="px-3 py-1 bg-[#FFF8F0] border border-[#D97706]/30 text-[#D97706] text-xs font-bold rounded">Edit</button>
                    <button onClick={() => handleDeleteExpertise(exp.id)} className="px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ---------------- 3. BLOG MANAGER TAB ---------------- */}
      {activeTab === "blogs" && (
        <div className="grid lg:grid-cols-12 gap-8">
          <section className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-white border border-[#F3E7DB] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3E7DB]">
              <h2 className="text-lg font-black text-[#3b1400] font-orbitron uppercase flex items-center gap-2">
                <span className="text-[#D97706]">{editingBlogId ? "✏️" : "✍️"}</span>
                {editingBlogId ? "Edit Blog Article" : "Write New Blog Article"}
              </h2>
              {editingBlogId && (
                <button onClick={resetBlogForm} className="text-xs text-[#D97706] hover:underline font-bold">
                  + Write New Instead
                </button>
              )}
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Article Title *</label>
                <input
                  type="text"
                  required
                  value={bTitle}
                  onChange={(e) => handleBTitleChange(e.target.value)}
                  placeholder="Mastering Next.js 15 Server Components"
                  className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Category</label>
                  <select
                    value={bCategory}
                    onChange={(e) => setBCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Database">Database</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Read Time</label>
                  <input
                    type="text"
                    value={bReadTime}
                    onChange={(e) => setBReadTime(e.target.value)}
                    placeholder="5 min read"
                    className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={bTagsStr}
                    onChange={(e) => setBTagsStr(e.target.value)}
                    placeholder="Next.js, React.js"
                    className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Article Snippet / Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={bSnippet}
                  onChange={(e) => setBSnippet(e.target.value)}
                  placeholder="A practical guide to leveraging React Server Components..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                />
              </div>

              <div>
                <label className="block text-[#3b1400] font-bold mb-1 uppercase text-[10px]">Full Content (Markdown / Detailed Text)</label>
                <textarea
                  rows={4}
                  value={bContent}
                  onChange={(e) => setBContent(e.target.value)}
                  placeholder="Detailed article body content..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#F3E2CE] text-[#3b1400] rounded-lg focus:outline-none focus:border-[#D97706]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold uppercase tracking-wider rounded-lg shadow-md font-orbitron"
              >
                {editingBlogId ? "Update Article →" : "Publish Blog Article →"}
              </button>
            </form>
          </section>

          {/* Blogs Table */}
          <section className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-white border border-[#F3E7DB] shadow-sm space-y-4">
            <h2 className="text-lg font-black text-[#3b1400] font-orbitron uppercase">Published Blogs ({blogs.length})</h2>
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {blogs.map((b) => (
                <div key={b.id} className="p-4 bg-[#FAF8F5] border border-[#F3E7DB] rounded-xl flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 text-[10px] font-bold font-mono uppercase">{b.category}</span>
                      <span className="text-[10px] text-[#703513] font-mono">{b.date} &bull; {b.readTime}</span>
                    </div>
                    <h4 className="font-bold text-[#3b1400] text-sm font-orbitron mt-1">{b.title}</h4>
                    <p className="text-xs text-[#703513] line-clamp-2">{b.snippet}</p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button onClick={() => handleEditBlog(b)} className="px-3 py-1 bg-[#FFF8F0] border border-[#D97706]/30 text-[#D97706] text-xs font-bold rounded">Edit</button>
                    <button onClick={() => handleDeleteBlog(b.id)} className="px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ---------------- 4. CONTACT INBOX TAB ---------------- */}
      {activeTab === "inbox" && (
        <section id="messages-table" className="p-6 sm:p-7 rounded-2xl bg-white border border-[#F3E7DB] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F3E7DB]">
            <h2 className="text-lg font-black text-[#3b1400] font-orbitron flex items-center gap-2 uppercase">
              <span className="text-[#D97706]">📬</span> Client Inquiries Inbox ({messages.length})
            </h2>
            <button onClick={fetchAllData} className="px-3 py-1 bg-[#FAF6F0] border border-[#D97706]/30 text-[#D97706] text-xs font-bold rounded font-mono">
              ↻ Refresh Inbox
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#F3E7DB]">
            <table className="w-full text-left text-xs text-[#3b1400] border-collapse">
              <thead>
                <tr className="bg-[#FAF6F0] border-b border-[#F3E7DB] text-[#D97706] font-extrabold uppercase tracking-wider font-orbitron">
                  <th className="py-3.5 px-4">Sender</th>
                  <th className="py-3.5 px-4">Email Address</th>
                  <th className="py-3.5 px-4">Message Content</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3E7DB]">
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 px-4 text-center text-[#703513]">No client messages in inbox.</td>
                  </tr>
                ) : (
                  messages.map((m) => (
                    <tr key={m.id} className="hover:bg-[#FFF8F0] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#3b1400]">{m.name}</td>
                      <td className="py-3.5 px-4 text-[#D97706] font-semibold">{m.email}</td>
                      <td className="py-3.5 px-4 text-[#3b1400] max-w-md">{m.message}</td>
                      <td className="py-3.5 px-4 text-[#703513] font-mono text-[11px]">{m.date}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteMessage(m.id)}
                          className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold rounded hover:bg-rose-600 hover:text-white transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
        </main>
      </div>
    </div>
  );
}
