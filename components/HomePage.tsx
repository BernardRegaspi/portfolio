"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import FloatingCodeBackground from "./FloatingCodeBackground";
import { cn } from "@/lib/utils";
import "../app/styles/HomePage.css";
import { useRouter } from "next/navigation"; // Change this import
import PageTransition from "./PageTransition";
import { animatePageTransition } from "@/utils/transition";
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
      const particleCount = 25;
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

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;

    // Trigger closing transition
    await animatePageTransition();

    // Navigate to the new page
    router.push(href.replace(window.location.origin, ""));
  };

  return (
    <section
      id="home"
      className="flex flex-col xl:flex-row min-h-screen overflow-hidden relative pt-20"
    >
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

      <div className="flex-1 flex flex-col justify-center lg:justify-start lg:pt-20 items-start p-4 sm:p-6 md:p-8 lg:p-16 space-y-4 sm:space-y-6 relative z-[2] order-2 xl:order-1">
        {showText && (
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-2 sm:mb-4">
            Hi There, I&apos;m{" "}
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 text-shadow leading-tight"
              repeat={Infinity}
            />
          </div>
        )}

        <div
          className={cn(
            "max-w-full lg:max-w-2xl space-y-3 sm:space-y-4",
            showText ? "animate-fade-in-up animation-delay-600" : "opacity-0"
          )}
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed text-shadow">
            I&apos;m a Full‑Stack & Mobile Developer, Graphic Designer, and
            Virtual Assistant — I build scalable backends and modern
            React/Next.js frontends, craft native-like mobile apps (React
            Native), and design polished brand and UI assets.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 text-shadow">
            Need a landing page, cross-platform app, brand refresh, or ongoing
            project support? I deliver clean, maintainable code, thoughtful
            design, and reliable virtual assistance to keep your project on time
            and on budget.
          </p>
        </div>

        <div
          className={cn(
            "mt-6 sm:mt-8 space-y-4 sm:space-y-6 w-full",
            showText ? "animate-fade-in-up animation-delay-900" : "opacity-0"
          )}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white text-shadow">
            What you need?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mt-2 w-full max-w-4xl">
            <Link
              href="/fullstack-development"
              className="skill-btn full-stack w-full"
              onClick={handleTransition}
            >
              Full Stack Development
            </Link>
            <Link
              href="/graphic-design"
              className="skill-btn graphic-design w-full"
              onClick={handleTransition}
            >
              Graphic Design
            </Link>
            <Link
              href="/mobile-development"
              className="skill-btn mobile-dev w-full"
              onClick={handleTransition}
            >
              Mobile Development
            </Link>
            <Link
              href="/virtual-assistant"
              className="skill-btn virtual-assistant w-full"
              onClick={handleTransition}
            >
              Virtual Assistant
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "flex gap-4 sm:gap-6 justify-center sm:justify-start w-full",
            showText ? "animate-fade-in-up animation-delay-1200" : "opacity-0"
          )}
        >
          <a
            href="https://github.com/BernardRegaspi"
            className="social-link"
            target="_blank"
          >
            <FaGithub size={20} className="sm:w-6 sm:h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/bernard-brennan-regaspi-378b1927b/"
            className="social-link"
            target="_blank"
          >
            <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
          </a>
          <a
            href="https://www.facebook.com/bernardbrennan.regaspi.3/"
            className="social-link"
            target="_blank"
          >
            <FaFacebook size={20} className="sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center lg:items-start lg:pt-20 p-4 sm:p-6 md:p-8 relative z-[2] order-1 xl:order-2 min-h-[60vh] sm:min-h-[50vh] lg:min-h-auto">
        <FloatingCodeBackground />
        {showText && (
          <div className="relative z-10 animate-fade-in-up animation-delay-300 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto pt-20">
            <div className="relative flex flex-col items-center justify-center">
              {/* Enhanced Speech Bubble */}
              <div className="w-full max-w-xs absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white/90 px-8 py-4 rounded-3xl shadow-xl z-20 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <p className="text-gray-800 font-medium text-xl text-center">
                    Let&apos;s build something amazing together!
                  </p>
                  <div className="absolute -bottom-[28px] left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white/90 rotate-45 border-b border-r border-white/20"></div>
                </div>
              </div>

              {/* Character Container */}
              <div className="character-container">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 to-purple-500/30 rounded-full blur-xl opacity-70 animate-pulse"></div>
                <div className="relative rounded-full overflow-hidden border-4 border-white/10 shadow-2xl transition-transform hover:scale-105 duration-500">
                  <Image
                    src="/images/profile1.png"
                    alt="Home Image"
                    width={500}
                    height={500}
                    className="relative w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
