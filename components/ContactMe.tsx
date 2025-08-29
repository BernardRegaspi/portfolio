"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
} from "react-icons/fa";
import "../app/styles/HomePage.css";
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

    try {
      // Using sendEmail method with template parameters
      await emailjs.send(
        "service_3q79ey8",
        "template_6boqaee",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: "Bernard",
        },
        "KAHMMRSws4oNcz19y"
      );
      setSubmitStatus("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
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
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 text-shadow animate-fade-in-up">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Touch
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed text-shadow animate-fade-in-up animation-delay-300">
            Have a project in mind? Let&apos;s collaborate and bring your ideas
            to life. I&apos;m always excited to work on new challenges and
            create amazing digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up animation-delay-600">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-shadow">
                Let&apos;s Start a Conversation
              </h2>
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">
                Ready to discuss your next project? I&apos;m here to help you
                transform your vision into reality. Whether it&apos;s web
                development, mobile apps, design, or Amazon services -
                let&apos;s talk!
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <div
                    className={cn(
                      "p-3 sm:p-4 rounded-xl bg-gradient-to-r text-white shadow-lg group-hover:scale-110 transition-transform duration-300",
                      info.gradient
                    )}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-1">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-white/80 hover:text-white transition-colors duration-300 hover:underline text-sm sm:text-base break-all"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white/80 text-sm sm:text-base">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                Follow Me
              </h3>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group p-3 sm:p-4 rounded-xl bg-gradient-to-r text-white shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl",
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
              className="p-6 sm:p-8 rounded-2xl backdrop-blur-lg border border-white/10"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-shadow">
                Send Me a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white font-medium mb-2 text-sm sm:text-base"
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-medium mb-2 text-sm sm:text-base"
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-white font-medium mb-2 text-sm sm:text-base"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-sm sm:text-base"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2 text-sm sm:text-base"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none text-sm sm:text-base"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto skill-btn px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>

                  {submitStatus && (
                    <p
                      className={cn(
                        "text-sm sm:text-base font-medium",
                        submitStatus.includes("successfully")
                          ? "text-green-400"
                          : "text-red-400"
                      )}
                    >
                      {submitStatus}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Additional CTA Section */}
        <div className="text-center mt-16 sm:mt-20 animate-fade-in-up animation-delay-1200">
          <div
            className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl backdrop-blur-lg border border-white/10"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-shadow">
              Ready to Get Started?
            </h3>
            <p className="text-lg sm:text-xl text-white/80 mb-6">
              Let&apos;s discuss your project requirements and how I can help
              you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:bernard.regaspi.pixel8@gmail.com"
                className="skill-btn px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
              >
                Email Me Directly
              </a>
              <a
                href="https://www.linkedin.com/in/bernard-brennan-regaspi-378b1927b/"
                target="_blank"
                rel="noopener noreferrer"
                className="skill-btn px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
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
