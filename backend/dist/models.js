"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = exports.MessageModel = exports.BlogModel = exports.ExpertiseModel = exports.ProjectModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProjectSchema = new mongoose_1.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, default: '' },
    description: { type: String, required: true },
    overview: { type: String, default: '' },
    category: { type: String, default: 'Full Stack' },
    role: { type: String, default: 'Fullstack Architect' },
    year: { type: String, default: '2026' },
    techStack: { type: [String], default: [] },
    keywords: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    architecture: { type: String, default: '' },
    styling: { type: String, default: '' },
    challenges: [{ problem: String, solution: String }],
    image: { type: String, default: '' },
    images: { type: [String], default: [] },
    link: { type: String, default: '#' },
    sourceCode: { type: String, default: '#' },
    featured: { type: Boolean, default: true }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id ? ret._id.toString() : ret.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
const ExpertiseSchema = new mongoose_1.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    badge: { type: String, default: '' },
    category: { type: String, default: '' },
    tagline: { type: String, default: '' },
    philosophy: { type: String, default: '' },
    deepDive: { type: String, default: '' },
    metrics: [{ value: String, label: String }],
    codeSnippet: {
        title: { type: String, default: '' },
        language: { type: String, default: 'typescript' },
        code: { type: String, default: '' }
    },
    concepts: [{ title: String, subtitle: String, desc: String }],
    tools: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    bestPractices: { type: [String], default: [] },
    workflow: [{ number: String, title: String, desc: String }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id ? ret._id.toString() : ret.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
const BlogSchema = new mongoose_1.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    content: { type: String, default: '' },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    readTime: { type: String, default: '5 min read' },
    category: { type: String, default: 'Engineering' },
    author: { type: String, default: 'Harshita Sharma' },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: true }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id ? ret._id.toString() : ret.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
const MessageSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString() }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id ? ret._id.toString() : ret.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
const ProfileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    status: { type: String, default: '' },
    experienceYears: { type: String, default: '' },
    projectsCount: { type: String, default: '' },
    codeLines: { type: String, default: '' },
    performanceScore: { type: String, default: '' },
    social: {
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        email: { type: String, default: '' }
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
exports.ProjectModel = mongoose_1.default.model('Project', ProjectSchema);
exports.ExpertiseModel = mongoose_1.default.model('Expertise', ExpertiseSchema);
exports.BlogModel = mongoose_1.default.model('Blog', BlogSchema);
exports.MessageModel = mongoose_1.default.model('Message', MessageSchema);
exports.ProfileModel = mongoose_1.default.model('Profile', ProfileSchema);
