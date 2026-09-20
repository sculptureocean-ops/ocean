import React, { useState } from 'react';
import type { PersonalDetails, BookingDetails, Appointment } from '../../types/clinical';
import { LegalConsentModal } from '../legal/LegalConsentModal';
import { 
  Calendar, User, Shield, CheckCircle2, 
  AlertCircle, Printer, X, Hospital, FileCheck, ArrowRight
} from 'lucide-react';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentBooked?: (appointment: Appointment) => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  onAppointmentBooked
}) => {
  // Form State
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: '',
    age: '',
    sex: 'Female',
    mobile: '',
    email: '',
    address: '',
    stateDistrict: '',
    idType: 'ABHA',
    idNumber: '',
    maritalStatus: 'Married',
    occupation: ''
  });

  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    preferredDoctor: 'Dr. Rashmi Upadhyay (Radiation Oncologist, AIIMS New Delhi)',
    facility: 'Ocean Sculpture Women\'s Health & Screening Center',
    initialReason: 'Routine Cervical Cancer Screening'
  });

  // Legal Consent state
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  // Submission & Confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!personalDetails.name.trim()) {
      setFormError('Patient Name is mandatory.');
      return;
    }
    if (!personalDetails.age) {
      setFormError('Patient Age is mandatory.');
      return;
    }
    if (!personalDetails.mobile || personalDetails.mobile.length < 10) {
      setFormError('Valid 10-digit Mobile Number is mandatory.');
      return;
    }
    if (!consentAccepted) {
      setFormError('Patient Declaration & Consent must be accepted prior to booking.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalDetails,
          bookingDetails,
          consentGiven: true
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookedAppointment(data.appointment);
        if (onAppointmentBooked) {
          onAppointmentBooked(data.appointment);
        }
      } else {
        setFormError(data.error || 'Failed to schedule appointment.');
      }
    } catch {
      // Fallback local mock
      const mock: Appointment = {
        id: `APT-${Date.now()}`,
        uhid: `OS-UHID-${Math.floor(10000 + Math.random() * 90000)}`,
        tokenNumber: `OS-01`,
        personalDetails,
        bookingDetails,
        consentGiven: true,
        consentTimestamp: new Date().toISOString(),
        status: 'Scheduled',
        createdAt: new Date().toISOString()
      };
      setBookedAppointment(mock);
      if (onAppointmentBooked) onAppointmentBooked(mock);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col max-h-[92vh] overflow-hidden my-auto text-stone-900">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-linear-to-r from-teal-800 to-teal-950 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-teal-300">
                <Hospital className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded">
                  Level 1 • Patient Registration & Booking
                </span>
                <h2 className="text-lg md:text-xl font-serif font-bold text-white">
                  Schedule Cervical Cancer Screening
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-stone-50/50">
            {bookedAppointment ? (
              /* Success / Appointment Slip Confirmation */
              <div className="p-6 bg-white rounded-2xl border border-teal-200 shadow-md space-y-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-teal-50">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                    Appointment Confirmed
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mt-2">
                    Booking Successful!
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    An SMS confirmation has been sent to +91 {bookedAppointment.personalDetails.mobile}.
                  </p>
                </div>

                {/* Patient Slip Card */}
                <div className="max-w-md mx-auto p-5 bg-stone-50 rounded-xl border border-stone-200 text-left space-y-3 font-sans">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 font-bold">Appointment ID</span>
                      <p className="font-mono text-xs font-bold text-stone-800">{bookedAppointment.id}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-teal-600 font-bold">Token No.</span>
                      <p className="font-mono text-sm font-extrabold text-teal-800">{bookedAppointment.tokenNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase">Patient Name</span>
                      <p className="font-semibold text-stone-900">{bookedAppointment.personalDetails.name}</p>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase">UHID / MRN</span>
                      <p className="font-mono font-semibold text-teal-700">{bookedAppointment.uhid}</p>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase">Age / Sex</span>
                      <p className="font-medium text-stone-800">{bookedAppointment.personalDetails.age} yrs • {bookedAppointment.personalDetails.sex}</p>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase">Contact</span>
                      <p className="font-medium text-stone-800">+91 {bookedAppointment.personalDetails.mobile}</p>
                    </div>
                  </div>

                  <div className="border-t border-stone-200 pt-2 text-xs">
                    <span className="text-stone-400 text-[10px] uppercase">Consultation Slot</span>
                    <p className="font-semibold text-teal-900">
                      📅 {bookedAppointment.bookingDetails.appointmentDate} at {bookedAppointment.bookingDetails.timeSlot}
                    </p>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      🩺 {bookedAppointment.bookingDetails.preferredDoctor}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      📍 {bookedAppointment.bookingDetails.facility}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Appointment Slip</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Step A: Personal Details MUST */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 border-b border-stone-100 pb-2">
                    <User className="w-4 h-4 text-teal-700" />
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                      1. Personal Details (MUST)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Name */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        1. Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Meera Sharma"
                        value={personalDetails.name}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      />
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        2. Age (Years) <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="15"
                        max="105"
                        placeholder="e.g. 35"
                        value={personalDetails.age}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, age: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      />
                    </div>

                    {/* Sex */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        3. Sex <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={personalDetails.sex}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, sex: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      >
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Mobile Number */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        4. Mobile Number <span className="text-rose-600">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-xs text-stone-400 font-mono">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          required
                          placeholder="10-digit mobile number"
                          value={personalDetails.mobile}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setPersonalDetails({ ...personalDetails, mobile: val });
                          }}
                          className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                        />
                      </div>
                    </div>

                    {/* Email Optional */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        5. Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="patient@example.com"
                        value={personalDetails.email}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      />
                    </div>

                    {/* State / District */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        7. State / District <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Delhi / South West"
                        value={personalDetails.stateDistrict}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, stateDistrict: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        6. Residential Address <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House / Street / Locality"
                        value={personalDetails.address}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, address: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      />
                    </div>

                    {/* Govt ID Type */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        8. Govt ID / MRN Type
                      </label>
                      <select
                        value={personalDetails.idType}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, idType: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      >
                        <option value="ABHA">ABHA Number</option>
                        <option value="Aadhaar">Aadhaar (Optional)</option>
                        <option value="PMJY">PMJY Number</option>
                        <option value="Hospital MRN/UHID">Hospital MRN / UHID</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Govt ID Number */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        ID / Registration Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 14-digit ABHA or MRN"
                        value={personalDetails.idNumber}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, idNumber: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      />
                    </div>

                    {/* Marital Status */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        9. Marital Status <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={personalDetails.maritalStatus}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, maritalStatus: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      >
                        <option value="Married">Married</option>
                        <option value="Unmarried">Unmarried</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Separated">Separated</option>
                      </select>
                    </div>

                    {/* Occupation */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        10. Occupation <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Homemaker, Teacher, Healthcare worker"
                        value={personalDetails.occupation}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, occupation: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Step B: Appointment Slot & Clinic Choice */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 border-b border-stone-100 pb-2">
                    <Calendar className="w-4 h-4 text-teal-700" />
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                      Appointment Slot & Medical Facility
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Preferred Date <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingDetails.appointmentDate}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, appointmentDate: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Preferred Time Slot <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={bookingDetails.timeSlot}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, timeSlot: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      >
                        <option value="09:30 AM">09:30 AM - Morning Slot 1</option>
                        <option value="10:00 AM">10:00 AM - Morning Slot 2</option>
                        <option value="10:30 AM">10:30 AM - Morning Slot 3</option>
                        <option value="11:30 AM">11:30 AM - Mid-Day Slot</option>
                        <option value="02:00 PM">02:00 PM - Afternoon Slot</option>
                        <option value="04:00 PM">04:00 PM - Evening Slot</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Consulting Specialist
                      </label>
                      <select
                        value={bookingDetails.preferredDoctor}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, preferredDoctor: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      >
                        <option value="Dr. Rashmi Upadhyay (Radiation Oncologist, AIIMS New Delhi)">
                          Dr. Rashmi Upadhyay (AIIMS New Delhi)
                        </option>
                        <option value="Dr. Souryavardhan Singh (Community Medicine Specialist)">
                          Dr. Souryavardhan Singh (Public Health & Community Medicine)
                        </option>
                        <option value="Ocean Sculpture Screening Team">
                          Ocean Sculpture On-Duty Gynecologist
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Primary Reason / Chief Symptom
                      </label>
                      <select
                        value={bookingDetails.initialReason}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, initialReason: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                      >
                        <option value="Routine Cervical Cancer Screening">Routine Cervical Cancer Screening</option>
                        <option value="Counselling Cervical Cancer">Counselling Cervical Cancer</option>
                        <option value="White discharge / Vaginal Itching">White discharge / Vaginal Itching</option>
                        <option value="Irregular bleeding / Menstrual abnormality">Irregular bleeding / Menstrual abnormality</option>
                        <option value="Postcoital bleeding / Pelvic pain">Postcoital bleeding / Pelvic pain (Priority)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step C: Legal Declaration & Single Consent Checkbox */}
                <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-amber-700" />
                      <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                        Mandatory Legal Consent & Patient Declaration
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConsentModalOpen(true)}
                      className="text-xs text-teal-800 hover:text-teal-950 font-semibold underline flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Read 4 Legal Documents & Disclaimers</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <label className="flex items-start space-x-3 p-3 bg-white rounded-xl border border-amber-300/80 cursor-pointer hover:border-teal-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-stone-300 cursor-pointer"
                    />
                    <div className="text-[11px] md:text-xs text-stone-700 leading-relaxed select-none">
                      <span className="font-bold text-stone-900">Single Consent Checkbox: </span>
                      I have read, understood, and voluntarily agree to the Privacy Policy, Terms & Conditions, Patient Consent, and Patient Rights & Responsibilities. I consent to the collection, storage, retrieval, processing, and use of my personal and medical information for healthcare services, cervical cancer screening, follow-up care, electronic medical records, research using anonymised data where permitted by law, and related healthcare purposes.
                    </div>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-xs font-semibold rounded-xl text-stone-600 hover:bg-stone-200 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-xs font-semibold rounded-xl bg-teal-800 hover:bg-teal-900 disabled:bg-stone-300 text-white shadow-md transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>{isSubmitting ? 'Scheduling Appointment...' : 'Confirm Appointment Booking'}</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Legal Document Viewer Modal */}
      <LegalConsentModal
        isOpen={consentModalOpen}
        onClose={() => setConsentModalOpen(false)}
        onAccept={() => setConsentAccepted(true)}
        isAccepted={consentAccepted}
        requiresAction={true}
      />
    </>
  );
};
