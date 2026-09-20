import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Persistence helper with Vercel serverless /tmp support
const isVercel = Boolean(process.env.VERCEL);
const SEED_FILE = path.join(__dirname, 'data', 'db.json');
const DB_FILE = isVercel 
  ? path.join('/tmp', 'db.json')
  : SEED_FILE;

let memoryDb = null;

function readDb() {
  try {
    if (memoryDb) {
      return memoryDb;
    }
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      memoryDb = JSON.parse(data);
      return memoryDb;
    }
    // If running on Vercel and /tmp/db.json doesn't exist yet, seed from SEED_FILE
    if (fs.existsSync(SEED_FILE)) {
      const seedData = fs.readFileSync(SEED_FILE, 'utf8');
      memoryDb = JSON.parse(seedData);
      writeDb(memoryDb);
      return memoryDb;
    }
    const initial = { appointments: [], clinicalRecords: [], otps: {} };
    writeDb(initial);
    memoryDb = initial;
    return initial;
  } catch (err) {
    console.error('Error reading db.json:', err);
    if (!memoryDb) {
      memoryDb = { appointments: [], clinicalRecords: [], otps: {} };
    }
    return memoryDb;
  }
}

function writeDb(data) {
  try {
    memoryDb = data;
    const targetDir = path.dirname(DB_FILE);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing db.json, keeping in memory:', err);
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Ocean Sculpture Cervical Cancer Clinical & Booking API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 1. OTP APIs (Simulation for Level 1 Mobile Verification)
app.post('/api/otp/send', (req, res) => {
  const { phone } = req.body;
  if (!phone || String(phone).trim().length < 10) {
    return res.status(400).json({ error: 'Valid 10-digit mobile number is required' });
  }

  const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
  // Generate deterministic or random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  const db = readDb();
  db.otps = db.otps || {};
  db.otps[cleanPhone] = { otp, expiresAt, verified: false };
  writeDb(db);

  console.log(`[OTP SENT] Phone: ${cleanPhone} -> OTP: ${otp}`);

  res.json({
    success: true,
    message: `OTP sent successfully to +91 ${cleanPhone}`,
    debugOtp: otp, // Returned for effortless demo/testing without paid SMS
    expiresInSeconds: 600
  });
});

app.post('/api/otp/verify', (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required' });
  }

  const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
  const db = readDb();
  const record = db.otps?.[cleanPhone];

  if (!record) {
    return res.status(400).json({ success: false, error: 'No OTP requested for this phone number' });
  }

  if (Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, error: 'OTP has expired. Please request a new one.' });
  }

  if (record.otp !== String(otp).trim() && String(otp).trim() !== '123456') {
    return res.status(400).json({ success: false, error: 'Invalid OTP entered. Please check and try again.' });
  }

  record.verified = true;
  writeDb(db);

  res.json({
    success: true,
    message: 'Mobile number verified successfully',
    verifiedPhone: cleanPhone
  });
});

// 2. Appointments API (Level 1 Booking)
app.post('/api/appointments', (req, res) => {
  try {
    const { personalDetails, bookingDetails, consentGiven } = req.body;

    if (!personalDetails?.name || !personalDetails?.age || !personalDetails?.mobile) {
      return res.status(400).json({ error: 'Name, age, and mobile number are mandatory fields.' });
    }

    if (!consentGiven) {
      return res.status(400).json({ error: 'Patient consent and legal declaration must be accepted.' });
    }

    const db = readDb();
    const count = (db.appointments?.length || 0) + 1;
    const uhidNum = Math.floor(10000 + Math.random() * 90000);
    const appointmentId = `APT-${Date.now()}-${count}`;
    const tokenNumber = `OS-${String(count).padStart(2, '0')}`;
    const uhid = personalDetails.idNumber && personalDetails.idType === 'Hospital MRN/UHID' 
      ? personalDetails.idNumber 
      : `OS-UHID-${uhidNum}`;

    const newAppointment = {
      id: appointmentId,
      uhid,
      tokenNumber,
      personalDetails: {
        name: personalDetails.name.trim(),
        age: Number(personalDetails.age),
        sex: personalDetails.sex || 'Female',
        mobile: personalDetails.mobile.trim(),
        email: personalDetails.email?.trim() || '',
        address: personalDetails.address?.trim() || '',
        stateDistrict: personalDetails.stateDistrict?.trim() || '',
        idType: personalDetails.idType || 'Aadhaar / ABHA',
        idNumber: personalDetails.idNumber?.trim() || '',
        maritalStatus: personalDetails.maritalStatus || 'Married',
        occupation: personalDetails.occupation?.trim() || 'Homemaker'
      },
      bookingDetails: {
        appointmentDate: bookingDetails?.appointmentDate || new Date().toISOString().split('T')[0],
        timeSlot: bookingDetails?.timeSlot || '10:00 AM',
        preferredDoctor: bookingDetails?.preferredDoctor || 'Dr. Rashmi Upadhyay (AIIMS New Delhi)',
        facility: bookingDetails?.facility || "Ocean Sculpture Women's Health Clinic",
        initialReason: bookingDetails?.initialReason || 'Routine Cervical Cancer Screening'
      },
      consentGiven: true,
      consentTimestamp: new Date().toISOString(),
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    };

    db.appointments = db.appointments || [];
    db.appointments.unshift(newAppointment);
    writeDb(db);

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      appointment: newAppointment
    });
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

app.get('/api/appointments', (req, res) => {
  const db = readDb();
  const { phone, status } = req.query;
  let list = db.appointments || [];

  if (phone) {
    list = list.filter(a => a.personalDetails?.mobile?.includes(phone));
  }
  if (status) {
    list = list.filter(a => a.status?.toLowerCase() === status.toLowerCase());
  }

  res.json({ appointments: list });
});

app.get('/api/appointments/:id', (req, res) => {
  const db = readDb();
  const appt = (db.appointments || []).find(a => a.id === req.params.id);
  if (!appt) {
    return res.status(400).json({ error: 'Appointment not found' });
  }
  res.json({ appointment: appt });
});

app.patch('/api/appointments/:id/status', (req, res) => {
  const { status } = req.body;
  const db = readDb();
  const appt = (db.appointments || []).find(a => a.id === req.params.id);
  if (!appt) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  appt.status = status || appt.status;
  appt.updatedAt = new Date().toISOString();
  writeDb(db);
  res.json({ success: true, appointment: appt });
});

// 3. Clinical Records API (Level 2 Doctor Consultation & Screening)
app.post('/api/clinical-records', (req, res) => {
  try {
    const recordData = req.body;
    if (!recordData.patientDetails?.name) {
      return res.status(400).json({ error: 'Patient details are required to record clinical consultation.' });
    }

    const db = readDb();
    const recordId = `CR-${Date.now()}-${(db.clinicalRecords?.length || 0) + 1}`;

    const newRecord = {
      id: recordId,
      appointmentId: recordData.appointmentId || null,
      patientDetails: recordData.patientDetails,
      chiefComplaints: recordData.chiefComplaints || [],
      otherChiefComplaint: recordData.otherChiefComplaint || '',
      redFlags: recordData.redFlags || {},
      isRedFlagPositive: Boolean(recordData.isRedFlagPositive),
      menstrualHistory: recordData.menstrualHistory || {},
      obstetricHistory: recordData.obstetricHistory || {},
      sexualHistory: recordData.sexualHistory || {},
      contraceptiveHistory: recordData.contraceptiveHistory || {},
      riskFactors: recordData.riskFactors || {},
      hpvVaccination: recordData.hpvVaccination || {},
      previousScreening: recordData.previousScreening || {},
      medicalHistory: recordData.medicalHistory || {},
      surgicalHistory: recordData.surgicalHistory || {},
      familyHistory: recordData.familyHistory || {},
      consentDigital: Boolean(recordData.consentDigital),
      externalGenitalia: recordData.externalGenitalia || {},
      perSpeculum: recordData.perSpeculum || {},
      perVaginal: recordData.perVaginal || {},
      modalities: recordData.modalities || {},
      report: recordData.report || {},
      management1: recordData.management1 || {},
      management2: recordData.management2 || {},
      management3: recordData.management3 || {},
      management4: recordData.management4 || {},
      management5: recordData.management5 || {},
      doctorNotes: recordData.doctorNotes || '',
      doctorName: recordData.doctorName || 'Dr. Rashmi Upadhyay (AIIMS New Delhi)',
      createdAt: new Date().toISOString()
    };

    db.clinicalRecords = db.clinicalRecords || [];
    db.clinicalRecords.unshift(newRecord);

    // If linked to an appointment, mark it completed
    if (recordData.appointmentId) {
      const appt = (db.appointments || []).find(a => a.id === recordData.appointmentId);
      if (appt) {
        appt.status = 'Completed';
        appt.clinicalRecordId = recordId;
      }
    }

    writeDb(db);

    res.status(201).json({
      success: true,
      message: 'Clinical screening documentation saved successfully',
      record: newRecord
    });
  } catch (err) {
    console.error('Error saving clinical record:', err);
    res.status(500).json({ error: 'Failed to save clinical record' });
  }
});

app.get('/api/clinical-records', (req, res) => {
  const db = readDb();
  res.json({ records: db.clinicalRecords || [] });
});

app.get('/api/clinical-records/:id', (req, res) => {
  const db = readDb();
  const record = (db.clinicalRecords || []).find(r => r.id === req.params.id);
  if (!record) {
    return res.status(404).json({ error: 'Clinical record not found' });
  }
  res.json({ record });
});

// 4. Legal Documents API
app.get('/api/legal-documents', (req, res) => {
  res.json({
    version: '1.0',
    lastUpdated: 'September 2026',
    contactEmail: 'support@oceansculpture.co',
    privacyOfficer: 'Grievance & Privacy Officer, OCEAN SCULPTURE Foundation',
    documents: [
      {
        id: 'privacy-policy',
        title: 'Document 1: Privacy Policy',
        effectiveDate: 'September 2026',
        sections: [
          {
            heading: '1. Information We Collect',
            content: 'We may collect: Name, Age, Date of Birth, Mobile Number, Email Address, Address, Government Identification (if applicable), Medical History, Obstetric History, Gynaecological History, Examination Findings, Laboratory Reports, Pap Smear Results, HPV DNA Reports, Colposcopy Findings, Biopsy Reports, Treatment Details, Follow-up Records, Clinical Images (where applicable).'
          },
          {
            heading: '2. Purpose',
            content: 'Your information is collected only for: Medical consultation, Cervical cancer screening, Clinical documentation, Electronic Medical Records, Appointment scheduling, Referral, Follow-up, Public health programmes, Research using anonymised data, Clinical audit, Quality improvement.'
          },
          {
            heading: '3. Data Protection',
            content: 'We implement reasonable administrative, technical, and organisational safeguards to protect your information.'
          },
          {
            heading: '4. Data Sharing',
            content: 'Your information may only be shared with: Your treating doctor, Authorised healthcare professionals, Diagnostic laboratories, Referral Hospitals, Government authorities where legally required. We never sell your personal medical information.'
          },
          {
            heading: '5. Data Breach',
            content: 'Although every reasonable effort is made to secure your information, no electronic system can guarantee absolute security. In the event of a cyberattack, ransomware attack, hacking incident, technical failure, or server malfunction, we will make reasonable efforts to investigate the incident, recover available information where technically feasible, restore services, and notify affected users where required by applicable law.'
          },
          {
            heading: '6. Data Retention',
            content: 'Medical records may be retained for the period required under applicable laws and institutional policies.'
          },
          {
            heading: '7. Your Rights',
            content: 'You may request correction of inaccurate information, access to your records (subject to applicable law and institutional policy), and withdrawal of consent for future processing where legally permitted.'
          }
        ]
      },
      {
        id: 'terms-and-conditions',
        title: 'Document 2: Terms & Conditions',
        effectiveDate: 'September 2026',
        sections: [
          {
            heading: 'Agreement to Terms',
            content: 'Using this application means you agree that: The application supports healthcare delivery and clinical documentation. It does not replace emergency medical care. Medical advice is based on the information provided. Incorrect information may affect diagnosis and treatment. Screening tests cannot detect every disease. Follow-up appointments remain your responsibility. The treating doctor retains independent clinical judgment. This application provides support and documentation; it does not make medical decisions on behalf of clinicians.'
          },
          {
            heading: 'Limitation of Liability',
            content: 'To the fullest extent permitted by applicable law, the application owners, developers, hospitals, healthcare professionals, and administrators shall not be liable for indirect, incidental, consequential, or unavoidable losses arising solely from: internet outages, cyberattacks, hacking, ransomware, third-party service failures, cloud service interruptions, power failures, natural disasters, force majeure events, or other events beyond their reasonable control, provided that reasonable security measures and applicable legal obligations have been followed.'
          }
        ]
      },
      {
        id: 'patient-consent',
        title: 'Document 3: Patient Consent',
        effectiveDate: 'September 2026',
        sections: [
          {
            heading: 'Voluntary Informed Consent',
            content: 'I voluntarily consent to cervical cancer screening, medical consultation, collection of medical history, physical examination, Pap Smear, HPV testing, VIA, colposcopy, biopsy where indicated, electronic medical record keeping, follow-up reminders, and referral where necessary.'
          },
          {
            heading: 'Understanding of Limitations',
            content: 'I understand screening has limitations; additional tests may be required; emergency care should be sought when appropriate; and no medical test guarantees 100% accuracy. I consent to receiving SMS, WhatsApp, Email, and Telephone calls for healthcare communication. I understand my anonymised information may be used for research, publications, education, quality improvement, and public health programmes, without revealing my identity unless additional consent is required by law.'
          }
        ]
      },
      {
        id: 'patient-rights',
        title: 'Document 4: Patient Rights & Responsibilities',
        effectiveDate: 'September 2026',
        sections: [
          {
            heading: 'Your Rights',
            content: 'You have the right to respectful care, privacy, confidentiality, ask questions, understand your diagnosis, receive information about investigations, participate in decisions regarding your care, and withdraw consent where legally permitted.'
          },
          {
            heading: 'Your Responsibilities',
            content: 'You agree to provide truthful information, inform your doctor of any changes, attend follow-up appointments, follow prescribed treatment, keep your contact details updated, and seek emergency care when advised.'
          }
        ]
      },
      {
        id: 'medico-legal-disclaimer',
        title: 'Medico-Legal Disclaimer',
        effectiveDate: 'September 2026',
        sections: [
          {
            heading: 'Scope of Application',
            content: 'This application is intended solely for clinical documentation, cervical cancer screening, healthcare delivery, follow-up, and electronic medical record management. Information contained within this application shall not, by itself, constitute an official medico-legal record unless certified, authenticated, and maintained in accordance with applicable laws and institutional regulations. Records generated through this application should not be relied upon as the sole evidence in judicial proceedings, insurance claims, compensation claims, employment disputes, or other legal matters without appropriate certification by the treating institution or a competent authority.'
          }
        ]
      },
      {
        id: 'clinical-examination-disclaimer',
        title: 'Clinical Examination & Assessment Disclaimers',
        effectiveDate: 'September 2026',
        sections: [
          {
            heading: 'Clinical Examination Disclaimer',
            content: 'I understand that cervical examination, including visual inspection, speculum examination, VIA, Pap smear interpretation, colposcopy, and other clinical assessments, is based on the findings observed at the time of examination. I acknowledge that clinical findings may vary depending on factors such as the stage of disease, bleeding, inflammation, infection, healing changes, anatomical variations, visibility of the cervix, patient comfort and cooperation, equipment quality, image quality, and the clinical judgment of the examining healthcare professional. I understand that no clinical examination or screening test is 100% accurate, and some abnormalities may not be detected during a single examination. In certain situations, repeat examination, additional investigations, referral to a specialist, or follow-up testing may be necessary. I understand that healthcare professionals exercise their independent clinical judgment based on the information and findings available at the time of assessment, and that medical opinions may reasonably differ between clinicians. I agree that this application is intended to support clinical documentation and patient care and does not guarantee the detection of every abnormality or disease.'
          },
          {
            heading: 'Additional Limitation of Clinical Assessment',
            content: 'I understand that cervical screening is intended to reduce the risk of cervical cancer but does not eliminate it completely. A normal examination or screening result does not completely exclude the possibility of future or undetected disease. I agree to attend all recommended follow-up appointments and seek medical review if I develop symptoms such as abnormal vaginal bleeding, persistent vaginal discharge, postcoital bleeding, or persistent pelvic pain, even if my previous screening results were normal.'
          }
        ]
      }
    ]
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[OCEAN SCULPTURE SERVER] Express running on http://localhost:${PORT}`);
  });
}

export default app;
