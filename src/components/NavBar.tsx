import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/translations";
import { Globe, Menu, X } from "lucide-react";

export function NavBar() {
  const { language, toggleLanguage } = useLanguage();
  const t = content[language].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t.about, href: "#about" },
    { name: t.inspiration, href: "#inspiration" },
    { name: t.work, href: "#work" },
    { name: t.vision, href: "#vision" },
    { name: t.founders, href: "#founders" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-bg/90 backdrop-blur-md border-b border-brand-border/40 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex flex-col">
          <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-brand-text">
            OCEAN SCULPTURE
          </span>
          <span className="text-[10px] tracking-wider font-sans font-semibold text-brand-gray/80 uppercase">
            {language === 'en' ? 'United for Women' : 'महिलाओं के लिए एकजुट'}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-sans font-medium text-brand-gray">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-brand-text transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-text transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions: Language Switcher */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-brand-text/30 bg-white/60 hover:bg-white text-xs font-sans font-semibold text-brand-text transition-all shadow-sm active:scale-95"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-brand-text" />
            <span>{t.languageToggle}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-brand-text hover:bg-black/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border/40 px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-sans font-medium text-brand-text hover:text-brand-gray transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
