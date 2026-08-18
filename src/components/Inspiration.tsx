import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/translations";
import { Sparkles, Quote, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Inspiration() {
  const { language } = useLanguage();
  const t = content[language].inspiration;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.insp-fade-up');
      
      elements.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 35 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.9, 
            ease: "power2.out",
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
    <section id="inspiration" ref={containerRef} className="py-20 md:py-28 bg-brand-bg text-brand-text px-6 md:px-12 border-t border-brand-border/30">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="insp-fade-up max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-[0.2em] text-brand-gray uppercase">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{t.sectionTag}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-[#2a2f35] leading-tight uppercase">
            {t.heading}
          </h2>
        </div>

        {/* Story Paragraphs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          <div className="insp-fade-up space-y-6 text-base md:text-lg font-serif text-brand-gray leading-relaxed">
            <p className="font-sans font-medium text-brand-text text-lg border-l-4 border-rose-600 pl-4 py-1">
              {t.p1}
            </p>
            {t.p2 && <p>{t.p2}</p>}
            {t.p3 && <p>{t.p3}</p>}
          </div>

          <div className="insp-fade-up space-y-6 text-base md:text-lg font-serif text-brand-gray leading-relaxed">
            {t.p4 && <p>{t.p4}</p>}
            {t.p5 && <p>{t.p5}</p>}
            {t.p6 && (
              <div className="p-6 bg-white rounded-2xl border border-brand-border/60 shadow-xs border-l-4 border-l-rose-600 space-y-2">
                <p className="font-sans font-bold text-brand-text text-base md:text-lg">
                  "{t.p6}"
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Key Highlight Quote Banner */}
        <div className="insp-fade-up bg-white p-8 md:p-14 rounded-3xl border border-brand-border/80 shadow-lg relative overflow-hidden">
          <Quote className="absolute -top-4 -right-4 w-32 h-32 text-brand-bg/80 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block p-3 rounded-full bg-rose-50 text-rose-600 mb-2">
              <Compass className="w-6 h-6" />
            </div>

            <div className="space-y-4 font-sans font-black text-2xl sm:text-3xl md:text-4xl text-[#2a2f35] uppercase tracking-tight leading-snug">
              {t.quote.map((line, idx) => (
                <p key={idx} className={idx === 1 ? "text-rose-700" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Outro */}
        <div className="insp-fade-up text-center max-w-3xl mx-auto space-y-4 font-serif text-lg text-brand-gray leading-relaxed">
          <p>{t.outroP1}</p>
          <p className="font-semibold text-brand-text italic">
            "{t.outroP2}"
          </p>
        </div>

      </div>
    </section>
  );
}
