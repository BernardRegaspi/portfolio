"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaTools,
  FaCertificate,
  FaBriefcase,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import HamburgerIcon from "./HamburgerIcon";
import "../app/styles/HomePage.css";

// Adding a separate CSS file for navbar-specific styles
// import "../app/styles/Navbar.css";

// Navigation links with icons
const navigationLinks = [
  {
    name: "Home",
    href: "#home",
    icon: <FaHome size={18} />,
  },
  {
    name: "Tools",
    href: "#tools",
    icon: <FaTools size={18} />,
  },
  {
    name: "Certificates",
    href: "#certificates",
    icon: <FaCertificate size={18} />,
  },
  {
    name: "Services",
    href: "#services",
    icon: <FaBriefcase size={18} />,
  },
  {
    name: "Contact",
    href: "#contact",
    icon: <FaEnvelope size={18} />,
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    const sections = ["home", "tools", "certificates", "services", "contact"];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const isActive = (href: string) => {
    const sectionId = href.replace("#", "");
    return activeSection === sectionId;
  };

  return (
    <>
      <div
        className={cn(
          "navbar-container fixed top-0 left-0 right-0 z-50 transition-all duration-300 isolate",
          isScrolled
            ? "bg-[#0f0f23]/95 backdrop-blur-xl border-b border-white/10 shadow-lg"
            : "bg-transparent"
        )}
      >
        <nav className="w-full h-full">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center space-x-2 group">
                <div className="relative">
                  {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div> */}
                  <div className="relative px-4 py-2">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {"< Bernard />"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden xl:flex items-center space-x-1">
                {navigationLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href.replace("#", ""))}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 group",
                      isActive(link.href)
                        ? "text-white bg-white/10 border border-white/20"
                        : "text-white/80 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                    )}
                  >
                    <span
                      className={cn(
                        "transition-colors duration-300",
                        isActive(link.href)
                          ? "text-blue-400"
                          : "text-white/60 group-hover:text-blue-400"
                      )}
                    >
                      {link.icon}
                    </span>
                    {link.name}

                    {/* Active indicator */}
                    {isActive(link.href) && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Desktop Hamburger Menu Button */}
              <div className="">
                <HamburgerIcon variant="main" />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
