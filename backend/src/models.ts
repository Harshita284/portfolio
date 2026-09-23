import mongoose, { Schema, Document } from 'mongoose';

/* ==================== 1. PROJECT MODEL ==================== */
export interface IProject extends Document {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  overview: string;
  category: string;
  role: string;
  year: string;
  techStack: string[];
  keywords: string[];
  highlights: string[];
  architecture: string;
  styling: string;
  challenges?: { problem: string; solution: string }[];
  image: string;
  images: string[];
  link: string;
  sourceCode: string;
  featured: boolean;
}

const ProjectSchema: Schema = new Schema({
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
    transform: (doc: any, ret: any) => {
      ret.id = ret._id ? ret._id.toString() : ret.id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

/* ==================== 2. EXPERTISE MODEL ==================== */
export interface IExpertise extends Document {
  id: string;
  slug: string;
  title: string;
  badge: string;
  category: string;
  tagline: string;
  philosophy: string;
  deepDive: string;
  metrics: { value: string; label: string }[];
  codeSnippet: { title: string; language: string; code: string };
  concepts: { title: string; subtitle: string; desc: string }[];
  tools: string[];
  skills: string[];
  bestPractices: string[];
  workflow: { number: string; title: string; desc: string }[];
}

const ExpertiseSchema: Schema = new Schema({
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
    transform: (doc: any, ret: any) => {
      ret.id = ret._id ? ret._id.toString() : ret.id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

/* ==================== 3. BLOG MODEL ==================== */
export interface IBlog extends Document {
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

const BlogSchema: Schema = new Schema({
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
    transform: (doc: any, ret: any) => {
      ret.id = ret._id ? ret._id.toString() : ret.id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

/* ==================== 4. MESSAGE MODEL ==================== */
export interface IMessage extends Document {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

const MessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString() }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      ret.id = ret._id ? ret._id.toString() : ret.id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

/* ==================== 5. PROFILE MODEL ==================== */
export interface IProfile extends Document {
  name: string;
  role: string;
  location: string;
  bio: string;
  status: string;
  experienceYears: string;
  projectsCount: string;
  codeLines: string;
  performanceScore: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
}

const ProfileSchema: Schema = new Schema({
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
    transform: (doc: any, ret: any) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
export const ExpertiseModel = mongoose.model<IExpertise>('Expertise', ExpertiseSchema);
export const BlogModel = mongoose.model<IBlog>('Blog', BlogSchema);
export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);
export const ProfileModel = mongoose.model<IProfile>('Profile', ProfileSchema);
