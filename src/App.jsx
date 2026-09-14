
import { useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { usePortfolioMotion } from './lib/usePortfolioMotion';
import Navbar from './components/Navbar';
import SectionTransition from './components/SectionTransition';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { LanguageProvider, useLanguage } from './context/LanguageContext';

function Portfolio() {
  const root = useRef(null);
  const { language } = useLanguage();
  usePortfolioMotion(root, language);
  return (
    <MotionConfig reducedMotion="user">
      <div ref={root} className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <SectionTransition />
          <About />
          <TechStack />
          <Experience />
          <Education />
          <SectionTransition />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return <LanguageProvider><Portfolio /></LanguageProvider>;
}
