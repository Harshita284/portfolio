import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Orbitron, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Harshita Sharma — Full Stack MERN & Distributed Systems Developer | Gurugram, Haryana",
  description: "Expert Full Stack Engineer Harshita Sharma in Gurugram, Haryana. Specializing in Node.js, Express.js, React.js, Next.js, MongoDB, PostgreSQL, Apache Kafka, and Microservices.",
  keywords: ["Harshita Sharma", "Harshita Sharma Gurugram", "Full Stack Developer Gurugram", "MERN Stack", "Apache Kafka", "Redis", "Node.js", "Express.js", "PostgreSQL", "MongoDB"],
  authors: [{ name: "Harshita Sharma" }],
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${orbitron.variable} ${poppins.variable} h-full`}>
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
      </head>
      <body className="bg-[#fffbf5] text-[#1c1917] min-h-screen flex flex-col font-poppins antialiased selection:bg-amber-500 selection:text-white">
        {/* Floating Availability Pill Badge matching reference bottom-left pill */}
        <div className="fixed bottom-6 left-6 z-50 hidden sm:block">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-amber-900/15 shadow-2xl rounded-full">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span
                className="text-xs font-bold text-[#2D1E18]"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
               @ Currently Coding 
              </span>
            </div>
            <span className="text-amber-900/20">|</span>
            <a
              href="mailto:harshita.sh2202@gmail.com"
              className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              WORK WITH ME <span className="text-[10px]">⚡</span>
            </a>
          </div>
        </div>

        {/* Reusable Header Component matching reference design */}
        <Header logoText="HARSHITA" />

        {/* Main Page Container */}
        <main className="flex-1 w-full pt-28">
          {children}
        </main>

        {/* Big Dark Footer matching exact reference screenshot */}
        <Footer />
      </body>
    </html>
  );
}
