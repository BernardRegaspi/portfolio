"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import PhotoshopIcon from "@/public/tools-icon/photoshop.svg";
import IllustratorIcon from "@/public/tools-icon/illustrator.svg";
import CanvaIcon from "@/public/tools-icon/canva.svg";
import ReactIcon from "@/public/tools-icon/react.svg";
import NextIcon from "@/public/tools-icon/nextjs.svg";
import VueIcon from "@/public/tools-icon/vue.svg";
import JavaScriptIcon from "@/public/tools-icon/javascript.svg";
import CSSIcon from "@/public/tools-icon/sass.svg";
import BootstrapIcon from "@/public/tools-icon/bootstrap.svg";
import TailwindIcon from "@/public/tools-icon/tailwind.svg";
import LaravelIcon from "@/public/tools-icon/laravel.svg";
import NodeIcon from "@/public/tools-icon/nodejs.svg";
import FastAPIIcon from "@/public/tools-icon/fastAPI.svg";
import PHPIcon from "@/public/tools-icon/php.svg";
import PythonIcon from "@/public/tools-icon/python.svg";
import MySQLIcon from "@/public/tools-icon/mysql.svg";
import MongoDBIcon from "@/public/tools-icon/mongodb.svg";
import PostgreSQLIcon from "@/public/tools-icon/postgresql.svg";
import AndroidStudioIcon from "@/public/tools-icon/android-studio.svg";
import KotlinIcon from "@/public/tools-icon/kotlin.svg";
import ReactNativeIcon from "@/public/tools-icon/react.svg";
import Helium from "@/public/tools-icon/helium.svg";
import AmazonSeller from "@/public/tools-icon/amazon-seller.svg";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Tool {
  name: string;
  category: string;
  color: string;
  icon?: string;
}

const toolsData: Tool[] = [
  // Design Tools
  {
    name: "Adobe Photoshop",
    category: "Design",
    color: "#31A8FF",
    icon: PhotoshopIcon,
  },
  {
    name: "Adobe Illustrator",
    category: "Design",
    color: "#FF9A00",
    icon: IllustratorIcon,
  },
  { name: "Canva", category: "Design", color: "#00C4CC", icon: CanvaIcon },

  // Frontend Technologies
  { name: "React", category: "Frontend", color: "#61DAFB", icon: ReactIcon },
  { name: "Next.js", category: "Frontend", color: "#000000", icon: NextIcon },
  { name: "Vue.js", category: "Frontend", color: "#4FC08D", icon: VueIcon },
  {
    name: "JavaScript",
    category: "Frontend",
    color: "#F7DF1E",
    icon: JavaScriptIcon,
  },
  { name: "CSS/SASS", category: "Frontend", color: "#1572B6", icon: CSSIcon },
  {
    name: "Bootstrap",
    category: "Frontend",
    color: "#7952B3",
    icon: BootstrapIcon,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    color: "#06B6D4",
    icon: TailwindIcon,
  },

  // Backend Technologies
  { name: "Laravel", category: "Backend", color: "#FF2D20", icon: LaravelIcon },
  { name: "Node.js", category: "Backend", color: "#339933", icon: NodeIcon },
  { name: "FastAPI", category: "Backend", color: "#009688", icon: FastAPIIcon },
  { name: "PHP", category: "Backend", color: "#777BB4", icon: PHPIcon },
  { name: "Python", category: "Backend", color: "#3776AB", icon: PythonIcon },

  // Databases
  { name: "MySQL", category: "Database", color: "#4479A1", icon: MySQLIcon },
  {
    name: "MongoDB",
    category: "Database",
    color: "#47A248",
    icon: MongoDBIcon,
  },
  {
    name: "PostgreSQL",
    category: "Database",
    color: "#336791",
    icon: PostgreSQLIcon,
  },

  // Mobile Development
  {
    name: "Android Studio",
    category: "Mobile",
    color: "#3DDC84",
    icon: AndroidStudioIcon,
  },
  { name: "Kotlin", category: "Mobile", color: "#7F52FF", icon: KotlinIcon },
  {
    name: "React Native",
    category: "Mobile",
    color: "#61DAFB",
    icon: ReactNativeIcon,
  },

  // Tools & DevOps
  // { name: "Git", category: "DevOps", color: "#F05032", icon: "🌿" },
  // { name: "GitHub", category: "DevOps", color: "#181717", icon: "🐱" },
  // { name: "GitLab", category: "DevOps", color: "#FC6D26", icon: "🦊" },
  // { name: "Postman", category: "DevOps", color: "#FF6C37", icon: "📮" },
  { name: "Helium 10", category: "Analytics", color: "#0081ff", icon: Helium },
  { name: "Seller Central", category: "Analytics", color: "#fa9826", icon: AmazonSeller },
];

const categories = Array.from(new Set(toolsData.map((tool) => tool.category)));

const Tools = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate tool cards with stagger effect
      gsap.fromTo(
        ".tool-card",
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tools-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tools"
      ref={containerRef}
      className="min-h-screen bg-[#0a0a0a] py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 mb-6"
          >
            Tools & Technologies
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit that empowers me to bring ideas to life
            across design, development, and deployment.
          </p>
        </motion.div>

        {/* Tools Grid by Category */}
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
          >
            {/* Category Header */}
            <div className="flex items-center mb-8">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-1 mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white px-6">
                {category}
              </h2>
              <div className="h-1 bg-gradient-to-l from-blue-500 to-purple-600 rounded-full flex-1 ml-4"></div>
            </div>

            {/* Tools Grid */}
            <div className="tools-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {toolsData
                .filter((tool) => tool.category === category)
                .map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    className="tool-card group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: toolIndex * 0.05,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    {/* Animated background glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-xl"
                      style={{ backgroundColor: tool.color }}
                    ></div>

                    {/* Animated border glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"
                      style={{
                        background: `linear-gradient(45deg, ${tool.color}20, transparent, ${tool.color}20)`,
                        border: `1px solid ${tool.color}40`,
                      }}
                    ></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Icon */}
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {/* {tool.icon} */}
                        {tool.icon && (
                          <Image
                            src={tool.icon}
                            width={96}
                            height={96}
                            alt="Tools Icon"
                            className="mx-auto mb-12 w-24 h-24"
                          />
                        )}
                      </div>

                      {/* Tool Name */}
                      <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-white transition-colors duration-300">
                        {tool.name}
                      </h3>

                      {/* Animated color bar */}
                      <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: tool.color }}
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          transition={{
                            duration: 1.2,
                            delay: categoryIndex * 0.5 + toolIndex * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>

                    {/* Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                      <div
                        className="absolute w-1 h-1 rounded-full bg-current opacity-0 group-hover:opacity-30 transition-opacity duration-300 top-4 left-8"
                        style={{ backgroundColor: tool.color }}
                      ></div>
                      <div
                        className="absolute w-1 h-1 rounded-full bg-current opacity-0 group-hover:opacity-20 transition-opacity duration-500 top-8 right-6"
                        style={{ backgroundColor: tool.color }}
                      ></div>
                      <div
                        className="absolute w-1 h-1 rounded-full bg-current opacity-0 group-hover:opacity-40 transition-opacity duration-700 bottom-6 left-6"
                        style={{ backgroundColor: tool.color }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}

        {/* Stats Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                >
                  {toolsData.length}+
                </motion.div>
                <p className="text-gray-400">Tools Mastered</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                >
                  {categories.length}
                </motion.div>
                <p className="text-gray-400">Categories</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                  2+
                </motion.div>
                <p className="text-gray-400">Years Experience</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
                >
                  5+
                </motion.div>
                <p className="text-gray-400">Projects Built</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
