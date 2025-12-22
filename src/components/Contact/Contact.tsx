import { toast } from "sonner";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import usePortfolioStore from "../../store/usePortfolioStore";
import { TRANS } from "../../constants/translations";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { language } = usePortfolioStore();
  const t = TRANS[language];

  // Dynamic Contact Info based on language
  const contactInfo = [
    {
      label: t.contact.email,
      value: "aljabri606@gmail.com",
      href: "mailto:aljabri606@gmail.com",
      icon: <EmailIcon />,
    },
    {
      label: t.contact.linkedin,
      value: "linkedin.com/in/mohammed-aljaberi",
      href: "https://www.linkedin.com/in/mohammed-aljaberi/",
      icon: <LinkedInIcon />,
    },
    {
      label: t.contact.github,
      value: "github.com/MohammedALjaberi",
      href: "https://github.com/MohammedALjaberi",
      icon: <GitHubIcon />,
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Content Entrance Animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Floating Circle Animation
      // Random movement within the container
      gsap.to(circleRef.current, {
        x: "random(-100, 100, 5)", // Random value between -100 and 100
        y: "random(-100, 100, 5)",
        rotation: 360,
        duration: "random(10, 20)", // Slow, organic duration
        ease: "sine.inOut",
        repeat: -1,
        repeatRefresh: true, // Generate new random values on each repeat
      });

      // 3. Interaction Ticker (Collision Detection)
      const checkProximity = () => {
        if (!circleRef.current || !headerRef.current || !textRef.current)
          return;

        const circleRect = circleRef.current.getBoundingClientRect();
        const circleCenter = {
          x: circleRect.left + circleRect.width / 2,
          y: circleRect.top + circleRect.height / 2,
        };

        // Helper to handle scaling based on distance
        const handleElementScale = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const elementCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };

          const distance = Math.hypot(
            circleCenter.x - elementCenter.x,
            circleCenter.y - elementCenter.y
          );

          // Threshold for interaction (e.g., 200px)
          const threshold = 200;

          if (distance < threshold) {
            gsap.to(element, {
              scale: 1.1,
              color: "#ffffff", // Optional: brighten text
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else {
            gsap.to(element, {
              scale: 1,
              color: "", // Revert color
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        handleElementScale(headerRef.current);
        handleElementScale(textRef.current);
      };

      // Add listener
      gsap.ticker.add(checkProximity);

      // Cleanup listener when context flushes
      return () => {
        gsap.ticker.remove(checkProximity);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        alert("Configuration missing. Please check .env file.");
        setIsSending(false);
        return;
      }

      // Explicitly map form data to common EmailJS template variables
      const templateParams = {
        from_name: formData.name,
        user_name: formData.name, // Fallback
        to_name: "Mohammed Aljaberi",
        from_email: formData.email,
        email: formData.email, // Fallback
        reply_to: formData.email,
        message: formData.message,
      };

      // ... existing imports ...

      // ... inside handleSubmit ...
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success(t.contact.alertSuccess);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-12 md:py-24 bg-[var(--color-bg-secondary)] relative overflow-hidden"
    >
      {/* Floating Background Circle */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#1ae66b] rounded-full blur-[120px] opacity-20 pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2"
      ></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div>
            <h2
              ref={headerRef}
              className="text-3xl md:text-4xl font-bold gradient-text mb-4 inline-block transition-colors leading-normal"
            >
              {t.contact.title}
            </h2>
          </div>
          <div>
            <p
              ref={textRef}
              className="text-lg text-[var(--color-text-secondary)] max-w-[600px] mx-auto inline-block transition-colors"
            >
              {t.contact.description}
            </p>
          </div>
        </div>

        <div
          ref={contentRef}
          className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-[1000px] mx-auto items-center"
        >
          {/* Contact Information */}
          <div className="space-y-4">
            {contactInfo.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:border-[#1ae66b] hover:translate-x-2 hover:bg-[var(--color-bg-tertiary)]"
              >
                <div className="w-12 h-12 rounded-xl bg-transparent border border-gray-600 flex items-center justify-center text-[#1ae66b] flex-shrink-0 transition-colors duration-300 group-hover:border-[#1ae66b]">
                  {contact.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {contact.label}
                  </p>
                  <p className="text-[var(--color-text-primary)] font-medium truncate">
                    {contact.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
              >
                {t.contact.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[var(--color-bg-glass)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[#1ae66b] focus:ring-2 focus:ring-[rgba(26,230,107,0.3)] outline-none transition-all"
                placeholder={t.contact.namePlaceholder}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
              >
                {t.contact.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[var(--color-bg-glass)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[#1ae66b] focus:ring-2 focus:ring-[rgba(26,230,107,0.3)] outline-none transition-all"
                placeholder={t.contact.emailPlaceholder}
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
              >
                {t.contact.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 bg-[var(--color-bg-glass)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[#1ae66b] focus:ring-2 focus:ring-[rgba(26,230,107,0.3)] outline-none transition-all resize-y min-h-[140px]"
                placeholder={t.contact.messagePlaceholder}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-transparent border border-gray-600 text-[#1ae66b] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1ae66b] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <span>Sending...</span>
              ) : (
                <>
                  <SendIcon />
                  {t.contact.send}
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className="flex justify-start mt-32 px-6">
        <button
          onClick={() => {
            const hero = document.querySelector("#home");
            if (hero) hero.scrollIntoView({ behavior: "smooth" });
          }}
          className="group w-14 h-14 rounded-full bg-transparent border border-gray-600 flex items-center justify-center text-[#1ae66b] transition-all duration-300 hover:-translate-y-1 hover:border-[#1ae66b]"
          aria-label="Scroll to top"
        >
          <KeyboardArrowUpIcon sx={{ fontSize: 28 }} />
        </button>
      </div>
    </section>
  );
};
export default Contact;
