"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, Maximize2 } from "lucide-react";
import { Certificate } from "@/types/certificates";
import { certificatesData } from "@/data/certificates";
import Image from "next/image";
// import Image from "next/image";

interface CertificatesPreviewProps {
  certificates?: Certificate[];
  maxDisplay?: number;
  showFullGalleryButton?: boolean;
  onViewGallery?: () => void;
}

const MyCertificates: React.FC<CertificatesPreviewProps> = ({
  certificates = certificatesData,
  maxDisplay = 3,
  showFullGalleryButton = true,
  onViewGallery,
}) => {
  const displayCertificates = certificates.slice(0, maxDisplay);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        // duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="certificates" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          //   transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional certifications and achievements that demonstrate my
            expertise and commitment to continuous learning.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {displayCertificates.map((certificate) => (
            <motion.div
              key={certificate.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Certificate Image Placeholder */}
              <div className="relative h-72 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                <Image
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  fill
                  loading="lazy"
                  quality={75}
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-30 px-2 py-1 rounded-full">
                  <span className="text-white text-xs font-medium">
                    {certificate.date}
                  </span>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {certificate.title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {certificate.issuer}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {certificate.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {certificate.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {certificate.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium">
                      +{certificate.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <motion.button
                  onClick={() => setSelectedImage(certificate.imageUrl)}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Maximize2 className="w-4 h-4" />
                  View Credential
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Full Screen Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-7xl w-full max-h-[90vh] aspect-[4/3]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage}
                    alt="Certificate Full View"
                    fill
                    style={{ objectFit: "contain" }}
                    quality={100}
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Gallery Button */}
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
              <Award className="w-6 h-6" />
              View All Certificates
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MyCertificates;
