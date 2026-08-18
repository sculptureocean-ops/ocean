import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/translations";
import { ExternalLink } from "lucide-react";
import { SASHAKTI_URL } from "./SashaktiLink";

export function Hero() {
  const { language, setLanguage } = useLanguage();
  const t = content[language].hero;

  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

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
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, scale: 0.96, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section ref={containerRef} className="w-full bg-brand-bg pt-6 pb-16 px-6 md:px-12 flex flex-col items-center overflow-hidden">
      
      {/* Language Bar Selector */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center md:justify-start text-xs md:text-sm font-sans text-brand-gray mb-10">
        <span className="mr-3 font-medium">{t.availabilityLabel}</span>
        <button 
          onClick={() => setLanguage('en')} 
          aria-label="Switch language to English"
          title="English"
          className={`px-2 py-0.5 rounded transition-all ${
            language === 'en' 
              ? 'text-brand-text font-bold border-b-2 border-brand-text' 
              : 'hover:text-brand-text'
          }`}
        >
          English
        </button>
        <span className="mx-3 text-brand-border">|</span>
        <button 
          onClick={() => setLanguage('hi')} 
          aria-label="Switch language to Hindi"
          title="हिंदी (Hindi)"
          className={`px-2 py-0.5 rounded transition-all ${
            language === 'hi' 
              ? 'text-brand-text font-bold border-b-2 border-brand-text' 
              : 'hover:text-brand-text'
          }`}
        >
          हिंदी (Hindi)
        </button>
      </div>

      {/* Main Header & Subtitle */}
      <div className="text-center max-w-4xl mx-auto mb-12 px-4">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-sans font-bold tracking-widest text-brand-text bg-white/80 border border-brand-border/60 rounded-full shadow-xs uppercase">
          {t.badge}
        </span>

        <h1 
          ref={headlineRef} 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight text-[#2a2f35] mb-6 uppercase leading-[1.08]"
        >
          {t.title}
        </h1>

        <p 
          ref={sublineRef} 
          className="text-base sm:text-lg md:text-xl font-serif text-brand-gray leading-relaxed max-w-3xl mx-auto"
        >
          {t.subtitle}
        </p>
      </div>

      {/* Collaboration Banner Image (Replacing 3 photos) */}
      <div 
        ref={bannerRef}
        className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-brand-border/60 bg-white p-3 md:p-6 transition-all hover:shadow-2xl flex flex-col items-center gap-2"
      >
        <a 
          href={SASHAKTI_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Sashakti Foundation Official Website (opens in new tab)"
          className="group relative block w-full overflow-hidden rounded-lg"
        >
          <img 
            src="/sashakti-ocean-sculpture-collaboration.png" 
            alt={t.bannerAlt}
            loading="eager"
            decoding="async"
            width="1200"
            height="675"
            className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-sans font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5">
            <span>Visit Sashakti Foundation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </a>
      </div>
    </section>
  );
}
