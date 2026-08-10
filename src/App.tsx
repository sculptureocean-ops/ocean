import { useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { SeoHead } from "./components/SeoHead";
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Inspiration } from "./components/Inspiration";
import { OurWork } from "./components/OurWork";
import { Vision } from "./components/Vision";
import { Footer } from "./components/Footer";

function MainContent() {
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  return (
    <main className="w-full min-h-screen bg-brand-bg text-brand-text selection:bg-brand-text selection:text-brand-bg antialiased">
      <SeoHead />
      <NavBar />
      <Hero />
      <About />
      <Inspiration />
      <OurWork />
      <Vision />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
