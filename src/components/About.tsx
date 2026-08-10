import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/translations";
import { HeartHandshake, ShieldCheck, CheckCircle2, Award, UserCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const { language } = useLanguage();
  const t = content[language].about;
  const tFounders = content[language].founders;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.about-fade-up');
      
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
    <section id="about" ref={containerRef} className="py-20 md:py-28 bg-white text-brand-text px-6 md:px-12 border-t border-brand-border/30">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="about-fade-up max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-[0.2em] text-brand-gray uppercase">
            <HeartHandshake className="w-4 h-4 text-rose-600" />
            <span>{t.sectionTag}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-[#2a2f35] leading-tight uppercase">
            {t.heading}
          </h2>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="about-fade-up space-y-6 text-base md:text-lg font-serif text-brand-gray leading-relaxed">
            <p className="font-sans font-medium text-lg md:text-xl text-brand-text border-l-4 border-brand-text pl-4 py-1">
              {t.p1}
            </p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
          </div>

          <div className="about-fade-up space-y-6 text-base md:text-lg font-serif text-brand-gray leading-relaxed bg-brand-bg/50 p-8 rounded-2xl border border-brand-border/40">
            <p>{t.p4}</p>
            
            {/* Action highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-sans text-sm">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl shadow-xs border border-brand-border/40">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-text block">Early Detection</span>
                  <span className="text-brand-gray text-xs">Preventing disease before life-threatening stages.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl shadow-xs border border-brand-border/40">
                <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-text block">HPV Vaccination</span>
                  <span className="text-brand-gray text-xs">Crucial pillar in cervical cancer prevention.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collaboration Spotlight Card */}
        <div className="about-fade-up bg-linear-to-br from-[#111111] to-[#2a2f35] text-white p-8 md:p-14 rounded-3xl shadow-xl space-y-8 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <span className="text-xs font-sans font-bold tracking-[0.2em] text-rose-300 uppercase">
              {t.collabTag}
            </span>
            
            <h3 className="text-2xl md:text-4xl font-sans font-black tracking-tight uppercase">
              {t.collabTitle}
            </h3>

            <p className="text-lg font-serif text-gray-200 leading-relaxed max-w-4xl">
              {t.collabP1}
            </p>
            <p className="text-base md:text-lg font-serif text-gray-300 leading-relaxed max-w-4xl">
              {t.collabP2}
            </p>

            <div className="pt-4 space-y-3">
              <p className="text-sm font-sans font-semibold uppercase tracking-wider text-rose-200">
                {t.collabMoreThan}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {t.collabPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-5 py-4 rounded-xl border border-white/15">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="font-sans font-medium text-sm md:text-base text-white">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Founders Section */}
        <div id="founders" className="pt-12 space-y-12">
          <div className="about-fade-up text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-[0.2em] text-brand-gray uppercase">
              <UserCheck className="w-4 h-4 text-brand-text" />
              <span>{tFounders.sectionTag}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-black tracking-tight text-[#2a2f35] uppercase">
              {tFounders.heading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tFounders.list.map((founder, idx) => (
              <div 
                key={idx} 
                className="about-fade-up bg-brand-bg/40 p-8 rounded-2xl border border-brand-border/60 space-y-4 hover:border-brand-text/30 transition-all shadow-xs"
              >
                <div className="space-y-1 border-b border-brand-border/40 pb-4">
                  <h4 className="text-2xl font-sans font-bold text-brand-text">{founder.name}</h4>
                  <p className="text-sm font-sans font-semibold text-rose-700">{founder.title} | {founder.qualifications}</p>
                </div>
                <p className="text-base font-serif text-brand-gray leading-relaxed">
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>

          {/* Shared Vision Card */}
          <div className="about-fade-up bg-white border border-brand-border/60 p-6 md:p-8 rounded-2xl text-center max-w-3xl mx-auto shadow-xs">
            <h5 className="text-xs font-sans font-bold tracking-[0.2em] text-brand-gray uppercase mb-2">
              {tFounders.sharedVisionTitle}
            </h5>
            <p className="text-lg md:text-xl font-serif italic text-brand-text">
              "{tFounders.sharedVisionText}"
            </p>
          </div>
        </div>

        {/* Promise Banner */}
        <div className="about-fade-up bg-brand-bg text-center p-8 md:p-12 rounded-2xl border border-brand-border/60 space-y-3">
          <span className="text-xs font-sans font-bold tracking-[0.2em] text-rose-700 uppercase">
            {t.promiseTag}
          </span>
          <h4 className="text-2xl md:text-3xl font-sans font-black uppercase text-[#2a2f35]">
            {t.promiseTitle}
          </h4>
          <p className="text-base md:text-lg font-serif italic text-brand-gray max-w-2xl mx-auto">
            {t.promiseDesc}
          </p>
        </div>

      </div>
    </section>
  );
}
