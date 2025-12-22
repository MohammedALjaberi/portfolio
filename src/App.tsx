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

function App() {
  return (
    <>
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content - Semantic HTML for SEO */}
      <main>
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
    </>
  );
}

export default App;
