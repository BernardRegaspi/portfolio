"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { animatePageTransition } from "@/utils/transition";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCode,
  FaPalette,
  FaMobileAlt,
  FaAmazon,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";
import "../app/styles/HomePage.css";

// Navigation links
const navigationLinks = [
  { name: "Home", href: "#home" },
  { name: "Tools", href: "#tools" },
  { name: "Certificates", href: "#certificates" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

// Services links
const serviceLinks = [
  {
    name: "Full Stack Development",
    href: "/fullstack-development",
    icon: <FaCode size={16} />,
  },
  {
    name: "Graphic Design",
    href: "/graphic-design",
    icon: <FaPalette size={16} />,
  },
  {
    name: "Mobile Development",
    href: "/mobile-development",
    icon: <FaMobileAlt size={16} />,
  },
  {
    name: "Virtual Assistant",
    href: "/virtual-analyst",
    icon: <FaAmazon size={16} />,
  },
];

// Social links
const socialLinks = [
  {
    icon: <FaGithub size={20} />,
    name: "GitHub",
    url: "https://github.com/BernardRegaspi",
    hoverColor: "hover:text-gray-400",
  },
  {
    icon: <FaLinkedin size={20} />,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/bernard-brennan-regaspi-378b1927b/",
    hoverColor: "hover:text-blue-400",
  },
  {
    icon: <FaEnvelope size={20} />,
    name: "Email",
    url: "mailto:bernard.regaspi.pixel8@gmail.com",
    hoverColor: "hover:text-red-400",
  },
];

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const router = useRouter();
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

  // Page transition handler for service links
  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetPath = href.replace(window.location.origin, "");

    // Don't animate transition if we're already on the target page
    if (pathname === targetPath) {
      return;
    }

    // Trigger closing transition
    await animatePageTransition();

    // Navigate to the new page
    router.push(targetPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gradient-to-t from-[#0a0a1a] to-[#0f0f23] border-t border-white/10">
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{
              scale: 1.1,
              background:
                "linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234))",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp size={25} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Bernard
                </span>
                <span className="text-white"> Dev</span>
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Full Stack Developer & Creative Technologist. Transforming ideas
                into digital reality through innovative solutions and
                cutting-edge technology.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                Connect With Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target={
                      social.url.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={cn(
                      "p-3 bg-white/5 border border-white/10 rounded-lg text-white/80 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-110",
                      social.hoverColor
                    )}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-6 text-lg">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href.replace("#", ""))}
                    className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group w-full text-left"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-6 text-lg">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    onClick={handleTransition}
                    className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-3 group"
                  >
                    <span className="text-white/60 group-hover:text-white transition-colors duration-300">
                      {service.icon}
                    </span>
                    <span className="flex-1">{service.name}</span>
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-6 text-lg">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg text-white mt-0.5">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <a
                    href="mailto:bernard.regaspi.pixel8@gmail.com"
                    className="text-white/80 hover:text-white transition-colors duration-300 text-sm"
                  >
                    bernard.regaspi.pixel8@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white mt-0.5">
                  <FaPhone size={14} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Phone</p>
                  <a
                    href="tel:+639951311231"
                    className="text-white/80 hover:text-white transition-colors duration-300 text-sm"
                  >
                    +639951311231
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-white mt-0.5">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Location</p>
                  <p className="text-white/80 text-sm">
                    Remote / Available Worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-white/80">
              <span>© {currentYear} Bernard Dev. Made with</span>
              <FaHeart className="text-red-500 animate-pulse" size={16} />
              <span>and lots of coffee.</span>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-white/60">
              <span className="hover:text-white transition-colors duration-300 cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:text-white transition-colors duration-300 cursor-pointer">
                Terms of Service
              </span>
              <span className="hover:text-white transition-colors duration-300 cursor-pointer">
                Sitemap
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
};

export default Footer;
