import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/translations";
import { Briefcase, Syringe, Smartphone, BookOpen, HeartPulse, Mail, CheckCircle2, Sparkles } from "lucide-react";
import { renderWithSashaktiLink } from "./SashaktiLink";

gsap.registerPlugin(ScrollTrigger);

export function OurWork() {
  const { language } = useLanguage();
  const t = content[language].work;
  const containerRef = useRef<HTMLDivElement>(null);

  const icons = [
    <HeartPulse className="w-6 h-6 text-rose-600" />,
    <Syringe className="w-6 h-6 text-blue-600" />,
    <Smartphone className="w-6 h-6 text-emerald-600" />,
    <BookOpen className="w-6 h-6 text-purple-700" />
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.work-fade-up');
      
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
    <section id="work" ref={containerRef} className="py-20 md:py-28 bg-white text-brand-text px-6 md:px-12 border-t border-brand-border/30">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="work-fade-up max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-[0.2em] text-brand-gray uppercase">
            <Briefcase className="w-4 h-4 text-brand-text" />
            <span>{t.sectionTag}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-[#2a2f35] leading-tight uppercase">
            {t.heading}
          </h2>
          <p className="text-base md:text-lg font-serif text-brand-gray leading-relaxed pt-2">
            {t.intro}
          </p>
        </div>

        {/* Initiatives Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.initiatives.map((item, idx) => {
            const isFeatured = 'isFeatured' in item && item.isFeatured;
            
            return (
              <div 
                key={idx}
                className={`work-fade-up p-8 rounded-3xl transition-all shadow-xs space-y-6 flex flex-col justify-between relative overflow-hidden ${
                  isFeatured 
                    ? "bg-linear-to-br from-purple-50 via-rose-50/40 to-amber-50/60 border-2 border-purple-300 shadow-md hover:border-purple-500" 
                    : "bg-brand-bg/40 border border-brand-border/60 hover:border-brand-text/40"
                }`}
              >
                {/* Featured Ribbon Badge */}
                {isFeatured && (
                  <div className="absolute top-0 right-0 bg-purple-700 text-white px-4 py-1 rounded-bl-2xl font-sans text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>Featured Medical Book</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl font-sans font-black ${isFeatured ? "text-purple-300" : "text-brand-border"}`}>
                      {item.num}
                    </span>
                    <span className={`px-3 py-1 font-sans font-bold text-xs rounded-full shadow-2xs border ${
                      isFeatured 
                        ? "bg-purple-100 text-purple-900 border-purple-200" 
                        : "bg-white text-brand-text border-brand-border/60"
                    }`}>
                      {renderWithSashaktiLink(item.badge, "text-brand-text hover:text-rose-600 underline font-bold transition-colors inline-flex items-center gap-0.5", false)}
                    </span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className={`p-2.5 rounded-xl shadow-2xs border shrink-0 ${
                      isFeatured ? "bg-purple-100 border-purple-200" : "bg-white border-brand-border/40"
                    }`}>
                      {icons[idx]}
                    </div>
                    <h3 className="text-xl md:text-2xl font-sans font-bold text-brand-text leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-base font-serif text-brand-gray leading-relaxed">
                    {renderWithSashaktiLink(item.description)}
                  </p>

                  {'subdesc' in item && item.subdesc && (
                    <p className="text-sm font-serif text-brand-gray/90 leading-relaxed border-t border-brand-border/40 pt-4">
                      {renderWithSashaktiLink(item.subdesc)}
                    </p>
                  )}

                  {'extra' in item && item.extra && (
                    <p className="text-sm font-serif text-brand-gray/90 leading-relaxed pt-2">
                      {renderWithSashaktiLink(item.extra)}
                    </p>
                  )}

                  {'tagline' in item && item.tagline && (
                    <div className="pt-3 border-t border-brand-border/30">
                      <p className="text-xs font-sans font-bold text-rose-700 italic">
                        "{item.tagline}"
                      </p>
                    </div>
                  )}

                  {/* Highlighted Book Features List */}
                  {'highlights' in item && Array.isArray(item.highlights) && (
                    <div className="pt-3 space-y-2 border-t border-purple-200/80">
                      <p className="text-xs font-sans font-bold text-purple-900 uppercase tracking-wider">
                        Key Book Focus & Coverage:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {item.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-center space-x-2 text-xs font-sans font-medium text-purple-950">
                            <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ecosystem & Commitment Summary Banner */}
        <div className="work-fade-up bg-linear-to-br from-[#1c1f24] to-[#111111] text-white p-8 md:p-14 rounded-3xl shadow-xl space-y-8">
          <div className="max-w-4xl space-y-4">
            <h3 className="text-2xl md:text-4xl font-sans font-black uppercase tracking-tight text-white">
              {t.conclusionHeader}
            </h3>
            <p className="text-base md:text-lg font-serif text-gray-300 leading-relaxed">
              {t.conclusionP1}
            </p>
            <p className="text-base md:text-lg font-serif text-rose-200 font-medium leading-relaxed">
              {t.conclusionP2}
            </p>
          </div>

          <div className="pt-6 border-t border-white/15 space-y-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <h4 className="text-xl md:text-2xl font-sans font-black text-amber-300 uppercase tracking-wide">
                {t.commitmentBanner}
              </h4>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-lg font-serif italic text-gray-200">
                {t.callToAction}
              </p>
              
              <a 
                href="mailto:sculptureocean@gmail.com"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white text-brand-text font-sans font-bold text-sm hover:bg-rose-50 transition-all shadow-md active:scale-95 shrink-0"
                aria-label="Send email to sculptureocean@gmail.com"
              >
                <Mail className="w-4 h-4 text-rose-600" />
                <span>sculptureocean@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
