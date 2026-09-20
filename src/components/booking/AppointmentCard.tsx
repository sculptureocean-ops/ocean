import React from 'react';
import { Calendar, Stethoscope, ClipboardList, Shield, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AppointmentCardProps {
  onBookAppointment: () => void;
  onOpenDoctorPortal: () => void;
  onOpenRecords: () => void;
  onOpenLegal: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  onBookAppointment,
  onOpenDoctorPortal,
  onOpenRecords,
  onOpenLegal
}) => {
  const { language } = useLanguage();

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="relative overflow-hidden rounded-3xl border border-brand-border/80 bg-white/70 backdrop-blur-md p-8 md:p-12 shadow-sm">
        
        {/* Subtle decorative background glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Card Header & Description */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-text/5 border border-brand-text/10 text-xs font-sans font-semibold text-brand-gray">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span>{language === 'en' ? 'Screening & Clinical Portal' : 'जांच एवं क्लिनिकल पोर्टल'}</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-brand-text tracking-tight">
              {language === 'en' 
                ? 'Cervical Cancer Screening & Consultation' 
                : 'सरवाइकल कैंसर जांच एवं परामर्श'}
            </h2>

            <p className="text-sm md:text-base text-brand-gray font-sans leading-relaxed">
              {language === 'en'
                ? 'Early detection saves lives. Schedule your screening appointment (Level 1) or access the specialist clinical examination suite with colposcopy & Swede scoring (Level 2).'
                : 'शुरुआती पहचान जीवन बचाती है। अपनी स्क्रीनिंग अपॉइंटमेंट बुक करें या कोल्पोस्कोपी और स्वीड स्कोरिंग के साथ विशेषज्ञ क्लिनिकल सूट का उपयोग करें।'}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenLegal}
                className="text-xs text-brand-gray hover:text-brand-text underline flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-brand-gray" />
                <span>{language === 'en' ? 'View Patient Rights, Consent & Legal Disclaimers' : 'मरीजों के अधिकार, सहमति और कानूनी अस्वीकरण देखें'}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons in a Clean Card Cluster */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto lg:w-72">
            {/* Primary Action: Book Screening */}
            <button
              onClick={onBookAppointment}
              className="w-full px-6 py-3.5 rounded-2xl bg-brand-text hover:bg-black text-white text-xs md:text-sm font-sans font-semibold flex items-center justify-between shadow-sm transition-all cursor-pointer active:scale-95 group"
            >
              <div className="flex items-center space-x-2.5">
                <Calendar className="w-4 h-4 text-teal-400" />
                <span>{language === 'en' ? 'Book Screening (Level 1)' : 'स्क्रीनिंग बुक करें'}</span>
              </div>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Action: Doctor Consultation */}
            <button
              onClick={onOpenDoctorPortal}
              className="w-full px-6 py-3.5 rounded-2xl border border-brand-border bg-white hover:bg-stone-50 text-brand-text text-xs md:text-sm font-sans font-semibold flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5">
                <Stethoscope className="w-4 h-4 text-teal-700" />
                <span>{language === 'en' ? 'Doctor Portal (Level 2)' : 'डॉक्टर पोर्टल'}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-gray transition-transform group-hover:translate-x-1" />
            </button>

            {/* Tertiary Action: OPD Queue */}
            <button
              onClick={onOpenRecords}
              className="w-full px-6 py-3 rounded-2xl border border-dashed border-brand-border/80 bg-stone-50/50 hover:bg-stone-100 text-brand-gray hover:text-brand-text text-xs font-sans font-medium flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'View OPD Queue & Reports' : 'OPD कतार और रिपोर्ट देखें'}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
