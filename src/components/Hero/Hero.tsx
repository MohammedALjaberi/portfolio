/**
 * Hero Section Component
 * All text elements use Typewriter animation (Writing effect)
 * - Greeting: Typewriter
 * - Name: Typewriter
 * - Title: Typewriter
 * - Bio: Typewriter
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import usePortfolioStore from "../../store/usePortfolioStore";
import { TRANS } from "../../constants/translations";

// Register TextPlugin
gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const { language } = usePortfolioStore();
  const t = TRANS[language];

  const heroRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  // Refs for text elements
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const nameTextRef = useRef<HTMLSpanElement>(null); // Changed to target span inside h1
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);

  const underlineRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // GSAP animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hide elements
      if (scrollRef.current) {
        gsap.set(scrollRef.current, {
          opacity: 0,
          y: 50,
        });
      }

      // Set initial states for text elements (empty for typewriter effect)
      gsap.set(greetingRef.current, { text: "" });
      gsap.set(nameTextRef.current, { text: "" });
      gsap.set(titleTextRef.current, { text: "" });
      gsap.set(bioRef.current, { text: "" });

      gsap.set(underlineRef.current, { scaleX: 0, opacity: 0 });

      // Animate background orbs
      gsap.to(orb1Ref.current, {
        x: 100,
        y: -50,
        scale: 1.2,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(orb2Ref.current, {
        x: -80,
        y: 60,
        scale: 0.8,
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // Main entrance timeline
      const mainTl = gsap.timeline({
        defaults: { ease: "none" }, // 'none' ease is best for typewriter
        delay: 0.1,
      });

      // 1. Orbs fade in
      mainTl.fromTo(
        [orb1Ref.current, orb2Ref.current],
        { opacity: 0, scale: 0 },
        {
          opacity: 0.5,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        }
      );

      // 2. Greeting Typewriter
      mainTl.to(greetingRef.current, {
        text: t.hero.greeting,
        duration: 0.4,
      });

      // 3. Name Typewriter
      mainTl.to(nameTextRef.current, {
        text: t.hero.name,
        duration: 1.2,
      });

      // 4. Title Typewriter
      mainTl.to(titleTextRef.current, {
        text: t.hero.title,
        duration: 1,
      });

      // 5. Underline expands out (visual accent)
      mainTl.to(underlineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      // 6. Bio Typewriter
      mainTl.to(bioRef.current, {
        text: {
          value: t.hero.bio,
          delimiter: "",
        },
        duration: 3.5, // Natural reading speed
      });

      // 7. CTA Buttons

      // 8. Scroll Indicator
      mainTl.to(
        scrollRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Continuous scroll indicator bounce
      if (scrollRef.current) {
        gsap.to(scrollRef.current.querySelector(".scroll-arrow"), {
          y: 10,
          duration: 1,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [language]); // Re-run animation when language changes

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      {/* Background orbs */}
      <div
        ref={orb1Ref}
        className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[#1ae66b] blur-[80px] md:blur-[100px] opacity-0 top-[5%] left-[-20%] md:left-[-15%]"
      ></div>
      <div
        ref={orb2Ref}
        className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-[#ffffff] blur-[80px] md:blur-[100px] opacity-0 bottom-[10%] md:bottom-[5%] right-[-15%] md:right-[-10%]"
      ></div>

      {/* Decorative dots */}
      <div className="absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-[#1ae66b] animate-pulse"></div>
      <div className="absolute bottom-[30%] left-[10%] w-3 h-3 rounded-full bg-[#ffffff] animate-pulse delay-500"></div>

      <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
        {/* Greeting */}
        <p
          ref={greetingRef}
          className="text-lg md:text-xl text-[#1ae66b] font-semibold mb-4 tracking-wider uppercase h-[28px]"
        >
          {/* Text typed by GSAP */}
        </p>

        {/* Name */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-normal min-h-[120px] md:min-h-[90px] flex items-center justify-center">
          <span ref={nameTextRef} className="text-[var(--color-text-primary)]">
            {/* Text typed by GSAP */}
          </span>
        </h1>

        {/* Title */}
        <div className="mb-8 min-h-[60px] md:min-h-[50px] flex justify-center items-center">
          <h2 className="text-2xl md:text-4xl font-bold relative inline-block leading-normal">
            <span className="gradient-text">
              <span ref={titleTextRef}>{/* Typed text */}</span>
            </span>
            <span
              ref={underlineRef}
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#1ae66b] to-[#ffffff] rounded-full origin-left"
            ></span>
          </h2>
        </div>

        {/* Bio */}
        <p
          ref={bioRef}
          className="text-base md:text-xl text-[var(--color-text-secondary)] max-w-[650px] mx-auto mb-12 leading-relaxed min-h-[160px] md:min-h-[90px]"
        >
          {/* Text typed by GSAP */}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[var(--color-text-muted)]"
      >
        <span className="text-sm tracking-widest uppercase hidden md:block">
          {t.hero.scroll}
        </span>
        <div className="scroll-arrow flex flex-col items-center">
          <KeyboardArrowDownIcon sx={{ fontSize: 28 }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
