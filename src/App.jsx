
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { LanguageProvider } from './context/LanguageContext';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <LanguageProvider>
      <CustomCursor />
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <TechStack />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
