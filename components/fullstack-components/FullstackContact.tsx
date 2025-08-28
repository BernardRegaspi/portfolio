"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCode,
  FaDatabase,
  FaServer,
  FaCloud,
  FaLaptopCode,
  FaMobile,
} from "react-icons/fa";
import "../../app/styles/HomePage.css";

// Contact form interface
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Contact info interface
interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}

// Contact information data - focused on fullstack development
const contactInfo: ContactInfo[] = [
  {
    icon: <FaEnvelope size={24} />,
    title: "Email",
    value: "bernard.regaspi.dev@gmail.com",
    link: "mailto:bernard.regaspi.dev@gmail.com",
  },
  {
    icon: <FaPhone size={24} />,
    title: "Phone",
    value: "+639951311231",
    link: "tel:+639951311231",
  },
  {
    icon: <FaMapMarkerAlt size={24} />,
    title: "Location",
    value: "Remote / Available Worldwide",
  },
];

// Fullstack development services
const developmentServices = [
  {
    icon: <FaLaptopCode size={20} />,
    title: "Frontend Development",
    description: "React, Next.js, Vue.js, TypeScript, and modern UI frameworks",
  },
  {
    icon: <FaServer size={20} />,
    title: "Backend Development",
    description: "Node.js, Python, FastAPI, REST APIs, and microservices",
  },
  {
    icon: <FaDatabase size={20} />,
    title: "Database Solutions",
    description: "PostgreSQL, MongoDB, MySQL, and database optimization",
  },
  {
    icon: <FaCloud size={20} />,
    title: "Cloud & DevOps",
    description: "AWS, Docker, CI/CD pipelines, and deployment strategies",
  },
  {
    icon: <FaMobile size={20} />,
    title: "Mobile Development",
    description: "React Native, cross-platform apps, and mobile optimization",
  },
  {
    icon: <FaCode size={20} />,
    title: "Full-Stack Integration",
    description: "End-to-end development, system architecture, and scaling",
  },
];

interface Particle {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

const FullstackContact = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "Fullstack Development Project", // Pre-filled subject
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  useEffect(() => {
    // Create animated particles
    const createParticles = () => {
      const particleCount = 50;
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 8,
          animationDuration: Math.random() * 4 + 4,
        });
      }

      setParticles(newParticles);
    };

    createParticles();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus(
        "Message sent successfully! I'll get back to you soon to discuss your project requirements."
      );
      setFormData({
        name: "",
        email: "",
        subject: "Fullstack Development Project",
        message: "",
      });
    } catch {
      setSubmitStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="fullstack-contact"
      className="min-h-screen relative overflow-hidden"
    >
      {/* Dark theme background gradient - fullstack developer colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] z-0"></div>

      {/* Code-like grid overlay */}
      <div className="absolute inset-0 opacity-5 z-[1]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(247, 99, 96, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(247, 99, 96, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated particles - more tech-like */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#f76360]/40 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
              animation: "float 8s ease-in-out infinite",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-[2] container mx-auto px-6 py-16">
        {/* Header section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow animate-fade-in-up">
            Let&apos;s Build{" "}
            <span className="text-[#f76360] font-bold">Something Amazing</span>
            <span className="ml-2">💻</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed text-shadow animate-fade-in-up animation-delay-300">
            Ready to transform your ideas into powerful digital solutions?
            Let&apos;s collaborate on building scalable, modern applications
            that drive results and exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up animation-delay-600">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-shadow">
                Let&apos;s Discuss Your Development Needs
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Whether you need a complete web application, mobile app, API
                development, or system integration - I&apos;m here to bring your
                technical vision to life with clean, efficient, and scalable
                code.
              </p>
            </div>

            {/* Development Services */}
            <div className="mb-8">
              <h3 className="text-white font-semibold text-xl mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#f76360] rounded-full"></span>
                Development Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {developmentServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-[#f76360]/20 text-[#f76360]">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1 text-sm">
                        {service.title}
                      </h4>
                      <p className="text-white/70 text-xs">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-6 p-6 rounded-xl backdrop-blur-lg border border-white/10 transition-all duration-300"
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <div className="p-4 rounded-xl bg-[#f76360] text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-white/80 hover:text-[#f76360] transition-colors duration-300 hover:underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white/80">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up animation-delay-900">
            <div
              className="p-8 rounded-2xl backdrop-blur-lg border border-white/10 transition-all duration-300"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-shadow">
                Start Your Development Project
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white font-medium mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#f76360] focus:ring-2 focus:ring-[#f76360]/20 transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-medium mb-2"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#f76360] focus:ring-2 focus:ring-[#f76360]/20 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-white font-medium mb-2"
                  >
                    Project Type *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#f76360] focus:ring-2 focus:ring-[#f76360]/20 transition-all duration-300"
                    placeholder="e.g., Web Application, Mobile App, API Development, E-commerce"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2"
                  >
                    Project Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#f76360] focus:ring-2 focus:ring-[#f76360]/20 transition-all duration-300 resize-none"
                    placeholder="Describe your project requirements, tech stack preferences, timeline, budget range, and any specific features or integrations needed..."
                  ></textarea>
                </div>

                {submitStatus && (
                  <div
                    className={cn(
                      "p-4 rounded-lg text-center font-medium",
                      submitStatus.includes("successfully")
                        ? "bg-green-500/20 border border-green-400/30 text-green-300"
                        : "bg-red-500/20 border border-red-400/30 text-red-300"
                    )}
                  >
                    {submitStatus}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3",
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-[#f76360] hover:bg-[#e55a56] hover:shadow-lg hover:scale-[1.02]"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={18} />
                      Start Development Project
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullstackContact;
