/**
 * Main Application Component
 * Assembles all portfolio sections using semantic HTML structure
 */

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import usePortfolioStore from "./store/usePortfolioStore";

import { Toaster } from "sonner";

function App() {
  const { theme, language } = usePortfolioStore();
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

          {/* Skills Section */}
          <Skills />

          {/* Projects Portfolio */}
          <Projects />

          {/* Experience Timeline */}
          <Experience />

          {/* Contact Form & Info */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
