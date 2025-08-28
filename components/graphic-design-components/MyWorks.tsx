"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MyWorksProps {
  onClose?: () => void;
}

interface WorkItem {
  src: string;
  alt: string;
  category: string;
}

const MyWorks: React.FC<MyWorksProps> = ({ onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const isAutoPlay = true;
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Gallery data based on the my-works folder structure
  const allWorks: WorkItem[] = [
    // Embroidery category
    {
      src: "/my-works/Embroidery/Artboard 1.png",
      alt: "Embroidery Design 1",
      category: "Embroidery",
    },
    {
      src: "/my-works/Embroidery/Artboard 2.png",
      alt: "Embroidery Design 2",
      category: "Embroidery",
    },
    {
      src: "/my-works/Embroidery/Artboard 3.png",
      alt: "Embroidery Design 3",
      category: "Embroidery",
    },
    {
      src: "/my-works/Embroidery/Artboard 4.png",
      alt: "Embroidery Design 4",
      category: "Embroidery",
    },
    {
      src: "/my-works/Embroidery/Artboard 5.png",
      alt: "Embroidery Design 5",
      category: "Embroidery",
    },
    {
      src: "/my-works/Embroidery/Artboard 6.png",
      alt: "Embroidery Design 6",
      category: "Embroidery",
    },
    {
      src: "/my-works/Embroidery/Artboard 7.png",
      alt: "Embroidery Design 7",
      category: "Embroidery",
    },
    // Vintage category
    {
      src: "/my-works/Vintage/Artboard 1.png",
      alt: "Vintage Design 1",
      category: "Vintage",
    },
    {
      src: "/my-works/Vintage/Artboard 2.png",
      alt: "Vintage Design 2",
      category: "Vintage",
    },
  ];

  const categories = ["All", "Embroidery", "Vintage"];

  // Filter works based on selected category
  const filteredWorks =
    selectedCategory === "All"
      ? allWorks
      : allWorks.filter((work) => work.category === selectedCategory);

  // Auto-next functionality
  useEffect(() => {
    if (!isAutoPlay || filteredWorks.length <= 1) {
      return;
    }

    // Image change interval
    const imageInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === filteredWorks.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => {
      clearInterval(imageInterval);
    };
  }, [isAutoPlay, filteredWorks.length, currentImageIndex]);

  // Reset current image index when category changes
  useEffect(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(0);
      setIsTransitioning(false);
    }, 200);
  }, [selectedCategory]);

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(
        currentImageIndex === 0
          ? filteredWorks.length - 1
          : currentImageIndex - 1
      );
      setIsTransitioning(false);
    }, 200);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(
        currentImageIndex === filteredWorks.length - 1
          ? 0
          : currentImageIndex + 1
      );
      setIsTransitioning(false);
    }, 200);
  };

  const handleDotClick = (index: number) => {
    if (index !== currentImageIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageLoadStart = () => {
    setIsImageLoading(true);
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] z-0"></div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 text-center">
                My <span className="text-[#3ca0f2] font-bold ">Works</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed text-center">
                Discover my creative portfolio featuring brand designs for{" "}
                <a
                  href="https://shopmodpaws.com"
                  target="_blank"
                  className="text-[#3ca0f2]"
                >
                  Mod Pawz the Modern Pet Salon
                </a>
                , along with custom embroidery patterns and vintage-inspired
                graphics
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="group relative inline-flex items-center justify-center p-3 text-white transition-all duration-300 ease-out border-2 border-white/20 hover:border-white/40 rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#3ca0f2]"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="relative z-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "category-filter-button px-6 py-3 rounded-full transition-all duration-300 font-semibold",
                  selectedCategory === category
                    ? "bg-[#3ca0f2] text-white shadow-lg active"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative z-10 flex-1">
        <div className="w-3/4 mx-auto">
          {filteredWorks.length > 0 ? (
            <div className="relative">
              {/* Main Image Display - Made Bigger */}
              <div className="relative mb-8">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 relative aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden w-full">
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-12 h-12 border-4 border-[#3ca0f2] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {/* Image with transition effects */}
                  <div
                    className={cn(
                      "relative w-full h-full transition-opacity duration-500 ease-in-out",
                      isTransitioning && "opacity-0"
                    )}
                  >
                    <Image
                      src={filteredWorks[currentImageIndex].src}
                      alt={filteredWorks[currentImageIndex].alt}
                      fill
                      className="object-cover transition-opacity duration-500 ease-in-out"
                      onLoad={handleImageLoad}
                      onLoadStart={handleImageLoadStart}
                      priority
                    />
                  </div>

                  {/* Pagination Dots - Inside Gallery */}
                  {filteredWorks.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                      {filteredWorks.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleDotClick(index)}
                          disabled={isTransitioning}
                          className={cn(
                            "w-4 h-4 rounded-full transition-all duration-300 disabled:cursor-not-allowed backdrop-blur-sm ease-in-out  shadow-[0_3px_6px_rgba(0,0,0,0.2)] border-2 border-transparent hover:scale-130 hover:border-white/30 active:shadow-[0_0_20px_rgba(168,85,247,0.6)] active:border-white/50 disabled:opacity-50",
                            index === currentImageIndex
                              ? "bg-[#3ca0f2] scale-125 active shadow-lg"
                              : "bg-white/40 hover:bg-white/60 border-2 border-white/20"
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Navigation Arrows */}
                {filteredWorks.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      disabled={isTransitioning}
                      className="bg-black/50 hover:bg-black/70 hover:scale-110 hover:shadow-[0_5px_15px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/20 ease-in-out absolute left-4 top-1/2 p-4 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={isTransitioning}
                      className="bg-black/50 hover:bg-black/70 hover:scale-110 hover:shadow-[0_5px_15px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/20 ease-in-out absolute right-4 top-1/2 p-4 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl">
                No works found in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mod Paws Project Tools Section */}
      <div className="relative z-10 mt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mod Paws Project <span className="text-[#3ca0f2]">Toolkit</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Tools and platforms we used to design and launch the{" "}
              <a
                href="https://shopmodpaws.com"
                target="_blank"
                className="text-[#3ca0f2] hover:underline"
              >
                Mod Pawz Modern Pet Salon
              </a>{" "}
              brand identity and e-commerce platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Adobe Photoshop",
                category: "Design Software",
                gradient: "from-blue-500 to-cyan-600",
                icon: "/my-works/Tools/photoshop.svg",
              },
              {
                name: "Adobe Illustrator",
                category: "Vector Graphics",
                gradient: "from-orange-500 to-red-600",
                icon: "/my-works/Tools/illustrator.svg",
              },
              {
                name: "Canva",
                category: "Design Platform",
                gradient: "from-purple-500 to-indigo-600",
                icon: "/my-works/Tools/canva.svg",
              },
              {
                name: "Befunky",
                category: "Photo Editor",
                gradient: "from-green-500 to-emerald-600",
                icon: "/my-works/Tools/befunky.svg",
              },
              {
                name: "Slack",
                category: "Communication",
                gradient: "from-pink-500 to-rose-600",
                icon: "/my-works/Tools/slack.svg",
              },
              {
                name: "Printify",
                category: "Print Services",
                gradient: "from-yellow-500 to-orange-600",
                icon: "/my-works/Tools/printify.svg",
              },
              {
                name: "Printful",
                category: "Fulfillment",
                gradient: "from-teal-500 to-cyan-600",
                icon: "/my-works/Tools/printful.svg",
              },
              {
                name: "Etsy",
                category: "Marketplace",
                gradient: "from-red-500 to-pink-600",
                icon: "/my-works/Tools/etsy.svg",
              },
              {
                name: "Shopify",
                category: "E-commerce",
                gradient: "from-indigo-500 to-purple-600",
                icon: "/my-works/Tools/shopify.svg",
              },
            ].map((tool, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-500/50 transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* Tool content */}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {tool.icon ? (
                      <Image
                        src={tool.icon}
                        alt={`${tool.name} icon`}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {tool.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#3ca0f2] transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{tool.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Project Impact */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-[#3ca0f2] rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">
                Complete brand transformation delivered with these professional
                tools
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyWorks;
