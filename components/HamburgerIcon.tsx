"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FaCode,
  FaPalette,
  FaMobile,
  FaUserTie,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaTools,
  FaCertificate,
  FaBriefcase,
  FaAmazon,
} from "react-icons/fa";
import { animatePageTransition } from "@/utils/transition";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

interface HamburgerIconProps {
  className?: string;
  variant?: "main" | "graphic"; // Different menu types
  onNavigate?: (href: string) => void;
}

// Navigation items for different variants
const navigationItems = {
  main: [
    {
      title: "Full Stack Development",
      href: "/fullstack-development",
      icon: <FaCode size={32} />,
      description: "Modern web applications with React, Next.js, and Node.js",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Graphic Design",
      href: "/graphic-design",
      icon: <FaPalette size={32} />,
      description: "Creative visual solutions and brand identity design",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Mobile Development",
      href: "/mobile-development",
      icon: <FaMobile size={32} />,
      description: "Cross-platform mobile apps with React Native",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Amazon Virtual Assistant",
      href: "/virtual-analyst",
      icon: <FaAmazon size={32} />,
      description: "Professional support and project management",
      color: "from-purple-500 to-violet-500",
    },
  ],
  graphic: [
    {
      title: "Home",
      href: "/",
      icon: <FaHome size={32} />,
      description: "Back to the main portfolio homepage",
      color: "from-gray-500 to-gray-600",
    },
    {
      title: "Full Stack Development",
      href: "/fullstack-development",
      icon: <FaCode size={32} />,
      description: "Modern web applications with React, Next.js, and Node.js",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Graphic Design",
      href: "/graphic-design",
      icon: <FaPalette size={32} />,
      description: "Creative visual solutions and brand identity design",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Mobile Development",
      href: "/mobile-development",
      icon: <FaMobile size={32} />,
      description: "Cross-platform mobile apps with React Native",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Amazon Virtual Assistant",
      href: "/virtual-analyst",
      icon: <FaAmazon size={32} />,
      description: "Professional support and project management",
      color: "from-purple-500 to-violet-500",
    },
  ],
};

// Social links
const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/BernardRegaspi",
    icon: <FaGithub size={24} />,
    color: "hover:text-gray-400",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bernard-brennan-regaspi-378b1927b/",
    icon: <FaLinkedin size={24} />,
    color: "hover:text-blue-400",
  },
  {
    name: "Email",
    href: "mailto:bernardbrennan.regaspi@gmail.com",
    icon: <FaEnvelope size={24} />,
    color: "hover:text-red-400",
  },
  {
    name: "Twitter",
    href: "#",
    icon: <FaTwitter size={24} />,
    color: "hover:text-sky-400",
  },
  {
    name: "Instagram",
    href: "#",
    icon: <FaInstagram size={24} />,
    color: "hover:text-pink-400",
  },
];

// Animation variants
const overlayVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.55, 0.085, 0.68, 0.53], // Custom easing for smooth exit
      staggerChildren: 0.05,
      staggerDirection: -1, // Reverse stagger on exit
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const socialVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const HamburgerIcon = ({
  className = "",
  variant = "main",
  onNavigate,
}: HamburgerIconProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentNavigationItems = navigationItems[variant];
  const accentColor = variant === "graphic" ? "#3ca0f2" : "blue-400";

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMenuOpen) {
      handleCloseWithAnimation();
    }
  }, [pathname]);

  // Handle dialog open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (isMenuOpen && !isAnimating) {
      dialog.showModal();
      setIsAnimating(true);
      // Focus the dialog for accessibility
      dialog.focus();
    } else if (!isMenuOpen && isAnimating) {
      // Delay closing the dialog to allow exit animation
      closeTimeoutRef.current = setTimeout(() => {
        if (dialog.open) {
          dialog.close();
        }
        setIsAnimating(false);
        closeTimeoutRef.current = null;
      }, 350); // Match the animation duration
    } else if (!isMenuOpen && !isAnimating) {
      // Immediate close if not animating
      if (dialog.open) {
        dialog.close();
      }
    }

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, [isMenuOpen, isAnimating]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear timeout on unmount
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      // Restore body styles on unmount
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, []);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isMenuOpen || isAnimating) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore scrolling and position
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMenuOpen, isAnimating]);

  // Handle escape key and backdrop click
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      handleCloseWithAnimation();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseWithAnimation();
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleClose);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleClose);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseWithAnimation = () => {
    // Prevent multiple close attempts and ensure clean state
    if (isMenuOpen) {
      setIsMenuOpen(false);
      if (!isAnimating) {
        setIsAnimating(true);
      }
    }
  };

  const handleNavigation = async (href: string) => {
    handleCloseWithAnimation();

    // Check if we're already on the target page
    const isCurrentPage = pathname === href;

    // Add a small delay to allow menu close animation
    setTimeout(async () => {
      if (onNavigate) {
        onNavigate(href);
      } else {
        // Only animate transition if we're actually changing pages
        if (!isCurrentPage) {
          await animatePageTransition();
          router.push(href);
        }
        // If same page, just close the menu without transition
      }
    }, 350); // Slightly longer delay for smoother animation
  };

  return (
    <>
      <motion.button
        onClick={toggleMenu}
        className={`relative p-3 text-white transition-colors duration-300 z-[60] border border-white/20 rounded-lg ${className}`}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        aria-controls="navigation-dialog"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-6 h-6 flex flex-col justify-between">
          <motion.span
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 8 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="w-full h-0.5 bg-white origin-center"
          />
          <motion.span
            animate={{
              opacity: isMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="w-full h-0.5 bg-white"
          />
          <motion.span
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -8 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="w-full h-0.5 bg-white origin-center"
          />
        </div>
      </motion.button>

      {/* Dialog Modal */}
      <dialog
        ref={dialogRef}
        id="navigation-dialog"
        className="backdrop:bg-gradient-to-br backdrop:from-[#0f0f23]/95 backdrop:via-[#1a1a2e]/95 backdrop:to-[#16213e]/95 backdrop:backdrop-blur-xl bg-transparent border-none outline-none w-full h-full p-0 overflow-hidden"
        style={{
          position: "fixed",
          inset: "0",
          margin: "0",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
        onClick={(e) => {
          // Close dialog when clicking the backdrop
          if (e.target === e.currentTarget) {
            handleCloseWithAnimation();
          }
        }}
      >
        <AnimatePresence mode="wait">
          {(isMenuOpen || isAnimating) && (
            <motion.div
              initial="hidden"
              animate={isMenuOpen ? "visible" : "exit"}
              exit="exit"
              variants={overlayVariants}
              onAnimationComplete={(definition) => {
                if (definition === "exit") {
                  setIsAnimating(false);
                }
              }}
              className="relative w-full h-full bg-gradient-to-br from-[#0f0f23]/95 via-[#1a1a2e]/95 to-[#16213e]/95 backdrop-blur-xl"
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                onClick={handleCloseWithAnimation}
                className="absolute top-6 right-6 z-20 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                aria-label="Close menu"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
              {/* Menu Content */}
              <div className="w-full h-full px-6 py-12 flex items-center justify-center overflow-y-auto">
                <div className="w-full max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[80vh] items-center">
                    {/* Navigation Section */}
                    <div className="flex flex-col justify-center py-8 lg:py-0">
                      <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center lg:text-left"
                      >
                        What do you{" "}
                        <span
                          className={cn(
                            "text-transparent bg-clip-text bg-gradient-to-r",
                            variant === "graphic"
                              ? "from-[#3ca0f2] to-purple-500"
                              : "from-blue-400 to-purple-500"
                          )}
                        >
                          need?
                        </span>
                      </motion.h2>

                      <motion.div
                        className="space-y-6"
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.15,
                            },
                          },
                          exit: {
                            transition: {
                              staggerChildren: 0.05,
                              staggerDirection: -1,
                            },
                          },
                        }}
                      >
                        {currentNavigationItems.map((item, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 10 }}
                            whileTap={{ scale: 0.98 }}
                            className="group cursor-pointer"
                            onClick={() => handleNavigation(item.href)}
                          >
                            <div className="flex items-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                              <div
                                className={cn(
                                  "flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r mr-6 group-hover:scale-110 transition-transform duration-300",
                                  item.color
                                )}
                              >
                                <div className="text-white">{item.icon}</div>
                              </div>
                              <div className="flex-1">
                                <h3
                                  className={cn(
                                    "text-xl md:text-2xl font-semibold text-white mb-2 transition-colors duration-300",
                                    variant === "graphic"
                                      ? "group-hover:text-[#3ca0f2]"
                                      : "group-hover:text-blue-400"
                                  )}
                                >
                                  {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Profile & Social Section */}
                    <div className="flex flex-col justify-center items-center text-center lg:text-left py-8 lg:py-0">
                      <motion.div variants={itemVariants} className="mb-8">
                        <div className="relative">
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className={cn(
                              "absolute -inset-4 rounded-full blur-xl opacity-70",
                              variant === "graphic"
                                ? "bg-gradient-to-r from-[#3ca0f2]/30 to-purple-500/30"
                                : "bg-gradient-to-r from-blue-500/30 to-purple-500/30"
                            )}
                          />
                          <div className="relative w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-white/20">
                            <img
                              src="/images/profile3.png"
                              alt="Bernard - Creative Professional"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="mb-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                          Bernard Brennan Regaspi
                        </h3>
                        <p className="text-gray-300 text-lg mb-6 max-w-md">
                          Creative Professional specializing in Full-Stack
                          Development, Graphic Design, and Digital Solutions
                        </p>
                      </motion.div>

                      {/* Social Links */}
                      <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-4"
                      >
                        {socialLinks.map((social, index) => (
                          <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={socialVariants}
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                              "flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white transition-all duration-300",
                              social.color
                            )}
                            title={social.name}
                          >
                            {social.icon}
                          </motion.a>
                        ))}
                      </motion.div>

                      {/* Contact CTA */}
                      <motion.div variants={itemVariants} className="mt-8">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleNavigation("/")}
                          className={cn(
                            "px-8 py-4 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300",
                            variant === "graphic"
                              ? "bg-gradient-to-r from-[#3ca0f2] to-purple-500"
                              : "bg-gradient-to-r from-blue-500 to-purple-600"
                          )}
                        >
                          Let's Work Together
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
};

export default HamburgerIcon;
