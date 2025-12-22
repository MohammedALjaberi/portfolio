/**
 * About Section Component
 * Updated with gradient-masked Memoji for truly seamless integration
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BrushIcon from "@mui/icons-material/Brush";
import usePortfolioStore from "../../store/usePortfolioStore";
import { TRANS } from "../../constants/translations";

gsap.registerPlugin(ScrollTrigger);

// Personal highlights
const HIGHLIGHTS = [
  { icon: <GpsFixedIcon className="text-[#1ae66b]" />, text: "Clean Code" },
  {
    icon: <PhoneIphoneIcon className="text-[#1ae66b]" />,
    text: "Responsive Design",
  },
  {
    icon: <RocketLaunchIcon className="text-[#1ae66b]" />,
    text: "Performance",
  },
  { icon: <BrushIcon className="text-[#1ae66b]" />, text: "UI/UX Focus" },
];

const About = () => {
  const { language } = usePortfolioStore();
  const t = TRANS[language];

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle floating animation
      gsap.to(imageDisplayRef.current, {
        y: -15,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Content entrance
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-12 md:py-24 bg-[var(--color-bg-secondary)] relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#1ae66b] blur-[150px] opacity-15 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
          ref={contentRef}
        >
          {/* Profile Image with Gradient Mask */}
          <div className="max-w-[400px] mx-auto md:mx-0 relative flex flex-col items-center md:block">
            <div
              ref={imageDisplayRef}
              className="relative z-10 w-[300px] md:w-[350px]"
            >
              <img
                src="/assets/images/memoji-nav.png"
                alt="Mohammed Aljaberi Memoji"
                className="w-full h-auto transition-transform duration-500 hover:scale-105 drop-shadow-2xl"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 md:mt-8 w-full">
              {[
                { number: "2+", label: t.stats.experienceYears },
                { number: "5+", label: t.stats.projects },
                { number: "7+", label: t.stats.technologies },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass text-center p-2 sm:p-4 rounded-xl transition-all duration-300 hover:border-[#1ae66b] hover:-translate-y-0.5 bg-[var(--color-bg-tertiary)]/50"
                >
                  <div className="text-2xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 leading-normal">
                {t.about.title}
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                {/* Optional subtitle if needed, or keeping static/removing */}
              </p>
            </div>

            <div className="text-[var(--color-text-secondary)] space-y-4 leading-relaxed">
              <p>{t.about.description}</p>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3">
              {HIGHLIGHTS.map((highlight, index) => (
                <div
                  key={index}
                  className="glass flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                >
                  {highlight.icon}
                  <span>{highlight.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
