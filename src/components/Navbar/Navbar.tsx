import React, { useEffect, useRef, useCallback } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import usePortfolioStore from "../../store/usePortfolioStore";
import { TRANS } from "../../constants/translations";

// Section IDs in order (static, doesn't depend on language)
const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
];

const Navbar = () => {
  // Use global store
  const {
    isScrolled,
    isMobileMenuOpen,
    activeSection,
    theme,
    language,
    setIsScrolled,
    toggleMobileMenu,
    setIsMobileMenuOpen,
    setActiveSection,
    toggleTheme,
    toggleLanguage,
  } = usePortfolioStore();

  const t = TRANS[language];

  // Track if we're programmatically scrolling to prevent observer interference
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navigation links configuration (dynamic based on lang)
  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#experience", label: t.nav.experience },
    { href: "#contact", label: t.nav.contact },
  ];

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };

    // Passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsScrolled]);

  // Active section detection using viewport-based approach
  // Checks which section's top is closest to but above the detection point
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      // Don't update during programmatic scrolling
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      // Check if scrolled to bottom (contact section)
      if (scrollPosition + viewportHeight >= documentHeight - 100) {
        setActiveSection("#contact");
        return;
      }

      // Special case: if we're at the very top, home should be active
      if (scrollPosition < 100) {
        setActiveSection("#home");
        return;
      }

      // Detection point in the viewport (25% from top)
      const detectionY = viewportHeight * 0.25;

      // Find the section whose top is closest to the detection point (from above)
      // This is the section that has scrolled past the detection point most recently
      let activeId = "home";
      let closestDistance = Infinity;

      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();

          // Section is a candidate if its top has passed the detection point
          // (i.e., top is above or at the detection point)
          if (rect.top <= detectionY) {
            // Distance from section top to detection point (how far past it is)
            const distance = detectionY - rect.top;

            // We want the section that most recently passed the detection point
            // That's the one with the smallest distance (just past the point)
            if (distance < closestDistance) {
              closestDistance = distance;
              activeId = id;
            }
          }
        }
      }

      setActiveSection(`#${activeId}`);
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run once on mount to set initial state
    updateActiveSection();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [setActiveSection]);

  // Handle smooth scroll to section
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        // Set active section immediately for instant feedback
        setActiveSection(href);
        setIsMobileMenuOpen(false);

        // Prevent observer from interfering during scroll
        isScrollingRef.current = true;

        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Re-enable observer after scroll animation completes
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000); // 1 second should cover most smooth scroll animations
      }
    },
    [setActiveSection, setIsMobileMenuOpen],
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform
          ${isScrolled ? "scale-[0.98] opacity-100" : "scale-100 opacity-100"}
        `}
        style={{ width: "max-content", maxWidth: "90vw" }}
      >
        <div
          className={`
          flex items-center justify-between gap-4 md:gap-8 px-4 md:px-6 py-3 rounded-full 
          bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
          shadow-lg shadow-[rgba(0,0,0,0.1)] transition-all duration-300
        `}
        >
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center justify-center p-1"
            onClick={(e) => handleNavClick(e, "#home")}
          >
            <img
              src="/assets/images/memoji-nav.png"
              alt="MA"
              className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300"
            />
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeSection === link.href
                      ? "text-[var(--color-text-primary)] bg-[var(--color-border)] shadow-sm"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]"
                  }`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors font-bold text-xs w-9 h-9 flex items-center justify-center"
              aria-label="Toggle language"
            >
              {language === "en" ? "ع" : "EN"}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1 text-[var(--color-text-primary)]"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-[350px] z-40 animate-[fadeInUp_0.3s_ease]">
          <div className="bg-[var(--color-bg-secondary)] p-4 rounded-2xl border border-[var(--color-border)] shadow-2xl">
            <ul className="flex flex-col gap-2 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block px-4 py-3 text-center rounded-xl transition-colors ${
                      activeSection === link.href
                        ? "text-[var(--color-text-primary)] bg-[var(--color-bg-glass)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]"
                    }`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
