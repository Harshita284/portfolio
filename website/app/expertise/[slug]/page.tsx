"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
}

interface KeyMetric {
  value: string;
  label: string;
}

interface ConceptItem {
  title: string;
  subtitle: string;
  desc: string;
}

interface WorkflowStep {
  number: string;
  title: string;
  desc: string;
}

interface ExpertiseData {
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  philosophy: string;
  deepDive: string;
  metrics: KeyMetric[];
  codeSnippet: {
    title: string;
    language: string;
    code: string;
  };
  concepts: ConceptItem[];
  tools: string[];
  skills: string[];
  bestPractices: string[];
  workflow: WorkflowStep[];
  caseStudies: CaseStudy[];
}

const EXPERTISE_DICTIONARY: Record<string, ExpertiseData> = {
  "react-nextjs": {
    slug: "react-nextjs",
    title: "React 19 & Next.js 15",
    badge: "FRONTEND ARCHITECTURE",
    tagline: "Architecting high-performance, SEO-optimized web applications with modern RSC & Server Action patterns.",
    philosophy:
      "Specializing in Next.js 15 App Router, I leverage React Server Components, Server Actions, and Incremental Static Regeneration (ISR) to build lightning-fast, zero-JS bundle client pages. My approach focuses on Core Web Vitals, accessibility, and clean atomic design architectures.",
    deepDive:
      "Next.js 15 introduces granular caching, PPR (Partial Prerendering), and seamless server-side execution. By shifting data fetching exclusively to Server Components, we eliminate client-side waterfalls, reduce JavaScript payload sizes by up to 70%, and guarantee sub-second LCP scores.",
    metrics: [
      { value: "< 0.8s", label: "LCP LOAD TIME" },
      { value: "100%", label: "LIGHTHOUSE SCORE" },
      { value: "70%", label: "BUNDLE REDUCTION" },
      { value: "0 ms", label: "LAYOUT SHIFT (CLS)" },
    ],
    codeSnippet: {
      title: "Next.js 15 Server Action & Type-Safe Mutation",
      language: "typescript",
      code: `'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';

const createProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 chars"),
  category: z.string().min(2),
  techStack: z.array(z.string()),
});

export async function createProjectAction(prevState: any, formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    category: formData.get('category'),
    techStack: formData.getAll('techStack'),
  };

  const validation = createProjectSchema.safeParse(rawData);
  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  // Database mutation logic
  await db.project.create({ data: validation.data });

  revalidateTag('projects');
  revalidatePath('/projects');
  return { success: true, message: "Project created successfully!" };
}`,
    },
    concepts: [
      { title: "React Server Components", subtitle: "Zero Bundle Size", desc: "Executing data fetch logic on server for zero client-side JavaScript overhead." },
      { title: "Server Actions", subtitle: "Type-Safe RPC", desc: "Native mutation functions replacing custom API endpoints and boilerplate." },
      { title: "Partial Prerendering", subtitle: "Hybrid Architecture", desc: "Instant static shell rendering combined with dynamic streaming Suspense boundaries." },
      { title: "Granular ISR", subtitle: "On-Demand Caching", desc: "Tag-based cache revalidation guaranteeing instant content freshness." },
    ],
    tools: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "Vercel", "Framer Motion", "Lighthouse"],
    skills: ["App Router Architecture", "Server Actions", "Streaming & Suspense", "Granular ISR Caching", "Atomic UI Components", "SEO & OpenGraph"],
    bestPractices: [
      "Keep 'use client' directives isolated strictly at the leaves of the render tree.",
      "Wrap asynchronous server data chunks inside Suspense boundaries for instant fallback UI.",
      "Enforce strict Zod input validation on every Server Action payload before database mutation.",
      "Optimize images automatically via next/image using AVIF and WebP formats.",
    ],
    workflow: [
      { number: "1", title: "Modular Component Architecture", desc: "Decoupled, reusable UI elements built with atomic principles." },
      { number: "2", title: "Predictable State Management", desc: "Structured state orchestration ensuring single source of truth." },
      { number: "3", title: "Performance-First Optimization", desc: "Sub-second LCP, zero layout shifts, and aggressive SSR caching." },
      { number: "4", title: "Strict TypeScript Typing", desc: "End-to-end type safety eliminating runtime bugs." },
    ],
    caseStudies: [
      { slug: "adnix-agency-interface", title: "Adnix Agency Interface", tagline: "A sleek, conversion-optimized marketing agency platform featuring Next.js 15." },
      { slug: "thebank-fintech-ecosystem", title: "TheBank Fintech Ecosystem", tagline: "Enterprise digital banking landing page & real-time telemetry dashboard." },
      { slug: "comfystride-3d-configurator", title: "ComfyStride 3D Configurator", tagline: "Immersive 3D footwear customization engine with Three.js & WebGL rendering." },
    ],
  },
  "node-js": {
    slug: "node-js",
    title: "Node.js & Server Runtime",
    badge: "HIGH-CONCURRENCY RUNTIME",
    tagline: "Building high-concurrency event-driven server runtime platforms and real-time Socket communication.",
    philosophy:
      "Leveraging Node.js non-blocking I/O event loop allows handling tens of thousands of simultaneous connections with minimal memory overhead. I construct asynchronous worker threads, WebSocket servers, streaming pipelines, and serverless background tasks.",
    deepDive:
      "Node.js excels at I/O-intensive workloads through its single-threaded event loop backed by libuv. By avoiding synchronous CPU blocking and offloading heavy tasks to worker threads or background Redis queues, we maintain microsecond response times even under sudden traffic spikes.",
    metrics: [
      { value: "50k+", label: "REQ / SEC THROUGHPUT" },
      { value: "< 5ms", label: "EVENT LOOP LATENCY" },
      { value: "99.99%", label: "UPTIME SLA" },
      { value: "10k+", label: "CONCURRENT SOCKETS" },
    ],
    codeSnippet: {
      title: "Node.js Multi-Core Cluster & Graceful Shutdown",
      language: "typescript",
      code: `import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(\`Master process \${process.pid} spawning \${numCPUs} worker processes...\`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.warn(\`Worker \${worker.process.pid} terminated. Restarting worker...\`);
    cluster.fork();
  });
} else {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'HEALTHY', workerPid: process.pid }));
  });

  server.listen(5000, () => {
    console.log(\`Worker listening on port 5000 [PID: \${process.pid}]\`);
  });

  // Graceful Shutdown Handler
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server closed gracefully. Exiting process.');
      process.exit(0);
    });
  });
}`,
    },
    concepts: [
      { title: "Non-Blocking Event Loop", subtitle: "Libuv Engine", desc: "Microtasks and macrotasks execution via high-efficiency event loop phases." },
      { title: "Worker Threads", subtitle: "Parallel CPU Processing", desc: "Offloading heavy cryptography or image crunching to separate OS threads." },
      { title: "Stream Backpressure", subtitle: "Memory Control", desc: "Managing memory bounds when processing multi-gigabyte data streams." },
      { title: "Cluster Mode", subtitle: "Multi-Core Utilization", desc: "Spawning per-CPU core processes to utilize multi-core server hardware fully." },
    ],
    tools: ["Node.js 22+", "Socket.io", "npm / pnpm", "PM2 Runtime", "Docker", "Winston Logger", "Node Worker Threads"],
    skills: ["Non-Blocking Async Event Loop", "Socket.io WebSockets", "Async Worker Threads", "Stream Processing", "Memory Profiling", "Microservice Architecture"],
    bestPractices: [
      "Never execute CPU-heavy synchronous blocking code (like readFileSync) on the main event loop.",
      "Implement SIGINT and SIGTERM OS signal listeners for zero-downtime graceful shutdowns.",
      "Monitor V8 heap allocations continuously via process.memoryUsage() to detect memory leaks.",
      "Utilize cluster mode or PM2 process manager across all available CPU cores.",
    ],
    workflow: [
      { number: "1", title: "Non-Blocking Async Architecture", desc: "Avoiding synchronous CPU blocking to maximize server throughput." },
      { number: "2", title: "WebSocket Real-Time Sockets", desc: "Establishing persistent real-time streaming channels." },
      { number: "3", title: "Memory & CPU Profiling", desc: "Using Chrome DevTools heap snapshots to eliminate memory leaks." },
      { number: "4", title: "Cluster Mode & Load Balancing", desc: "Utilizing PM2 cluster mode across all CPU cores." },
    ],
    caseStudies: [
      { slug: "thebank-fintech-ecosystem", title: "TheBank Real-Time Telemetry", tagline: "Sub-100ms financial transaction streaming backend over Socket.io." },
      { slug: "osv-school-management-erp", title: "OSV School Management ERP", tagline: "Mission-critical academic ERP backend portal powered by Node.js & Express API." },
      { slug: "adnix-agency-interface", title: "Adnix Agency API Pipeline", tagline: "High-concurrency Node.js REST API with lead capture integration." },
    ],
  },
  mongodb: {
    slug: "mongodb",
    title: "MongoDB & Database Engineering",
    badge: "DATABASE ARCHITECTURE",
    tagline: "Designing high-throughput document schemas, aggregation pipelines, and resilient NoSQL architectures.",
    philosophy:
      "Data architecture in modern web applications requires a deep understanding of query patterns and write loads. I specialize in designing indexed, multi-tenant MongoDB document structures, complex aggregation pipelines, and atomic transaction pipelines.",
    deepDive:
      "MongoDB's document model provides flexible schema evolution and ultra-fast read performance when data access patterns are well understood. Using embedding for 1-to-N relationships and referencing for large N-to-M data models, we optimize index hit ratios and eliminate costly lookup operations.",
    metrics: [
      { value: "< 2ms", label: "INDEX QUERY SPEED" },
      { value: "100%", label: "DATA CONSISTENCY" },
      { value: "10M+", label: "DOCUMENTS INDEXED" },
      { value: "0 ms", label: "LOCK WAITING" },
    ],
    codeSnippet: {
      title: "Real-Time Revenue Analytics Aggregation Pipeline",
      language: "typescript",
      code: `import { Db } from 'mongodb';

export async function getTenantAnalyticsPipeline(db: Db, tenantId: string) {
  return await db.collection('orders').aggregate([
    // Stage 1: Match Tenant & Date Range
    {
      $match: {
        tenantId,
        status: 'COMPLETED',
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }
    },
    // Stage 2: Group by Day & Calculate Metrics
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        dailyRevenue: { $sum: '$totalAmount' },
        avgOrderValue: { $avg: '$totalAmount' },
        totalOrders: { $sum: 1 }
      }
    },
    // Stage 3: Sort Chronologically
    { $sort: { _id: 1 } }
  ]).toArray();
}`,
    },
    concepts: [
      { title: "Aggregation Pipelines", subtitle: "Multi-Stage Analytics", desc: "High-performance data manipulation ($match, $group, $lookup, $facet)." },
      { title: "Compound Indexing", subtitle: "ESR Guideline Rule", desc: "Structuring indexes to cover Equality, Sort, and Range predicates efficiently." },
      { title: "Multi-Tenant Isolation", subtitle: "Enterprise Security", desc: "Safely partitioning multi-organization data using dedicated tenant keys." },
      { title: "ACID Transactions", subtitle: "Multi-Document Safety", desc: "Utilizing session transactions for critical financial operations." },
    ],
    tools: ["MongoDB Atlas", "Mongoose ORM", "MongoDB Compass", "Docker", "Studio 3T", "Redis Caching"],
    skills: ["Aggregation Pipelines", "Document Schema Design", "Index Optimization", "Multi-Tenant Isolation", "Atomic Transactions", "Data Encryption"],
    bestPractices: [
      "Follow the ESR (Equality, Sort, Range) rule strictly when defining compound indexes.",
      "Avoid unbounded array growth within documents; cap arrays or use bucket patterns.",
      "Use $facet for multi-dimensional dashboard stats in a single database roundtrip.",
      "Configure automated snapshot backups and replica set auto-failover.",
    ],
    workflow: [
      { number: "1", title: "Query Pattern Analysis", desc: "Analyzing access frequencies to choose optimal embedding vs referencing models." },
      { number: "2", title: "Compound Index Optimization", desc: "Designing compound indexes to eliminate slow in-memory sorts." },
      { number: "3", title: "Aggregation Pipeline Engineering", desc: "Creating multi-stage pipelines for real-time analytics calculations." },
      { number: "4", title: "Automated Backup & Failover", desc: "Configuring replica sets and continuous automated cloud backups." },
    ],
    caseStudies: [
      { slug: "osv-school-management-erp", title: "OSV School Management ERP", tagline: "Multi-tenant MongoDB database architecture handling grades and attendance." },
      { slug: "thebank-fintech-ecosystem", title: "TheBank Fintech Ecosystem", tagline: "High-concurrency transaction store with multi-currency aggregations." },
      { slug: "flavorbyte-restaurant-ordering", title: "FlavorByte POS Engine", tagline: "Real-time kitchen order document store with instant status updates." },
    ],
  },
  "express-js": {
    slug: "express-js",
    title: "Express.js & REST Microservices",
    badge: "BACKEND API ARCHITECTURE",
    tagline: "Engineering resilient, low-latency REST microservices with robust security middleware.",
    philosophy:
      "Express.js forms the backbone of scalable MERN stack API microservices. My backend development focuses on clean Controller-Service-Repository architecture, strict schema validation, JWT auth pipelines, and robust rate limiting to ensure 99.99% uptime.",
    deepDive:
      "A clean Express backend decouples HTTP routing concerns from business logic. By implementing middleware pipelines for authentication, rate limiting, and request validation, we ensure clean code separation, easy unit testing, and robust error resilience.",
    metrics: [
      { value: "< 15ms", label: "API RESPONSE TIME" },
      { value: "100%", label: "TEST COVERAGE" },
      { value: "99.99%", label: "UPTIME SLA" },
      { value: "0", label: "UNHANDLED ERRORS" },
    ],
    codeSnippet: {
      title: "Express Router Middleware & Payload Validation",
      language: "typescript",
      code: `import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        status: 'FAIL',
        message: 'Invalid request payload',
        errors: error.errors,
      });
    }
  };
};`,
    },
    concepts: [
      { title: "Controller-Service Pattern", subtitle: "Decoupled Logic", desc: "Separating HTTP route handling cleanly from business rules and queries." },
      { title: "JWT & RBAC Middleware", subtitle: "Role Authorization", desc: "Enforcing role-based access control across protected endpoint pipelines." },
      { title: "Rate Limiting", subtitle: "DDoS Mitigation", desc: "Protecting endpoints against brute-force attacks via Redis token buckets." },
      { title: "Global Error Handling", subtitle: "Centralized Telemetry", desc: "Intercepting async errors and formatting consistent HTTP responses." },
    ],
    tools: ["Express.js", "Postman", "Swagger / OpenAPI", "JWT", "Zod", "Winston / Morgan"],
    skills: ["RESTful API Specs", "Custom Middleware", "JWT & OAuth Security", "Rate Limiting", "CORS Configuration", "Global Error Handling"],
    bestPractices: [
      "Always catch asynchronous errors using async handlers or try-catch middleware wrappers.",
      "Use helmet middleware to enforce security HTTP header standards automatically.",
      "Implement request ID tracing (x-request-id) for log aggregation in microservices.",
      "Return standardized JSON response envelopes ({ status, data, message }).",
    ],
    workflow: [
      { number: "1", title: "API Contract Specification", desc: "Defining clear REST interfaces and request payload DTO contracts." },
      { number: "2", title: "Layered Controller Pattern", desc: "Decoupling HTTP routes from business logic and database queries." },
      { number: "3", title: "Payload Validation", desc: "Validating incoming payloads with Zod schemas before processing." },
      { number: "4", title: "Global Error Middleware", desc: "Centralized logging and clean client error responses." },
    ],
    caseStudies: [
      { slug: "adnix-agency-interface", title: "Adnix Agency Lead Pipeline", tagline: "REST API endpoints for lead capture, email notification, and CRM integration." },
      { slug: "flavorbyte-restaurant-ordering", title: "FlavorByte Restaurant POS API", tagline: "High-speed order processing REST backend with WebSocket triggers." },
      { slug: "swifttrack-mobile-delivery-app", title: "SwiftTrack Delivery Fleet API", tagline: "RESTful microservice for geolocation dispatch and route updates." },
    ],
  },
  typescript: {
    slug: "typescript",
    title: "TypeScript & Fullstack Architecture",
    badge: "FULLSTACK TYPE SAFETY",
    tagline: "Enforcing bulletproof type safety, contract-driven development, and scalable codebase patterns.",
    philosophy:
      "TypeScript bridges the gap between client and server, ensuring complete type safety across the entire MERN stack. From shared DTO interfaces to strictly typed state stores, compile-time validation eliminates entire classes of runtime errors.",
    deepDive:
      "End-to-end type safety means when a database schema or API DTO changes, the TypeScript compiler instantly catches breakages on the frontend components before code ever hits production. This drastically accelerates refactoring and guarantees code confidence.",
    metrics: [
      { value: "0", label: "RUNTIME TYPE ERRORS" },
      { value: "100%", label: "TYPE COVERAGE" },
      { value: "2x", label: "DEVELOPER SPEED" },
      { value: "Strict", label: "TS CONFIG ENFORCED" },
    ],
    codeSnippet: {
      title: "Shared Generic API DTO & Response Envelope",
      language: "typescript",
      code: `export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  error?: string;
}

export interface UserDTO {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'DEVELOPER';
  createdAt: string;
}

export type UserResponse = ApiResponse<UserDTO>;`,
    },
    concepts: [
      { title: "Shared DTO Schemas", subtitle: "Client-Server Contract", desc: "Synchronizing interfaces between backend APIs and frontend React code." },
      { title: "Generics & Utility Types", subtitle: "Reusable Abstractions", desc: "Creating flexible abstractions without sacrificing strict type precision." },
      { title: "Type Guards", subtitle: "Runtime Narrowing", desc: "Narrowing complex union types safely during execution." },
      { title: "Monorepo Workspaces", subtitle: "Shared Libraries", desc: "Managing shared types packages across multi-app codebases." },
    ],
    tools: ["TypeScript 5+", "TS-Node", "Zod", "ESLint", "Prettier", "VS Code"],
    skills: ["Strict Typing", "Generic Abstractions", "Shared DTO Schemas", "Type Guards", "Utility Types", "Monorepo Workspaces"],
    bestPractices: [
      "Enable 'strict: true' in tsconfig.json without exception.",
      "Avoid using 'any'; prefer 'unknown' combined with Zod parsing or custom type guards.",
      "Use 'as const' assertions for immutable config objects and constant tuples.",
      "Derive TypeScript types directly from Zod validation schemas via z.infer.",
    ],
    workflow: [
      { number: "1", title: "Shared Data Transfer Objects", desc: "Sharing interfaces between Next.js frontend and Express backend." },
      { number: "2", title: "Strict Null Checking", desc: "Eliminating undefined pointer crashes at compile time." },
      { number: "3", title: "Automated Static Analysis", desc: "Continuous ESLint and TypeScript checks in CI pipelines." },
      { number: "4", title: "End-to-End Integration", desc: "Type-safe API response payloads across all routes." },
    ],
    caseStudies: [
      { slug: "thebank-fintech-ecosystem", title: "TheBank Fintech Ecosystem", tagline: "End-to-end typed Next.js and Express digital banking architecture." },
      { slug: "osv-school-management-erp", title: "OSV School ERP & Admin Portal", tagline: "Strictly typed MERN enterprise school management portal." },
      { slug: "swifttrack-mobile-delivery-app", title: "SwiftTrack Mobile App", tagline: "Cross-platform TypeScript PWA for driver route tracking." },
    ],
  },
  "three-js": {
    slug: "three-js",
    title: "Three.js & 3D Web Graphics",
    badge: "GRAPHICS & UI INNOVATION",
    tagline: "Delivering studio-quality 60fps WebGL rendering, 3D configurators, and interactive graphics.",
    philosophy:
      "Combining Three.js and React Three Fiber to bring desktop-grade 3D graphics directly to browser viewports. Focused on lighting shaders, GLTF model compression, and fluid 60fps rendering without sacrificing page load performance.",
    deepDive:
      "Interactive 3D configurators require careful memory management. By using instanced meshes, texture baking, Draco GLTF compression, and disposing unused WebGL geometries, we achieve smooth 60fps performance across mobile and desktop devices alike.",
    metrics: [
      { value: "60 FPS", label: "RENDER FRAME RATE" },
      { value: "< 5 MB", label: "COMPRESSED 3D ASSETS" },
      { value: "< 100", label: "OPTIMIZED DRAW CALLS" },
      { value: "100%", label: "MOBILE COMPATIBLE" },
    ],
    codeSnippet: {
      title: "React Three Fiber 60fps Frame Loop & Material Engine",
      language: "typescript",
      code: `import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function InteractiveModel({ materialColor }: { materialColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={materialColor} roughness={0.3} metalness={0.8} />
    </mesh>
  );
}`,
    },
    concepts: [
      { title: "Draco GLTF Compression", subtitle: "Asset Optimization", desc: "Compressing 3D meshes by up to 90% for instant web loading." },
      { title: "React Three Fiber", subtitle: "Declarative Scene Graph", desc: "Binding WebGL graphics cleanly to React component state." },
      { title: "Custom Shaders", subtitle: "GLSL Execution", desc: "Writing custom vertex and fragment shaders for unique visual effects." },
      { title: "Instanced Rendering", subtitle: "Draw Call Reduction", desc: "Rendering thousands of duplicate 3D objects in a single draw call." },
    ],
    tools: ["Three.js", "React Three Fiber", "Drei", "Blender", "GLTF Pipeline", "Canvas WebGL"],
    skills: ["WebGL Rendering", "Custom Shaders", "PBR Material Swapping", "Camera Animation Loops", "GLTF Model Loading", "Canvas Optimization"],
    bestPractices: [
      "Always call .dispose() on geometries, materials, and textures when unmounting WebGL components.",
      "Use texture maps (Normal, Roughness, AO) baked in Blender to reduce real-time light calculations.",
      "Cap device pixel ratio (Math.min(window.devicePixelRatio, 2)) to protect mobile GPUs.",
      "Implement Level of Detail (LOD) nodes for distant 3D objects.",
    ],
    workflow: [
      { number: "1", title: "3D Asset Compression", desc: "Draco compression and texture baking for fast web loads." },
      { number: "2", title: "R3F Canvas Architecture", desc: "Declarative 3D scene graph integrated with React state." },
      { number: "3", title: "Material Swapping Engine", desc: "Instant texture and color customizing with sub-frame response." },
      { number: "4", title: "Frame Rate Profiling", desc: "Optimizing draw calls and geometry counts for smooth 60fps." },
    ],
    caseStudies: [
      { slug: "comfystride-3d-configurator", title: "ComfyStride 3D Configurator", tagline: "Immersive 3D footwear customizer built with Three.js & R3F." },
      { slug: "adnix-agency-interface", title: "Adnix Agency Interface", tagline: "3D interactive heroic web elements and particle backgrounds." },
      { slug: "thebank-fintech-ecosystem", title: "TheBank Visual Telemetry", tagline: "Canvas and WebGL telemetry graph visualizer." },
    ],
  },
  "mern-stack": {
    slug: "mern-stack",
    title: "Fullstack MERN Suite",
    badge: "FULLSTACK ARCHITECTURE",
    tagline: "Building cohesive end-to-end web applications with MongoDB, Express, React & Node.js.",
    philosophy:
      "A complete MERN stack engineering approach seamlessly links MongoDB schema modeling, Express API middleware, React component trees, and Node.js event loops into a single unified architecture.",
    deepDive:
      "Integrating fullstack MERN systems requires strict type safety across boundaries, optimized MongoDB indexing, JWT/RBAC security middleware, and atomic deployment strategies for cloud environments.",
    metrics: [
      { value: "100%", label: "FULLSTACK COVERAGE" },
      { value: "< 50ms", label: "END-TO-END LATENCY" },
      { value: "99.9%", label: "API UPTIME" },
      { value: "Zod", label: "SHARED SCHEMA TYPE SAFETY" },
    ],
    codeSnippet: {
      title: "MERN Stack Controller & Service Integration",
      language: "typescript",
      code: `import { Request, Response } from 'express';
import { ProjectModel } from '../models/Project';

export async function getFullstackProjects(req: Request, res: Response) {
  try {
    const projects = await ProjectModel.find({ active: true })
      .select('title category techStack stats')
      .lean();
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Database query failed' });
  }
}`,
    },
    concepts: [
      { title: "MongoDB Aggregation", subtitle: "Complex Querying", desc: "Pipeline aggregations for real-time analytics." },
      { title: "Express RESTful Endpoints", subtitle: "Backend Controllers", desc: "Modular route handlers with validation." },
      { title: "React State Sync", subtitle: "UI Reactivity", desc: "Optimistic rendering and cache invalidation." },
      { title: "Node.js Microservices", subtitle: "Asynchronous I/O", desc: "Non-blocking event loop execution." },
    ],
    tools: ["MongoDB", "Express.js", "React 19", "Node.js", "TypeScript", "Mongoose"],
    skills: ["Fullstack Architecture", "REST API Design", "Document Schemas", "React State Management", "Authentication Pipelines", "Cloud Deployment"],
    bestPractices: [
      "Use shared TypeScript interfaces between backend services and frontend UI components.",
      "Implement centralized error handling middleware in Express.",
      "Index query fields in MongoDB to keep query speeds under 10ms.",
      "Secure API routes using JWT and HTTP-only cookies.",
    ],
    workflow: [
      { number: "1", title: "Data Modeling", desc: "Designing MongoDB schemas and relational patterns." },
      { number: "2", title: "API Development", desc: "Building type-safe Express endpoints and middleware." },
      { number: "3", title: "Frontend Integration", desc: "Connecting React components to asynchronous services." },
      { number: "4", title: "Production Deployment", desc: "Containerizing and deploying to scalable cloud nodes." },
    ],
    caseStudies: [
      { slug: "osv-school-management-erp", title: "OSV School Management ERP", tagline: "Multi-tenant academic portal & database schema built on the full MERN stack." },
      { slug: "thebank-fintech-ecosystem", title: "TheBank Fintech Platform", tagline: "High-throughput document schemas & transaction event pipelines." },
      { slug: "comfystride-3d-configurator", title: "ComfyStride 3D Configurator", tagline: "Dynamic document store for 3D model asset configuration parameters." },
    ],
  },
  "system-architecture": {
    slug: "system-architecture",
    title: "API & System Architecture",
    badge: "ENTERPRISE SYSTEMS",
    tagline: "Designing high-concurrency microservices, resilient APIs, and scalable distributed architectures.",
    philosophy:
      "Enterprise systems demand decoupled microservices, clean layer separation, rate limiting, and zero single points of failure. I design API architectures that scale effortlessly under high concurrent load.",
    deepDive:
      "System design focuses on sub-100ms API response times, fault tolerance, connection pooling, horizontal scaling, and comprehensive telemetry for production environments.",
    metrics: [
      { value: "sub-50ms", label: "AVERAGE RESPONSE TIME" },
      { value: "10k+", label: "CONCURRENT REQUESTS" },
      { value: "99.99%", label: "HIGH AVAILABILITY" },
      { value: "REST / WS", label: "PROTOCOL INTEGRATION" },
    ],
    codeSnippet: {
      title: "Rate-Limiting & Gateway Proxy Middleware",
      language: "typescript",
      code: `import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 429, error: 'Too many requests from this IP, please try again later.' },
});`,
    },
    concepts: [
      { title: "Microservices Decoupling", subtitle: "Domain Boundaries", desc: "Isolated services interacting via clean REST contracts." },
      { title: "Rate-Limiting & Security", subtitle: "DDoS Protection", desc: "Token bucket & leaky bucket rate limiters." },
      { title: "Caching & Redis", subtitle: "In-Memory Speeds", desc: "Sub-millisecond data caching layer for hot keys." },
      { title: "Database Connection Pooling", subtitle: "Resource Efficiency", desc: "Reusing active DB sockets to reduce handshake latency." },
    ],
    tools: ["Express", "Node.js", "Redis", "Docker", "Nginx", "Postman", "Zod"],
    skills: ["System Design", "Microservices", "Rate Limiting", "Caching Strategies", "WebSocket Realtime", "API Security"],
    bestPractices: [
      "Always validate request bodies at gateway boundaries using schemas (Zod/Joi).",
      "Implement circuit breakers for downstream service dependencies.",
      "Use structured JSON logging with correlation IDs for trace-ability.",
      "Enforce rate limits per API key and client IP.",
    ],
    workflow: [
      { number: "1", title: "Domain Analysis", desc: "Defining system boundaries and database dependencies." },
      { number: "2", title: "API Contract Specs", desc: "Authoring OpenAPI specs and TypeScript payload schemas." },
      { number: "3", title: "Middleware Stack", desc: "Configuring CORS, auth headers, rate limits, and logger." },
      { number: "4", title: "Load Testing", desc: "Verifying throughput and response latency under 10k requests." },
    ],
    caseStudies: [
      { slug: "thebank-fintech-ecosystem", title: "TheBank Fintech Gateway", tagline: "Sub-50ms transaction API gateway with real-time socket events." },
      { slug: "osv-school-management-erp", title: "OSV School Management ERP", tagline: "Decoupled microservice architecture & multi-tenant access control." },
      { slug: "adnix-agency-interface", title: "Adnix Agency Interface", tagline: "Conversion-optimized architecture & SEO performance pipeline." },
    ],
  },
};

export default function ExpertiseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = React.use(params);
  const slugKey = (unwrappedParams?.slug || "react-nextjs").toLowerCase();
  const fallbackData = EXPERTISE_DICTIONARY[slugKey] || EXPERTISE_DICTIONARY["react-nextjs"];
  const [data, setData] = useState<ExpertiseData>(fallbackData);
  const [realProjects, setRealProjects] = useState<CaseStudy[]>([]);

  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5005";

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/expertise/${slugKey}`);
        if (res.ok) {
          const apiRes = await res.json();
          if (apiRes.data) {
            const apiData = apiRes.data;
            setData({
              ...fallbackData,
              ...apiData,
              metrics: (apiData.metrics && apiData.metrics.length > 0) ? apiData.metrics : fallbackData.metrics,
              codeSnippet: (apiData.codeSnippet && apiData.codeSnippet.code) ? apiData.codeSnippet : fallbackData.codeSnippet,
              concepts: (apiData.concepts && apiData.concepts.length > 0) ? apiData.concepts : fallbackData.concepts,
              tools: (apiData.tools && apiData.tools.length > 0) ? apiData.tools : fallbackData.tools,
              skills: (apiData.skills && apiData.skills.length > 0) ? apiData.skills : fallbackData.skills,
              bestPractices: (apiData.bestPractices && apiData.bestPractices.length > 0) ? apiData.bestPractices : fallbackData.bestPractices,
              workflow: (apiData.workflow && apiData.workflow.length > 0) ? apiData.workflow : fallbackData.workflow,
            });
          }
        }
      } catch (err) {
        // Fallback to static dictionary
      }
    };

    const fetchRealProjects = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/projects`);
        if (res.ok) {
          const json = await res.json();
          const list = json.data || [];
          if (Array.isArray(list) && list.length > 0) {
            const formatted = list.slice(0, 3).map((p: any) => ({
              slug: p.slug || p.id,
              title: p.title,
              tagline: p.tagline || p.description || "Featured real portfolio project."
            }));
            setRealProjects(formatted);
          }
        }
      } catch {
        // Fallback
      }
    };

    fetchExpertise();
    fetchRealProjects();
  }, [slugKey]);

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(data.codeSnippet.code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen text-[#3b1400]">
      <main className="pt-8 pb-20 max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
        {/* Top Breadcrumbs & Capability Header Banner */}
        <div className="space-y-5 border-b border-[#3b1400]/15 pb-10 pt-2">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D97706] hover:underline transition-colors"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              <span>&larr; BACK TO HOME</span>
            </Link>
            <span className="text-[#3b1400]/30 font-mono text-xs">/</span>
            <span
              className="px-3.5 py-1 border border-[#D97706]/30 text-[#D97706] text-[11px] font-black tracking-widest rounded-full uppercase shadow-2xs"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              {data.badge}
            </span>
          </div>

          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black text-[#3b1400] tracking-tight uppercase leading-snug"
            style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
          >
            {data.title}
          </h1>

          <p
            className="text-base sm:text-lg text-[#3b1400] font-medium max-w-4xl leading-relaxed"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            {data.tagline}
          </p>
        </div>

        {/* 4 Quantitative Key Metrics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {data.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="border border-[#3b1400]/15 rounded-2xl p-5 text-center space-y-1 shadow-2xs hover:border-[#D97706]/50 transition-all"
            >
              <div
                className="text-2xl sm:text-3xl font-black text-[#D97706]"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                {metric.value}
              </div>
              <div
                className="text-[10px] sm:text-[11px] font-bold text-[#3b1400] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </section>

        {/* Two Column Grid Layout (Left Content / Right Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-2 items-start">
          {/* Left Column (8 cols): Philosophy, Deep Dive, Code Window, Concepts, Best Practices, Workflow */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1: Technical Philosophy */}
            <section className="space-y-4 border border-[#3b1400]/15 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0 font-mono font-bold text-xs">
                  &lt;/&gt;
                </div>
                <h2
                  className="text-base sm:text-lg font-black text-[#3b1400] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Technical Philosophy
                </h2>
              </div>
              <p
                className="text-sm sm:text-base text-[#3b1400] leading-relaxed font-medium"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                {data.philosophy}
              </p>
            </section>

            {/* Section 2: Deep Dive Architecture Analysis */}
            <section className="space-y-4 border border-[#D97706]/30 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2
                  className="text-base sm:text-lg font-black text-[#3b1400] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Deep-Dive Architectural Analysis
                </h2>
              </div>
              <p
                className="text-sm sm:text-base text-[#3b1400] leading-relaxed font-medium"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                {data.deepDive}
              </p>
            </section>

            {/* Section 3: Battle-Tested Production Code Window */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4-4 4m6 0h6" />
                    </svg>
                  </div>
                  <h2
                    className="text-base sm:text-lg font-black text-[#3b1400] uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                  >
                    Battle-Tested Code Architecture
                  </h2>
                </div>
                <span className="text-[11px] font-bold text-[#D97706] font-mono uppercase tracking-wider hidden sm:inline">
                  PRODUCTION SNIPPET
                </span>
              </div>

              {/* Dark Code Window */}
              <div className="bg-[#120c06] rounded-2xl border border-[#D97706]/30 shadow-2xl overflow-hidden">
                <div className="bg-[#1a1209] px-6 py-3.5 border-b border-[#D97706]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="text-xs font-bold text-amber-200/60 ml-3 font-mono">
                      {data.codeSnippet.title}
                    </span>
                  </div>

                  <button
                    onClick={handleCopySnippet}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-colors font-mono"
                  >
                    {copiedSnippet ? (
                      <span className="text-emerald-400">Copied!</span>
                    ) : (
                      <span>Copy Code</span>
                    )}
                  </button>
                </div>

                <div className="p-6 sm:p-8 overflow-x-auto">
                  <pre className="font-mono text-xs sm:text-sm leading-relaxed text-amber-100/90 whitespace-pre">
                    <code>{data.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Section 4: In-Depth Technical Concepts Grid (2x2) */}
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <path d="M9 1v3m6-3v3m-6 16v3m6-3v3M1 9h3m-3 6h3m16-6h3m-3 6h3" />
                  </svg>
                </div>
                <h2
                  className="text-base sm:text-lg font-black text-[#3b1400] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Core Architectural Concepts
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {data.concepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="border border-[#3b1400]/15 rounded-2xl p-5 sm:p-6 space-y-2 shadow-2xs hover:border-[#D97706]/40 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        className="text-base font-bold text-[#3b1400]"
                        style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                      >
                        {concept.title}
                      </h3>
                      <span
                        className="text-[10px] font-extrabold text-[#D97706] uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                      >
                        {concept.subtitle}
                      </span>
                    </div>
                    <p
                      className="text-xs sm:text-sm text-[#3b1400] font-medium leading-relaxed"
                      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                    >
                      {concept.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Tools of the Trade */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <h2
                  className="text-base sm:text-lg font-black text-[#3b1400] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Tools &amp; Ecosystem
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {data.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 border border-[#3b1400]/15 text-[#3b1400] text-xs font-bold rounded-xl shadow-2xs hover:border-[#D97706] hover:text-[#D97706] transition-all font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* Section 6: Production Best Practices Checklist */}
            <section className="space-y-5 border border-[#3b1400]/15 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2
                  className="text-base sm:text-lg font-black text-[#3b1400] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Production Best Practices &amp; Standards
                </h2>
              </div>

              <div className="space-y-3">
                {data.bestPractices.map((bp, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-[#D97706]/40 flex items-center justify-center text-[#D97706] flex-shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <p
                      className="text-xs sm:text-sm text-[#3b1400] font-medium leading-relaxed"
                      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                    >
                      {bp}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: Strategic Workflow */}
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2
                  className="text-base sm:text-lg font-black text-[#3b1400] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Strategic Implementation Workflow
                </h2>
              </div>

              <div className="space-y-4">
                {data.workflow.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-[#3b1400]/15 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs hover:shadow-md transition-shadow"
                  >
                    <div
                      className="w-9 h-9 rounded-xl bg-amber-500/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] font-black text-base font-mono flex-shrink-0"
                      style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                    >
                      {item.number}
                    </div>
                    <div className="space-y-1 pt-0.5">
                      <h3
                        className="font-bold text-sm sm:text-base text-[#3b1400]"
                        style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm text-[#3b1400] font-medium leading-relaxed"
                        style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (4 cols): Sticky Sidebar with Case Studies & Hire Me Card */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            {/* Case Studies Container */}
            <div className="border border-[#3b1400]/15 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 border-b border-[#3b1400]/10 pb-4">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3
                  className="text-sm font-black text-[#3b1400] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                >
                  Case Studies
                </h3>
              </div>

              <div className="space-y-4">
                {(realProjects.length > 0 ? realProjects : data.caseStudies).map((cs, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[#3b1400]/15 hover:border-[#D97706] hover:shadow-sm transition-all space-y-1.5 group"
                  >
                    <span
                      className="text-[9px] font-black uppercase tracking-widest text-[#D97706] block"
                      style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                    >
                      FEATURED PROJECT
                    </span>
                    <h4
                      className="font-bold text-xs sm:text-sm text-[#3b1400] group-hover:text-[#D97706] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                    >
                      {cs.title}
                    </h4>
                    <p
                      className="text-xs text-[#703513] font-medium line-clamp-2 leading-relaxed"
                      style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                    >
                      {cs.tagline}
                    </p>
                    <Link
                      href={`/projects/${cs.slug}`}
                      className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#D97706] group-hover:underline pt-1 uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                    >
                      <span>View Case Study</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Ready to build CTA Box */}
            <div className="bg-[#231106] border border-[#D97706]/30 rounded-2xl p-6 text-white space-y-4 shadow-2xl">
              <div className="space-y-2">
                <h4
                  className="text-lg font-black uppercase text-[#D97706] tracking-tight"
                  style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
                >
                  Ready to build?
                </h4>
                <p
                  className="text-xs text-[#D4B39D] leading-relaxed font-normal"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  Let's leverage this expertise to build your next high-performance web product.
                </p>
              </div>

              <a
                href="/contact"
                className="w-full py-3 px-4 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xs tracking-widest uppercase text-center rounded-xl block transition-all shadow-md active:scale-[0.99]"
                style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
              >
                Hire Me Now &rarr;
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Global Bottom Call to Action Section */}
      <CallToAction />
    </div>
  );
}
