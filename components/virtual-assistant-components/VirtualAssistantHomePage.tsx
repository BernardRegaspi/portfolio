"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import FloatingCodeBackground from "./FloatingAmazonVABackground";

// Interface for floating particles (white dots)
interface Particle {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

const VirtualAssistantHomePage = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {

    // Create animated particles (white dots like HomePage)
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

  return (
    <section
      id="virtual-assistant-home"
      className="flex flex-col md:flex-row min-h-screen overflow-hidden relative"
    >
      {/* Dark theme background gradient like HomePage */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] z-0"></div>

      {/* Animated particles (white dots) */}
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
          <p className="text-4xl md:text-5xl lg:text-6xl text-gray-300 mb-4 font-bold">
            Virtual <span className="text-[#8d69f8] font-bold">Assistant</span>
            <span className="ml-2 animate-bounce">🎧</span>
          </p>

        <div
          className="max-w-2xl space-y-4"
        >
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed text-shadow">
            I help Amazon sellers optimize their business operations and
            maximize profitability. Specializing in product research, listing
            optimization, PPC management, and inventory analysis to drive
            sustainable growth.
          </p>
          <p className="text-lg md:text-xl text-white/80 text-shadow">
            From market research and competitor analysis to automated workflows
            and performance tracking, I provide comprehensive Amazon FBA
            support. Let&apos;s scale your Amazon business to new heights.
          </p>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center p-8 relative z-[2]">
        <FloatingCodeBackground />
          <div className="relative z-10 animate-fade-in-up animation-delay-300">
            {/* Amazon VA-themed Speech Bubble */}
            <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white/90 px-8 py-4 rounded-3xl shadow-xl z-20 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <p className="text-gray-800 font-medium text-xl text-center">
                  Let&apos;s boost your Amazon sales! 📈
                </p>
                <div className="absolute -bottom-[28px] left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white/90 rotate-45 border-b border-r border-white/20"></div>
              </div>
            </div>
            <div className="character-container">
              <div className="absolute -inset-1 bg-[#8d69f8]/30 rounded-full blur-xl opacity-70 animate-pulse"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-white/10 shadow-2xl transition-transform hover:scale-105 duration-500">
                <Image
                  src="/images/profile6.png"
                  alt="Amazon Virtual Assistant Profile"
                  width={500}
                  height={500}
                  className="relative"
                  style={{ width: "auto", height: "auto" }}
                  priority
                />
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default VirtualAssistantHomePage;