import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PortfolioState {
  theme: "light" | "dark";
  language: "en" | "ar";
  activeSection: string;
  isScrolled: boolean;
  isMobileMenuOpen: boolean;

  toggleTheme: () => void;
  toggleLanguage: () => void;
  setActiveSection: (section: string) => void;
  setIsScrolled: (scrolled: boolean) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
}

const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      theme: "light",
      language: "en",
      activeSection: "#home",
      isScrolled: false,
      isMobileMenuOpen: false,

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "dark" ? "light" : "dark";
          // Apply theme to DOM
          document.documentElement.setAttribute("data-theme", newTheme);
          return { theme: newTheme };
        }),

      toggleLanguage: () =>
        set((state) => {
          const newLang = state.language === "en" ? "ar" : "en";
          // Apply language and direction to DOM
          document.documentElement.lang = newLang;
          document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
          return { language: newLang };
        }),

      setActiveSection: (section) => set({ activeSection: section }),
      setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
      setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    }),
    {
      name: "portfolio-storage",
      onRehydrateStorage: () => (state) => {
        // Apply theme and language immediately after rehydration
        if (state) {
          document.documentElement.setAttribute("data-theme", state.theme);
          document.documentElement.lang = state.language;
          document.documentElement.dir =
            state.language === "ar" ? "rtl" : "ltr";
        }
      },
    }
  )
);

export default usePortfolioStore;
