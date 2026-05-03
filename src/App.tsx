import { Hero } from "./components/Hero";
import { Mission } from "./components/Mission";
import { Vision } from "./components/Vision";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Add smooth scrolling to body
    document.body.style.overflowX = 'hidden';
  }, []);

  return (
    <main className="w-full min-h-screen bg-brand-bg text-brand-text selection:bg-brand-text selection:text-brand-bg">
      <NavBar />
      <Hero />
      <Mission />
      <Vision />
      <Footer />
    </main>
  );
}

export default App;
