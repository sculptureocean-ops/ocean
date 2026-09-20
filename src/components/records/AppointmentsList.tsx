import React, { useState, useEffect } from 'react';
import type { Appointment, ClinicalRecord } from '../../types/clinical';
import { ClinicalReportModal } from './ClinicalReportModal';
import { 
  Calendar, Search, Plus, FileText, 
  Stethoscope, RefreshCw 
} from 'lucide-react';

interface AppointmentsListProps {
  onStartConsultation: (appointment: Appointment) => void;
  onOpenBooking: () => void;
}

export const AppointmentsList: React.FC<AppointmentsListProps> = ({
  onStartConsultation,
  onOpenBooking
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clinicalRecords, setClinicalRecords] = useState<ClinicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Scheduled' | 'Completed'>('All');
  
  // Modal for viewing full clinical report
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [apptsRes, recordsRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/clinical-records')
      ]);

      if (apptsRes.ok) {
        const data = await apptsRes.json();
        setAppointments(data.appointments || []);
      }
      if (recordsRes.ok) {
        const rData = await recordsRes.json();
        setClinicalRecords(rData.records || []);
      }
    } catch (err) {
      console.error('Failed to load records from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch = 
      appt.personalDetails.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.personalDetails.mobile.includes(searchQuery) ||
      appt.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || appt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewReport = (clinicalRecordId?: string) => {
    if (!clinicalRecordId) {
      // Pick latest record if any exists
      if (clinicalRecords.length > 0) {
        setSelectedRecord(clinicalRecords[0]);
        setReportModalOpen(true);
      }
      return;
    }
    const found = clinicalRecords.find(r => r.id === clinicalRecordId);
    if (found) {
      setSelectedRecord(found);
      setReportModalOpen(true);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-6 text-stone-900 font-sans">
      
      {/* Header & Main Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
              OPD Queue & Electronic Medical Records
            </span>
            <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              {appointments.length} Total Bookings
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-stone-900 mt-1">
            Patient Appointments & Screening Records
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Screening (Level 1)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search by Patient Name, Phone (+91), Token, or UHID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div className="flex items-center space-x-2">
          {(['All', 'Scheduled', 'Completed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List View */}
      {loading ? (
        <div className="p-12 text-center text-stone-500 text-xs">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-700 mb-2" />
          <span>Loading patient appointment records...</span>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="p-12 bg-white rounded-2xl border border-stone-200 text-center space-y-3">
          <Calendar className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-serif font-bold text-stone-800 text-base">No appointments found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            No patients match your current search or filter. You can book a new screening appointment anytime.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Register Patient & Book Slot
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAppointments.map((appt) => {
            const isCompleted = appt.status === 'Completed';
            return (
              <div
                key={appt.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-teal-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Patient Information */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-800 font-bold shrink-0">
                    {appt.tokenNumber}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-serif font-bold text-stone-900">
                        {appt.personalDetails.name}
                      </h3>
                      <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        {appt.personalDetails.age} yrs • {appt.personalDetails.sex}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {appt.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 mt-1.5">
                      <span>📞 +91 {appt.personalDetails.mobile}</span>
                      <span>🆔 UHID: <strong className="font-mono text-teal-800">{appt.uhid}</strong></span>
                      <span>📍 {appt.personalDetails.stateDistrict}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-stone-500 mt-1">
                      <span>📅 {appt.bookingDetails.appointmentDate} at {appt.bookingDetails.timeSlot}</span>
                      <span>•</span>
                      <span className="truncate max-w-xs">🩺 {appt.bookingDetails.preferredDoctor}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                  {isCompleted ? (
                    <button
                      onClick={() => handleViewReport(appt.clinicalRecordId)}
                      className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-emerald-200 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-700" />
                      <span>View Consultation Report</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onStartConsultation(appt)}
                      className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>Start Doctor Consultation</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Embedded Printable Clinical Report Modal */}
      <ClinicalReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        record={selectedRecord}
      />
    </div>
  );
};
