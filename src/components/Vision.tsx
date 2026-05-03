import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.vision-fade-up');
      
      elements.forEach((el, index) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
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
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-brand-bg text-brand-text px-8 md:px-16 border-t border-brand-border/30">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        
        <div className="space-y-6">
          <h2 className="vision-fade-up text-xs tracking-[0.2em] uppercase text-brand-gray font-sans font-bold">
            Our Vision
          </h2>
          <h3 className="vision-fade-up text-4xl md:text-5xl font-sans font-black tracking-tight leading-tight uppercase text-[#2a2f35]">
            Expanding horizons in comprehensive digital health
          </h3>
        </div>

        <div className="vision-fade-up space-y-8 text-lg font-serif text-brand-gray leading-relaxed">
          <p>
            At OCEAN SCULPTURE, our vision extends far beyond cervical cancer screening. While we are deeply committed to addressing the current gaps in cervical health, we recognise that women’s healthcare is broader, dynamic, and ever-evolving.
          </p>
          <p>
            In the future, we aim to expand our horizons into comprehensive digital health solutions, including the development of a dedicated health application that will make screening, education, and follow-up care more accessible and personalised.
          </p>
          <p>
            We also plan to extend our preventive approach to other critical areas, particularly breast cancer, ensuring early detection and timely intervention across multiple domains of women’s health.
          </p>
        </div>

        <div className="vision-fade-up pt-12 border-t border-brand-border/50">
          <h4 className="text-2xl md:text-3xl font-serif italic text-brand-text">
            "By integrating technology with compassionate healthcare, we aspire to build a system where prevention becomes routine, early diagnosis becomes the norm, and no woman is left behind."
          </h4>
        </div>
      </div>
    </section>
  );
}
