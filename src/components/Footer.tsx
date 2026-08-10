import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/translations";
import { Mail, Heart } from "lucide-react";

export function Footer() {
  const { language } = useLanguage();
  const t = content[language].footer;

  return (
    <footer className="bg-white text-brand-gray py-14 px-6 md:px-12 border-t border-brand-border/40">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-10 border-b border-brand-border/40">
          
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-brand-text font-bold tracking-tight">
              {t.brand}
            </h2>
            <p className="text-sm font-sans text-rose-700 font-medium">
              {t.tagline}
            </p>
            <p className="text-xs font-sans text-brand-gray">
              {t.sashaktiNote}
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-brand-bg/60 p-5 rounded-2xl border border-brand-border/50 space-y-2 min-w-[280px]">
            <span className="text-xs font-sans font-bold text-brand-text uppercase tracking-wider block">
              {t.emailLabel}
            </span>
            <a 
              href={`mailto:${t.email}`}
              className="inline-flex items-center space-x-2.5 text-brand-text font-sans font-semibold hover:text-rose-600 transition-colors text-base"
            >
              <Mail className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{t.email}</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-sans text-brand-gray gap-4">
          <p>&copy; {new Date().getFullYear()} OCEAN SCULPTURE. {t.rights}</p>
          
          <div className="flex items-center space-x-1 text-xs">
            <span>Empowering women's health with</span>
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 inline mx-0.5" />
            <span>& compassion.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
