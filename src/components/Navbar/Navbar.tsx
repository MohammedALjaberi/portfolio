/**
 * Navbar Component
 * Floating, pill-shaped navigation with smooth glassmorphism
 * Refactored to use Zustand for state management
 */

import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import usePortfolioStore from "../../store/usePortfolioStore";
import { TRANS } from "../../constants/translations";

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

  // Active section detection using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Detect middle of screen
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Prevent unnecessary state updates if already active
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    // Special check for bottom of page
    const handleScrollBottom = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        setActiveSection("#contact");
      }
    };

    window.addEventListener("scroll", handleScrollBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollBottom);
    };
  }, [setActiveSection, language]); // Re-run when language changes to re-bind observers

  // Handle smooth scroll to section
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
      setActiveSection(href);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform
          ${isScrolled ? "scale-[0.98] opacity-95" : "scale-100 opacity-100"}
        `}
        style={{ width: "max-content", maxWidth: "90vw" }}
      >
        <div
          className={`
          flex items-center justify-between gap-4 md:gap-8 px-4 md:px-6 py-3 rounded-full 
          backdrop-blur-md bg-[var(--color-bg-glass)] border border-[var(--color-border)]
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
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
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
          <div className="bg-[var(--color-bg-secondary)]/95 backdrop-blur-xl p-4 rounded-2xl border border-[var(--color-border)] shadow-2xl">
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
