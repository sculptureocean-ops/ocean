import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/translations";
import { 
  Globe, Menu, X, Calendar, Stethoscope, ClipboardList, Shield, Home 
} from "lucide-react";

interface NavBarProps {
  currentView: 'home' | 'booking' | 'doctor' | 'records';
  onNavigate: (view: 'home' | 'booking' | 'doctor' | 'records') => void;
  onOpenLegal: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  currentView,
  onNavigate,
  onOpenLegal
}) => {
  const { language, toggleLanguage } = useLanguage();
  const t = content[language].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-900 text-white border-b border-stone-800 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-3 group text-left cursor-pointer"
        >
          <img 
            src="/image.png" 
            alt="OCEAN SCULPTURE Logo" 
            className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105" 
          />
          <div className="flex flex-col">
            <span className="text-base md:text-xl font-serif font-bold tracking-tight text-white group-hover:text-teal-300 transition-colors">
              OCEAN SCULPTURE
            </span>
            <span className="text-[9px] md:text-[10px] tracking-wider font-sans font-semibold text-teal-400 uppercase">
              Cervical Cancer Screening Portal
            </span>
          </div>
        </button>

        {/* Portal Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1.5 text-xs font-sans font-semibold">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'home'
                ? 'bg-stone-800 text-teal-300 font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onNavigate('booking')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'booking'
                ? 'bg-teal-700 text-white shadow-xs font-bold'
                : 'text-teal-300 hover:bg-teal-900/40'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment (L1)</span>
          </button>

          <button
            onClick={() => onNavigate('doctor')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'doctor'
                ? 'bg-teal-700 text-white shadow-xs font-bold'
                : 'text-teal-300 hover:bg-teal-900/40'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor Consultation (L2)</span>
          </button>

          <button
            onClick={() => onNavigate('records')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'records'
                ? 'bg-stone-800 text-teal-300 font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>OPD Records</span>
          </button>

          <button
            onClick={onOpenLegal}
            className="px-3 py-1.5 rounded-xl text-stone-400 hover:text-amber-300 hover:bg-stone-800/60 transition-all flex items-center space-x-1.5 cursor-pointer"
            title="View Patient Declaration, Privacy Policy & Medico-Legal Disclaimers"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Legal Consent</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-stone-700 bg-stone-800 hover:bg-stone-700 text-xs font-sans font-medium text-stone-200 transition-all cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.languageToggle}</span>
          </button>

          {/* Quick CTA */}
          <button
            onClick={() => onNavigate('booking')}
            className="hidden sm:flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <span>Book Now</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-6 py-4 space-y-2 font-medium text-xs">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-800 flex items-center space-x-2"
          >
            <Home className="w-4 h-4 text-teal-400" />
            <span>Home & Awareness</span>
          </button>

          <button
            onClick={() => { onNavigate('booking'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-teal-300 hover:bg-stone-800 flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-teal-400" />
            <span>Book Appointment (Level 1)</span>
          </button>

          <button
            onClick={() => { onNavigate('doctor'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-teal-300 hover:bg-stone-800 flex items-center space-x-2"
          >
            <Stethoscope className="w-4 h-4 text-teal-400" />
            <span>Doctor Consultation (Level 2)</span>
          </button>

          <button
            onClick={() => { onNavigate('records'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-800 flex items-center space-x-2"
          >
            <ClipboardList className="w-4 h-4 text-teal-400" />
            <span>OPD Records & Appointments</span>
          </button>

          <button
            onClick={() => { onOpenLegal(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-amber-300 hover:bg-stone-800 flex items-center space-x-2 border-t border-stone-800 pt-2"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Legal Consent & Disclaimers</span>
          </button>
        </div>
      )}
    </header>
  );
};
