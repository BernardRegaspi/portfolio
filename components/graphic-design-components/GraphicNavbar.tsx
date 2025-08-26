"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import HamburgerIcon from "../HamburgerIcon";
import "../../app/styles/HomePage.css";

const GraphicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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
              <Link href="/" className="flex items-center space-x-2 group">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative px-4 py-2 bg-[#0f0f23] rounded-lg border border-white/10">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      Bernard
                    </span>{" "}
                    <span className="text-2xl font-bold text-white">Dev</span>
                  </div>
                </motion.div>
              </Link>

              {/* Hamburger Menu with Full-Screen Overlay */}
              <HamburgerIcon
                variant="graphic"
                className="hover:text-[#3ca0f2]"
              />
            </div>
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default GraphicNavbar;
