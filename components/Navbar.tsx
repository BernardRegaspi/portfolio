"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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

// Social links for mobile menu
const socialLinks = [
  {
    icon: <FaGithub size={20} />,
    name: "GitHub",
    url: "https://github.com/bernard-dev",
  },
  {
    icon: <FaLinkedin size={20} />,
    name: "LinkedIn",
    url: "https://linkedin.com/in/bernard-dev",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
                  <div className="relative px-4 py-2 bg-[#0f0f23] rounded-lg border border-white/10">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      Bernard
                    </span>{" "}
                    <span className="text-2xl font-bold text-white">Dev</span>
                  </div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
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
              <div className="hidden md:block">
                <HamburgerIcon variant="main" />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-white hover:text-blue-400 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay - Only for mobile */}
      {isMenuOpen && (
        <div className="navbar-mobile-menu fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[90vw] bg-gradient-to-b from-[#0f0f23] to-[#1a1a2e] border-l border-white/10 shadow-2xl">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30"></div>
                  <div className="relative px-3 py-1.5 bg-[#0f0f23] rounded-lg border border-white/10">
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      Bernard
                    </span>
                    <span className="text-xl font-bold text-white ml-1">
                      Dev
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 text-white hover:text-red-400 transition-colors duration-300"
                aria-label="Close menu"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="px-6 py-8">
              <ul className="space-y-4">
                {navigationLinks.map((link, index) => (
                  <li key={link.name}>
                    <button
                      onClick={() => {
                        scrollToSection(link.href.replace("#", ""));
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group",
                        isActive(link.href)
                          ? "bg-white/10 text-white border border-white/20"
                          : "text-white/80 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
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
                      <span className="font-medium">{link.name}</span>

                      {/* Active indicator */}
                      {isActive(link.href) && (
                        <div className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="px-6 py-4 border-t border-white/10">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                Connect
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Button - Mobile */}
            <div className="px-6 pb-6">
              <button
                onClick={() => {
                  scrollToSection("contact");
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
              >
                <FaEnvelope size={16} />
                Let&apos;s Talk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;