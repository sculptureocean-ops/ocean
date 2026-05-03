import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Mission() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.fade-up');
      
      elements.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white text-brand-text px-8 md:px-16 border-t border-brand-border/30">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* The Movement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="fade-up space-y-6">
            <h2 className="text-xs tracking-[0.2em] uppercase text-brand-gray font-sans font-bold">The Movement</h2>
            <h3 className="text-4xl md:text-6xl font-sans font-black tracking-tight leading-[1.1] uppercase text-[#2a2f35]">
              More than a clinic. A movement.
            </h3>
          </div>
          <div className="fade-up space-y-6 text-lg text-brand-gray font-serif leading-relaxed">
            <p>
              At OCEAN SCULPTURE, we believe that women’s health deserves attention, respect, and proactive care—not just when illness arises, but long before it begins.
            </p>
            <p>
              We stand for a future where no woman suffers from a preventable disease simply because she was unaware, unheard, or underserved.
            </p>
          </div>
        </div>

        {/* The Core Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="fade-up order-2 md:order-1 space-y-6 text-lg text-brand-gray font-serif leading-relaxed">
            <p>
              For years, cervical cancer screening has remained neglected—not due to lack of intent, but due to limited awareness, accessibility, and education. We are committed to changing this narrative.
            </p>
            <p>
              Cervical screening is a simple yet powerful tool. By detecting precancerous changes early, it offers a crucial opportunity for timely intervention, effective treatment, and the prevention of life-threatening outcomes.
            </p>
            <div className="pt-8 border-t border-brand-border/50 mt-8">
              <h4 className="text-xl font-sans font-bold text-brand-text mb-2 uppercase tracking-wide">Our Aim</h4>
              <p className="text-base">
                To lead a transformative approach in women’s healthcare by promoting awareness, ensuring early detection, and providing accessible, high-quality cervical cancer screening services.
              </p>
            </div>
          </div>
          <div className="fade-up order-1 md:order-2 space-y-6">
            <h2 className="text-xs tracking-[0.2em] uppercase text-brand-gray font-sans font-bold">The Core Mission</h2>
            <h3 className="text-4xl md:text-6xl font-sans font-black tracking-tight leading-[1.1] uppercase text-[#2a2f35]">
              Removing stigma.<br/>Saving lives.
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}
