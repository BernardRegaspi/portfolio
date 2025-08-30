"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  FaCode,
  FaPalette,
  FaMobileAlt,
  FaAmazon,
  FaChevronRight,
} from "react-icons/fa";
import "../app/styles/HomePage.css";

// Service interface
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
  hoverColor: string;
}

// Services data
const services: Service[] = [
  {
    id: 1,
    title: "Building a Web System (Fullstack)",
    description:
      "Complete end-to-end web application development with modern technologies and scalable architecture.",
    icon: <FaCode size={32} />,
    features: [
      "Frontend & Backend Development",
      "Database Design & Management",
      "API Integration & Development",
      "Responsive Web Design",
      "Performance Optimization",
      "Security Implementation",
    ],
    gradient: "from-red-500 to-pink-600",
    hoverColor: "hover:bg-red-500/20",
  },
  {
    id: 2,
    title: "Creating Design using Adobe Photoshop",
    description:
      "Professional graphic design solutions from concept to completion using industry-standard tools.",
    icon: <FaPalette size={32} />,
    features: [
      "Logo & Brand Identity Design",
      "Web UI/UX Design",
      "Print Design Materials",
      "Digital Illustrations",
      "Photo Editing & Retouching",
      "Marketing Collateral",
    ],
    gradient: "from-blue-500 to-cyan-600",
    hoverColor: "hover:bg-blue-500/20",
  },
  {
    id: 3,
    title: "Creating Mobile App",
    description:
      "Native and cross-platform mobile applications tailored to your business needs.",
    icon: <FaMobileAlt size={32} />,
    features: [
      "iOS & Android Development",
      "Cross-platform Solutions",
      "UI/UX Mobile Design",
      "App Store Optimization",
      "Performance & Security",
      "Backend Integration",
    ],
    gradient: "from-green-500 to-emerald-600",
    hoverColor: "hover:bg-green-500/20",
  },
  {
    id: 4,
    title: "Amazon Virtual Assistant",
    description:
      "Comprehensive Amazon business support to maximize your e-commerce success and growth.",
    icon: <FaAmazon size={32} />,
    features: [
      "Product Research & Analysis",
      "Supplier Sourcing & Negotiation",
      "Keyword Research & SEO",
      "Product Listing & Copywriting",
      "Customer Service Management",
      "FBA Shipment Coordination",
    ],
    gradient: "from-purple-500 to-indigo-600",
    hoverColor: "hover:bg-purple-500/20",
  },
];

const MyServices = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {

    // Animate cards in sequence
    const timer = setTimeout(() => {
      services.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="services" className="min-h-screen relative overflow-hidden">
      {/* Dark theme background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] z-0"></div>

      {/* Main content */}
      <div className="relative z-[2] container mx-auto px-6 py-16">
        {/* Header section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 text-shadow animate-fade-in-up">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Services
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed text-shadow animate-fade-in-up animation-delay-300">
            Comprehensive digital solutions to transform your ideas into
            reality. From concept to deployment, I deliver quality services that
            drive results.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "service-card group relative p-6 sm:p-8 rounded-2xl backdrop-blur-lg border border-white/10 transition-all duration-500 cursor-pointer",
                visibleCards.includes(index)
                  ? "animate-fade-in-up opacity-100"
                  : "opacity-0",
                service.hoverColor
              )}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                animationDelay: `${index * 200}ms`,
              }}
            >
              {/* Gradient overlay on hover */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r",
                  service.gradient
                )}
              ></div>

              {/* Service header */}
              <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6 relative z-10">
                <div
                  className={cn(
                    "p-3 sm:p-4 rounded-xl bg-gradient-to-r text-white shadow-lg group-hover:scale-110 transition-transform duration-300",
                    service.gradient
                  )}
                >
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 text-shadow group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Features list */}
              <div className="relative z-10">
                <h4 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                  Key Features:
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-3 text-white/80 group-hover:text-white transition-colors duration-300 text-sm sm:text-base"
                    >
                      <FaChevronRight
                        size={10}
                        className={cn(
                          "text-gray-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 sm:w-3 sm:h-3",
                          service.gradient
                            .replace("from-", "group-hover:from-")
                            .replace("to-", "group-hover:to-")
                        )}
                      />
                      <span className="hover:translate-x-1 transition-transform duration-200">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover effect border */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r p-[1px]",
                  service.gradient
                )}
              >
                <div className="w-full h-full rounded-2xl bg-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 sm:mt-16 animate-fade-in-up animation-delay-900">
          <p className="text-xl text-white/80 mb-8">
            Ready to start your project? Let&apos;s discuss how I can help bring
            your vision to life.
          </p>
          <button className="skill-btn px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyServices;
