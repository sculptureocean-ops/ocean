// TypeScript interfaces for Cervical Cancer Screening & Clinical Documentation

export interface PersonalDetails {
  name: string;
  age: number | string;
  sex: string;
  mobile: string;
  email?: string;
  address: string;
  stateDistrict: string;
  idType: 'Aadhaar' | 'ABHA' | 'PMJY' | 'Hospital MRN/UHID' | 'Other';
  idNumber: string;
  maritalStatus: 'Unmarried' | 'Married' | 'Widowed' | 'Divorced' | 'Separated';
  occupation: string;
}

export interface BookingDetails {
  appointmentDate: string;
  timeSlot: string;
  preferredDoctor: string;
  facility: string;
  initialReason: string;
}

export interface Appointment {
  id: string;
  uhid: string;
  tokenNumber: string;
  personalDetails: PersonalDetails;
  bookingDetails: BookingDetails;
  consentGiven: boolean;
  consentTimestamp: string;
  status: 'Scheduled' | 'In-Consultation' | 'Completed' | 'Cancelled';
  clinicalRecordId?: string;
  createdAt: string;
}

export interface RedFlags {
  postcoitalBleeding: boolean;
  postmenopausalBleeding: boolean;
  intermenstrualBleeding: boolean;
  foulSmellingDischarge: boolean;
  pelvicPain: boolean;
  unexplainedWeightLoss: boolean;
  contactBleeding: boolean;
  visibleCervicalGrowth: boolean;
  enlargedLymphNodes: boolean;
}

export interface MenstrualHistory {
  ageAtFirstPeriod: string | number;
  lastMenstrualPeriod: string;
  cycle: 'Regular' | 'Irregular' | '';
  cycleCount?: string;
  flow: 'Light' | 'Moderate' | 'Heavy' | '';
  flowCount?: string;
  painfulPeriods: 'Yes' | 'No' | '';
  painfulCount?: string;
  postmenopausal: 'Yes' | 'No' | '';
  postmenopausalDuration?: string;
}

export interface ObstetricHistory {
  liveBirths: number | string;
  normalDelivery: number | string;
  cesarean: number | string;
  miscarriages: number | string;
  abortionsLessThan28Weeks: number | string;
  stillbirthAfter28Weeks: number | string;
  currentPregnancy: 'Yes' | 'No' | '';
  pregnancyStatus: 'Pregnant' | 'Not pregnant' | '';
  gestationalAge?: string;
  lastDelivery?: string;
}

export interface SexualHistory {
  lifetimePartners: string | number;
  singlePartner: 'Yes' | 'No' | '';
  condomUse: 'Yes' | 'No' | '';
  stis: {
    hiv: 'Yes' | 'No' | '';
    syphilis: 'Yes' | 'No' | '';
    gonorrhea: 'Yes' | 'No' | '';
    chlamydia: 'Yes' | 'No' | '';
    herpes: 'Yes' | 'No' | '';
    hpv: 'Yes' | 'No' | '';
  };
}

export interface ContraceptiveHistory {
  none: boolean;
  copperT: { status: 'Currently' | 'Yes' | 'No' | ''; strengthLastUseReason?: string };
  hormonalIUCD: { status: 'Currently' | 'Yes' | 'No' | ''; strengthLastUseReason?: string };
  oralPills: { status: 'Currently' | 'Yes' | 'No' | ''; strengthLastUseReason?: string };
  injectables: { status: 'Currently' | 'Yes' | 'No' | ''; strengthLastUseReason?: string };
  implant: { status: 'Currently' | 'Yes' | 'No' | ''; strengthLastUseReason?: string };
  condom: { status: 'Currently' | 'Yes' | 'No' | ''; strengthLastUseReason?: string };
  sterilization: { status: 'Currently' | 'Yes' | 'No' | ''; strengthLastUseReason?: string };
  duration: string;
}

export interface RiskFactors {
  smoking: 'Yes' | 'No' | '';
  tobaccoChewing: 'Yes' | 'No' | '';
  alcohol: 'Yes' | 'No' | '';
  immunocompromised: 'Yes' | 'No' | '';
  organTransplant: 'Yes' | 'No' | '';
  longTermSteroids: 'Yes' | 'No' | '';
  previousPapSmear: 'Yes' | 'No' | '';
  previousHpvPositive: 'Yes' | 'No' | '';
  familyHistoryCervicalCancer: 'Yes' | 'No' | '';
}

export interface HpvVaccination {
  vaccinated: 'Yes' | 'No' | "Don't know" | '';
  numberOfDoses: '1' | '2' | '3' | '';
  type: 'Gardasil 4' | 'Gardasil 9' | 'Cervavac' | 'Cervarix' | 'Other' | '';
  ageAtVaccination?: string | number;
  notVaccinated?: boolean;
}

export interface PreviousScreening {
  papSmear: 'Yes' | 'No' | '';
  papDate?: string;
  papResult?: string;
  papHpvDna?: string;
  via: string;
  colposcopyLeepConeCryoLaser: string;
  biopsy: string;
}

export interface MedicalHistory {
  diabetes: boolean;
  hypertension: boolean;
  heartDisease: boolean;
  kidneyDisease: boolean;
  liverDisease: boolean;
  thyroidDisease: boolean;
  tb: boolean;
  tbDetails?: string; // lung / uterus / intestine / other
  autoimmuneDisease: boolean;
  bleedingDisorders: boolean;
}

export interface SurgicalHistory {
  previousLscs: boolean;
  hysterectomy: boolean;
  myomectomy: boolean;
  ovarianSurgery: boolean;
  otherPelvicSurgery: boolean;
  otherDetails?: string;
}

export interface FamilyHistory {
  cervicalCancer: boolean;
  breastCancer: boolean;
  ovarianCancer: boolean;
  colonCancer: boolean;
  endometrialCancer: boolean;
  otherCancers: boolean;
  otherDetails?: string;
}

export interface ExternalGenitaliaExam {
  normal: boolean;
  vulvalLesion: { present: boolean; locationSize?: string };
  ulcer: { present: boolean; locationSize?: string };
  warts: { present: boolean; locationSize?: string };
  swelling: { present: boolean; locationSize?: string };
  cyst: { present: boolean; locationSize?: string };
  atrophicChanges: boolean;
  other?: string;
}

export interface PerSpeculumExam {
  vaginalWalls: string; // Healthy, Atrophic, Inflamed, Ulcer, Growth, Prolapse, Bleeding, Other
  cervixVisibility: string; // Fully visualized, Partially visualized, Not visualized
  vaginalDischarge: string; // None, Physiological, White, Yellow, Green, Blood-stained, Purulent, Foul-smelling
  amountOfDischarge: string; // Scanty, Moderate, Copious
  cervixAppearance: string[]; // Healthy, Ectropion, Cervicitis, Nabothian cyst, Cervical polyp, Hypertrophied, Atrophic, Growth suspicious, Exophytic, Endophytic, Fungating, Necrotic, Leukoplakia, Ulcer, Friable, Contact bleeding, Acetowhite, Mosaic, Fine punctation, Coarse punctation, Atypical vessels, Bleeding from os, Suspicious invasive
  cervicalOs: string; // Closed, Open, Nulliparous, Multiparous
  cervicalMotionTenderness: 'Present' | 'Absent' | '';
  cervixPosition: 'Central' | 'Anterior' | 'Posterior' | '';
  consistency: 'Firm' | 'Soft' | '';
  mobility: 'Mobile' | 'Restricted' | 'Fixed' | '';
}

export interface PerVaginalExam {
  uterusSize: 'Normal' | 'Bulky' | 'Small' | 'Not appreciated' | '';
  mobility: 'Mobile' | 'Restricted' | 'Fixed' | '';
  consistency: 'Normal' | 'Firm' | 'Soft' | '';
  tenderness: 'Present' | 'Absent' | '';
  position: 'Anteverted' | 'Retroverted' | 'Midposition' | '';
  adnexaRight: 'Normal' | 'Tender' | 'Mass' | '';
  adnexaLeft: 'Normal' | 'Tender' | 'Mass' | '';
  pouchOfDouglas: { tender: boolean; fullness: boolean; nodularity: boolean };
  parametrium: 'Free' | 'Indurated' | 'Fixed' | '';
}

export interface Modalities {
  screeningTests: string[];
  diagnosticEvaluation: string[];
  treatmentProcedures: string[];
  referral: string[];
  medication: {
    antibiotics: boolean;
    antifungal: boolean;
    analgesics: boolean;
    other: string;
  };
  preventiveCare: {
    hpvVaccinationAdvised: boolean;
    smokingCessationCounselling: boolean;
    safeSexualPracticesCounselling: boolean;
  };
}

export interface LabReport {
  squamous: 'ASC-US' | 'ASC-H' | 'LSIL' | 'HSIL' | 'Squamous cell carcinoma' | 'Negative / NILM' | '';
  glandular: 'AGC' | 'AIS' | 'Adenocarcinoma' | 'Negative' | '';
  hpvResult: 'Negative' | 'Positive' | 'Not Done' | '';
  hpvGenotyping: 'HPV 16' | 'HPV 18' | 'HPV 16 & 18' | 'Other high-risk HPV' | 'Low-risk HPV only' | 'Negative / None' | '';
  viralLoad?: 'Low' | 'Moderate' | 'High' | '';
  organismsOnHVS: string[]; // Candida, Trichomonas, Bacterial vaginosis, Actinomyces, Herpes simplex
  benignChanges: string[]; // Inflammation, Atrophy, Reactive cellular changes, Radiation changes
}

export interface SwedeScore {
  acetowhitening: number; // 0, 1, 2
  marginsSurface: number; // 0, 1, 2
  vessels: number; // 0, 1, 2
  lesionSize: number; // 0, 1, 2
  iodineUptake: number; // 0, 1, 2
  totalScore: number;
  riskInterpretation: 'Low probability of HSIL (0-4)' | 'Moderate risk (5-7)' | 'High probability of HSIL / CIN 2/3 (8-10)';
}

export interface ColposcopyProtocol {
  indication: string[];
  indicationOther?: string;
  examinationStatus: 'Adequate' | 'Inadequate' | '';
  inadequateReason?: string;
  scj: 'Completely Visible' | 'Partially Visible' | 'Not Visible' | '';
  transformationZone: 'TZ1' | 'TZ2' | 'TZ3' | '';
  nativeCervix: string[];
  aceticAcid: {
    acetowhitening: 'None' | 'Faint' | 'Dense' | '';
    margin: 'Regular' | 'Irregular' | 'Sharp' | 'Feathered' | '';
  };
  lesionSize: '<25%' | '25–50%' | '>50%' | '';
  lesionLocationClock: string[];
  vascularPattern: string[];
  lugolsIodineSchiller: 'Positive Uptake' | 'Partial Uptake' | 'Negative Uptake' | 'Not Performed' | '';
  suspiciousFeatures: string[];
  impression: 'Normal' | 'Benign Changes' | 'Low-grade Lesion (LSIL)' | 'High-grade Lesion (HSIL)' | 'Glandular Lesion' | 'Suspicious for Invasive Cancer' | '';
  swedeScore: SwedeScore;
  biopsy: {
    taken: 'Yes' | 'No' | '';
    sites: string[];
    numberOfBiopsies: '1' | '2' | '3' | '4+' | '';
    endocervicalCurettage: 'Yes' | 'No' | '';
  };
  immediateManagement: string[];
  finalDiagnosis: string[];
  followUp: '6 Months' | '12 Months' | '3 Years' | '5 Years' | '';
  histopathologyResult: string[];
}

export interface ClinicalRecord {
  id: string;
  appointmentId?: string | null;
  patientDetails: PersonalDetails;
  chiefComplaints: string[];
  otherChiefComplaint?: string;
  redFlags: RedFlags;
  isRedFlagPositive: boolean;
  menstrualHistory: MenstrualHistory;
  obstetricHistory: ObstetricHistory;
  sexualHistory: SexualHistory;
  contraceptiveHistory: ContraceptiveHistory;
  riskFactors: RiskFactors;
  hpvVaccination: HpvVaccination;
  previousScreening: PreviousScreening;
  medicalHistory: MedicalHistory;
  surgicalHistory: SurgicalHistory;
  familyHistory: FamilyHistory;
  consentDigital: boolean;
  externalGenitalia: ExternalGenitaliaExam;
  perSpeculum: PerSpeculumExam;
  perVaginal: PerVaginalExam;
  modalities: Modalities;
  report: LabReport;
  management1: {
    followUpChoices: string[];
  };
  management2: {
    viaPerformed: 'Yes' | 'No' | '';
    viaResult: 'VIA Negative' | 'VIA Positive' | 'VIA Suspicious for Invasive Cancer' | 'VIA Inconclusive / Unsatisfactory' | '';
    acetowhiteLesion: 'Absent' | 'Thin acetowhite lesion' | 'Dense aceto-white lesion' | '';
    locationOfLesion: string[];
    transformationZone: 'TZ1 – Fully visible' | 'TZ2 – Partially endocervical but fully visible' | 'TZ3 – Not fully visible' | '';
    lesionSize: '<25% of the cervix' | '25–50%' | '>50%' | '';
    lesionCharacteristics: string[];
    autoRecommendation?: string;
  };
  management3: {
    ablativeEligibility: 'Eligible for Cryotherapy/Thermal Ablation' | 'Not eligible' | 'Requires colposcopy' | 'Requires biopsy' | '';
    recommendedNextSteps: string[];
    repeatViaYears?: string;
    nhsGuidanceSummary?: string;
  };
  management4: ColposcopyProtocol;
  management5: {
    punchBiopsyResult: string;
    punchBiopsyNotes?: string;
  };
  doctorNotes?: string;
  doctorName: string;
  createdAt: string;
}
