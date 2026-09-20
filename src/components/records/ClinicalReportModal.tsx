import type { ClinicalRecord } from '../../types/clinical';
import { Printer, X, ShieldAlert, FileText } from 'lucide-react';

interface ClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: ClinicalRecord | null;
}

export const ClinicalReportModal: React.FC<ClinicalReportModalProps> = ({
  isOpen,
  onClose,
  record
}) => {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col max-h-[92vh] overflow-hidden my-auto text-stone-900">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-teal-700" />
            <h3 className="font-serif font-bold text-stone-900 text-sm md:text-base">
              Clinical Screening Record • {record.id}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center space-x-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 font-sans text-xs bg-white" id="printable-clinical-report">
          
          {/* Institutional Letterhead */}
          <div className="border-b-2 border-teal-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-serif font-black text-teal-900 tracking-tight">
                OCEAN SCULPTURE
              </h1>
              <p className="text-xs font-medium text-stone-600">
                Women's Healthcare & Cervical Cancer Screening Initiative
              </p>
              <p className="text-[11px] text-stone-500">
                In Collaboration with Sashakti Foundation • New Delhi, India
              </p>
            </div>
            <div className="text-right font-mono text-[11px] text-stone-600">
              <p>Record ID: <strong className="text-stone-900">{record.id}</strong></p>
              <p>Date: <strong className="text-stone-900">{new Date(record.createdAt).toLocaleDateString()}</strong></p>
              <p>UHID: <strong className="text-teal-800">{record.patientDetails.idNumber || 'OS-UHID-78210'}</strong></p>
            </div>
          </div>

          {/* Red Flag Alert Box (if triggered) */}
          {record.isRedFlagPositive && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center space-x-2.5 text-rose-900 font-semibold">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <span>🔴 Alert: Urgent Colposcopy / Biopsy Indicated due to positive red flag warning symptoms!</span>
            </div>
          )}

          {/* Patient Demographics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <span className="text-[10px] uppercase text-stone-500 block font-bold">Patient Name</span>
              <span className="font-semibold text-stone-900 text-sm">{record.patientDetails.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-500 block font-bold">Age / Gender</span>
              <span className="text-stone-800">{record.patientDetails.age} yrs / {record.patientDetails.sex}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-500 block font-bold">Contact</span>
              <span className="text-stone-800">+91 {record.patientDetails.mobile}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-500 block font-bold">Marital / Occupation</span>
              <span className="text-stone-800">{record.patientDetails.maritalStatus} • {record.patientDetails.occupation}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] uppercase text-stone-500 block font-bold">Residential Address</span>
              <span className="text-stone-700">{record.patientDetails.address}, {record.patientDetails.stateDistrict}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] uppercase text-stone-500 block font-bold">Govt / Hospital ID</span>
              <span className="text-stone-700">{record.patientDetails.idType}: {record.patientDetails.idNumber || 'Verified'}</span>
            </div>
          </div>

          {/* Chief Complaints & Histories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-stone-200 space-y-1.5">
              <span className="font-bold uppercase tracking-wide text-stone-800 block text-[11px]">
                Chief Complaints
              </span>
              <div className="flex flex-wrap gap-1.5">
                {record.chiefComplaints.map((c, i) => (
                  <span key={i} className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[11px]">
                    {c}
                  </span>
                ))}
              </div>
              {record.otherChiefComplaint && (
                <p className="text-stone-600 italic">Notes: {record.otherChiefComplaint}</p>
              )}
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold uppercase tracking-wide text-stone-800 block text-[11px]">
                Obstetric & Menstrual History
              </span>
              <p className="text-stone-700">
                <strong>Menarche:</strong> {record.menstrualHistory.ageAtFirstPeriod} yrs • <strong>Cycle:</strong> {record.menstrualHistory.cycle} ({record.menstrualHistory.flow} flow)
              </p>
              <p className="text-stone-700">
                <strong>Obstetric:</strong> P{record.obstetricHistory.liveBirths} (Normal: {record.obstetricHistory.normalDelivery}, LSCS: {record.obstetricHistory.cesarean}, Miscarriages: {record.obstetricHistory.miscarriages})
              </p>
            </div>
          </div>

          {/* Examination Findings */}
          <div className="p-4 rounded-xl border border-stone-200 space-y-2 bg-stone-50/50">
            <span className="font-bold uppercase tracking-wide text-stone-800 block text-[11px]">
              Clinical Examination Findings
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <div>
                <span className="text-stone-500 font-medium">External Genitalia:</span>{' '}
                <span className="font-semibold text-stone-800">{record.externalGenitalia.normal ? 'Normal' : 'Abnormal findings'}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Cervix Visibility:</span>{' '}
                <span className="font-semibold text-stone-800">{record.perSpeculum.cervixVisibility}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Vaginal Discharge:</span>{' '}
                <span className="font-semibold text-stone-800">{record.perSpeculum.amountOfDischarge} {record.perSpeculum.vaginalDischarge}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Cervix Appearance:</span>{' '}
                <span className="font-semibold text-stone-800">{record.perSpeculum.cervixAppearance.join(', ')}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Uterus (P/V):</span>{' '}
                <span className="font-semibold text-stone-800">{record.perVaginal.uterusSize}, {record.perVaginal.position}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Parametrium:</span>{' '}
                <span className="font-semibold text-stone-800">{record.perVaginal.parametrium}</span>
              </div>
            </div>
          </div>

          {/* VIA Protocol & Swede Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-stone-200 space-y-1.5">
              <span className="font-bold uppercase tracking-wide text-teal-900 block text-[11px]">
                VIA Protocol & Decision Support
              </span>
              <p><strong>VIA Result:</strong> <span className="font-semibold">{record.management2.viaResult}</span></p>
              <p><strong>Transformation Zone:</strong> {record.management2.transformationZone}</p>
              <p className="bg-teal-50 p-2 rounded text-teal-900 text-[11px] font-semibold border border-teal-200">
                Recommendation: {record.management2.autoRecommendation || 'Routine screening'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 space-y-1.5">
              <span className="font-bold uppercase tracking-wide text-teal-900 block text-[11px]">
                Colposcopy & Swede Score Evaluation
              </span>
              <p>
                <strong>Total Swede Score:</strong>{' '}
                <span className="font-bold font-mono text-sm text-teal-800">
                  {record.management4.swedeScore.totalScore} / 10
                </span>
              </p>
              <p><strong>Risk Stratification:</strong> {record.management4.swedeScore.riskInterpretation}</p>
              <p><strong>Impression:</strong> {record.management4.impression}</p>
              <p><strong>Biopsy:</strong> {record.management4.biopsy.taken === 'Yes' ? `Taken (${record.management4.biopsy.numberOfBiopsies} site)` : 'Not Taken'}</p>
            </div>
          </div>

          {/* Prescribed Medications & Management Plan */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/40 space-y-2">
            <span className="font-bold uppercase tracking-wide text-teal-950 block text-[11px]">
              Treatment Plan & Follow-up
            </span>
            <p><strong>Follow-up Protocol:</strong> {record.management1.followUpChoices.join(' • ')}</p>
            {record.modalities.medication.other && (
              <p><strong>Prescription:</strong> {record.modalities.medication.other}</p>
            )}
            {record.doctorNotes && (
              <p className="text-stone-700 italic border-t border-teal-200/60 pt-1.5">
                <strong>Doctor Notes:</strong> {record.doctorNotes}
              </p>
            )}
          </div>

          {/* Doctor Signature Block */}
          <div className="pt-6 border-t border-stone-200 flex justify-between items-end">
            <div className="text-[10px] text-stone-400 space-y-0.5">
              <p>Digital Consent: Verified on File</p>
              <p>Generated by Ocean Sculpture EMR System v1.0</p>
            </div>
            <div className="text-right">
              <div className="w-44 border-b border-stone-400 mb-1" />
              <p className="font-bold text-stone-900 text-xs">{record.doctorName}</p>
              <p className="text-[11px] text-stone-500">Examining Specialist</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
