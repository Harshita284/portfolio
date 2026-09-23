"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const dns_1 = __importDefault(require("dns"));
const models_1 = require("./models");
// Configure DNS fallback for MongoDB Atlas SRV resolution on Windows
try {
    dns_1.default.setServers(['8.8.8.8', '1.1.1.1']);
}
catch (e) {
    console.warn('Custom DNS set error:', e);
}
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5005;
const CORS_ORIGIN = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'http://localhost:3001'];
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://harshitash2202:harshitash2202@cluster0.fg5j0zm.mongodb.net/portfolio';
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || CORS_ORIGIN.indexOf(origin) !== -1 || CORS_ORIGIN.includes('*')) {
            callback(null, true);
        }
        else {
            callback(null, true);
        }
    },
    credentials: true
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// Helper function to sanitize user-provided slugs (e.g. converting "https://www.dilbahars.com/" to "dilbahars")
function sanitizeSlug(rawSlug, title) {
    let text = rawSlug && rawSlug.trim() !== '' ? rawSlug : title;
    // Remove protocol, www, domain extensions if a full URL was pasted
    text = text.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
    // Extract domain name if it contains slashes or paths
    if (text.includes('/')) {
        const parts = text.split('/').filter(Boolean);
        if (parts.length > 0)
            text = parts[0];
    }
    text = text.replace(/\.(com|org|net|io|co|in|app|dev|xyz|tech|online)$/i, '');
    const clean = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return clean || 'project-' + Date.now();
}
// Initial Seed Data
const initialProfile = {
    name: "Harshita Sharma",
    role: "Full Stack MERN & Microservices Developer",
    location: "Gurugram, Haryana",
    bio: "Specializing in Node.js, Express.js, React.js, Next.js, MongoDB, PostgreSQL, Apache Kafka, and Redis. Building high-concurrency scalable backends and cinematic frontends.",
    status: "Available for Freelance & Full-time Opportunities",
    experienceYears: "2+",
    projectsCount: "15+",
    codeLines: "30K+",
    performanceScore: "99%",
    social: {
        github: "https://github.com/harshitasharma",
        linkedin: "https://linkedin.com/in/harshita-sharma",
        email: "harshita.sh2202@gmail.com"
    }
};
const initialProjects = [
    {
        slug: "adnix-agency-interface",
        title: "Adnix Agency Interface",
        tagline: "A sleek, conversion-optimized marketing agency platform featuring service catalogs and high-performance lead generation patterns.",
        description: "Designed with a 'Mobile First' approach and optimized for search engines, Adnix Agency Interface showcases expertise in bridging complex backend logic with immersive frontend interactivity.",
        overview: "Focused on UI polish and micro-interactions, Adnix Agency Interface uses Framer Motion for sophisticated layout transitions and ensures a consistent design language across all viewports.",
        category: "Agency & Corporate",
        role: "Fullstack Architect",
        year: "2026",
        techStack: ["React.js", "Next.js", "Tailwind CSS", "Node.js", "Express.js"],
        keywords: ["Agency Website", "Lead Generation", "UI/UX", "Tailwind CSS"],
        highlights: [
            "High-converting dynamic service catalog with filter animations",
            "Tailwind CSS layout transitions with 60fps performance",
            "SEO-optimized server-rendered pages with dynamic metadata",
            "Integrated contact & lead capture pipeline with API validation"
        ],
        architecture: "Built using Next.js App Router for optimal state management and fast initial page loads.",
        styling: "Leveraged Tailwind CSS for fluid, responsive, and animated user interfaces.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
        ],
        link: "https://adnix-demo.vercel.app",
        sourceCode: "https://github.com/harshitasharma/adnix-agency-interface",
        featured: true
    },
    {
        slug: "thebank-fintech-ecosystem",
        title: "TheBank Fintech Ecosystem",
        tagline: "Enterprise digital banking landing page & real-time analytics dashboard.",
        description: "High-concurrency banking dashboard built with Next.js App Router, Express API, Apache Kafka event streams, and PostgreSQL database.",
        overview: "TheBank delivers institutional-grade financial analytics with sub-50ms response times. Features full multi-currency transaction logging, interactive spending charts, and granular RBAC security controls.",
        category: "Custom Software",
        role: "Lead Backend & Systems Architect",
        year: "2026",
        techStack: ["Next.js", "React.js", "Node.js", "Express.js", "PostgreSQL", "Apache Kafka", "Redis"],
        keywords: ["Fintech", "Banking", "Dashboard", "Real-time Telemetry", "PostgreSQL", "Kafka"],
        highlights: [
            "Event-driven financial transaction pipeline using Apache Kafka",
            "Granular RBAC role permissions & JWT security middleware",
            "Custom interactive financial charts with sub-second queries",
            "99.99% uptime architecture with Redis caching"
        ],
        architecture: "Next.js frontend paired with Node.js/Express backend API, Redis caching, and Kafka events.",
        styling: "Tailwind CSS with dark chocolate theme tokens and custom component states.",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80"
        ],
        link: "https://thebank-demo.vercel.app",
        sourceCode: "https://github.com/harshitasharma/thebank-web",
        featured: true
    }
];
const initialExpertise = [
    {
        slug: "react-nextjs",
        title: "React.js & Next.js",
        badge: "FRONTEND ARCHITECTURE",
        category: "Frontend",
        tagline: "Architecting high-performance, SEO-optimized web applications with Server Components and SSR.",
        philosophy: "Specializing in Next.js App Router, React Server Components, and zero-JS client bundle optimization. My approach focuses on Core Web Vitals, accessibility, and atomic design.",
        deepDive: "Shifting data fetching exclusively to Server Components eliminates client waterfalls, reduces JavaScript payload sizes by up to 70%, and guarantees sub-second LCP scores.",
        metrics: [
            { value: "< 0.8s", label: "LCP LOAD TIME" },
            { value: "100%", label: "LIGHTHOUSE SCORE" },
            { value: "70%", label: "BUNDLE REDUCTION" },
            { value: "0 ms", label: "LAYOUT SHIFT (CLS)" }
        ],
        codeSnippet: {
            title: "Next.js Server Action & Type-Safe Schema Mutation",
            language: "typescript",
            code: `'use server';\n\nimport { revalidatePath, revalidateTag } from 'next/cache';\n\nexport async function updateProjectAction(formData: FormData) {\n  const id = formData.get('id');\n  await db.project.update({ id });\n  revalidateTag('projects');\n  return { success: true };\n}`
        },
        concepts: [
            { title: "React Server Components", subtitle: "Zero Bundle Overhead", desc: "Executing server logic without client JS overhead." },
            { title: "Server Actions", subtitle: "Form Mutations", desc: "Mutating database records cleanly via Server Actions." }
        ],
        tools: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
        skills: ["Server Components", "SSR & ISR", "SEO Optimization", "Atomic Design"],
        bestPractices: ["Always validate server payload schemas.", "Optimize image loading using Next/Image."],
        workflow: [
            { number: "1", title: "Architecture Spec", desc: "Defining server vs client component boundaries." },
            { number: "2", title: "Atomic Components", desc: "Building modular, reusable React UI components." }
        ]
    },
    {
        slug: "node-js",
        title: "Node.js & Express.js APIs",
        badge: "BACKEND & MICROSERVICES",
        category: "Backend",
        tagline: "Building non-blocking, event-driven RESTful microservices and secure auth pipelines.",
        philosophy: "Node.js single-threaded event loop excels at high-concurrency I/O operations. I design resilient REST APIs with JWT & RBAC authentication.",
        deepDive: "Combining Express middleware, rate limiting, and Redis caching ensures API endpoints maintain sub-50ms latency under high load.",
        metrics: [
            { value: "sub-50ms", label: "AVERAGE LATENCY" },
            { value: "10k+", label: "CONCURRENT REQS" },
            { value: "99.9%", label: "API UPTIME" },
            { value: "JWT", label: "RBAC AUTH SECURITY" }
        ],
        codeSnippet: {
            title: "Express JWT & RBAC Auth Middleware",
            language: "javascript",
            code: `const jwt = require('jsonwebtoken');\n\nconst authRole = (roles) => (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'Unauthorized' });\n  const decoded = jwt.verify(token, process.env.JWT_SECRET);\n  if (!roles.includes(decoded.role)) return res.status(403).json({ error: 'Forbidden' });\n  req.user = decoded;\n  next();\n};`
        },
        concepts: [
            { title: "JWT & RBAC Security", subtitle: "Access Control", desc: "Securing endpoints based on user roles." },
            { title: "RESTful Architecture", subtitle: "Clean Contracts", desc: "Designing structured JSON API contracts." }
        ],
        tools: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication", "RBAC", "Postman"],
        skills: ["Microservices", "API Testing", "Authentication", "Rate Limiting"],
        bestPractices: ["Always enforce request body validation.", "Use rate limiting on auth endpoints."],
        workflow: [
            { number: "1", title: "API Contract Spec", desc: "Defining REST endpoints and payloads." },
            { number: "2", title: "Controller Build", desc: "Authoring modular route controllers." }
        ]
    },
    {
        slug: "mongodb",
        title: "MongoDB, PostgreSQL & MySQL",
        badge: "DATABASE ENGINEERING",
        category: "Databases",
        tagline: "Designing multi-tenant schemas, aggregation pipelines, and high-speed database queries.",
        philosophy: "Choosing between document-store MongoDB and relational PostgreSQL/MySQL depends on transactional needs. I build optimized schemas with index strategy.",
        deepDive: "Complex aggregations in MongoDB and indexed joins in PostgreSQL ensure query speeds stay under 10ms for enterprise dashboards.",
        metrics: [
            { value: "< 10ms", label: "QUERY SPEED" },
            { value: "100%", label: "ACID COMPLIANCE" },
            { value: "Multi DB", label: "RELATIONAL & NOSQL" },
            { value: "Zero", label: "DATA LOSS GUARANTEE" }
        ],
        codeSnippet: {
            title: "MongoDB Aggregation Pipeline Query",
            language: "javascript",
            code: `db.collection('orders').aggregate([\n  { $match: { status: 'COMPLETED' } },\n  { $group: { _id: '$category', totalRevenue: { $sum: '$amount' } } },\n  { $sort: { totalRevenue: -1 } }\n]);`
        },
        concepts: [
            { title: "Schema Design", subtitle: "Data Modeling", desc: "Structuring relational and document schemas." },
            { title: "Query Handling", subtitle: "Performance", desc: "Indexing fields for sub-10ms lookup." }
        ],
        tools: ["MongoDB", "PostgreSQL", "MySQL", "Mongoose", "Prisma"],
        skills: ["Schema Design", "Query Handling", "Data Loading", "Indexing"],
        bestPractices: ["Index all query filter keys.", "Use connection pooling."],
        workflow: [
            { number: "1", title: "Data Modeling", desc: "Designing entities and constraints." },
            { number: "2", title: "Migration Setup", desc: "Executing schema migrations and seed scripts." }
        ]
    },
    {
        slug: "kafka-redis",
        title: "Apache Kafka & Redis Caching",
        badge: "MESSAGING & CACHING",
        category: "Messaging & Caching",
        tagline: "Event-driven communication, message streaming, and sub-millisecond Redis caching.",
        philosophy: "Decoupling microservices with Apache Kafka events prevents cascading failures and allows asynchronous background processing.",
        deepDive: "Redis in-memory caching reduces database query pressure by up to 85%, serving hot API responses directly from memory.",
        metrics: [
            { value: "sub-1ms", label: "REDIS CACHE TIME" },
            { value: "100k+", label: "EVENTS / SEC" },
            { value: "85%", label: "DB LOAD REDUCTION" },
            { value: "Zero", label: "MESSAGE LOSS" }
        ],
        codeSnippet: {
            title: "Apache Kafka Event Producer & Consumer",
            language: "javascript",
            code: `const { Kafka } = require('kafkajs');\nconst kafka = new Kafka({ clientId: 'portfolio-app', brokers: ['localhost:9092'] });\nconst producer = kafka.producer();\nawait producer.connect();\nawait producer.send({ topic: 'order-events', messages: [{ value: JSON.stringify({ event: 'ORDER_CREATED' }) }] });`
        },
        concepts: [
            { title: "Event-Driven Communication", subtitle: "Decoupled Architecture", desc: "Publishing and subscribing to event topics." },
            { title: "In-Memory Caching", subtitle: "Redis KV Store", desc: "Caching hot API data for instant responses." }
        ],
        tools: ["Apache Kafka", "Redis", "KafkaJS", "IORedis"],
        skills: ["Event-Driven", "Caching Strategies", "Message Queues", "Scalability"],
        bestPractices: ["Set TTL on all Redis cache keys.", "Use consumer groups for scale."],
        workflow: [
            { number: "1", title: "Topic Architecture", desc: "Defining event payload schemas." },
            { number: "2", title: "Consumer Setup", desc: "Writing resilient message consumers." }
        ]
    }
];
const initialBlogs = [
    {
        slug: "mastering-nextjs-15-server-components",
        title: "Mastering Next.js 15 Server Components & Caching Strategies",
        snippet: "A practical guide to leveraging React Server Components, ISR, and granular cache revalidation in high-traffic Next.js apps.",
        content: "Next.js 15 introduces revolutionary caching and Partial Prerendering patterns. By keeping data fetching exclusively on the server, we eliminate client waterfall latency and reduce bundle sizes drastically.",
        date: "2026-08-20",
        readTime: "5 min read",
        category: "Frontend",
        author: "Harshita Sharma",
        tags: ["Next.js", "React.js", "Performance"],
        featured: true
    },
    {
        slug: "building-event-driven-microservices-kafka-redis",
        title: "Building Event-Driven Microservices with Apache Kafka & Redis",
        snippet: "How to decouple Node.js microservices and implement sub-millisecond API response caching using Redis and Kafka.",
        content: "Microservice architectures require seamless asynchronous communication. Apache Kafka ensures message persistence and event streaming across distributed Node.js nodes.",
        date: "2026-07-14",
        readTime: "7 min read",
        category: "Architecture",
        author: "Harshita Sharma",
        tags: ["Apache Kafka", "Redis", "Node.js", "Microservices"],
        featured: true
    },
    {
        slug: "scaling-express-apis-mongodb-postgresql",
        title: "Scaling Express.js APIs with MongoDB & PostgreSQL Indexing",
        snippet: "Techniques for optimizing database query performance and building secure JWT & RBAC authorization pipelines.",
        content: "Database query optimization is essential for web scale. Indexing compound fields in MongoDB and PostgreSQL keeps response times under 10ms.",
        date: "2026-06-02",
        readTime: "6 min read",
        category: "Backend",
        author: "Harshita Sharma",
        tags: ["Express.js", "MongoDB", "PostgreSQL", "JWT"],
        featured: false
    }
];
// Seed MongoDB database on initial startup if collections are empty
async function seedDatabaseIfEmpty() {
    try {
        const profCount = await models_1.ProfileModel.countDocuments();
        if (profCount === 0) {
            await models_1.ProfileModel.create(initialProfile);
            console.log('✅ Seeded Profile data into MongoDB.');
        }
        const projCount = await models_1.ProjectModel.countDocuments();
        if (projCount === 0) {
            await models_1.ProjectModel.insertMany(initialProjects);
            console.log('✅ Seeded Projects data into MongoDB.');
        }
        const expCount = await models_1.ExpertiseModel.countDocuments();
        if (expCount === 0) {
            await models_1.ExpertiseModel.insertMany(initialExpertise);
            console.log('✅ Seeded Expertise data into MongoDB.');
        }
        const blogCount = await models_1.BlogModel.countDocuments();
        if (blogCount === 0) {
            await models_1.BlogModel.insertMany(initialBlogs);
            console.log('✅ Seeded Blogs data into MongoDB.');
        }
    }
    catch (err) {
        console.error('❌ Error during database seeding:', err);
    }
}
// Connect to MongoDB
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas database!');
    seedDatabaseIfEmpty();
})
    .catch((err) => {
    console.error('❌ Failed to connect to MongoDB Atlas:', err);
});
// ---------------- API ENDPOINTS ---------------- //
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        server: 'Harshita Sharma Portfolio Backend',
        database: mongoose_1.default.connection.readyState === 1 ? 'Connected (MongoDB Atlas)' : 'Disconnected',
        env: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});
app.get('/api/profile', async (req, res) => {
    try {
        let profile = await models_1.ProfileModel.findOne();
        if (!profile) {
            profile = await models_1.ProfileModel.create(initialProfile);
        }
        res.json({ success: true, data: profile });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch profile' });
    }
});
app.put('/api/profile', async (req, res) => {
    try {
        let profile = await models_1.ProfileModel.findOne();
        if (profile) {
            Object.assign(profile, req.body);
            await profile.save();
        }
        else {
            profile = await models_1.ProfileModel.create(req.body);
        }
        res.json({ success: true, message: 'Profile updated successfully', data: profile });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
});
/* ==================== 1. PROJECTS ENDPOINTS ==================== */
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await models_1.ProjectModel.find().sort({ createdAt: -1 });
        res.json({ success: true, count: projects.length, data: projects });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch projects' });
    }
});
app.get('/api/projects/:idOrSlug', async (req, res) => {
    try {
        const { idOrSlug } = req.params;
        let query = { slug: idOrSlug };
        if (mongoose_1.default.Types.ObjectId.isValid(idOrSlug)) {
            query = { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] };
        }
        const project = await models_1.ProjectModel.findOne(query);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found.' });
        }
        res.json({ success: true, data: project });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch project' });
    }
});
app.post('/api/projects', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Title and description are required.' });
        }
        const cleanSlug = sanitizeSlug(req.body.slug, title);
        const newProjectData = {
            slug: cleanSlug,
            title,
            tagline: req.body.tagline || description.slice(0, 120),
            description,
            overview: req.body.overview || description,
            category: req.body.category || 'Full Stack',
            role: req.body.role || 'Fullstack Architect',
            year: req.body.year || String(new Date().getFullYear()),
            techStack: Array.isArray(req.body.techStack) ? req.body.techStack : (req.body.techStack ? req.body.techStack.split(',').map((s) => s.trim()).filter(Boolean) : ['React.js', 'Express.js']),
            keywords: Array.isArray(req.body.keywords) ? req.body.keywords : (req.body.keywords ? req.body.keywords.split(',').map((s) => s.trim()).filter(Boolean) : ['Web App']),
            highlights: Array.isArray(req.body.highlights) ? req.body.highlights : (req.body.highlights ? req.body.highlights.split('\n').map((s) => s.trim()).filter(Boolean) : [description]),
            architecture: req.body.architecture || 'React & Node.js architecture.',
            styling: req.body.styling || 'Tailwind CSS responsive design system.',
            image: req.body.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
            images: Array.isArray(req.body.images) && req.body.images.length > 0 ? req.body.images : [req.body.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'],
            link: req.body.link || '#',
            sourceCode: req.body.sourceCode || '#',
            featured: req.body.featured ?? true
        };
        const newProject = await models_1.ProjectModel.create(newProjectData);
        res.status(201).json({ success: true, message: 'Project added successfully!', data: newProject });
    }
    catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ success: false, message: err.message || 'Failed to create project' });
    }
});
app.put('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let query = { _id: id };
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            query = { slug: id };
        }
        if (req.body.slug) {
            req.body.slug = sanitizeSlug(req.body.slug, req.body.title || 'project');
        }
        if (req.body.techStack && !Array.isArray(req.body.techStack)) {
            req.body.techStack = req.body.techStack.split(',').map((s) => s.trim()).filter(Boolean);
        }
        const updated = await models_1.ProjectModel.findOneAndUpdate(query, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Project not found.' });
        }
        res.json({ success: true, message: 'Project updated successfully!', data: updated });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message || 'Failed to update project' });
    }
});
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let query = { _id: id };
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            query = { slug: id };
        }
        await models_1.ProjectModel.findOneAndDelete(query);
        res.json({ success: true, message: `Project removed successfully` });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete project' });
    }
});
/* ==================== 2. EXPERTISE ENDPOINTS ==================== */
app.get('/api/expertise', async (req, res) => {
    try {
        const items = await models_1.ExpertiseModel.find().sort({ createdAt: -1 });
        res.json({ success: true, count: items.length, data: items });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch expertise' });
    }
});
app.get('/api/expertise/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        let query = { slug };
        if (mongoose_1.default.Types.ObjectId.isValid(slug)) {
            query = { $or: [{ _id: slug }, { slug }] };
        }
        const item = await models_1.ExpertiseModel.findOne(query);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Expertise item not found.' });
        }
        res.json({ success: true, data: item });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch expertise item' });
    }
});
app.post('/api/expertise', async (req, res) => {
    try {
        const { title, tagline } = req.body;
        if (!title) {
            return res.status(400).json({ success: false, message: 'Title is required.' });
        }
        const cleanSlug = sanitizeSlug(req.body.slug, title);
        const newExpertiseData = {
            slug: cleanSlug,
            title,
            badge: req.body.badge || 'FULLSTACK ARCHITECTURE',
            category: req.body.category || 'Architecture',
            tagline: tagline || title,
            philosophy: req.body.philosophy || title,
            deepDive: req.body.deepDive || title,
            metrics: req.body.metrics || [{ value: "100%", label: "RELIABILITY" }],
            codeSnippet: req.body.codeSnippet || { title: `${title} Implementation`, language: "typescript", code: "// Code implementation" },
            concepts: req.body.concepts || [{ title: "Core Concept", subtitle: "Pattern", desc: "Detailed description" }],
            tools: req.body.tools || ["React.js", "Node.js"],
            skills: req.body.skills || ["Development"],
            bestPractices: req.body.bestPractices || ["Follow clean code principles."],
            workflow: req.body.workflow || [{ number: "1", title: "Planning", desc: "Initial requirements gathering." }]
        };
        const created = await models_1.ExpertiseModel.create(newExpertiseData);
        res.status(201).json({ success: true, message: 'Expertise item created!', data: created });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message || 'Failed to create expertise' });
    }
});
app.put('/api/expertise/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let query = { _id: id };
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            query = { slug: id };
        }
        const updated = await models_1.ExpertiseModel.findOneAndUpdate(query, req.body, { new: true });
        res.json({ success: true, message: 'Expertise updated successfully!', data: updated });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update expertise' });
    }
});
app.delete('/api/expertise/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let query = { _id: id };
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            query = { slug: id };
        }
        await models_1.ExpertiseModel.findOneAndDelete(query);
        res.json({ success: true, message: `Expertise item removed.` });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete expertise' });
    }
});
/* ==================== 3. BLOGS / ARTICLES ENDPOINTS ==================== */
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await models_1.BlogModel.find().sort({ createdAt: -1 });
        res.json({ success: true, count: blogs.length, data: blogs });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
    }
});
app.get('/api/articles', async (req, res) => {
    try {
        const blogs = await models_1.BlogModel.find().sort({ createdAt: -1 });
        res.json({ success: true, count: blogs.length, data: blogs });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch articles' });
    }
});
app.get('/api/blogs/:idOrSlug', async (req, res) => {
    try {
        const { idOrSlug } = req.params;
        let query = { slug: idOrSlug };
        if (mongoose_1.default.Types.ObjectId.isValid(idOrSlug)) {
            query = { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] };
        }
        const blog = await models_1.BlogModel.findOne(query);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog article not found.' });
        }
        res.json({ success: true, data: blog });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch blog' });
    }
});
app.post('/api/blogs', async (req, res) => {
    try {
        const { title, snippet, content } = req.body;
        if (!title || !snippet) {
            return res.status(400).json({ success: false, message: 'Title and snippet are required.' });
        }
        const cleanSlug = sanitizeSlug(req.body.slug, title);
        const newBlogData = {
            slug: cleanSlug,
            title,
            snippet,
            content: content || snippet,
            date: new Date().toISOString().split('T')[0],
            readTime: req.body.readTime || '5 min read',
            category: req.body.category || 'Engineering',
            author: req.body.author || 'Harshita Sharma',
            tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags ? req.body.tags.split(',').map((t) => t.trim()).filter(Boolean) : ['Full Stack']),
            featured: req.body.featured ?? true
        };
        const created = await models_1.BlogModel.create(newBlogData);
        res.status(201).json({ success: true, message: 'Blog article published successfully!', data: created });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message || 'Failed to create blog' });
    }
});
app.put('/api/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let query = { _id: id };
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            query = { slug: id };
        }
        const updated = await models_1.BlogModel.findOneAndUpdate(query, req.body, { new: true });
        res.json({ success: true, message: 'Blog updated successfully!', data: updated });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update blog' });
    }
});
app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let query = { _id: id };
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            query = { slug: id };
        }
        await models_1.BlogModel.findOneAndDelete(query);
        res.json({ success: true, message: `Blog article removed.` });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete blog' });
    }
});
/* ==================== 4. CONTACT MESSAGES ENDPOINTS ==================== */
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await models_1.MessageModel.find().sort({ createdAt: -1 });
        res.json({ success: true, count: messages.length, data: messages });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch messages' });
    }
});
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
        }
        const newMessage = await models_1.MessageModel.create({ name, email, message, date: new Date().toISOString() });
        res.status(201).json({ success: true, message: 'Thank you! Your message has been received by Harshita Sharma.', data: newMessage });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to submit contact message' });
    }
});
app.delete('/api/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let query = { _id: id };
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            query = { id };
        }
        await models_1.MessageModel.findOneAndDelete(query);
        res.json({ success: true, message: `Message deleted.` });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete message' });
    }
});
app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Backend API Server running for Harshita Sharma on http://localhost:${PORT} [env: ${process.env.NODE_ENV || 'development'}]`);
});
