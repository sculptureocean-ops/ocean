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
import { AppointmentCard } from "./components/booking/AppointmentCard";
import { AppointmentBookingModal } from "./components/booking/AppointmentBookingModal";
import { DoctorModal } from "./components/doctor/DoctorModal";
import { RecordsModal } from "./components/records/RecordsModal";
import { LegalConsentModal } from "./components/legal/LegalConsentModal";
import type { Appointment } from "./types/clinical";

function MainContent() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [recordsModalOpen, setRecordsModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  const handleStartConsultationFromQueue = (appt: Appointment) => {
    setSelectedAppointment(appt);
    setRecordsModalOpen(false);
    setDoctorModalOpen(true);
  };

  return (
    <main className="w-full min-h-screen bg-brand-bg text-brand-text selection:bg-brand-text selection:text-brand-bg antialiased">
      <SeoHead />
      <NavBar />
      <Hero />

      {/* Separate Dedicated Card for Screening Appointments & Doctor Portal */}
      <AppointmentCard
        onBookAppointment={() => setBookingModalOpen(true)}
        onOpenDoctorPortal={() => {
          setSelectedAppointment(null);
          setDoctorModalOpen(true);
        }}
        onOpenRecords={() => setRecordsModalOpen(true)}
        onOpenLegal={() => setLegalModalOpen(true)}
      />

      <About />
      <Inspiration />
      <OurWork />
      <Vision />
      <Footer />

      {/* Level 1: Appointment Booking Modal */}
      <AppointmentBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onAppointmentBooked={(appt) => {
          setSelectedAppointment(appt);
        }}
      />

      {/* Level 2: Doctor Consultation Modal */}
      <DoctorModal
        isOpen={doctorModalOpen}
        onClose={() => setDoctorModalOpen(false)}
        selectedAppointment={selectedAppointment}
      />

      {/* OPD Queue & Clinical Records Modal */}
      <RecordsModal
        isOpen={recordsModalOpen}
        onClose={() => setRecordsModalOpen(false)}
        onStartConsultation={handleStartConsultationFromQueue}
        onOpenBooking={() => {
          setRecordsModalOpen(false);
          setBookingModalOpen(true);
        }}
      />

      {/* Legal Disclaimers & Patient Rights Modal */}
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
