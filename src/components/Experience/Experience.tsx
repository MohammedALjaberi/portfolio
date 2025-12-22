/**
 * Experience Section Component
 * Uses TailwindCSS, Material Icons, and GSAP
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import usePortfolioStore from "../../store/usePortfolioStore";
import { TRANS } from "../../constants/translations";

gsap.registerPlugin(ScrollTrigger);

// Experience data is now handled via translations

const Experience = () => {
  const { language } = usePortfolioStore();
  const t = TRANS[language];

  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.children,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-12 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 leading-normal">
            {t.experience.title}
          </h2>
        </div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className="relative max-w-[800px] mx-auto ltr:before:left-0 rtl:before:right-0 md:ltr:before:left-0 before:absolute before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-[#1ae66b] before:to-[#16c45b] before:rounded-full"
        >
          {t.experience.items.map((exp: any, index: number) => (
            <div
              key={index}
              className="relative ltr:pl-6 rtl:pr-6 md:ltr:pl-10 md:rtl:pr-10 pb-10 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute ltr:left-[-7px] rtl:right-[-7px] top-0 w-4 h-4 bg-gradient-to-br from-[#1ae66b] to-[#16c45b] rounded-full border-[3px] border-[var(--color-bg-primary)] shadow-[0_0_20px_rgba(26,230,107,0.4)]"></div>

              <article className="glass p-5 md:p-6 rounded-2xl transition-all duration-300 hover:border-[var(--color-border-hover)] hover:translate-x-2 hover:shadow-xl">
                {/* Card Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-[#1ae66b] font-medium">{exp.company}</p>
                  </div>
                  <span className="flex items-center gap-2 px-3 py-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-full text-sm text-[var(--color-text-muted)] whitespace-nowrap">
                    <CalendarMonthIcon sx={{ fontSize: 16 }} />
                    <span
                      className={
                        language === "ar" ? "leading-none mt-[2px] " : ""
                      }
                    >
                      {exp.duration}
                    </span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Achievements */}
                <ul className="space-y-2 mb-4">
                  {exp.achievements.map(
                    (achievement: string, achIndex: number) => (
                      <li
                        key={achIndex}
                        className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
                      >
                        <CheckCircleIcon
                          sx={{
                            fontSize: 16,
                            color: "#1ae66b",
                            marginTop: "2px",
                            flexShrink: 0,
                          }}
                        />
                        <span>{achievement}</span>
                      </li>
                    )
                  )}
                </ul>

                {/* Skills Used */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border)]">
                  {exp.skills.map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 text-xs bg-[var(--color-bg-secondary)] rounded-full text-[#1ae66b] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
