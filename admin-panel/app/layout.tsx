import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Orbitron, Poppins } from "next/font/google";
import "./globals.css";

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
  title: "Admin Console | Harshita Sharma Portfolio Control",
  description: "Next.js Admin Console to manage portfolio projects, view client inbox messages, and update tech stack settings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${orbitron.variable} ${poppins.variable} h-full`}>
      <body className="bg-[#FAF8F5] text-[#3b1400] min-h-screen font-poppins antialiased selection:bg-[#D97706] selection:text-white">
        {children}
      </body>
    </html>
  );
}
