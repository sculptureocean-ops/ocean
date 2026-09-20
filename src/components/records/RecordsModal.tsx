import React from 'react';
import { AppointmentsList } from './AppointmentsList';
import type { Appointment } from '../../types/clinical';
import { X } from 'lucide-react';

interface RecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartConsultation: (appointment: Appointment) => void;
  onOpenBooking: () => void;
}

export const RecordsModal: React.FC<RecordsModalProps> = ({
  isOpen,
  onClose,
  onStartConsultation,
  onOpenBooking
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-2 sm:p-4">
      <div className="relative w-full max-w-7xl bg-stone-100 rounded-3xl shadow-2xl border border-stone-300 flex flex-col max-h-[94vh] overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-stone-900 text-white border-b border-stone-800 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-2 py-0.5 rounded">
              EMR System
            </span>
            <span className="text-sm font-serif font-bold text-white">
              Patient Queue & Screening Records
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close records"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <AppointmentsList
            onStartConsultation={(appt) => {
              onStartConsultation(appt);
            }}
            onOpenBooking={onOpenBooking}
          />
        </div>

      </div>
    </div>
  );
};
