"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPalette,
  FaPaintBrush,
  FaImages,
} from "react-icons/fa";
import "../../app/styles/HomePage.css";
import emailjs from "@emailjs/browser";

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
  gradient: string;
}

// Contact information data - focused on graphic design
const contactInfo: ContactInfo[] = [
  {
    icon: <FaEnvelope size={24} />,
    title: "Email",
    value: "bernard.regaspi.pixel8@gmail.com",
    link: "mailto:bernard.regaspi.pixel8@gmail.com",
    gradient: "from-[#3ca0f2] to-blue-600",
  },
  {
    icon: <FaPhone size={24} />,
    title: "Phone",
    value: "+639951311231",
    link: "tel:+639951311231",
    gradient: "from-[#3ca0f2] to-cyan-600",
  },
  {
    icon: <FaMapMarkerAlt size={24} />,
    title: "Location",
    value: "Remote / Available Worldwide",
    gradient: "from-blue-500 to-[#3ca0f2]",
  },
];

// Graphic design services
const designServices = [
  {
    icon: <FaPalette size={20} />,
    title: "Brand Identity",
    description: "Logo design, brand guidelines, and visual identity systems",
  },
  {
    icon: <FaPaintBrush size={20} />,
    title: "Print Design",
    description: "Brochures, business cards, posters, and marketing materials",
  },
  {
    icon: <FaImages size={20} />,
    title: "Digital Graphics",
    description: "Web graphics, social media assets, and digital illustrations",
  },
];

interface Particle {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

const GraphicContact = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "Graphic Design Project", // Pre-filled subject
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  useEffect(() => {
    // Create animated particles
    const createParticles = () => {
      const particleCount = 40;
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 6,
          animationDuration: Math.random() * 3 + 3,
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

    try {
      // Using sendEmail method with template parameters
      await emailjs.send(
        "service_3q79ey8", // Your service ID
        "template_6boqaee", // Your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: "Bernard", // Your name
          project_type: "Graphic Design", // Additional context
        },
        "KAHMMRSws4oNcz19y" // Your public key
      );
      setSubmitStatus(
        "Message sent successfully! I'll get back to you soon with design ideas."
      );
      setFormData({
        name: "",
        email: "",
        subject: "Graphic Design Project",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="graphic-contact"
      className="min-h-screen relative overflow-hidden"
    >
      {/* Dark theme background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] z-0"></div>

      {/* Animated particles */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
              animation: "float 6s ease-in-out infinite",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-[2] container mx-auto px-6 py-16">
        {/* Header section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow animate-fade-in-up">
            Let&apos;s Create{" "}
            <span className="text-[#3ca0f2] font-bold">Together</span>
            <span className="ml-2">🎨</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed text-shadow animate-fade-in-up animation-delay-300">
            Ready to bring your brand vision to life? Let&apos;s collaborate on
            creating stunning visual designs that tell your story and captivate
            your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up animation-delay-600">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-shadow">
                Let&apos;s Discuss Your Design Project
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Whether you need a complete brand identity, marketing materials,
                or custom illustrations - I&apos;m here to transform your
                creative vision into compelling visual designs that make an
                impact.
              </p>
            </div>

            {/* Design Services */}
            <div className="mb-8">
              <h3 className="text-white font-semibold text-xl mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#3ca0f2] rounded-full"></span>
                Design Services
              </h3>
              <div className="space-y-4">
                {designServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-[#3ca0f2]/20 text-[#3ca0f2]">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {service.title}
                      </h4>
                      <p className="text-white/70 text-sm">
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
                  className="group flex items-center gap-6 p-6 rounded-xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <div
                    className={cn(
                      "p-4 rounded-xl bg-gradient-to-r text-white shadow-lg group-hover:scale-110 transition-transform duration-300",
                      info.gradient
                    )}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-white/80 hover:text-[#3ca0f2] transition-colors duration-300 hover:underline"
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
              className="p-8 rounded-2xl backdrop-blur-lg border border-white/10"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-shadow">
                Start Your Design Project
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
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#3ca0f2] focus:ring-2 focus:ring-[#3ca0f2]/20 transition-all duration-300"
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
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#3ca0f2] focus:ring-2 focus:ring-[#3ca0f2]/20 transition-all duration-300"
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
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#3ca0f2] focus:ring-2 focus:ring-[#3ca0f2]/20 transition-all duration-300"
                    placeholder="e.g., Logo Design, Brand Identity, Print Materials"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#3ca0f2] focus:ring-2 focus:ring-[#3ca0f2]/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your design project, brand vision, target audience, preferred style, and any specific requirements..."
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
                      : "bg-[#3ca0f2] hover:bg-[#2b8fd9] hover:shadow-lg hover:scale-[1.02]"
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
                      Start Design Project
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

export default GraphicContact;
