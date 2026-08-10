import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/translations";
import { Briefcase, Syringe, Smartphone, BookOpen, HeartPulse, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function OurWork() {
  const { language } = useLanguage();
  const t = content[language].work;
  const containerRef = useRef<HTMLDivElement>(null);

  const icons = [
    <HeartPulse className="w-6 h-6 text-rose-600" />,
    <Syringe className="w-6 h-6 text-blue-600" />,
    <Smartphone className="w-6 h-6 text-emerald-600" />,
    <BookOpen className="w-6 h-6 text-purple-600" />
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
          {t.initiatives.map((item, idx) => (
            <div 
              key={idx}
              className="work-fade-up bg-brand-bg/40 p-8 rounded-3xl border border-brand-border/60 hover:border-brand-text/40 transition-all shadow-xs space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-sans font-black text-brand-border">
                    {item.num}
                  </span>
                  <span className="px-3 py-1 bg-white text-brand-text font-sans font-bold text-xs rounded-full border border-brand-border/60 shadow-2xs">
                    {item.badge}
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2.5 bg-white rounded-xl shadow-2xs border border-brand-border/40 shrink-0">
                    {icons[idx]}
                  </div>
                  <h3 className="text-xl md:text-2xl font-sans font-bold text-brand-text leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-base font-serif text-brand-gray leading-relaxed">
                  {item.description}
                </p>
                <p className="text-sm font-serif text-brand-gray/90 leading-relaxed border-t border-brand-border/40 pt-4">
                  {item.subdesc}
                </p>
              </div>
            </div>
          ))}
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
