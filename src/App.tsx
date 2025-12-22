/**
 * Main Application Component
 * Assembles all portfolio sections using semantic HTML structure
 */

import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import usePortfolioStore from "./store/usePortfolioStore";

// Lazy load below-the-fold components
const Skills = lazy(() => import("./components/Skills/Skills"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Contact = lazy(() => import("./components/Contact/Contact"));

import { Toaster } from "sonner";

function App() {
  const { theme, language } = usePortfolioStore();

  const LoadingFallback = () => (
    <div className="flex items-center justify-center w-full h-40">
      <div className="w-8 h-8 border-4 border-[var(--color-accent-primary)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <>
      <div
        className={`min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300 font-sans ${theme}`}
      >
        <Toaster
          position="top-right"
          theme={theme === "dark" ? "dark" : "light"}
          richColors
          toastOptions={{
            style: {
              fontFamily:
                language === "ar"
                  ? '"TheYearofHandicrafts", sans-serif'
                  : '"Onest", sans-serif',
              fontSize: "16px",
            },
          }}
        />
        {/* Fixed Navigation */}
        <Navbar />

        {/* Main Content - Semantic HTML for SEO */}
        <main className="w-full overflow-x-hidden">
          {/* Hero/Landing Section */}
          <Hero />

          {/* About Section */}
          <About />

          <Suspense fallback={<LoadingFallback />}>
            {/* Skills Section */}
            <Skills />

            {/* Projects Portfolio */}
            <Projects />

            {/* Experience Timeline */}
            <Experience />

            {/* Contact Form & Info */}
            <Contact />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
