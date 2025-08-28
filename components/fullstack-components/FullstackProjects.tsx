"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  X,
  Maximize2,
  ExternalLink,
  GitBranch,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Project } from "@/types/projects";
import { fullstackProjectsData } from "@/data/projects";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FullstackProjectsProps {
  projects?: Project[];
  maxDisplay?: number;
  showFullGalleryButton?: boolean;
  onViewGallery?: () => void;
}

const FullstackProjects: React.FC<FullstackProjectsProps> = ({
  projects = fullstackProjectsData,
  maxDisplay = 3,
  showFullGalleryButton = true,
  onViewGallery,
}) => {
  const displayProjects = projects.slice(0, maxDisplay);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
      },
    },
  };

  const openImageModal = (imageUrl: string, project: Project) => {
    setSelectedProject(project);
    const imageIndex = project.galleryImages.findIndex(
      (img) => img === imageUrl
    );
    setCurrentImageIndex(imageIndex >= 0 ? imageIndex : 0);
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handlePrevious = () => {
    if (!selectedProject) return;
    setIsTransitioning(true);
    setTimeout(() => {
      const newIndex =
        currentImageIndex === 0
          ? selectedProject.galleryImages.length - 1
          : currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(selectedProject.galleryImages[newIndex]);
      setIsTransitioning(false);
    }, 200);
  };

  const handleNext = () => {
    if (!selectedProject) return;
    setIsTransitioning(true);
    setTimeout(() => {
      const newIndex =
        currentImageIndex === selectedProject.galleryImages.length - 1
          ? 0
          : currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(selectedProject.galleryImages[newIndex]);
      setIsTransitioning(false);
    }, 200);
  };

  const handleDotClick = (index: number) => {
    if (!selectedProject || index === currentImageIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setSelectedImage(selectedProject.galleryImages[index]);
      setIsTransitioning(false);
    }, 200);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageLoadStart = () => {
    setIsImageLoading(true);
  };

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Fullstack Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive web applications showcasing end-to-end development
            skills with modern technologies and best practices.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Project Image */}
              <div
                className="relative h-72 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden cursor-pointer"
                onClick={() => openImageModal(project.imageUrl, project)}
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                  loading={index < 3 ? undefined : "lazy"}
                  quality={75}
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-30 px-2 py-1 rounded-full">
                  <span className="text-white text-xs font-medium">
                    {project.completedDate}
                  </span>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-green-500 px-2 py-1 rounded-full">
                    <span className="text-white text-xs font-bold">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => openImageModal(project.imageUrl, project)}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors py-2 px-3 border border-blue-200 dark:border-blue-800 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Maximize2 className="w-4 h-4" />
                    View Project
                  </motion.button>

                  {project.githubUrl && (
                    <motion.button
                      onClick={() => window.open(project.githubUrl, "_blank")}
                      className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors py-2 px-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <GitBranch className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/20 backdrop-blur-sm p-2 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="bg-white dark:bg-gray-900 w-full flex flex-col rounded-lg overflow-hidden">
                  {/* Scrollable Content Container */}
                  <div className="overflow-y-auto flex-1 min-h-0">
                    {/* Gallery Section */}
                    <div className="relative">
                      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-t-lg flex items-center justify-center">
                        {isImageLoading && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}

                        {/* Main Image with transition effects */}
                        <div
                          className={cn(
                            "relative w-full h-full transition-opacity duration-500 ease-in-out flex items-center justify-center",
                            isTransitioning && "opacity-0"
                          )}
                        >
                          <Image
                            src={selectedImage}
                            alt={selectedProject.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                            style={{ objectFit: "contain" }}
                            quality={100}
                            priority
                            onLoad={handleImageLoad}
                            onLoadStart={handleImageLoadStart}
                          />
                        </div>

                        {/* Navigation Arrows */}
                        {selectedProject.galleryImages.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevious}
                              disabled={isTransitioning}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 hover:scale-110 backdrop-blur-md border border-white/20 p-3 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                              onClick={handleNext}
                              disabled={isTransitioning}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 hover:scale-110 backdrop-blur-md border border-white/20 p-3 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </button>
                          </>
                        )}

                        {/* Pagination Dots */}
                        {selectedProject.galleryImages.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                            {selectedProject.galleryImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                disabled={isTransitioning}
                                className={cn(
                                  "w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed backdrop-blur-sm border border-white/30",
                                  index === currentImageIndex
                                    ? "bg-blue-600 scale-125 shadow-lg"
                                    : "bg-white/40 hover:bg-white/60"
                                )}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Details Section */}
                    <div className="p-6 md:p-8 max-w-5xl mx-auto">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-6">
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {selectedProject.title}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                            <Calendar className="w-5 h-5" />
                            <span className="text-sm md:text-base">
                              Completed in {selectedProject.completedDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-3 flex-shrink-0">
                          {selectedProject.demoUrl && (
                            <motion.button
                              onClick={() =>
                                window.open(selectedProject.demoUrl, "_blank")
                              }
                              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </motion.button>
                          )}
                          {selectedProject.githubUrl && (
                            <motion.button
                              onClick={() =>
                                window.open(selectedProject.githubUrl, "_blank")
                              }
                              className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <GitBranch className="w-4 h-4" />
                              View Code
                            </motion.button>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base max-w-3xl">
                        {selectedProject.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-base font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Image counter */}
                      {selectedProject.galleryImages.length > 1 && (
                        <div className="text-center">
                          <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-6 py-3">
                            <span className="text-base text-gray-600 dark:text-gray-300">
                              {currentImageIndex + 1} of{" "}
                              {selectedProject.galleryImages.length}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Projects Button */}
        {showFullGalleryButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <motion.button
              onClick={onViewGallery}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-6 h-6" />
              View All Projects
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FullstackProjects;
