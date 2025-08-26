import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bernard Brennan Regaspi - Full Stack Developer & Designer",
  description:
    "Portfolio of Bernard Brennan Regaspi - Full Stack Developer, Mobile App Developer, and Graphic Designer. Specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords:
    "Bernard Regaspi, Full Stack Developer, Web Developer, Mobile Developer, Graphic Designer, React, Next.js, Node.js",
  authors: [{ name: "Bernard Brennan Regaspi" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
