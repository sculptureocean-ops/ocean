// Legal Documents, Patient Consent, and Medico-Legal Disclaimers
// OCEAN SCULPTURE Cervical Cancer Screening & Clinical Documentation Portal

export interface LegalSection {
  heading: string;
  content: string;
  bullets?: string[];
}

export interface LegalDocument {
  id: string;
  title: string;
  subtitle?: string;
  sections: LegalSection[];
}

export const LEGAL_DECLARATION_PREFACE = {
  title: "APP REGISTRATION SCREEN",
  heading: "Patient Declaration",
  subtext: "Please read the following documents carefully before using this application. By selecting \"I Agree\", you confirm that you have read, understood, and accepted all the documents listed below.",
  documentsList: [
    "📄 Privacy Policy",
    "📄 Terms & Conditions",
    "📄 Patient Consent",
    "📄 Patient Rights & Responsibilities"
  ],
  singleCheckboxText: "I have read, understood, and voluntarily agree to the Privacy Policy, Terms & Conditions, Patient Consent, and Patient Rights & Responsibilities. I consent to the collection, storage, retrieval, processing, and use of my personal and medical information for healthcare services, cervical cancer screening, follow-up care, electronic medical records, research using anonymised data where permitted by law, and related healthcare purposes.",
  footer: {
    version: "1.0",
    lastUpdated: "September 2026",
    contactEmail: "support@yourapp.com",
    privacyOfficer: "Privacy & Grievance Officer, OCEAN SCULPTURE Initiative"
  }
};

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: "privacy-policy",
    title: "DOCUMENT 1: PRIVACY POLICY",
    subtitle: "Cervical Cancer Screening Application",
    sections: [
      {
        heading: "1. Information We Collect",
        content: "We may collect:",
        bullets: [
          "Name", "Age", "Date of Birth", "Mobile Number", "Email Address", "Address",
          "Government Identification (Aadhaar / ABHA / PMJY / MRN / UHID)",
          "Medical History", "Obstetric History", "Gynaecological & Menstrual History", "Sexual History (Sensitive)",
          "Examination Findings", "Laboratory Reports", "Pap Smear Results", "HPV DNA Reports",
          "Colposcopy Findings", "Biopsy Reports", "Treatment Details", "Follow-up Records",
          "Clinical Images (where applicable)"
        ]
      },
      {
        heading: "2. Purpose",
        content: "Your information is collected only for:",
        bullets: [
          "Medical consultation",
          "Cervical cancer screening",
          "Clinical documentation",
          "Electronic Medical Records (EMR)",
          "Appointment scheduling",
          "Referral to specialized oncology centers",
          "Follow-up care and screening reminders",
          "Public health programmes",
          "Research using anonymised data where permitted by law",
          "Clinical audit and quality improvement"
        ]
      },
      {
        heading: "3. Data Protection",
        content: "We implement reasonable administrative, technical, and organisational safeguards to protect your personal and medical information against unauthorised access, alteration, or disclosure."
      },
      {
        heading: "4. Data Sharing",
        content: "Your information may only be shared with:",
        bullets: [
          "Your treating doctor and healthcare team",
          "Authorised healthcare professionals involved in your care",
          "Diagnostic laboratories evaluating your specimens",
          "Referral Hospitals & Gynaecologic Oncology Centers",
          "Government authorities where legally required by applicable statutes"
        ]
      },
      {
        heading: "Data Protection Guarantee",
        content: "We never sell your personal medical information to any third party, marketing agency, or advertiser."
      },
      {
        heading: "5. Data Breach",
        content: "Although every reasonable effort is made to secure your information, no electronic system can guarantee absolute security. In the event of a cyberattack, ransomware attack, hacking incident, technical failure, or server malfunction, we will make reasonable efforts to:",
        bullets: [
          "Investigate the incident thoroughly,",
          "Recover available information where technically feasible,",
          "Restore services with enhanced protective protocols, and",
          "Notify affected users where required by applicable law."
        ]
      },
      {
        heading: "6. Data Retention",
        content: "Medical records may be retained for the period required under applicable healthcare laws, medical council guidelines, and institutional policies."
      },
      {
        heading: "7. Your Rights",
        content: "You may request correction of inaccurate information, access to your records (subject to applicable law and institutional policy), and withdrawal of consent for future processing where legally permitted."
      }
    ]
  },
  {
    id: "terms-and-conditions",
    title: "DOCUMENT 2: TERMS & CONDITIONS",
    subtitle: "Healthcare Delivery & Documentation System",
    sections: [
      {
        heading: "Terms of Use",
        content: "Using this application means you agree that:",
        bullets: [
          "The application supports healthcare delivery and clinical documentation.",
          "It does not replace emergency medical care.",
          "Medical advice is based on the information provided by the patient.",
          "Incorrect or omitted information may adversely affect diagnosis and treatment.",
          "Screening tests cannot detect every disease or abnormal condition.",
          "Follow-up appointments remain your responsibility as a patient.",
          "The treating doctor retains independent clinical judgment at all times.",
          "This application provides clinical documentation support; it does not make automated medical decisions on behalf of clinicians."
        ]
      },
      {
        heading: "Limitation of Liability",
        content: "To the fullest extent permitted by applicable law, the application owners, developers, hospitals, healthcare professionals, and administrators shall not be liable for indirect, incidental, consequential, or unavoidable losses arising solely from:",
        bullets: [
          "Internet outages or telecommunication network disruptions,",
          "Cyberattacks, hacking, ransomware, or malicious intrusions,",
          "Third-party service failures or cloud service interruptions,",
          "Power failures, natural disasters, or force majeure events,",
          "Or other events beyond their reasonable control, provided that reasonable security measures and applicable legal obligations have been followed."
        ]
      }
    ]
  },
  {
    id: "patient-consent",
    title: "DOCUMENT 3: PATIENT CONSENT",
    subtitle: "Informed Consent for Cervical Cancer Screening",
    sections: [
      {
        heading: "Informed Voluntary Consent",
        content: "I voluntarily consent to:",
        bullets: [
          "Cervical cancer screening and medical consultation",
          "Collection of complete medical, obstetric, and gynaecological history",
          "Physical examination, including external genitalia and per speculum examination",
          "Pap Smear / Liquid-Based Cytology (LBC)",
          "HPV DNA testing",
          "Visual Inspection with Acetic Acid (VIA) and Lugol's Iodine (VILI)",
          "Colposcopy and cervical punch biopsy where clinically indicated",
          "Electronic medical record keeping",
          "Follow-up reminders and notifications",
          "Referral to specialist gynaecologic oncologists where necessary"
        ]
      },
      {
        heading: "Acknowledgement of Screening Limitations",
        content: "I understand that:",
        bullets: [
          "Screening tests have known biological and technical limitations;",
          "Additional tests or repeat testing may be required;",
          "Emergency medical care should be sought immediately if severe symptoms develop; and",
          "No medical screening test guarantees 100% diagnostic accuracy."
        ]
      },
      {
        heading: "Communication Consent",
        content: "I consent to receiving appointment updates, reminders, test reports, and healthcare communication via SMS, WhatsApp, Email, and Telephone calls."
      },
      {
        heading: "Anonymised Data for Research",
        content: "I understand my anonymised information may be used for scientific research, clinical publications, medical education, quality improvement, and public health programmes, without revealing my identity unless additional consent is required by law."
      }
    ]
  },
  {
    id: "patient-rights",
    title: "DOCUMENT 4: PATIENT RIGHTS & RESPONSIBILITIES",
    subtitle: "Charter of Patient Care",
    sections: [
      {
        heading: "Your Rights",
        content: "As a patient, you have the right to:",
        bullets: [
          "Respectful, dignified, and compassionate care",
          "Privacy during physical examination and medical consultation",
          "Confidentiality of all health records and personal disclosures",
          "Ask questions about your health, procedures, and risks",
          "Understand your diagnosis and screening results in clear language",
          "Receive full information about investigations and recommended treatments",
          "Participate actively in decisions regarding your clinical care",
          "Withdraw consent for procedures where legally permitted"
        ]
      },
      {
        heading: "Your Responsibilities",
        content: "You agree to:",
        bullets: [
          "Provide truthful and complete medical and menstrual history",
          "Inform your doctor of any symptom changes or adverse reactions",
          "Attend recommended follow-up appointments and screenings",
          "Follow prescribed treatment and medications accurately",
          "Keep your contact details updated with the clinic",
          "Seek emergency medical care promptly when advised or if warning signs appear"
        ]
      }
    ]
  },
  {
    id: "medico-legal-disclaimer",
    title: "MEDICO-LEGAL DISCLAIMER",
    subtitle: "Official Legal Notice on Record Validity",
    sections: [
      {
        heading: "Scope of Application",
        content: "This application is intended solely for clinical documentation, cervical cancer screening, healthcare delivery, follow-up, and electronic medical record management.",
        bullets: [
          "Information contained within this application shall not, by itself, constitute an official medico-legal record unless certified, authenticated, and maintained in accordance with applicable laws and institutional regulations.",
          "Records generated through this application should not be relied upon as the sole evidence in judicial proceedings, insurance claims, compensation claims, employment disputes, or other legal matters without appropriate certification by the treating institution or a competent authority."
        ]
      }
    ]
  },
  {
    id: "clinical-examination-disclaimer",
    title: "CLINICAL EXAMINATION & ASSESSMENT DISCLAIMERS",
    subtitle: "Clinical Examination Limitations & Care Notes",
    sections: [
      {
        heading: "Clinical Examination Disclaimer",
        content: "I understand that cervical examination, including visual inspection, speculum examination, VIA, Pap smear interpretation, colposcopy, and other clinical assessments, is based on the findings observed at the time of examination.",
        bullets: [
          "I acknowledge that clinical findings may vary depending on factors such as the stage of disease, bleeding, inflammation, infection, healing changes, anatomical variations, visibility of the cervix, patient comfort and cooperation, equipment quality, image quality, and the clinical judgment of the examining healthcare professional.",
          "I understand that no clinical examination or screening test is 100% accurate, and some abnormalities may not be detected during a single examination.",
          "In certain situations, repeat examination, additional investigations, referral to a specialist, or follow-up testing may be necessary.",
          "I understand that healthcare professionals exercise their independent clinical judgment based on the information and findings available at the time of assessment, and that medical opinions may reasonably differ between clinicians.",
          "I agree that this application is intended to support clinical documentation and patient care and does not guarantee the detection of every abnormality or disease."
        ]
      },
      {
        heading: "Additional Limitation of Clinical Assessment",
        content: "I understand that cervical screening is intended to reduce the risk of cervical cancer but does not eliminate it completely. A normal examination or screening result does not completely exclude the possibility of future or undetected disease.",
        bullets: [
          "I agree to attend all recommended follow-up appointments and seek medical review if I develop symptoms such as abnormal vaginal bleeding, persistent vaginal discharge, postcoital bleeding, or persistent pelvic pain, even if my previous screening results were normal."
        ]
      }
    ]
  }
];
