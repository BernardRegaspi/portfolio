"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaFacebook,
} from "react-icons/fa";
import "../app/styles/HomePage.css";

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

// Contact information data
const contactInfo: ContactInfo[] = [
  {
    icon: <FaEnvelope size={24} />,
    title: "Email",
    value: "bernard.regaspi.pixel8@gmail.com",
    link: "mailto:bernard.regaspi.pixel8@gmail.com",
    gradient: "from-red-500 to-pink-600",
  },
  {
    icon: <FaPhone size={24} />,
    title: "Phone",
    value: "+639951311231",
    link: "tel:+639951311231",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: <FaMapMarkerAlt size={24} />,
    title: "Location",
    value: "Remote / Available Worldwide",
    gradient: "from-blue-500 to-cyan-600",
  },
];

// Social links
const socialLinks = [
  {
    icon: <FaGithub size={24} />,
    name: "GitHub",
    url: "https://github.com/BernardRegaspi",
    gradient: "from-gray-600 to-gray-800",
  },
  {
    icon: <FaLinkedin size={24} />,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/bernard-brennan-regaspi-378b1927b/",
    gradient: "from-blue-600 to-blue-800",
  },
  {
    icon: <FaFacebook size={24} />,
    name: "Facebook",
    url: "https://www.facebook.com/bernardbrennan.regaspi.3/",
    gradient: "from-blue-600 to-blue-800",
  },
];

interface Particle {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

const ContactMe = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
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

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen relative overflow-hidden">
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
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Touch
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed text-shadow animate-fade-in-up animation-delay-300">
            Have a project in mind? Let&apos;s collaborate and bring your ideas
            to life. I&apos;m always excited to work on new challenges and
            create amazing digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up animation-delay-600">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-shadow">
                Let&apos;s Start a Conversation
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Ready to discuss your next project? I&apos;m here to help you
                transform your vision into reality. Whether it&apos;s web
                development, mobile apps, design, or Amazon services -
                let&apos;s talk!
              </p>
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
                        className="text-white/80 hover:text-white transition-colors duration-300 hover:underline"
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

            {/* Social Links */}
            <div>
              <h3 className="text-white font-semibold text-xl mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                Follow Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group p-4 rounded-xl bg-gradient-to-r text-white shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl",
                      social.gradient
                    )}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up animation-delay-900">
            <div
              className="p-8 rounded-2xl backdrop-blur-lg border border-white/10"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-shadow">
                Send Me a Message
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
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
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
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-white font-medium mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
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
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:scale-[1.02]"
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
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional CTA Section */}
        <div className="text-center mt-20 animate-fade-in-up animation-delay-1200">
          <div
            className="max-w-4xl mx-auto p-8 rounded-2xl backdrop-blur-lg border border-white/10"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <h3 className="text-3xl font-bold text-white mb-4 text-shadow">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-white/80 mb-6">
              Let&apos;s discuss your project requirements and how I can help
              you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:bernard.regaspi.pixel8@gmail.com"
                className="skill-btn px-8 py-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
              >
                Email Me Directly
              </a>
              <a
                href="https://www.linkedin.com/in/bernard-brennan-regaspi-378b1927b/"
                target="_blank"
                rel="noopener noreferrer"
                className="skill-btn px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
