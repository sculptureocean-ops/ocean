import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        sublineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
      
      const imageItems = gsap.utils.toArray<HTMLElement>('.hero-img');
      gsap.fromTo(
        imageItems,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-brand-bg pt-4 px-8 md:px-16 overflow-hidden flex flex-col items-center">
      
      {/* Language Selector */}
      <div className="w-full max-w-7xl mx-auto flex items-center text-sm font-sans text-brand-gray mb-16">
        <span className="mr-3">This page is available in:</span>
        <a href="#" className="text-brand-text font-medium border-b-2 border-brand-text pb-0.5 hover:text-brand-gray transition-colors">English</a>
        <span className="mx-4 text-brand-border">|</span>
        <a href="#" className="hover:text-brand-text transition-colors">hindi</a>
      </div>

      {/* Main Header & Subtext */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <h1 
          ref={headlineRef} 
          className="text-6xl md:text-7xl font-sans font-black tracking-[-0.03em] uppercase text-[#2a2f35] mb-6"
        >
          Our Aim
        </h1>
        <p 
          ref={sublineRef} 
          className="text-lg md:text-xl font-serif text-brand-gray leading-relaxed"
        >
          In the effort to save and improve lives, we are focused on achieving awareness, early detection, and preventive healthcare by 2045:
        </p>
      </div>

      {/* Images Row */}
      <div 
        ref={imagesRef}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pb-20"
      >
        <div className="hero-img w-full h-[350px] md:h-[500px] overflow-hidden rounded-t-[2.5rem] relative">
          <img 
            src="/placeholder-1.png" 
            alt="Healthcare worker interacting with a patient" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="hero-img w-full h-[350px] md:h-[500px] overflow-hidden rounded-t-[2.5rem] relative">
          <img 
            src="/placeholder-1.png" 
            alt="Diverse group of women smiling" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="hero-img w-full h-[350px] md:h-[500px] overflow-hidden rounded-t-[2.5rem] relative">
          <img 
            src="/placeholder-1.png" 
            alt="Medical professional reviewing digital health app" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
