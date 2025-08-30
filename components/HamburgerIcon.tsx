"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FaCode,
  FaPalette,
  FaMobile,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaAmazon,
} from "react-icons/fa";
import { animatePageTransition } from "@/utils/transition";
import Image from "next/image";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

interface HamburgerIconProps {
  className?: string;
  variant?: "main" | "work"; // Different menu types
  onNavigate?: (href: string) => void;
}

// Navigation items for different variants
const navigationItems = {
  main: [
    {
      title: "Full Stack Development",
      href: "/fullstack-development",
      icon: <FaCode />,
      description: "Modern web applications with React, Next.js, and Node.js",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Graphic Design",
      href: "/graphic-design",
      icon: <FaPalette />,
      description: "Creative visual solutions and brand identity design",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Mobile Development",
      href: "/mobile-development",
      icon: <FaMobile />,
      description: "Cross-platform mobile apps with React Native",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Amazon Virtual Assistant",
      href: "/virtual-assistant",
      icon: <FaAmazon />,
      description: "Professional support and project management",
      color: "from-purple-500 to-violet-500",
    },
  ],
  work: [
    {
      title: "Home",
      href: "/",
      icon: <FaHome />,
      description: "Back to the main portfolio homepage",
      color: "from-gray-500 to-gray-600",
    },
    {
      title: "Full Stack Development",
      href: "/fullstack-development",
      icon: <FaCode />,
      description: "Modern web applications with React, Next.js, and Node.js",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Graphic Design",
      href: "/graphic-design",
      icon: <FaPalette />,
      description: "Creative visual solutions and brand identity design",
      color: "from-blue-500 to-cyan-500 ",
    },
    {
      title: "Mobile Development",
      href: "/mobile-development",
      icon: <FaMobile />,
      description: "Cross-platform mobile apps with React Native",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Amazon Virtual Assistant",
      href: "/virtual-assistant",
      icon: <FaAmazon />,
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
    icon: <FaGithub />,
    color: "hover:text-gray-400",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bernard-brennan-regaspi-378b1927b/",
    icon: <FaLinkedin />,
    color: "hover:text-blue-400",
  },
  {
    name: "Email",
    href: "mailto:bernardbrennan.regaspi@gmail.com",
    icon: <FaEnvelope />,
    color: "hover:text-red-400",
  },
  {
    name: "Twitter",
    href: "#",
    icon: <FaTwitter />,
    color: "hover:text-sky-400",
  },
  {
    name: "Instagram",
    href: "#",
    icon: <FaInstagram />,
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
  //   const accentColor = variant === "graphic" ? "#3ca0f2" : "blue-400";

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
        className={`p-2 sm:p-3 md:p-4 text-white transition-colors duration-300 z-[70] ${className}`}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        aria-controls="navigation-dialog"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: "env(safe-area-inset-top, 0)",
          marginRight: "env(safe-area-inset-right, 0)",
        }}
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center min-w-[48px] min-h-[48px] lg:hover:border-white/20 transition-all duration-300">
          <motion.div
            animate={{
              rotate: isMenuOpen ? 180 : 0,
              scale: isMenuOpen ? 0.8 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/icons/burger-menu.svg"
              alt="Menu"
              width={52}
              height={52}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
            />
          </motion.div>
        </div>
      </motion.button>

      {/* Dialog Modal */}
      <dialog
        ref={dialogRef}
        id="navigation-dialog"
        className="backdrop:bg-gradient-to-br backdrop:from-[#0f0f23]/95 backdrop:via-[#1a1a2e]/95 backdrop:to-[#16213e]/95 backdrop:backdrop-blur-xl bg-transparent border-none outline-none w-full scrollbar-show p-0"
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
                className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[80] p-2 sm:p-3 md:p-4 text-white/70 hover:text-white bg-black/20 backdrop-blur-sm hover:bg-black/30 rounded-full border border-white/10 hover:border-white/20 transition-all duration-200"
                aria-label="Close menu"
                style={{
                  marginTop: "env(safe-area-inset-top, 0)",
                  marginRight: "env(safe-area-inset-right, 0)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  className="sm:w-6 sm:h-6 md:w-7 md:h-7"
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
              <div className="w-full h-full px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:pt-20 xl:pt-24 safe-top safe-bottom flex items-center justify-center overflow-y-auto">
                <div className="w-full max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-10rem)] items-center">
                    {/* Navigation Section */}
                    <div className="flex flex-col justify-center order-2 lg:order-1">
                      <motion.h2
                        variants={itemVariants}
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 md:mb-8 text-center lg:text-left"
                      >
                        What do you{" "}
                        <span
                          className={cn(
                            "text-transparent bg-clip-text bg-gradient-to-r",
                            variant === "work"
                              ? "from-[#3ca0f2] to-purple-500"
                              : "from-blue-400 to-purple-500"
                          )}
                        >
                          need?
                        </span>
                      </motion.h2>

                      <motion.div
                        className="space-y-3 sm:space-y-4 md:space-y-6"
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
                            <div className="flex items-center p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                              <div
                                className={cn(
                                  "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-md sm:rounded-lg md:rounded-xl bg-gradient-to-r mr-3 sm:mr-4 md:mr-6 group-hover:scale-110 transition-transform duration-300",
                                  item.color
                                )}
                              >
                                <div className="text-white text-base sm:text-lg md:text-2xl">
                                  {item.icon}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3
                                  className={cn(
                                    "text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-0.5 sm:mb-1 md:mb-2 transition-colors duration-300 truncate",
                                    variant === "work"
                                      ? "group-hover:text-[#3ca0f2]"
                                      : "group-hover:text-blue-400"
                                  )}
                                >
                                  {item.title}
                                </h3>
                                <p className="text-gray-400 text-xs sm:text-sm md:text-base line-clamp-2 sm:line-clamp-none leading-tight">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Profile & Social Section */}
                    <div className="flex flex-col justify-center items-center text-center lg:text-left py-2 sm:py-4 md:py-8 lg:py-0 order-1 lg:order-2">
                      <motion.div
                        variants={itemVariants}
                        className="mb-4 sm:mb-6 md:mb-8"
                      >
                        <div className="relative mt-10">
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
                              "absolute -inset-2 sm:-inset-3 md:-inset-4 lg:-inset-6 rounded-full blur-xl opacity-70",
                              variant === "work"
                                ? "bg-gradient-to-r from-[#3ca0f2]/30 to-purple-500/30"
                                : "bg-gradient-to-r from-blue-500/30 to-purple-500/30"
                            )}
                          />
                          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 mx-auto rounded-full overflow-hidden border-2 border-white/20 sm:border-3 md:border-4 shadow-2xl">
                            <Image
                              src="/images/profile3.png"
                              alt="Bernard - Creative Professional"
                              className="w-full h-full object-cover"
                              width={320}
                              height={320}
                              priority
                            />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="mb-4 sm:mb-6 md:mb-8"
                      >
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                          Bernard Brennan Regaspi
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 max-w-sm sm:max-w-md md:max-w-lg px-2 sm:px-4 md:px-0 leading-relaxed">
                          Creative Professional specializing in Full-Stack
                          Development, Graphic Design, and Digital Solutions
                        </p>
                      </motion.div>

                      {/* Social Links */}
                      <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 md:mb-10"
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
                              "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20 text-white transition-all duration-300 shadow-lg hover:shadow-xl",
                              social.color
                            )}
                            title={social.name}
                          >
                            <div className="text-sm sm:text-base md:text-lg">
                              {social.icon}
                            </div>
                          </motion.a>
                        ))}
                      </motion.div>

                      {/* Contact CTA */}
                      <motion.div
                        variants={itemVariants}
                        className="mt-4 sm:mt-6 md:mt-8"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleNavigation("/")}
                          className={cn(
                            "px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-sm sm:text-base md:text-lg text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 shadow-md",
                            variant === "work"
                              ? "bg-gradient-to-r from-[#3ca0f2] to-purple-500"
                              : "bg-gradient-to-r from-blue-500 to-purple-600"
                          )}
                        >
                          Let&apos;s Work Together
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
