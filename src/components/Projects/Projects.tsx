/**
 * Projects Section Component
 * Implements full-screen horizontal scroll slides using GSAP ScrollTrigger
 * Styles match the application's dark theme
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import usePortfolioStore from "../../store/usePortfolioStore";
import { TRANS } from "../../constants/translations";

gsap.registerPlugin(ScrollTrigger);

// ... (Projects data left static for now as descriptions are complex to map without full data structure update) ...
const PROJECTS = [
  {
    name: "E-Commerce Dashboard",
    description:
      "A modern admin dashboard for managing products, orders, and customers. Built with React and features real-time data visualization.",
    techStack: ["React", "TailwindCSS", "Chart.js", "REST API"],
    github: "https://github.com/mohdja",
    live: "#",
    icon: (
      <DashboardIcon
        sx={{ fontSize: 80, color: "var(--color-text-primary)" }}
      />
    ),
    accent: "#1ae66b",
  },
  {
    name: "Task Management App",
    description:
      "A productivity app for organizing tasks with drag-and-drop functionality, categories, and deadline reminders.",
    techStack: ["React", "Zustand", "LocalStorage", "CSS"],
    github: "https://github.com/mohdja",
    live: "#",
    icon: (
      <TaskAltIcon sx={{ fontSize: 80, color: "var(--color-text-primary)" }} />
    ),
    accent: "#1ae66b",
  },
  {
    name: "Weather Application",
    description:
      "Real-time weather app with location-based forecasts, beautiful UI animations, and detailed weather metrics.",
    techStack: ["JavaScript", "Weather API", "CSS3", "Geolocation"],
    github: "https://github.com/mohdja",
    live: "#",
    icon: (
      <WbSunnyIcon sx={{ fontSize: 80, color: "var(--color-text-primary)" }} />
    ),
    accent: "#1ae66b",
  },
  {
    name: "Recipe Finder",
    description:
      "Search and discover recipes from around the world. Save favorites and get detailed cooking instructions.",
    techStack: ["React", "API Integration", "Responsive Design"],
    github: "https://github.com/mohdja",
    live: "#",
    icon: (
      <RestaurantIcon
        sx={{ fontSize: 80, color: "var(--color-text-primary)" }}
      />
    ),
    accent: "#1ae66b",
  },
];

const Projects = () => {
  const { language } = usePortfolioStore();
  const t = TRANS[language];

  const component = useRef<HTMLElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isRTL = document.documentElement.dir === "rtl";
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (slider.current) {
        const totalWidth = slider.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const moveDistance = totalWidth - viewportWidth;

        gsap.to(slider.current, {
          x: isRTL ? moveDistance : -moveDistance,
          ease: "none",
          scrollTrigger: {
            trigger: slider.current,
            pin: true,
            scrub: 1,
            snap: 1 / (PROJECTS.length - 1),
            start: "top top",
            end: () => "+=" + moveDistance,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, [language]);

  return (
    <section
      id="projects"
      ref={component}
      className="py-12 md:py-24 bg-[var(--color-bg-secondary)] relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 mb-8 text-center lg:hidden">
        <h2 className="text-3xl font-bold gradient-text leading-normal">
          {t.projects.title}
        </h2>
      </div>

      <div
        ref={slider}
        className="flex flex-col lg:flex-row w-full lg:w-[var(--desktop-width)] lg:h-screen bg-[var(--color-bg-secondary)]"
        style={
          {
            "--desktop-width": `${PROJECTS.length * 100}vw`,
          } as React.CSSProperties
        }
      >
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="project-panel w-full min-h-[auto] py-16 lg:py-0 flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 relative lg:w-screen lg:h-screen lg:flex-shrink-0"
          >
            {/* Background Orbs (Subtle) */}
            <div
              className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full blur-[100px] opacity-10 animate-[float_6s_ease-in-out_infinite]"
              style={{
                backgroundColor: project.accent,
                top: "10%",
                right: "10%",
              }}
            ></div>

            <div className="max-w-[1000px] w-full grid lg:grid-cols-2 gap-6 lg:gap-12 items-center relative z-10 glass p-5 lg:p-10 rounded-2xl lg:rounded-3xl border border-[var(--color-border)]">
              {/* Visual Side */}
              <div className="flex items-center justify-center aspect-square lg:aspect-auto h-40 lg:h-full bg-[var(--color-bg-tertiary)] rounded-2xl border border-[var(--color-border)] relative overflow-hidden group">
                <div
                  className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                  style={{
                    background: `radial-gradient(circle at center, ${project.accent}, transparent 70%)`,
                  }}
                ></div>
                <div className="p-8 rounded-full bg-[var(--color-bg-glass)] border border-[var(--color-border)] backdrop-blur-sm animate-[float_4s_ease-in-out_infinite] relative z-10">
                  {project.icon}
                </div>
              </div>

              {/* Content Side */}
              <div className="text-[var(--color-text-primary)]">
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-muted)] text-xs font-medium mb-4">
                  {t.projects.title} 0{index + 1}
                </span>

                <h3 className="text-2xl lg:text-5xl font-bold mb-2 lg:mb-4">
                  {project.name}
                </h3>
                <p className="text-sm lg:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4 lg:mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-[var(--color-bg-tertiary)] rounded-lg text-[var(--color-text-primary)] border border-[var(--color-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 lg:gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] rounded-xl text-sm lg:text-base font-bold hover:scale-105 transition-transform"
                  >
                    <GitHubIcon sx={{ fontSize: 20 }} /> {t.projects.repo}
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-[var(--color-bg-glass)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-xl text-sm lg:text-base font-bold hover:bg-[var(--color-bg-tertiary)] transition-colors"
                  >
                    <LaunchIcon sx={{ fontSize: 20 }} /> {t.projects.view}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
