/**
 * Skills Section Component
 * Uses TailwindCSS and Material Icons
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LanguageIcon from "@mui/icons-material/Language";
import BoltIcon from "@mui/icons-material/Bolt";
import CodeIcon from "@mui/icons-material/Code";
import GitHubIcon from "@mui/icons-material/GitHub";
import ApiIcon from "@mui/icons-material/Api";
import StorageIcon from "@mui/icons-material/Storage";
import usePortfolioStore from "../../store/usePortfolioStore";
import { TRANS } from "../../constants/translations";

gsap.registerPlugin(ScrollTrigger);

// ... (keeping SKILLS static for now as they are technical terms, mostly) ...
// Ideally, descriptions in SKILLS should also be translated, but for now I'll stick to the main UI elements as requested in the translations file I created.
// If I need to translate skills descriptions, I would need to move SKILLS array inside the component or specific translation keys.
// Given the translations.ts content, I only have keys for section titles and descriptions.

// Skills data with Material Icons
const SKILLS = [
  {
    icon: <LanguageIcon sx={{ fontSize: 28 }} />,
    name: "HTML & CSS",
    description:
      "Semantic HTML5, CSS3, Flexbox, Grid, responsive design, and modern CSS features",
    tags: ["HTML5", "CSS3", "Flexbox", "Grid"],
  },
  {
    icon: <BoltIcon sx={{ fontSize: 28 }} />,
    name: "JavaScript",
    description:
      "ES6+ features, DOM manipulation, async programming, and modern JavaScript patterns",
    tags: ["ES6+", "Async/Await", "DOM APIs"],
  },
  {
    icon: <CodeIcon sx={{ fontSize: 28 }} />,
    name: "React",
    description:
      "Component-based architecture, hooks, state management, and building interactive UIs",
    tags: ["Hooks", "Components", "TypeScript"],
  },
  {
    icon: <GitHubIcon sx={{ fontSize: 28 }} />,
    name: "Git & GitHub",
    description:
      "Version control, branching strategies, pull requests, and collaborative workflows",
    tags: ["Git", "GitHub", "Version Control"],
  },
  {
    icon: <ApiIcon sx={{ fontSize: 28 }} />,
    name: "API Integration",
    description:
      "RESTful APIs, React Query, handling responses, and integrating third-party services",
    tags: ["React Query", "REST", "Axios"],
  },
  {
    icon: <StorageIcon sx={{ fontSize: 28 }} />,
    name: "State Management",
    description:
      "Managing application state with Zustand, Context API, and other solutions",
    tags: ["Zustand", "Context API", "Redux"],
  },
];

const Skills = () => {
  const { language } = usePortfolioStore();
  const t = TRANS[language];

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-12 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 leading-normal">
            {t.skills.title}
          </h2>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILLS.map((skill, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl transition-all duration-300 hover:border-[var(--color-border-hover)] hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden"
            >
              {/* Top gradient bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1ae66b] to-[#16c45b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

              <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center mb-4 text-[var(--color-text-secondary)] group-hover:bg-gradient-to-br group-hover:from-[#1ae66b] group-hover:to-[#16c45b] group-hover:text-black transition-all duration-300 group-hover:scale-110">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-xs bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-full text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
