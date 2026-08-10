import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/translations";
import { Eye, Smartphone, Activity, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Vision() {
  const { language } = useLanguage();
  const t = content[language].vision;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.vision-fade-up');
      
      elements.forEach((el, index) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 35 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.9, 
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section id="vision" ref={containerRef} className="py-20 md:py-28 bg-brand-bg text-brand-text px-6 md:px-12 border-t border-brand-border/30">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        
        <div className="space-y-4">
          <div className="vision-fade-up inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-[0.2em] text-brand-gray uppercase">
            <Eye className="w-4 h-4 text-brand-text" />
            <span>{t.sectionTag}</span>
          </div>
          
          <h2 className="vision-fade-up text-3xl md:text-5xl font-sans font-black tracking-tight text-[#2a2f35] uppercase leading-tight">
            {t.heading}
          </h2>
        </div>

        <div className="vision-fade-up space-y-6 text-base md:text-lg font-serif text-brand-gray leading-relaxed text-left sm:text-center">
          <p className="font-semibold text-brand-text text-xl">
            {t.p1}
          </p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
        </div>

        {/* Feature Icons Grid */}
        <div className="vision-fade-up grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-2xs space-y-2">
            <Smartphone className="w-6 h-6 text-rose-600 mx-auto" />
            <h4 className="font-sans font-bold text-sm text-brand-text uppercase">Digital App Solution</h4>
            <p className="font-serif text-xs text-brand-gray">Personalised diet charts & health guidance platform.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-2xs space-y-2">
            <Activity className="w-6 h-6 text-indigo-600 mx-auto" />
            <h4 className="font-sans font-bold text-sm text-brand-text uppercase">Risk Assessment</h4>
            <p className="font-serif text-xs text-brand-gray">Comprehensive tracking and follow-up care pathways.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-2xs space-y-2">
            <Heart className="w-6 h-6 text-emerald-600 mx-auto" />
            <h4 className="font-sans font-bold text-sm text-brand-text uppercase">Breast Cancer Prevention</h4>
            <p className="font-serif text-xs text-brand-gray">Expanding screening to wider domains of women's health.</p>
          </div>
        </div>

        <div className="vision-fade-up pt-8 border-t border-brand-border/50">
          <blockquote className="text-xl md:text-2xl font-serif italic text-brand-text max-w-3xl mx-auto leading-relaxed">
            "{t.quote}"
          </blockquote>
        </div>

      </div>
    </section>
  );
}
