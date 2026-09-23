"use client";

import React, { useState } from "react";

export interface VaultSnippet {
  id: string;
  category: string;
  title: string;
  language: string;
  code: string;
}

const defaultSnippets: VaultSnippet[] = [
  {
    id: "nextjs-middleware",
    category: "NEXT.JS 15",
    title: "Secure Redirect Middleware",
    language: "typescript",
    code: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');

  // Redirect www to non-www
  if (host?.startsWith('www.')) {
    url.host = host.replace('www.', '');
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  return response;
}`,
  },
  {
    id: "express-auth",
    category: "EXPRESS.JS & MERN",
    title: "JWT & RBAC Auth Middleware",
    language: "typescript",
    code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const authenticateRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access Denied: No Token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Forbidden: Insufficient Role' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ error: 'Invalid Token' });
    }
  };
};`,
  },
  {
    id: "mongodb-pipeline",
    category: "MONGODB",
    title: "Dashboard Analytics Pipeline",
    language: "typescript",
    code: `import { Db } from 'mongodb';

export async function getRevenueAnalytics(db: Db) {
  return await db.collection('orders').aggregate([
    {
      $match: {
        status: 'COMPLETED',
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        totalRevenue: { $sum: '$amount' },
        totalOrders: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]).toArray();
}`,
  },
  {
    id: "react-optimistic",
    category: "REACT 19",
    title: "Optimistic UI Action Hook",
    language: "typescript",
    code: `import { useOptimistic, useTransition } from 'react';

export function useOptimisticState<T extends { id: string }>(initialItems: T[]) {
  const [isPending, startTransition] = useTransition();
  const [optimisticItems, setOptimisticItems] = useOptimistic(
    initialItems,
    (state, newItem: T) => [newItem, ...state]
  );

  const addItem = (newItem: T, asyncAction: () => Promise<void>) => {
    startTransition(async () => {
      setOptimisticItems(newItem);
      await asyncAction();
    });
  };

  return { items: optimisticItems, addItem, isPending };
}`,
  },
];

interface TheVaultProps {
  snippets?: VaultSnippet[];
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
}

export default function TheVault({
  snippets = defaultSnippets,
  badgeText = "OPEN SOURCE",
  titlePrefix = "The ",
  titleHighlight = "Vault",
  subtitle = "A curated collection of battle-tested MERN & Next.js code snippets and architectural patterns I use in production.",
}: TheVaultProps) {
  const [activeTabId, setActiveTabId] = useState<string>(snippets[0]?.id || "");
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = snippets.find((s) => s.id === activeTabId) || snippets[0];

  const handleCopy = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="vault" className="w-full py-12 sm:py-16 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#FFF8F0] border border-[#F3E2CE] shadow-2xs">
            <svg
              className="w-3.5 h-3.5 text-[#D97706]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M16 18L22 12L16 6" />
              <path d="M8 6L2 12L8 18" />
            </svg>
            <span
              className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D97706]"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              {badgeText}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#3b1400]"
            style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
          >
            {titlePrefix}
            <span className="text-[#D97706]">{titleHighlight}</span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base text-[#703513]/85 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Tab Selection Cards - Compact Width Row */}
        <div className="flex flex-wrap items-center gap-3">
          {snippets.map((snip) => {
            const isActive = snip.id === activeTabId;
            return (
              <button
                key={snip.id}
                onClick={() => setActiveTabId(snip.id)}
                className={`px-4 py-2.5 text-left rounded-lg transition-all duration-300 flex flex-col justify-between max-w-[220px] flex-1 sm:flex-initial ${
                  isActive
                    ? "bg-[#3b1400] text-white shadow-md ring-2 ring-[#D97706]"
                    : "bg-white text-[#3b1400] border border-[#F3E7DB] hover:bg-[#FAF7F2] hover:border-[#D97706]/30"
                }`}
              >
                <span
                  className={`text-[9px] font-black uppercase tracking-wider block mb-0.5 ${
                    isActive ? "text-[#D97706]" : "text-[#703513]/70"
                  }`}
                  style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                >
                  {snip.category}
                </span>
                <h3
                  className="text-xs sm:text-[13px] font-bold leading-tight"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  {snip.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Dark Terminal Code Editor Window */}
        <div className="bg-[#120c06] rounded-xl border border-[#D97706]/30 shadow-2xl overflow-hidden">
          {/* Top Window Header Bar */}
          <div className="bg-[#1a1209] px-6 py-4 border-b border-[#D97706]/20 flex items-center justify-between">
            {/* Window Controls (Red, Yellow, Green circles) */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span
                className="text-xs font-bold text-amber-200/60 ml-3 hidden sm:inline-block font-mono"
              >
                {activeSnippet.id}.ts
              </span>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-colors font-mono"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Text Content */}
          <div className="p-6 sm:p-8 overflow-x-auto">
            <pre className="font-mono text-xs sm:text-sm leading-relaxed text-amber-100/90 whitespace-pre">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
