"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import FloatingCodeBackground from "./FloatingCodeBackground";
import { cn } from "@/lib/utils";
import "../app/styles/HomePage.css";
import { useRouter } from "next/navigation"; // Change this import
import PageTransition from "./PageTransition";
import { animatePageTransition, revealPageTransition } from "@/utils/transition";
import Link from "next/link";
// Add this interface at the top of the file, after the imports
interface Particle {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

const HomePage = () => {
  const [showText, setShowText] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Set showText to true immediately
    setShowText(true);

    // Create animated particles
    const createParticles = () => {
      const particleCount = 50;
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 6,
          animationDuration: Math.random() * 3 + 3,
        });
      }

      setParticles(newParticles);
    };

    createParticles();
  }, []);

  const router = useRouter();

  const handleNavigation = async (path: string) => {
    await animatePageTransition();
    router.push(path);
  };

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    
    // Trigger closing transition
    await animatePageTransition();
    
    // Navigate to the new page
    router.push(href.replace(window.location.origin, ''));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden relative">
      <PageTransition />
      {/* Dark theme background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] z-0"></div>

      {/* Animated particles */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
              animation: "float 6s ease-in-out infinite",
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center items-start p-8 md:p-16 space-y-6 relative z-[2]">
        {showText && (
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              Hi There, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold">
                Bernard
              </span>
              <span className="ml-2 animate-bounce">👋</span>
            </p>
        )}

        {showText && (
          <div className="opacity-100 visible">
            <TypeAnimation
              sequence={[
                "I am a Full Stack Developer",
                1000,
                "I am a Graphic Designer",
                1000,
                "I am a Mobile Developer",
                1000,
                "I am a Virtual Assistant",
                1000,
              ]}
              wrapper="span"
              speed={10}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow"
              repeat={Infinity}
            />
          </div>
        )}

        <div
          className={cn(
            "max-w-2xl space-y-4",
            showText ? "animate-fade-in-up animation-delay-600" : "opacity-0"
          )}
        >
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed text-shadow">
            Software Engineer & Creative Technologist. I craft seamless digital
            experiences through clean code, impactful design, and data-driven
            insights.
          </p>
          <p className="text-lg md:text-xl text-white/80 text-shadow">
            From full-stack web applications and mobile apps to compelling
            visuals and strategic analysis, I bridge creativity with technology
            to deliver smart, scalable solutions.
          </p>
        </div>

        <div
          className={cn(
            "mt-8 space-y-6",
            showText ? "animate-fade-in-up animation-delay-900" : "opacity-0"
          )}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-white text-shadow">
            What you need?
          </h3>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href="/fullstack-development"
              className="skill-btn full-stack"
              onClick={handleTransition}
            >
              Full Stack Development
            </Link>
            <Link
              href="/graphic-design"
              className="skill-btn graphic-design"
              onClick={handleTransition}
            >
              Graphic Design
            </Link>
            <Link
              href="/mobile-development"
              className="skill-btn mobile-dev"
              onClick={handleTransition}
            >
              Mobile Development
            </Link>
            <Link
              href="/virtual-analyst"
              className="skill-btn virtual-assistant"
              onClick={handleTransition}
            >
              Virtual Assistant
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "flex gap-6",
            showText ? "animate-fade-in-up animation-delay-1200" : "opacity-0"
          )}
        >
          <a href="#" className="social-link">
            <FaGithub size={24} />
          </a>
          <a href="#" className="social-link">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="social-link">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center p-8 relative z-[2]">
        <FloatingCodeBackground />
        {showText && (
          <div className="relative z-10 animate-fade-in-up animation-delay-300">
            {/* Enhanced Speech Bubble */}
            <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white/90 px-8 py-4 rounded-3xl shadow-xl z-20 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <p className="text-gray-800 font-medium text-xl text-center">
                    Let's build something amazing together!
                </p>
                <div className="absolute -bottom-[28px] left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white/90 rotate-45 border-b border-r border-white/20"></div>
              </div>
            </div>
            <div className="character-container">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 to-purple-500/30 rounded-full blur-xl opacity-70 animate-pulse"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-white/10 shadow-2xl transition-transform hover:scale-105 duration-500">
                <Image
                  src="/images/profile1.png"
                  alt="Home Image"
                  width={500}
                  height={500}
                  className="relative"
                  style={{ width: "auto", height: "auto" }}
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
