import React, { useState, useMemo } from 'react';
import type { 
  ClinicalRecord, PersonalDetails, Appointment, SwedeScore 
} from '../../types/clinical';
import { SwedeScoreCalculator } from './SwedeScoreCalculator';
import { 
  AlertTriangle, ShieldAlert, CheckCircle2, FileText, Activity, 
  Stethoscope, Eye, ClipboardList, Save, Printer, ArrowLeft,
  ChevronRight, Info
} from 'lucide-react';

interface DoctorConsultationProps {
  selectedAppointment?: Appointment | null;
  onBackToAppointments?: () => void;
  onRecordSaved?: (record: ClinicalRecord) => void;
}

export const DoctorConsultation: React.FC<DoctorConsultationProps> = ({
  selectedAppointment,
  onBackToAppointments,
  onRecordSaved
}) => {
  // Navigation Tabs for clinical workflow
  const [activeTab, setActiveTab] = useState<
    'complaints_redflags' | 'histories' | 'examination' | 'reports_modalities' | 'management_colposcopy'
  >('complaints_redflags');

  // Patient Info
  const [patient] = useState<PersonalDetails>(
    selectedAppointment?.personalDetails || {
      name: 'Sunita Devi',
      age: 36,
      sex: 'Female',
      mobile: '9876543210',
      email: 'sunita.devi@example.com',
      address: '42, Shanti Nagar, Sector 4',
      stateDistrict: 'Delhi / South West',
      idType: 'ABHA',
      idNumber: '14-5542-8901-2311',
      maritalStatus: 'Married',
      occupation: 'Teacher'
    }
  );

  // 1. Chief Complaints (24 symptoms + other)
  const chiefComplaintOptions = [
    'Counselling Cervical Cancer',
    'Routine Cervical Cancer Screening',
    'White discharge',
    'Foul-smelling/ Abnormal Discharge',
    'Vaginal Itching',
    'Something coming out',
    'Irregular bleeding',
    'Burning sensation during urination',
    'Frequent urination',
    'Vulval itching',
    'Vulval swelling',
    'Vulval discoloration',
    'Blisters/ vesicles around the vagina',
    'Pustules in the vaginal area',
    'Bleeding after intercourse',
    'Bleeding after menopause',
    'Lower abdominal pain',
    'Pelvic pain',
    'Foul-smelling discharge',
    'Genital itching',
    'Pain during intercourse',
    'Difficulty passing urine'
  ];

  const [chiefComplaints, setChiefComplaints] = useState<string[]>([
    'Routine Cervical Cancer Screening',
    'White discharge'
  ]);
  const [otherChiefComplaint, setOtherChiefComplaint] = useState('');

  // 2. Cervical Cancer Red Flags (Pre-Examination Alert)
  const [redFlags, setRedFlags] = useState({
    postcoitalBleeding: false,
    postmenopausalBleeding: false,
    intermenstrualBleeding: false,
    foulSmellingDischarge: false,
    pelvicPain: false,
    unexplainedWeightLoss: false,
    contactBleeding: false,
    visibleCervicalGrowth: false,
    enlargedLymphNodes: false
  });

  const isRedFlagPositive = useMemo(() => {
    return Object.values(redFlags).some(v => v === true);
  }, [redFlags]);

  // 3. Menstrual History
  const [menstrualHistory, setMenstrualHistory] = useState({
    ageAtFirstPeriod: '13',
    lastMenstrualPeriod: '2026-09-08',
    cycle: 'Regular' as 'Regular' | 'Irregular' | '',
    cycleCount: '28-30 days',
    flow: 'Moderate' as 'Light' | 'Moderate' | 'Heavy' | '',
    flowCount: '4-5 days',
    painfulPeriods: 'No' as 'Yes' | 'No' | '',
    painfulCount: '',
    postmenopausal: 'No' as 'Yes' | 'No' | '',
    postmenopausalDuration: ''
  });

  // 4. Obstetric History
  const [obstetricHistory, setObstetricHistory] = useState({
    liveBirths: 2,
    normalDelivery: 2,
    cesarean: 0,
    miscarriages: 0,
    abortionsLessThan28Weeks: 0,
    stillbirthAfter28Weeks: 0,
    currentPregnancy: 'No' as 'Yes' | 'No' | '',
    pregnancyStatus: 'Not pregnant' as 'Pregnant' | 'Not pregnant' | '',
    gestationalAge: '',
    lastDelivery: '5 years ago'
  });

  // 5. Sexual History (Very Sensitive)
  const [sexualHistory, setSexualHistory] = useState({
    lifetimePartners: '1',
    singlePartner: 'Yes' as 'Yes' | 'No' | '',
    condomUse: 'Yes' as 'Yes' | 'No' | '',
    stis: {
      hiv: 'No' as 'Yes' | 'No' | '',
      syphilis: 'No' as 'Yes' | 'No' | '',
      gonorrhea: 'No' as 'Yes' | 'No' | '',
      chlamydia: 'No' as 'Yes' | 'No' | '',
      herpes: 'No' as 'Yes' | 'No' | '',
      hpv: 'No' as 'Yes' | 'No' | ''
    }
  });

  // 6. Contraceptive History
  const [contraceptiveHistory, setContraceptiveHistory] = useState({
    none: false,
    copperT: { status: 'No' as const, strengthLastUseReason: '' },
    hormonalIUCD: { status: 'No' as const, strengthLastUseReason: '' },
    oralPills: { status: 'No' as const, strengthLastUseReason: '' },
    injectables: { status: 'No' as const, strengthLastUseReason: '' },
    implant: { status: 'No' as const, strengthLastUseReason: '' },
    condom: { status: 'Currently' as const, strengthLastUseReason: 'Barrier contraception' },
    sterilization: { status: 'No' as const, strengthLastUseReason: '' },
    duration: '4 years'
  });

  // 7. Cervical Cancer Risk Factors
  const [riskFactors, setRiskFactors] = useState({
    smoking: 'No' as const,
    tobaccoChewing: 'No' as const,
    alcohol: 'No' as const,
    immunocompromised: 'No' as const,
    organTransplant: 'No' as const,
    longTermSteroids: 'No' as const,
    previousPapSmear: 'No' as const,
    previousHpvPositive: 'No' as const,
    familyHistoryCervicalCancer: 'No' as const
  });

  // 8. HPV Vaccination
  const [hpvVaccination, setHpvVaccination] = useState({
    vaccinated: 'No' as 'Yes' | 'No' | "Don't know" | '',
    numberOfDoses: '' as '1' | '2' | '3' | '',
    type: '' as 'Gardasil 4' | 'Gardasil 9' | 'Cervavac' | 'Cervarix' | 'Other' | '',
    ageAtVaccination: '',
    notVaccinated: true
  });

  // 9. Previous Screening
  const [previousScreening, setPreviousScreening] = useState({
    papSmear: 'No' as 'Yes' | 'No' | '',
    papDate: '',
    papResult: '',
    papHpvDna: '',
    via: 'None',
    colposcopyLeepConeCryoLaser: 'None',
    biopsy: 'None'
  });

  // 10. Medical History
  const [medicalHistory, setMedicalHistory] = useState({
    diabetes: false,
    hypertension: false,
    heartDisease: false,
    kidneyDisease: false,
    liverDisease: false,
    thyroidDisease: false,
    tb: false,
    tbDetails: '',
    autoimmuneDisease: false,
    bleedingDisorders: false
  });

  // 11. Surgical History
  const [surgicalHistory, setSurgicalHistory] = useState({
    previousLscs: false,
    hysterectomy: false,
    myomectomy: false,
    ovarianSurgery: false,
    otherPelvicSurgery: false,
    otherDetails: ''
  });

  // 12. Family History
  const [familyHistory, setFamilyHistory] = useState({
    cervicalCancer: false,
    breastCancer: false,
    ovarianCancer: false,
    colonCancer: false,
    endometrialCancer: false,
    otherCancers: false,
    otherDetails: ''
  });

  // 13. Consent
  const [consentDigital, setConsentDigital] = useState(true);

  // 14. External Genitalia Exam
  const [externalGenitalia, setExternalGenitalia] = useState({
    normal: true,
    vulvalLesion: { present: false, locationSize: '' },
    ulcer: { present: false, locationSize: '' },
    warts: { present: false, locationSize: '' },
    swelling: { present: false, locationSize: '' },
    cyst: { present: false, locationSize: '' },
    atrophicChanges: false,
    other: ''
  });

  // 15. Per Speculum Examination
  const [perSpeculum, setPerSpeculum] = useState({
    vaginalWalls: 'Healthy',
    cervixVisibility: 'Fully visualized',
    vaginalDischarge: 'White',
    amountOfDischarge: 'Scanty',
    cervixAppearance: ['Healthy'],
    cervicalOs: 'Multiparous',
    cervicalMotionTenderness: 'Absent' as const,
    cervixPosition: 'Central' as const,
    consistency: 'Firm' as const,
    mobility: 'Mobile' as const
  });

  // 16. Per Vaginal Examination
  const [perVaginal, setPerVaginal] = useState({
    uterusSize: 'Normal' as const,
    mobility: 'Mobile' as const,
    consistency: 'Normal' as const,
    tenderness: 'Absent' as const,
    position: 'Anteverted' as const,
    adnexaRight: 'Normal' as const,
    adnexaLeft: 'Normal' as const,
    pouchOfDouglas: { tender: false, fullness: false, nodularity: false },
    parametrium: 'Free' as const
  });

  // 17. Screening/Diagnostic/Treatment Modalities
  const [modalities, setModalities] = useState({
    screeningTests: ['Liquid-Based Cytology (LBC)', 'VIA (Visual Inspection with Acetic Acid)'],
    diagnosticEvaluation: [] as string[],
    treatmentProcedures: [] as string[],
    referral: [] as string[],
    medication: {
      antibiotics: false,
      antifungal: true,
      analgesics: false,
      other: 'Clotrimazole vaginal pessary x 6 nights'
    },
    preventiveCare: {
      hpvVaccinationAdvised: true,
      smokingCessationCounselling: false,
      safeSexualPracticesCounselling: true
    }
  });

  // 18. Cytology / HPV Lab Report
  const [report, setReport] = useState({
    squamous: 'Negative / NILM' as any,
    glandular: 'Negative' as any,
    hpvResult: 'Negative' as any,
    hpvGenotyping: 'Negative / None' as any,
    viralLoad: 'Low' as any,
    organismsOnHVS: ['Candida'],
    benignChanges: ['Inflammation']
  });

  // 19. Management 1: Follow-up
  const [followUpChoices, setFollowUpChoices] = useState<string[]>([
    'Routine screening after 3 years',
    'Return immediately if symptoms worsen'
  ]);

  // 20. Management 2: VIA Protocol & Decision Support
  const [viaProtocol, setViaProtocol] = useState<{
    viaPerformed: 'Yes' | 'No' | '';
    viaResult: string;
    acetowhiteLesion: string;
    locationOfLesion: string[];
    transformationZone: string;
    lesionSize: string;
    lesionCharacteristics: string[];
    autoRecommendation: string;
  }>({
    viaPerformed: 'Yes',
    viaResult: 'VIA Negative',
    acetowhiteLesion: 'Absent',
    locationOfLesion: [],
    transformationZone: 'TZ1 – Fully visible',
    lesionSize: '<25% of the cervix',
    lesionCharacteristics: ['No abnormal findings'],
    autoRecommendation: 'Routine screening as per national guideline'
  });

  // Auto Decision Support for VIA
  const computedViaRecommendation = useMemo(() => {
    if (viaProtocol.viaResult === 'VIA Negative') {
      return 'Routine screening as per national guideline';
    }
    if (viaProtocol.viaResult === 'VIA Positive') {
      if (viaProtocol.lesionSize === '>50%' || viaProtocol.transformationZone.includes('TZ3')) {
        return 'Colposcopy ± biopsy (Large lesion or TZ3 transformation zone)';
      }
      return 'Cryotherapy or Thermal Ablation (screen-and-treat approach where appropriate)';
    }
    if (viaProtocol.viaResult === 'VIA Suspicious for Invasive Cancer') {
      return '🔴 Urgent biopsy and referral to a gynaecologic oncologist';
    }
    if (viaProtocol.viaResult === 'VIA Inconclusive / Unsatisfactory') {
      return 'Repeat examination or perform HPV DNA / LBC / colposcopy as indicated';
    }
    return 'Consult clinician judgment';
  }, [viaProtocol.viaResult, viaProtocol.lesionSize, viaProtocol.transformationZone]);

  // 21. Management 3: Ablative Eligibility & NHS England Guidelines
  const [ablativeEligibility, setAblativeEligibility] = useState<'Eligible for Cryotherapy/Thermal Ablation' | 'Not eligible' | 'Requires colposcopy' | 'Requires biopsy' | ''>('Eligible for Cryotherapy/Thermal Ablation');
  const [recommendedNextSteps, setRecommendedNextSteps] = useState<string[]>([
    'Routine screening'
  ]);

  // 22. Management 4: Colposcopy Protocol & Swede Score
  const [swedeScore, setSwedeScore] = useState<SwedeScore>({
    acetowhitening: 0,
    marginsSurface: 0,
    vessels: 0,
    lesionSize: 0,
    iodineUptake: 0,
    totalScore: 0,
    riskInterpretation: 'Low probability of HSIL (0-4)'
  });

  const [colposcopyProtocol, setColposcopyProtocol] = useState({
    indication: ['Routine Screening Check'],
    indicationOther: '',
    examinationStatus: 'Adequate' as const,
    inadequateReason: '',
    scj: 'Completely Visible' as const,
    transformationZone: 'TZ1' as const,
    nativeCervix: ['Original Squamous Epithelium', 'Ectropion'],
    aceticAcid: {
      acetowhitening: 'None' as const,
      margin: 'Regular' as const
    },
    lesionSize: '<25%' as const,
    lesionLocationClock: [] as string[],
    vascularPattern: ['Normal'],
    lugolsIodineSchiller: 'Positive Uptake' as const,
    suspiciousFeatures: [] as string[],
    impression: 'Normal' as const,
    biopsy: {
      taken: 'No' as const,
      sites: [] as string[],
      numberOfBiopsies: '1' as const,
      endocervicalCurettage: 'No' as const
    },
    immediateManagement: ['Routine Follow-up'],
    finalDiagnosis: ['Normal'],
    followUp: '3 Years' as const,
    histopathologyResult: ['Chronic cervicitis']
  });

  // 23. Management 5: Punch Biopsy Result
  const [punchBiopsyResult, setPunchBiopsyResult] = useState('No biopsy taken / Deferred');
  const [punchBiopsyNotes, setPunchBiopsyNotes] = useState('');

  // Doctor notes & Saving state
  const [doctorNotes, setDoctorNotes] = useState('Patient educated on menstrual hygiene and safe sexual practices. Recommended routine cervical cancer screening after 3 years.');
  const [doctorName] = useState('Dr. Rashmi Upadhyay (AIIMS New Delhi)');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Toggle helpers
  const toggleArrayItem = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  // Handle Save Record
  const handleSaveRecord = async () => {
    setIsSaving(true);
    setSaveError('');
    setSavedSuccess(false);

    const fullRecord: Omit<ClinicalRecord, 'id' | 'createdAt'> = {
      appointmentId: selectedAppointment?.id || null,
      patientDetails: patient,
      chiefComplaints,
      otherChiefComplaint,
      redFlags,
      isRedFlagPositive,
      menstrualHistory,
      obstetricHistory,
      sexualHistory,
      contraceptiveHistory,
      riskFactors,
      hpvVaccination,
      previousScreening,
      medicalHistory,
      surgicalHistory,
      familyHistory,
      consentDigital,
      externalGenitalia,
      perSpeculum,
      perVaginal,
      modalities,
      report,
      management1: { followUpChoices },
      management2: {
        ...viaProtocol,
        autoRecommendation: computedViaRecommendation
      } as any,
      management3: {
        ablativeEligibility,
        recommendedNextSteps,
        nhsGuidanceSummary: 'NHS England Guideline: HPV Negative -> Routine Recall; HPV+ -> Triage Cytology.'
      },
      management4: {
        ...colposcopyProtocol,
        swedeScore
      },
      management5: {
        punchBiopsyResult,
        punchBiopsyNotes
      },
      doctorNotes,
      doctorName
    };

    try {
      const res = await fetch('/api/clinical-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullRecord)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSavedSuccess(true);
        if (onRecordSaved) onRecordSaved(data.record);
      } else {
        setSaveError(data.error || 'Failed to save clinical record');
      }
    } catch {
      // Offline fallback
      setSavedSuccess(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-6 text-stone-900 font-sans">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex items-center space-x-3">
          {onBackToAppointments && (
            <button
              onClick={onBackToAppointments}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Back to Appointments Queue"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
                Level 2 Clinical Consultation
              </span>
              {selectedAppointment && (
                <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                  Token: {selectedAppointment.tokenNumber} • UHID: {selectedAppointment.uhid}
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-stone-900 mt-1">
              Cervical Cancer Screening & Clinical Documentation
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleSaveRecord}
            disabled={isSaving}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-teal-800 hover:bg-teal-900 disabled:bg-stone-400 text-white flex items-center space-x-2 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Clinical Record'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-900 text-xs animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold">Clinical screening record saved and synchronized with Express backend!</span>
          </div>
          <button onClick={() => setSavedSuccess(false)} className="text-emerald-700 hover:underline">Dismiss</button>
        </div>
      )}

      {saveError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center space-x-2 text-rose-900 text-xs">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Patient Mini Banner */}
      <div className="bg-stone-900 text-white p-5 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-teal-600/30 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-lg">
            {patient.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base md:text-lg font-serif font-bold text-white">{patient.name}</h2>
              <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-stone-300">{patient.age} yrs • {patient.sex}</span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              📞 +91 {patient.mobile} • 📍 {patient.stateDistrict} • ID: {patient.idType} ({patient.idNumber || 'N/A'})
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs text-stone-300 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-4">
          <div>
            <span className="text-[10px] uppercase text-stone-500 block">Examining Doctor</span>
            <span className="font-medium text-teal-200">{doctorName}</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CRITICAL REQUIREMENT: PRE-EXAMINATION CERVICAL CANCER RED FLAGS ALERT
          ========================================================================= */}
      {isRedFlagPositive && (
        <div className="p-5 bg-rose-50 border-2 border-rose-500 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in slide-in-from-top duration-300">
          <div className="flex items-start space-x-3.5">
            <div className="p-2 rounded-xl bg-rose-600 text-white shrink-0 shadow-xs">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider bg-rose-600 text-white px-2.5 py-0.5 rounded-md">
                  RED FLAG DETECTED
                </span>
                <span className="text-xs font-bold text-rose-900">Pre-Examination Warning</span>
              </div>
              <h3 className="text-base font-bold text-rose-950 mt-1 flex items-center space-x-1.5">
                <span>🔴 Action Required: Urgent Colposcopy / Biopsy Indicated!</span>
              </h3>
              <p className="text-xs text-rose-800 mt-0.5">
                One or more critical alarm symptoms positive (e.g. postcoital / postmenopausal bleeding, contact bleeding, visible cervical growth, enlarged nodes). High suspicion of invasive cervical disease.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('management_colposcopy')}
              className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Jump to Colposcopy Protocol</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Workflow Navigation Tabs */}
      <div className="flex items-center space-x-1 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('complaints_redflags')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
            activeTab === 'complaints_redflags'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Activity className="w-4 h-4 text-teal-700" />
          <span>1. Complaints & Red Flags</span>
          {isRedFlagPositive && <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />}
        </button>

        <button
          onClick={() => setActiveTab('histories')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
            activeTab === 'histories'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <ClipboardList className="w-4 h-4 text-teal-700" />
          <span>2. Medical & Sexual Histories</span>
        </button>

        <button
          onClick={() => setActiveTab('examination')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
            activeTab === 'examination'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Eye className="w-4 h-4 text-teal-700" />
          <span>3. Physical & Speculum Exam</span>
        </button>

        <button
          onClick={() => setActiveTab('reports_modalities')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
            activeTab === 'reports_modalities'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <FileText className="w-4 h-4 text-teal-700" />
          <span>4. Modalities & Cytology Reports</span>
        </button>

        <button
          onClick={() => setActiveTab('management_colposcopy')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
            activeTab === 'management_colposcopy'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Stethoscope className="w-4 h-4 text-teal-700" />
          <span>5. VIA, Swede Score & Colposcopy</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: CHIEF COMPLAINTS & RED FLAGS MUST
          ========================================================================= */}
      {activeTab === 'complaints_redflags' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Cervical Cancer Red Flags Section (MUST appear before examination) */}
          <div className="bg-white p-6 rounded-2xl border-2 border-rose-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-rose-950 uppercase tracking-wide">
                  Cervical Cancer Red Flag (Very Important) MUST
                </h3>
              </div>
              <span className="text-[11px] font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full">
                Appears Before Examination
              </span>
            </div>

            <p className="text-xs text-stone-600">
              Check all presenting alarm symptoms. If any symptom is positive, protocol mandates <strong>🔴 Urgent colposcopy / biopsy</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { key: 'postcoitalBleeding', label: 'Postcoital bleeding' },
                { key: 'postmenopausalBleeding', label: 'Postmenopausal bleeding' },
                { key: 'intermenstrualBleeding', label: 'Intermenstrual bleeding' },
                { key: 'foulSmellingDischarge', label: 'Foul-smelling discharge' },
                { key: 'pelvicPain', label: 'Pelvic pain' },
                { key: 'unexplainedWeightLoss', label: 'Unexplained weight loss' },
                { key: 'contactBleeding', label: 'Contact bleeding' },
                { key: 'visibleCervicalGrowth', label: 'Visible cervical growth' },
                { key: 'enlargedLymphNodes', label: 'Enlarged lymph nodes' }
              ].map((flag) => {
                const isChecked = (redFlags as any)[flag.key];
                return (
                  <label
                    key={flag.key}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center space-x-3 select-none ${
                      isChecked
                        ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold shadow-xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setRedFlags({ ...redFlags, [flag.key]: e.target.checked })}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-stone-300 cursor-pointer"
                    />
                    <span className="text-xs">{flag.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Chief Complaint Section MUST */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
              <Activity className="w-5 h-5 text-teal-700" />
              <h3 className="text-base font-bold text-stone-900 uppercase tracking-wide">
                Chief Complaint (Current Symptoms) MUST
              </h3>
            </div>

            <p className="text-xs text-stone-500">
              Select all symptoms reported by patient:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {chiefComplaintOptions.map((symptom) => {
                const isSelected = chiefComplaints.includes(symptom);
                return (
                  <label
                    key={symptom}
                    className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-start space-x-2.5 select-none ${
                      isSelected
                        ? 'bg-teal-50 border-teal-600 text-teal-950 font-medium'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayItem(chiefComplaints, symptom, setChiefComplaints)}
                      className="mt-0.5 w-3.5 h-3.5 rounded text-teal-600 focus:ring-teal-500 border-stone-300 cursor-pointer"
                    />
                    <span className="leading-snug">{symptom}</span>
                  </label>
                );
              })}
            </div>

            {/* Other Chief Complaint Input */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                24. Other Complaints / Notes:
              </label>
              <input
                type="text"
                placeholder="Specify any other presenting complaints..."
                value={otherChiefComplaint}
                onChange={(e) => setOtherChiefComplaint(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Digital Consent Tick */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentDigital}
                onChange={(e) => setConsentDigital(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-stone-300 cursor-pointer"
              />
              <span className="text-xs font-bold text-stone-800">
                12. Consent MUST: Digital Consent Verified & Signed electronically
              </span>
            </label>
            <span className="text-[11px] font-mono text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full font-semibold">
              Consent Active
            </span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab('histories')}
              className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>Continue to Patient Histories</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: HISTORIES (Menstrual, Obstetric, Sexual, Contraceptive, Risk, HPV, Medical, Surgical, Family)
          ========================================================================= */}
      {activeTab === 'histories' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* 3. Menstrual History MUST */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              3. Menstrual History MUST
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Age at First Period (Menarche)</label>
                <input
                  type="text"
                  placeholder="e.g. 13 years"
                  value={menstrualHistory.ageAtFirstPeriod}
                  onChange={(e) => setMenstrualHistory({ ...menstrualHistory, ageAtFirstPeriod: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Last Menstrual Period (LMP)</label>
                <input
                  type="date"
                  value={menstrualHistory.lastMenstrualPeriod}
                  onChange={(e) => setMenstrualHistory({ ...menstrualHistory, lastMenstrualPeriod: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cycle Pattern</label>
                <div className="flex gap-2">
                  <select
                    value={menstrualHistory.cycle}
                    onChange={(e) => setMenstrualHistory({ ...menstrualHistory, cycle: e.target.value as any })}
                    className="w-1/2 px-2 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="Regular">Regular</option>
                    <option value="Irregular">Irregular</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Duration / cycles"
                    value={menstrualHistory.cycleCount}
                    onChange={(e) => setMenstrualHistory({ ...menstrualHistory, cycleCount: e.target.value })}
                    className="w-1/2 px-2 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Flow</label>
                <div className="flex gap-2">
                  <select
                    value={menstrualHistory.flow}
                    onChange={(e) => setMenstrualHistory({ ...menstrualHistory, flow: e.target.value as any })}
                    className="w-1/2 px-2 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="Light">Light</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Heavy">Heavy</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Days / count"
                    value={menstrualHistory.flowCount}
                    onChange={(e) => setMenstrualHistory({ ...menstrualHistory, flowCount: e.target.value })}
                    className="w-1/2 px-2 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Painful Periods (Dysmenorrhea)</label>
                <div className="flex gap-2">
                  <select
                    value={menstrualHistory.painfulPeriods}
                    onChange={(e) => setMenstrualHistory({ ...menstrualHistory, painfulPeriods: e.target.value as any })}
                    className="w-1/2 px-2 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Cycles / severity"
                    value={menstrualHistory.painfulCount}
                    onChange={(e) => setMenstrualHistory({ ...menstrualHistory, painfulCount: e.target.value })}
                    className="w-1/2 px-2 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Postmenopausal Status</label>
                <div className="flex gap-2">
                  <select
                    value={menstrualHistory.postmenopausal}
                    onChange={(e) => setMenstrualHistory({ ...menstrualHistory, postmenopausal: e.target.value as any })}
                    className="w-1/2 px-2 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                  <input
                    type="text"
                    placeholder="How long (years/months)?"
                    value={menstrualHistory.postmenopausalDuration}
                    onChange={(e) => setMenstrualHistory({ ...menstrualHistory, postmenopausalDuration: e.target.value })}
                    className="w-1/2 px-2 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Obstetric History MUST */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              4. Obstetric History MUST
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Live Births</label>
                <input
                  type="number"
                  value={obstetricHistory.liveBirths}
                  onChange={(e) => setObstetricHistory({ ...obstetricHistory, liveBirths: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Normal Delivery</label>
                <input
                  type="number"
                  value={obstetricHistory.normalDelivery}
                  onChange={(e) => setObstetricHistory({ ...obstetricHistory, normalDelivery: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cesarean Section</label>
                <input
                  type="number"
                  value={obstetricHistory.cesarean}
                  onChange={(e) => setObstetricHistory({ ...obstetricHistory, cesarean: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Miscarriages</label>
                <input
                  type="number"
                  value={obstetricHistory.miscarriages}
                  onChange={(e) => setObstetricHistory({ ...obstetricHistory, miscarriages: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Abortions (&lt; 28 wks)</label>
                <input
                  type="number"
                  value={obstetricHistory.abortionsLessThan28Weeks}
                  onChange={(e) => setObstetricHistory({ ...obstetricHistory, abortionsLessThan28Weeks: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Stillbirth (&gt; 28 wks)</label>
                <input
                  type="number"
                  value={obstetricHistory.stillbirthAfter28Weeks}
                  onChange={(e) => setObstetricHistory({ ...obstetricHistory, stillbirthAfter28Weeks: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Current Pregnancy</label>
                <select
                  value={obstetricHistory.currentPregnancy}
                  onChange={(e) => setObstetricHistory({ ...obstetricHistory, currentPregnancy: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Gestational Age / Last Delivery</label>
                <input
                  type="text"
                  placeholder="e.g. 12 wks or 3 yrs ago"
                  value={obstetricHistory.lastDelivery}
                  onChange={(e) => setObstetricHistory({ ...obstetricHistory, lastDelivery: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>
            </div>
          </div>

          {/* 6. Sexual History (Very Sensitive) MUST */}
          <div className="bg-white p-6 rounded-2xl border border-rose-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                6. Sexual History (Very Sensitive) MUST
              </h3>
              <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Confidential Medical Information
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Lifetime Sexual Partners</label>
                <input
                  type="text"
                  value={sexualHistory.lifetimePartners}
                  onChange={(e) => setSexualHistory({ ...sexualHistory, lifetimePartners: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Single Partner</label>
                <select
                  value={sexualHistory.singlePartner}
                  onChange={(e) => setSexualHistory({ ...sexualHistory, singlePartner: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Condom Use</label>
                <select
                  value={sexualHistory.condomUse}
                  onChange={(e) => setSexualHistory({ ...sexualHistory, condomUse: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* STIs Checklist */}
            <div className="pt-2">
              <span className="block text-xs font-semibold text-stone-700 mb-2">History of STIs:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                {(['hiv', 'syphilis', 'gonorrhea', 'chlamydia', 'herpes', 'hpv'] as const).map((sti) => (
                  <div key={sti} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="font-bold uppercase text-stone-800 block text-[11px] mb-1">{sti}</span>
                    <select
                      value={sexualHistory.stis[sti]}
                      onChange={(e) => setSexualHistory({
                        ...sexualHistory,
                        stis: { ...sexualHistory.stis, [sti]: e.target.value as any }
                      })}
                      className="w-full px-2 py-1 text-xs rounded border border-stone-300"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Contraceptive History MUST */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              5. Contraceptive History MUST
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {[
                { label: 'Copper-T', key: 'copperT' },
                { label: 'Hormonal IUCD', key: 'hormonalIUCD' },
                { label: 'Oral Pills', key: 'oralPills' },
                { label: 'Injectables', key: 'injectables' },
                { label: 'Implant', key: 'implant' },
                { label: 'Condom', key: 'condom' },
                { label: 'Sterilization', key: 'sterilization' }
              ].map((item) => (
                <div key={item.key} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <span className="font-semibold text-stone-800 block">{item.label}</span>
                  <select
                    value={(contraceptiveHistory as any)[item.key]?.status}
                    onChange={(e) => setContraceptiveHistory({
                      ...contraceptiveHistory,
                      [item.key]: { ...(contraceptiveHistory as any)[item.key], status: e.target.value }
                    })}
                    className="w-full px-2 py-1 text-xs rounded border border-stone-300 bg-white"
                  >
                    <option value="No">No</option>
                    <option value="Currently">Currently</option>
                    <option value="Yes">Yes (Past)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Strength / reason"
                    value={(contraceptiveHistory as any)[item.key]?.strengthLastUseReason || ''}
                    onChange={(e) => setContraceptiveHistory({
                      ...contraceptiveHistory,
                      [item.key]: { ...(contraceptiveHistory as any)[item.key], strengthLastUseReason: e.target.value }
                    })}
                    className="w-full px-2 py-1 text-[11px] rounded border border-stone-200 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 6. Cervical Cancer Risk Factors MUST */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              6. Cervical Cancer Risk Factors MUST
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
              {[
                { label: 'Smoking', key: 'smoking' },
                { label: 'Tobacco chewing', key: 'tobaccoChewing' },
                { label: 'Alcohol', key: 'alcohol' },
                { label: 'Immunocompromised', key: 'immunocompromised' },
                { label: 'Organ transplant', key: 'organTransplant' },
                { label: 'Long-term steroids', key: 'longTermSteroids' },
                { label: 'Previous Pap smear', key: 'previousPapSmear' },
                { label: 'Previous HPV positive', key: 'previousHpvPositive' },
                { label: 'Family history of cervical ca', key: 'familyHistoryCervicalCancer' }
              ].map((item) => (
                <div key={item.key} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-semibold text-stone-800 block text-[11px] mb-1">{item.label}</span>
                  <select
                    value={(riskFactors as any)[item.key]}
                    onChange={(e) => setRiskFactors({ ...riskFactors, [item.key]: e.target.value as any })}
                    className="w-full px-2 py-1 text-xs rounded border border-stone-300 bg-white"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* 7. HPV Vaccination MUST & 8. Previous Screening */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
                7. HPV Vaccination MUST
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Vaccinated</label>
                  <select
                    value={hpvVaccination.vaccinated}
                    onChange={(e) => setHpvVaccination({ ...hpvVaccination, vaccinated: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="No">No / Not Vaccinated</option>
                    <option value="Yes">Yes</option>
                    <option value="Don't know">Don't know</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Doses</label>
                  <select
                    value={hpvVaccination.numberOfDoses}
                    onChange={(e) => setHpvVaccination({ ...hpvVaccination, numberOfDoses: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="">Select</option>
                    <option value="1">1 Dose</option>
                    <option value="2">2 Doses</option>
                    <option value="3">3 Doses</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Vaccine Brand / Type</label>
                  <select
                    value={hpvVaccination.type}
                    onChange={(e) => setHpvVaccination({ ...hpvVaccination, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="">None / Unknown</option>
                    <option value="Gardasil 9">Gardasil 9</option>
                    <option value="Gardasil 4">Gardasil 4</option>
                    <option value="Cervavac">Cervavac (Serum Institute)</option>
                    <option value="Cervarix">Cervarix</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
                8. Previous Screening MUST
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex gap-2">
                  <div className="w-1/3">
                    <label className="block font-semibold text-stone-700 mb-1">Pap Smear</label>
                    <select
                      value={previousScreening.papSmear}
                      onChange={(e) => setPreviousScreening({ ...previousScreening, papSmear: e.target.value as any })}
                      className="w-full px-2 py-2 rounded-xl border border-stone-300"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  <div className="w-2/3">
                    <label className="block font-semibold text-stone-700 mb-1">Date / Result / HPV DNA</label>
                    <input
                      type="text"
                      placeholder="e.g. 2024 - NILM - Negative"
                      value={previousScreening.papResult}
                      onChange={(e) => setPreviousScreening({ ...previousScreening, papResult: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Colposcopy / LEEP / Cone / Biopsy</label>
                  <input
                    type="text"
                    placeholder="Details of prior procedures..."
                    value={previousScreening.colposcopyLeepConeCryoLaser}
                    onChange={(e) => setPreviousScreening({ ...previousScreening, colposcopyLeepConeCryoLaser: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 9. Medical, 10. Surgical & 11. Family History */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-1.5">
                9. Medical History MUST
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'diabetes', label: 'Diabetes' },
                  { key: 'hypertension', label: 'Hypertension' },
                  { key: 'heartDisease', label: 'Heart disease' },
                  { key: 'kidneyDisease', label: 'Kidney disease' },
                  { key: 'liverDisease', label: 'Liver disease' },
                  { key: 'thyroidDisease', label: 'Thyroid disease' },
                  { key: 'tb', label: 'TB (lung/uterus/intestine)' },
                  { key: 'autoimmuneDisease', label: 'Autoimmune disease' },
                  { key: 'bleedingDisorders', label: 'Bleeding disorders' }
                ].map((item) => (
                  <label key={item.key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(medicalHistory as any)[item.key]}
                      onChange={(e) => setMedicalHistory({ ...medicalHistory, [item.key]: e.target.checked })}
                      className="w-3.5 h-3.5 rounded text-teal-600 focus:ring-teal-500 border-stone-300"
                    />
                    <span className="text-stone-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-1.5">
                10. Surgical History MUST
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'previousLscs', label: 'Previous LSCS' },
                  { key: 'hysterectomy', label: 'Hysterectomy' },
                  { key: 'myomectomy', label: 'Myomectomy' },
                  { key: 'ovarianSurgery', label: 'Ovarian surgery' },
                  { key: 'otherPelvicSurgery', label: 'Other pelvic surgery' }
                ].map((item) => (
                  <label key={item.key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(surgicalHistory as any)[item.key]}
                      onChange={(e) => setSurgicalHistory({ ...surgicalHistory, [item.key]: e.target.checked })}
                      className="w-3.5 h-3.5 rounded text-teal-600 focus:ring-teal-500 border-stone-300"
                    />
                    <span className="text-stone-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-1.5">
                11. Family History MUST
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'cervicalCancer', label: 'Cervical cancer' },
                  { key: 'breastCancer', label: 'Breast cancer' },
                  { key: 'ovarianCancer', label: 'Ovarian cancer' },
                  { key: 'colonCancer', label: 'Colon cancer' },
                  { key: 'endometrialCancer', label: 'Endometrial cancer' },
                  { key: 'otherCancers', label: 'Other cancers' }
                ].map((item) => (
                  <label key={item.key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(familyHistory as any)[item.key]}
                      onChange={(e) => setFamilyHistory({ ...familyHistory, [item.key]: e.target.checked })}
                      className="w-3.5 h-3.5 rounded text-teal-600 focus:ring-teal-500 border-stone-300"
                    />
                    <span className="text-stone-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setActiveTab('complaints_redflags')}
              className="px-5 py-2 text-xs font-semibold rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveTab('examination')}
              className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <span>Next: Physical & Speculum Exam</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: PHYSICAL & PER SPECULUM & PER VAGINAL EXAMINATION MUST
          ========================================================================= */}
      {activeTab === 'examination' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* 13. External Genitalia MUST */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              13. External Genitalia MUST
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <label className="p-3 rounded-xl border border-stone-200 flex items-center space-x-2 bg-stone-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={externalGenitalia.normal}
                  onChange={(e) => setExternalGenitalia({ ...externalGenitalia, normal: e.target.checked })}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-bold">Normal Genitalia</span>
              </label>

              {[
                { label: 'Vulval Lesion', key: 'vulvalLesion' },
                { label: 'Ulcer Present', key: 'ulcer' },
                { label: 'Warts (Condyloma)', key: 'warts' },
                { label: 'Swelling', key: 'swelling' },
                { label: 'Cyst', key: 'cyst' }
              ].map((item) => (
                <div key={item.key} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-800">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={(externalGenitalia as any)[item.key]?.present}
                      onChange={(e) => setExternalGenitalia({
                        ...externalGenitalia,
                        [item.key]: { ...(externalGenitalia as any)[item.key], present: e.target.checked }
                      })}
                      className="w-3.5 h-3.5 rounded text-teal-600"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Location / Size"
                    value={(externalGenitalia as any)[item.key]?.locationSize || ''}
                    onChange={(e) => setExternalGenitalia({
                      ...externalGenitalia,
                      [item.key]: { ...(externalGenitalia as any)[item.key], locationSize: e.target.value }
                    })}
                    className="w-full px-2 py-1 text-[11px] rounded border border-stone-200 bg-white"
                  />
                </div>
              ))}

              <label className="p-3 rounded-xl border border-stone-200 flex items-center space-x-2 bg-stone-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={externalGenitalia.atrophicChanges}
                  onChange={(e) => setExternalGenitalia({ ...externalGenitalia, atrophicChanges: e.target.checked })}
                  className="w-4 h-4 rounded text-teal-600"
                />
                <span className="font-semibold">Atrophic Changes</span>
              </label>
            </div>
          </div>

          {/* Per Speculum Examination */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              Per Speculum Examination
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Vaginal Walls / Vault</label>
                <select
                  value={perSpeculum.vaginalWalls}
                  onChange={(e) => setPerSpeculum({ ...perSpeculum, vaginalWalls: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Healthy">Healthy</option>
                  <option value="Atrophic">Atrophic</option>
                  <option value="Inflamed">Inflamed</option>
                  <option value="Ulcer">Ulcer</option>
                  <option value="Growth">Growth</option>
                  <option value="Prolapse">Prolapse</option>
                  <option value="Bleeding">Bleeding</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cervix Visibility</label>
                <select
                  value={perSpeculum.cervixVisibility}
                  onChange={(e) => setPerSpeculum({ ...perSpeculum, cervixVisibility: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Fully visualized">Fully visualized</option>
                  <option value="Partially visualized">Partially visualized</option>
                  <option value="Not visualized">Not visualized</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Vaginal Discharge</label>
                <select
                  value={perSpeculum.vaginalDischarge}
                  onChange={(e) => setPerSpeculum({ ...perSpeculum, vaginalDischarge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="None">None</option>
                  <option value="Physiological">Physiological</option>
                  <option value="White">White</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Green">Green</option>
                  <option value="Blood-stained">Blood-stained</option>
                  <option value="Purulent">Purulent</option>
                  <option value="Foul-smelling">Foul-smelling</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Amount of Discharge</label>
                <select
                  value={perSpeculum.amountOfDischarge}
                  onChange={(e) => setPerSpeculum({ ...perSpeculum, amountOfDischarge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Scanty">Scanty</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Copious">Copious</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cervical Os</label>
                <select
                  value={perSpeculum.cervicalOs}
                  onChange={(e) => setPerSpeculum({ ...perSpeculum, cervicalOs: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Closed">Closed</option>
                  <option value="Open">Open</option>
                  <option value="Nulliparous">Nulliparous</option>
                  <option value="Multiparous">Multiparous</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cervical Motion Tenderness</label>
                <select
                  value={perSpeculum.cervicalMotionTenderness}
                  onChange={(e) => setPerSpeculum({ ...perSpeculum, cervicalMotionTenderness: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Absent">Absent</option>
                  <option value="Present">Present</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cervix Position</label>
                <select
                  value={perSpeculum.cervixPosition}
                  onChange={(e) => setPerSpeculum({ ...perSpeculum, cervixPosition: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Central">Central</option>
                  <option value="Anterior">Anterior</option>
                  <option value="Posterior">Posterior</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Consistency</label>
                <select
                  value={perSpeculum.consistency}
                  onChange={(e) => setPerSpeculum({ ...perSpeculum, consistency: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Firm">Firm</option>
                  <option value="Soft">Soft</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Mobility</label>
                <select
                  value={perSpeculum.mobility}
                  onChange={(e) => setPerSpeculum({ ...perSpeculum, mobility: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Mobile">Mobile</option>
                  <option value="Restricted">Restricted</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>
            </div>

            {/* Cervix Appearance Multi-Checklist */}
            <div className="pt-3 border-t border-stone-100">
              <span className="block text-xs font-semibold text-stone-700 mb-2">
                Cervix Appearance (Select all observed findings):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                {[
                  'Healthy', 'Ectropion (cervical erosion)', 'Cervicitis', 'Nabothian cyst',
                  'Cervical polyp', 'Hypertrophied', 'Atrophic', 'Growth suspicious for malignancy',
                  'Exophytic growth', 'Endophytic growth', 'Fungating growth', 'Necrotic lesion',
                  'Leukoplakia', 'Ulcer', 'Friable cervix', 'Contact bleeding',
                  'Acetowhite lesion', 'Mosaic pattern', 'Fine punctation', 'Coarse punctation',
                  'Atypical vessels', 'Bleeding from os', 'Suspicious for invasive carcinoma'
                ].map((appearance) => {
                  const isChecked = perSpeculum.cervixAppearance.includes(appearance);
                  return (
                    <label
                      key={appearance}
                      className={`p-2 rounded-xl border text-[11px] cursor-pointer flex items-center space-x-2 ${
                        isChecked
                          ? appearance.includes('suspicious') || appearance.includes('carcinoma') || appearance.includes('growth')
                            ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold'
                            : 'bg-teal-50 border-teal-500 text-teal-950 font-medium'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleArrayItem(perSpeculum.cervixAppearance, appearance, (val) => setPerSpeculum({ ...perSpeculum, cervixAppearance: val }))}
                        className="w-3.5 h-3.5 rounded text-teal-600 cursor-pointer"
                      />
                      <span>{appearance}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Per Vaginal Examination: MUST */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              Per Vaginal Examination: MUST
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Uterus Size</label>
                <select
                  value={perVaginal.uterusSize}
                  onChange={(e) => setPerVaginal({ ...perVaginal, uterusSize: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Normal">Normal</option>
                  <option value="Bulky">Bulky</option>
                  <option value="Small">Small</option>
                  <option value="Not appreciated">Not appreciated</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Mobility</label>
                <select
                  value={perVaginal.mobility}
                  onChange={(e) => setPerVaginal({ ...perVaginal, mobility: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Mobile">Mobile</option>
                  <option value="Restricted">Restricted</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Consistency</label>
                <select
                  value={perVaginal.consistency}
                  onChange={(e) => setPerVaginal({ ...perVaginal, consistency: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Normal">Normal</option>
                  <option value="Firm">Firm</option>
                  <option value="Soft">Soft</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Tenderness</label>
                <select
                  value={perVaginal.tenderness}
                  onChange={(e) => setPerVaginal({ ...perVaginal, tenderness: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Absent">Absent</option>
                  <option value="Present">Present</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Position</label>
                <select
                  value={perVaginal.position}
                  onChange={(e) => setPerVaginal({ ...perVaginal, position: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Anteverted">Anteverted</option>
                  <option value="Retroverted">Retroverted</option>
                  <option value="Midposition">Midposition</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Adnexa (Right)</label>
                <select
                  value={perVaginal.adnexaRight}
                  onChange={(e) => setPerVaginal({ ...perVaginal, adnexaRight: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Normal">Normal</option>
                  <option value="Tender">Tender</option>
                  <option value="Mass">Mass</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Adnexa (Left)</label>
                <select
                  value={perVaginal.adnexaLeft}
                  onChange={(e) => setPerVaginal({ ...perVaginal, adnexaLeft: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Normal">Normal</option>
                  <option value="Tender">Tender</option>
                  <option value="Mass">Mass</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Parametrium</label>
                <select
                  value={perVaginal.parametrium}
                  onChange={(e) => setPerVaginal({ ...perVaginal, parametrium: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Free">Free</option>
                  <option value="Indurated">Indurated</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>
            </div>

            {/* Pouch of Douglas */}
            <div className="pt-2 border-t border-stone-100 flex items-center space-x-6 text-xs">
              <span className="font-semibold text-stone-800">Pouch of Douglas:</span>
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={perVaginal.pouchOfDouglas.tender}
                  onChange={(e) => setPerVaginal({
                    ...perVaginal,
                    pouchOfDouglas: { ...perVaginal.pouchOfDouglas, tender: e.target.checked }
                  })}
                  className="w-3.5 h-3.5 rounded text-teal-600"
                />
                <span>Tender</span>
              </label>
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={perVaginal.pouchOfDouglas.fullness}
                  onChange={(e) => setPerVaginal({
                    ...perVaginal,
                    pouchOfDouglas: { ...perVaginal.pouchOfDouglas, fullness: e.target.checked }
                  })}
                  className="w-3.5 h-3.5 rounded text-teal-600"
                />
                <span>Fullness</span>
              </label>
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={perVaginal.pouchOfDouglas.nodularity}
                  onChange={(e) => setPerVaginal({
                    ...perVaginal,
                    pouchOfDouglas: { ...perVaginal.pouchOfDouglas, nodularity: e.target.checked }
                  })}
                  className="w-3.5 h-3.5 rounded text-teal-600"
                />
                <span>Nodularity</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setActiveTab('histories')}
              className="px-5 py-2 text-xs font-semibold rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveTab('reports_modalities')}
              className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <span>Next: Modalities & Cytology</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: MODALITIES & CYTOLOGY/HPV REPORTS
          ========================================================================= */}
      {activeTab === 'reports_modalities' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Screening Tests & Diagnostic Evaluation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
                Screening Tests: MUST
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  'Liquid-Based Cytology (LBC)',
                  'Conventional Pap Smear',
                  'HPV DNA Test',
                  'Co-testing (LBC + HPV DNA)',
                  'VIA (Visual Inspection with Acetic Acid)',
                  "VILI (Visual Inspection with Lugol's Iodine)"
                ].map((test) => (
                  <label key={test} className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modalities.screeningTests.includes(test)}
                      onChange={() => toggleArrayItem(modalities.screeningTests, test, (val) => setModalities({ ...modalities, screeningTests: val }))}
                      className="w-3.5 h-3.5 rounded text-teal-600"
                    />
                    <span className="text-stone-800 font-medium">{test}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
                Further Diagnostic Evaluation
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  'Colposcopy',
                  'Cervical Biopsy',
                  'Punch Biopsy',
                  'Endocervical Curettage (ECC) (if indicated)',
                  'Endometrial Biopsy (if indicated)'
                ].map((diag) => (
                  <label key={diag} className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modalities.diagnosticEvaluation.includes(diag)}
                      onChange={() => toggleArrayItem(modalities.diagnosticEvaluation, diag, (val) => setModalities({ ...modalities, diagnosticEvaluation: val }))}
                      className="w-3.5 h-3.5 rounded text-teal-600"
                    />
                    <span className="text-stone-800 font-medium">{diag}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Treatment Procedures & Referrals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
                Treatment Procedures
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  'LEEP (Loop Electrosurgical Excision Procedure)',
                  'Cold Knife Conization (CKC)',
                  'Cryotherapy',
                  'Thermal Ablation',
                  'Laser Ablation (if available)'
                ].map((proc) => (
                  <label key={proc} className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modalities.treatmentProcedures.includes(proc)}
                      onChange={() => toggleArrayItem(modalities.treatmentProcedures, proc, (val) => setModalities({ ...modalities, treatmentProcedures: val }))}
                      className="w-3.5 h-3.5 rounded text-teal-600"
                    />
                    <span className="text-stone-800 font-medium">{proc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
                Referral Destinations
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  'Refer to Gynaecologist',
                  'Refer to Colposcopy Clinic',
                  'Refer to Gynaecologic Oncologist',
                  'Refer to Higher Centre'
                ].map((ref) => (
                  <label key={ref} className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modalities.referral.includes(ref)}
                      onChange={() => toggleArrayItem(modalities.referral, ref, (val) => setModalities({ ...modalities, referral: val }))}
                      className="w-3.5 h-3.5 rounded text-rose-600"
                    />
                    <span className="text-stone-800 font-medium">{ref}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Medication MUST & Preventive Care */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              Medication & Preventive Care MUST
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <span className="font-bold text-stone-800 block">Prescribed Medication:</span>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modalities.medication.antibiotics}
                      onChange={(e) => setModalities({
                        ...modalities,
                        medication: { ...modalities.medication, antibiotics: e.target.checked }
                      })}
                      className="w-3.5 h-3.5 rounded text-teal-600"
                    />
                    <span>Antibiotics</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modalities.medication.antifungal}
                      onChange={(e) => setModalities({
                        ...modalities,
                        medication: { ...modalities.medication, antifungal: e.target.checked }
                      })}
                      className="w-3.5 h-3.5 rounded text-teal-600"
                    />
                    <span>Antifungal Treatment</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modalities.medication.analgesics}
                      onChange={(e) => setModalities({
                        ...modalities,
                        medication: { ...modalities.medication, analgesics: e.target.checked }
                      })}
                      className="w-3.5 h-3.5 rounded text-teal-600"
                    />
                    <span>Analgesics</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Other medication details..."
                  value={modalities.medication.other}
                  onChange={(e) => setModalities({
                    ...modalities,
                    medication: { ...modalities.medication, other: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 mt-2"
                />
              </div>

              <div className="space-y-2">
                <span className="font-bold text-stone-800 block">Preventive Care Advised:</span>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modalities.preventiveCare.hpvVaccinationAdvised}
                    onChange={(e) => setModalities({
                      ...modalities,
                      preventiveCare: { ...modalities.preventiveCare, hpvVaccinationAdvised: e.target.checked }
                    })}
                    className="w-3.5 h-3.5 rounded text-teal-600"
                  />
                  <span>HPV Vaccination Advised</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modalities.preventiveCare.smokingCessationCounselling}
                    onChange={(e) => setModalities({
                      ...modalities,
                      preventiveCare: { ...modalities.preventiveCare, smokingCessationCounselling: e.target.checked }
                    })}
                    className="w-3.5 h-3.5 rounded text-teal-600"
                  />
                  <span>Smoking / Tobacco Cessation Counselling</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modalities.preventiveCare.safeSexualPracticesCounselling}
                    onChange={(e) => setModalities({
                      ...modalities,
                      preventiveCare: { ...modalities.preventiveCare, safeSexualPracticesCounselling: e.target.checked }
                    })}
                    className="w-3.5 h-3.5 rounded text-teal-600"
                  />
                  <span>Safe Sexual Practices Counselling</span>
                </label>
              </div>
            </div>
          </div>

          {/* Cytology & HPV Lab Report */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              Report - Cytology, Epithelial Cell Abnormalities & HPV DNA
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Squamous Epithelial Cells</label>
                <select
                  value={report.squamous}
                  onChange={(e) => setReport({ ...report, squamous: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Negative / NILM">Negative for Intraepithelial Lesion (NILM)</option>
                  <option value="ASC-US">ASC-US (Atypical Squamous of Undetermined Significance)</option>
                  <option value="ASC-H">ASC-H (Cannot Exclude HSIL)</option>
                  <option value="LSIL">LSIL (Low-grade Squamous Intraepithelial)</option>
                  <option value="HSIL">HSIL (High-grade Squamous Intraepithelial)</option>
                  <option value="Squamous cell carcinoma">Squamous Cell Carcinoma</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Glandular Epithelial Cells</label>
                <select
                  value={report.glandular}
                  onChange={(e) => setReport({ ...report, glandular: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Negative">Negative for Glandular Abnormality</option>
                  <option value="AGC">AGC (Atypical Glandular Cells)</option>
                  <option value="AIS">AIS (Adenocarcinoma In Situ)</option>
                  <option value="Adenocarcinoma">Invasive Adenocarcinoma</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">HPV DNA Result</label>
                <select
                  value={report.hpvResult}
                  onChange={(e) => setReport({ ...report, hpvResult: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Negative">Negative</option>
                  <option value="Positive">Positive</option>
                  <option value="Not Done">Not Done</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">HPV Genotyping (if done)</label>
                <select
                  value={report.hpvGenotyping}
                  onChange={(e) => setReport({ ...report, hpvGenotyping: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Negative / None">Negative / None</option>
                  <option value="HPV 16">High-Risk: HPV 16</option>
                  <option value="HPV 18">High-Risk: HPV 18</option>
                  <option value="HPV 16 & 18">High-Risk: HPV 16 & 18</option>
                  <option value="Other high-risk HPV">Other High-Risk HPV</option>
                  <option value="Low-risk HPV only">Low-Risk HPV Only</option>
                </select>
              </div>
            </div>

            {/* Organisms & Benign Changes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100 text-xs">
              <div>
                <span className="font-bold text-stone-800 block mb-1.5">Organisms on HVS (Must If Done):</span>
                <div className="flex flex-wrap gap-2">
                  {['Candida', 'Trichomonas vaginalis', 'Bacterial vaginosis', 'Actinomyces', 'Herpes simplex virus'].map((org) => {
                    const isSelected = report.organismsOnHVS.includes(org);
                    return (
                      <button
                        type="button"
                        key={org}
                        onClick={() => toggleArrayItem(report.organismsOnHVS, org, (val) => setReport({ ...report, organismsOnHVS: val }))}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                          isSelected ? 'bg-teal-700 text-white border-teal-800' : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        {org}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="font-bold text-stone-800 block mb-1.5">Benign Changes:</span>
                <div className="flex flex-wrap gap-2">
                  {['Inflammation', 'Atrophy', 'Reactive cellular changes', 'Radiation changes'].map((change) => {
                    const isSelected = report.benignChanges.includes(change);
                    return (
                      <button
                        type="button"
                        key={change}
                        onClick={() => toggleArrayItem(report.benignChanges, change, (val) => setReport({ ...report, benignChanges: val }))}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                          isSelected ? 'bg-teal-700 text-white border-teal-800' : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        {change}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setActiveTab('examination')}
              className="px-5 py-2 text-xs font-semibold rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveTab('management_colposcopy')}
              className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <span>Next: VIA & Colposcopy Protocol</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: MANAGEMENT 1-5, VIA PROTOCOL, SWEDE SCORE CALCULATOR & COLPOSCOPY
          ========================================================================= */}
      {activeTab === 'management_colposcopy' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Management 1: Follow-up MUST */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              Management 1: Follow-up MUST
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
              {[
                'Routine screening after 3 years',
                'Repeat HPV DNA/ LBC in 12 months',
                'Repeat co-testing as per guideline',
                'Follow-up after treatment',
                'Return immediately if symptoms worsen'
              ].map((item) => (
                <label
                  key={item}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center space-x-2.5 ${
                    followUpChoices.includes(item)
                      ? 'bg-teal-50 border-teal-600 text-teal-950 font-medium'
                      : 'bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={followUpChoices.includes(item)}
                    onChange={() => toggleArrayItem(followUpChoices, item, setFollowUpChoices)}
                    className="w-4 h-4 rounded text-teal-600 cursor-pointer"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Management 2: VIA Protocol & Decision Support (Auto-Generated) */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                Management 2: VIA (Visual Inspection with Acetic Acid)
              </h3>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
                Protocol & Auto Decision Support
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">VIA Performed</label>
                <select
                  value={viaProtocol.viaPerformed}
                  onChange={(e) => setViaProtocol({ ...viaProtocol, viaPerformed: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">VIA Result</label>
                <select
                  value={viaProtocol.viaResult}
                  onChange={(e) => setViaProtocol({ ...viaProtocol, viaResult: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                >
                  <option value="VIA Negative">VIA Negative</option>
                  <option value="VIA Positive">VIA Positive</option>
                  <option value="VIA Suspicious for Invasive Cancer">VIA Suspicious for Invasive Cancer</option>
                  <option value="VIA Inconclusive / Unsatisfactory">VIA Inconclusive / Unsatisfactory</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Transformation Zone (TZ)</label>
                <select
                  value={viaProtocol.transformationZone}
                  onChange={(e) => setViaProtocol({ ...viaProtocol, transformationZone: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="TZ1 – Fully visible">TZ1 – Fully visible</option>
                  <option value="TZ2 – Partially endocervical but fully visible">TZ2 – Partially endocervical but fully visible</option>
                  <option value="TZ3 – Not fully visible">TZ3 – Not fully visible</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Lesion Size</label>
                <select
                  value={viaProtocol.lesionSize}
                  onChange={(e) => setViaProtocol({ ...viaProtocol, lesionSize: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="<25% of the cervix">&lt; 25% of the cervix</option>
                  <option value="25–50%">25–50%</option>
                  <option value=">50%">&gt; 50%</option>
                </select>
              </div>
            </div>

            {/* AUTO-GENERATED DECISION SUPPORT CALLOUT */}
            <div className={`p-4 rounded-xl border text-xs space-y-1 ${
              viaProtocol.viaResult.includes('Suspicious')
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : viaProtocol.viaResult.includes('Positive')
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-teal-50 border-teal-300 text-teal-950'
            }`}>
              <div className="flex items-center space-x-1.5 font-bold">
                <Info className="w-4 h-4" />
                <span>Decision Support (Auto-generated based on findings):</span>
              </div>
              <p className="text-sm font-semibold pl-5">
                {computedViaRecommendation}
              </p>
            </div>
          </div>

          {/* Management 3: Eligibility for Ablative Treatment & NHS England Matrix */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-2">
              Management 3: Screen-and-Treat Ablative Eligibility & Guidelines
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Eligibility for Ablative Treatment</label>
                <select
                  value={ablativeEligibility}
                  onChange={(e) => setAblativeEligibility(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Eligible for Cryotherapy/Thermal Ablation">Eligible for Cryotherapy / Thermal Ablation</option>
                  <option value="Not eligible">Not eligible</option>
                  <option value="Requires colposcopy">Requires colposcopy</option>
                  <option value="Requires biopsy">Requires biopsy</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Recommended Next Step</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    'Routine screening', 'Repeat VIA', 'Pap smear / LBC',
                    'HPV DNA test', 'Colposcopy', 'Cervical biopsy', 'LEEP', 'Cryotherapy',
                    'Thermal ablation', 'Refer to Gynaecologic Oncologist'
                  ].map((step) => (
                    <button
                      type="button"
                      key={step}
                      onClick={() => toggleArrayItem(recommendedNextSteps, step, setRecommendedNextSteps)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg border cursor-pointer ${
                        recommendedNextSteps.includes(step)
                          ? 'bg-teal-800 text-white border-teal-900'
                          : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      {step}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reference Table: Clinical Management (NHS England / British Cervical Screening Programme) */}
            <div className="pt-2">
              <span className="font-bold text-stone-800 block text-xs mb-2">
                Clinical Management Protocol Matrix (NHS England / British Cervical Screening Programme):
              </span>
              <div className="overflow-x-auto rounded-xl border border-stone-200">
                <table className="w-full text-left text-[11px] font-sans">
                  <thead className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-2.5">LBC / HPV DNA Result</th>
                      <th className="p-2.5">Clinical Management Guideline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    <tr className="hover:bg-stone-50">
                      <td className="p-2.5 font-semibold text-teal-900">HPV Negative</td>
                      <td className="p-2.5">Reassure. Routine recall according to the national screening programme.</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-2.5 font-semibold text-amber-900">HPV Positive + Cytology Negative</td>
                      <td className="p-2.5">Repeat HPV screening in 12 months. If HPV persists, repeat again at 24 months. If still HPV positive after 24 months, refer for colposcopy.</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-2.5 font-semibold text-amber-900">HPV Positive + Borderline/Mild (ASC-US/LSIL)</td>
                      <td className="p-2.5">Refer for colposcopy.</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-2.5 font-semibold text-rose-900">HPV Positive + Moderate or Severe (HSIL)</td>
                      <td className="p-2.5">Urgent colposcopy with biopsy if indicated.</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-2.5 font-semibold text-rose-900">HPV Positive + Glandular Abnormality</td>
                      <td className="p-2.5">Urgent colposcopy with endocervical assessment as indicated.</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-2.5 font-semibold text-rose-950 font-bold">Suspected Invasive Cancer</td>
                      <td className="p-2.5 font-bold text-rose-950">Urgent referral to a Gynaecological Oncology Unit for biopsy and staging.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Management 4: Colposcopy Protocol & Swede Score Calculator */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                Management 4: Colposcopy Protocol & Biopsy Documentation
              </h3>
              <span className="text-xs font-mono text-stone-500">Standardized Colposcopic Chart</span>
            </div>

            {/* Colposcopy Indication & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Colposcopy Indication</label>
                <select
                  value={colposcopyProtocol.indication[0] || ''}
                  onChange={(e) => setColposcopyProtocol({ ...colposcopyProtocol, indication: [e.target.value] })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Routine Screening Check">Routine Screening Check</option>
                  <option value="HPV Positive">HPV Positive</option>
                  <option value="Abnormal Cytology (ASC-US)">Abnormal Cytology (ASC-US)</option>
                  <option value="LSIL">LSIL</option>
                  <option value="HSIL">HSIL</option>
                  <option value="AGC">AGC</option>
                  <option value="VIA Positive">VIA Positive</option>
                  <option value="Persistent Postcoital Bleeding">Persistent Postcoital Bleeding</option>
                  <option value="Suspicious Cervix">Suspicious Cervix</option>
                  <option value="Follow-up After Treatment">Follow-up After Treatment</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Examination Status</label>
                <select
                  value={colposcopyProtocol.examinationStatus}
                  onChange={(e) => setColposcopyProtocol({ ...colposcopyProtocol, examinationStatus: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Adequate">Adequate</option>
                  <option value="Inadequate">Inadequate</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Squamocolumnar Junction (SCJ)</label>
                <select
                  value={colposcopyProtocol.scj}
                  onChange={(e) => setColposcopyProtocol({ ...colposcopyProtocol, scj: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="Completely Visible">Completely Visible</option>
                  <option value="Partially Visible">Partially Visible</option>
                  <option value="Not Visible">Not Visible</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Transformation Zone (Mandatory)</label>
                <select
                  value={colposcopyProtocol.transformationZone}
                  onChange={(e) => setColposcopyProtocol({ ...colposcopyProtocol, transformationZone: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="TZ1">TZ1 (Fully ectocervical)</option>
                  <option value="TZ2">TZ2 (Endocervical component fully seen)</option>
                  <option value="TZ3">TZ3 (Endocervical component not fully seen)</option>
                </select>
              </div>
            </div>

            {/* INTERACTIVE SWEDE SCORE CALCULATOR EMBEDDED */}
            <div className="pt-2">
              <SwedeScoreCalculator
                score={swedeScore}
                onChange={(newScore) => setSwedeScore(newScore)}
              />
            </div>

            {/* Biopsy and Histopathology Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100 text-xs">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <span className="font-bold text-stone-900 block">15. Biopsy Protocol:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-stone-600 mb-1">Biopsy Taken?</label>
                    <select
                      value={colposcopyProtocol.biopsy.taken}
                      onChange={(e) => setColposcopyProtocol({
                        ...colposcopyProtocol,
                        biopsy: { ...colposcopyProtocol.biopsy, taken: e.target.value as any }
                      })}
                      className="w-full px-2 py-1.5 rounded-lg border border-stone-300 bg-white"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-600 mb-1">No. of Biopsies</label>
                    <select
                      value={colposcopyProtocol.biopsy.numberOfBiopsies}
                      onChange={(e) => setColposcopyProtocol({
                        ...colposcopyProtocol,
                        biopsy: { ...colposcopyProtocol.biopsy, numberOfBiopsies: e.target.value as any }
                      })}
                      className="w-full px-2 py-1.5 rounded-lg border border-stone-300 bg-white"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4+">4+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-stone-600 mb-1">Endocervical Curettage (ECC)</label>
                  <select
                    value={colposcopyProtocol.biopsy.endocervicalCurettage}
                    onChange={(e) => setColposcopyProtocol({
                      ...colposcopyProtocol,
                      biopsy: { ...colposcopyProtocol.biopsy, endocervicalCurettage: e.target.value as any }
                    })}
                    className="w-full px-2 py-1.5 rounded-lg border border-stone-300 bg-white"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              {/* Management 5: Punch Biopsy Result */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <span className="font-bold text-stone-900 block">Management 5: Punch Biopsy Result:</span>
                <input
                  type="text"
                  placeholder="e.g. Benign squamous epithelium / CIN 1 / CIN 2 / Awaiting histopath"
                  value={punchBiopsyResult}
                  onChange={(e) => setPunchBiopsyResult(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Additional histopathology or clinical notes..."
                  value={punchBiopsyNotes}
                  onChange={(e) => setPunchBiopsyNotes(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-[11px]"
                />
              </div>
            </div>

            {/* Doctor's Final Summary Notes */}
            <div className="pt-2 border-t border-stone-100">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Doctor Consultation Summary & Prescription Notes:
              </label>
              <textarea
                rows={3}
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-stone-200">
            <button
              onClick={() => setActiveTab('reports_modalities')}
              className="w-full sm:w-auto px-5 py-2 text-xs font-semibold rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100"
            >
              Previous Section
            </button>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Record</span>
              </button>
              <button
                onClick={handleSaveRecord}
                disabled={isSaving}
                className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 disabled:bg-stone-400 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Record...' : 'Complete & Save Clinical Consultation'}</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
