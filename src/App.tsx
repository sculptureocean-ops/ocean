import { useState, useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { SeoHead } from "./components/SeoHead";
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Inspiration } from "./components/Inspiration";
import { OurWork } from "./components/OurWork";
import { Vision } from "./components/Vision";
import { Footer } from "./components/Footer";
import { AppointmentBookingModal } from "./components/booking/AppointmentBookingModal";
import { DoctorConsultation } from "./components/doctor/DoctorConsultation";
import { AppointmentsList } from "./components/records/AppointmentsList";
import { LegalConsentModal } from "./components/legal/LegalConsentModal";
import type { Appointment } from "./types/clinical";
import { Calendar, Stethoscope, ClipboardList, ArrowRight } from "lucide-react";

function MainContent() {
  const [currentView, setCurrentView] = useState<'home' | 'booking' | 'doctor' | 'records'>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  const handleStartConsultation = (appt: Appointment) => {
    setSelectedAppointment(appt);
    setCurrentView('doctor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAppointmentBooked = (appt: Appointment) => {
    setSelectedAppointment(appt);
  };

  return (
    <main className="w-full min-h-screen bg-stone-100 text-stone-900 antialiased flex flex-col">
      <SeoHead />
      <NavBar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'booking') {
            setBookingModalOpen(true);
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenLegal={() => setLegalModalOpen(true)}
      />

      {/* Clinical Portal Action Banner */}
      <div className="bg-linear-to-r from-teal-950 via-teal-900 to-stone-900 text-white border-b border-teal-800/60 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-teal-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-white">Clinical Portal Active:</span>
            <span>Level 1 Booking (OTP Verified) & Level 2 Doctor Consultation (Colposcopy & Swede Score)</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => { setCurrentView('doctor'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Stethoscope className="w-3.5 h-3.5 text-teal-300" />
              <span>Doctor Portal</span>
            </button>
            <button
              onClick={() => { setCurrentView('records'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center space-x-1 cursor-pointer"
            >
              <ClipboardList className="w-3.5 h-3.5 text-teal-300" />
              <span>OPD Queue</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Router */}
      <div className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Quick Access Portal Cards Section on Home */}
            <section className="bg-white border-b border-stone-200 py-10 px-4 md:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                    Healthcare Delivery & Screening System
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mt-2">
                    Comprehensive Cervical Cancer Screening Suite
                  </h2>
                  <p className="text-xs md:text-sm text-stone-600 mt-1.5">
                    Supporting Level 1 patient booking with mobile OTP verification, and Level 2 clinical documentation for specialists with real-time Swede score and decision support.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Level 1 Booking */}
                  <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 hover:border-teal-400 transition-all shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded">
                        Level 1 • Patient Portal
                      </span>
                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        Book Screening Appointment
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Fast patient registration with Aadhaar / ABHA / MRN, 10-digit mobile verification with OTP, appointment slot picker, and instant appointment slip.
                      </p>
                    </div>
                    <button
                      onClick={() => setBookingModalOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <span>Book Appointment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 2: Level 2 Doctor Consultation */}
                  <div className="p-6 rounded-2xl border border-teal-200 bg-teal-50/40 hover:bg-teal-50 hover:border-teal-500 transition-all shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-800 text-teal-100 flex items-center justify-center font-bold">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-900 bg-teal-200/60 px-2 py-0.5 rounded">
                        Level 2 • Specialist OPD
                      </span>
                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        Doctor Consultation & Colposcopy
                      </h3>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        Pre-examination red flags alert engine (🔴 Urgent Biopsy), detailed histories, speculum exam, VIA decision support, and interactive Swede Score calculator (0-10).
                      </p>
                    </div>
                    <button
                      onClick={() => { setCurrentView('doctor'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="w-full py-2.5 rounded-xl bg-teal-900 hover:bg-stone-900 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <span>Open Doctor Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 3: OPD Queue & Records */}
                  <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 hover:border-teal-400 transition-all shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                        <ClipboardList className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-200/60 px-2 py-0.5 rounded">
                        EMR & Records
                      </span>
                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        OPD Queue & Medical Reports
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        View live appointment queue, start consultation for scheduled patients, track completion status, and download printable clinical records.
                      </p>
                    </div>
                    <button
                      onClick={() => { setCurrentView('records'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <span>View Records Queue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Standard Awareness & Landing Content */}
            <Hero />
            <About />
            <Inspiration />
            <OurWork />
            <Vision />
          </>
        )}

        {currentView === 'doctor' && (
          <DoctorConsultation
            selectedAppointment={selectedAppointment}
            onBackToAppointments={() => setCurrentView('records')}
            onRecordSaved={() => {
              // Stay or switch to records
            }}
          />
        )}

        {currentView === 'records' && (
          <AppointmentsList
            onStartConsultation={handleStartConsultation}
            onOpenBooking={() => setBookingModalOpen(true)}
          />
        )}
      </div>

      <Footer />

      {/* Appointment Booking Modal (Level 1) */}
      <AppointmentBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onAppointmentBooked={handleAppointmentBooked}
      />

      {/* Standalone Legal Consent & Disclaimers Modal */}
      <LegalConsentModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        requiresAction={false}
      />
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
