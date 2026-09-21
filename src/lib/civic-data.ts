export type ServiceCategory =
  | "Certificates"
  | "Social Welfare"
  | "Identity"
  | "Food & Supplies"
  | "Revenue";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  department: string;
  summary: string;
  description: string;
  eligibility: string[];
  documents: string[];
  steps: string[];
  processingTime: string;
  fee: string;
  mode: string;
  states: string[];
  officialSource: { label: string; url: string };
  applyUrl: string;
  keywords: string[];
  popular?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: "birth-certificate",
    name: "Birth Certificate Registration",
    shortName: "Birth Certificate",
    category: "Certificates",
    department: "Municipal Corporation / Registrar of Births & Deaths",
    summary:
      "Register a birth and obtain the official birth certificate used for school admission, passport and identity proof.",
    description:
      "A birth certificate is the primary legal record of a person's date and place of birth. It is issued by the local Registrar of Births and Deaths under the Registration of Births and Deaths Act, 1969. Registration is free if done within 21 days of the birth; late registration requires additional approval.",
    eligibility: [
      "The birth must have occurred within the jurisdiction of the registering authority",
      "Application may be filed by a parent, guardian or the hospital where the birth took place",
      "For applicants above 1 year of age, an order from the competent authority is required",
    ],
    documents: [
      "Hospital discharge summary or birth proof letter",
      "Parents' Aadhaar cards",
      "Parents' marriage certificate (where available)",
      "Address proof of the parents (electricity bill, rent agreement)",
      "Affidavit for late registration (if applicable)",
    ],
    steps: [
      "Collect the birth report from the hospital or fill Form 1 at the registrar office",
      "Submit the form online on the state civil registration portal or at the nearest citizen service centre",
      "Pay the applicable registration or late-fee amount",
      "Verification by the registrar (hospital record cross-check)",
      "Download the digitally signed certificate or collect it from the centre",
    ],
    processingTime: "5–15 working days",
    fee: "Free within 21 days; ₹20–₹100 for late registration",
    mode: "Online and at citizen service centres",
    states: ["All India", "Telangana", "Maharashtra", "Delhi", "Karnataka"],
    officialSource: {
      label: "Civil Registration System, Govt. of India",
      url: "https://crsorgi.gov.in/",
    },
    applyUrl: "https://crsorgi.gov.in/",
    keywords: [
      "birth",
      "certificate",
      "newborn",
      "baby",
      "child",
      "janam",
      "registration",
      "school admission",
    ],
    popular: true,
  },
  {
    slug: "income-certificate",
    name: "Income Certificate",
    shortName: "Income Certificate",
    category: "Revenue",
    department: "Revenue Department / Tahsildar Office",
    summary:
      "Official proof of annual family income, required for scholarships, fee reimbursement and welfare schemes.",
    description:
      "An income certificate certifies the annual income of a family from all sources. It is issued by the Tahsildar or Revenue Divisional Officer after field verification by the village or ward revenue officer, and is typically valid for one year.",
    eligibility: [
      "Applicant must be a resident of the state where the application is made",
      "Income details must cover all earning members of the family",
      "One valid certificate per family per financial year",
    ],
    documents: [
      "Aadhaar card of the applicant",
      "Ration card or family member details",
      "Salary slip / Form 16 / self-declaration of income",
      "Address proof",
      "Passport-size photograph",
    ],
    steps: [
      "Register on the state citizen services portal",
      "Fill the income certificate application and upload documents",
      "Pay the nominal service charge and note the application number",
      "Field verification by the Village Revenue Officer",
      "Download the digitally signed certificate once approved",
    ],
    processingTime: "7–15 working days",
    fee: "₹10–₹45 service charge",
    mode: "Online and at citizen service centres",
    states: ["Telangana", "Andhra Pradesh", "Karnataka", "Maharashtra", "Tamil Nadu"],
    officialSource: { label: "MeeSeva / State Revenue Department", url: "https://ts.meeseva.telangana.gov.in/" },
    applyUrl: "https://ts.meeseva.telangana.gov.in/",
    keywords: [
      "income",
      "salary",
      "certificate",
      "scholarship",
      "fee reimbursement",
      "ews",
      "annual income",
    ],
    popular: true,
  },
  {
    slug: "caste-certificate",
    name: "Caste / Community Certificate",
    shortName: "Caste Certificate",
    category: "Certificates",
    department: "Revenue Department / Tahsildar Office",
    summary:
      "Certificate confirming SC, ST, OBC or BC community status for reservation benefits in education and employment.",
    description:
      "A community (caste) certificate is issued by the Tahsildar after verification of family records. It is required to claim reservation in government jobs, educational institutions and several welfare schemes.",
    eligibility: [
      "Applicant must belong to a notified SC, ST, BC or OBC community of the state",
      "Family must be a permanent resident of the state",
      "Supporting record of caste for the father or a blood relative is required",
    ],
    documents: [
      "Aadhaar card",
      "Ration card",
      "Caste certificate of father or blood relative (if available)",
      "School transfer certificate mentioning caste",
      "Residence proof",
      "Passport-size photograph",
    ],
    steps: [
      "Apply online on the state citizen services portal or at a service centre",
      "Upload the supporting caste and residence records",
      "Pay the prescribed service charge",
      "Enquiry and verification by the revenue officer",
      "Collect or download the signed community certificate",
    ],
    processingTime: "15–30 working days",
    fee: "₹10–₹45 service charge",
    mode: "Online and at citizen service centres",
    states: ["Telangana", "Andhra Pradesh", "Karnataka", "Maharashtra", "Tamil Nadu"],
    officialSource: { label: "MeeSeva / State Revenue Department", url: "https://ts.meeseva.telangana.gov.in/" },
    applyUrl: "https://ts.meeseva.telangana.gov.in/",
    keywords: [
      "caste",
      "community",
      "sc",
      "st",
      "obc",
      "bc",
      "reservation",
      "certificate",
      "jaati",
    ],
    popular: true,
  },
  {
    slug: "old-age-pension",
    name: "Old Age & Social Security Pension",
    shortName: "Pension Services",
    category: "Social Welfare",
    department: "Department of Rural Development / Social Welfare",
    summary:
      "Monthly pension for senior citizens, widows, persons with disability and other eligible vulnerable groups.",
    description:
      "Social security pension schemes provide a monthly financial benefit credited directly to the beneficiary's bank account. Categories include old age pension, widow pension, disability pension and single-woman pension. Eligibility limits differ across states.",
    eligibility: [
      "Old age pension: applicant aged 60 years and above (55+ in some states)",
      "Widow pension: widow aged 18 years and above",
      "Disability pension: 40% or more certified disability",
      "Family must be below the state's poverty/income threshold",
      "Applicant must not be receiving any other government pension",
    ],
    documents: [
      "Aadhaar card",
      "Age proof (Aadhaar, birth certificate or school record)",
      "Bank passbook with account linked to Aadhaar",
      "Income certificate or white ration card",
      "Disability certificate / death certificate of spouse, as applicable",
    ],
    steps: [
      "Fill the pension application at the panchayat, municipal ward office or online portal",
      "Attach category proof and bank account details",
      "Verification by the field officer and gram panchayat approval",
      "Sanction order issued by the district authority",
      "Pension credited monthly to the linked bank account",
    ],
    processingTime: "30–60 days for sanction",
    fee: "No application fee",
    mode: "Panchayat / ward office and online",
    states: ["All India", "Telangana", "Andhra Pradesh", "Karnataka", "Delhi"],
    officialSource: {
      label: "National Social Assistance Programme (NSAP)",
      url: "https://nsap.nic.in/",
    },
    applyUrl: "https://nsap.nic.in/",
    keywords: [
      "pension",
      "old age",
      "senior citizen",
      "widow",
      "disability",
      "monthly",
      "vridha",
      "social security",
    ],
    popular: true,
  },
  {
    slug: "aadhaar-services",
    name: "Aadhaar Enrolment & Update",
    shortName: "Aadhaar Services",
    category: "Identity",
    department: "Unique Identification Authority of India (UIDAI)",
    summary:
      "Enrol for a new Aadhaar or update name, address, date of birth, mobile number and biometrics.",
    description:
      "Aadhaar is the 12-digit unique identity number issued by UIDAI. Enrolment is free for first-time applicants. Demographic and biometric updates can be done at any authorised Aadhaar Seva Kendra; address updates can also be completed online.",
    eligibility: [
      "Any resident of India, including infants and children",
      "Children below 5 years enrol with a parent's Aadhaar (biometrics updated at 5 and 15 years)",
      "Update requests require valid supporting documents for the field being changed",
    ],
    documents: [
      "Proof of identity (PAN, passport, voter ID)",
      "Proof of address (electricity bill, rent agreement, bank passbook)",
      "Proof of date of birth (birth certificate, school certificate)",
      "Existing Aadhaar number for updates",
    ],
    steps: [
      "Book an appointment at an Aadhaar Seva Kendra or visit a centre directly",
      "Submit the enrolment or update form with documents",
      "Provide biometrics (fingerprints, iris, photograph)",
      "Collect the acknowledgement slip with URN / EID",
      "Check status online and download the e-Aadhaar once processed",
    ],
    processingTime: "Up to 30 days for updates",
    fee: "Free for first enrolment; ₹50–₹100 for updates",
    mode: "Aadhaar Seva Kendras and online self-service",
    states: ["All India"],
    officialSource: { label: "UIDAI", url: "https://uidai.gov.in/" },
    applyUrl: "https://myaadhaar.uidai.gov.in/",
    keywords: [
      "aadhaar",
      "uidai",
      "address change",
      "mobile link",
      "biometric",
      "identity",
      "update",
      "enrolment",
    ],
    popular: true,
  },
  {
    slug: "ration-card",
    name: "Ration Card (Public Distribution System)",
    shortName: "Ration Card",
    category: "Food & Supplies",
    department: "Department of Civil Supplies / Food & Public Distribution",
    summary:
      "Apply for a new ration card, add or remove members, or request subsidised food grain entitlements.",
    description:
      "A ration card gives a household access to subsidised food grains under the National Food Security Act. It also serves widely as proof of residence and family composition. Cards are categorised as Antyodaya (AAY), Priority Household (PHH) or Non-priority.",
    eligibility: [
      "Applicant must be a permanent resident of the state",
      "Household must not already hold a valid ration card",
      "Annual family income must be within the state's prescribed ceiling for subsidised categories",
    ],
    documents: [
      "Aadhaar cards of all family members",
      "Proof of residence",
      "Cancelled ration card / surrender certificate from the previous state, if any",
      "Income certificate",
      "Family group photograph",
    ],
    steps: [
      "Apply online on the state civil supplies portal or at a service centre",
      "Enter family member details with Aadhaar seeding",
      "Field verification by the civil supplies inspector",
      "Approval and card generation",
      "Download the e-ration card or collect it from the fair price shop",
    ],
    processingTime: "15–30 working days",
    fee: "₹5–₹50 depending on the state",
    mode: "Online and at civil supplies offices",
    states: ["All India", "Telangana", "Uttar Pradesh", "Maharashtra", "Tamil Nadu"],
    officialSource: {
      label: "Department of Food & Public Distribution",
      url: "https://nfsa.gov.in/",
    },
    applyUrl: "https://nfsa.gov.in/",
    keywords: [
      "ration",
      "card",
      "food",
      "rice",
      "pds",
      "fair price shop",
      "subsidy",
      "member addition",
    ],
    popular: true,
  },
  {
    slug: "residence-certificate",
    name: "Residence / Domicile Certificate",
    shortName: "Residence Certificate",
    category: "Revenue",
    department: "Revenue Department / Tahsildar Office",
    summary:
      "Proof of permanent residence in a state, needed for local quota admissions, jobs and scheme benefits.",
    description:
      "A residence (domicile) certificate establishes that the applicant has been residing in the state for the minimum prescribed period. It is commonly required for state-quota educational admissions and state government recruitment.",
    eligibility: [
      "Continuous residence in the state for the minimum period prescribed (typically 3–15 years)",
      "Applicant or their parents must hold valid local address proof",
    ],
    documents: [
      "Aadhaar card",
      "Ration card or electricity bill as address proof",
      "School study certificate or bonafide certificate",
      "Self-declaration of residence",
      "Passport-size photograph",
    ],
    steps: [
      "Submit the application online or at the nearest service centre",
      "Upload address and study proofs",
      "Pay the service charge",
      "Verification by the Village/Ward Revenue Officer",
      "Download the digitally signed residence certificate",
    ],
    processingTime: "7–21 working days",
    fee: "₹10–₹45 service charge",
    mode: "Online and at citizen service centres",
    states: ["Telangana", "Andhra Pradesh", "Karnataka", "Maharashtra", "Delhi"],
    officialSource: { label: "MeeSeva / State Revenue Department", url: "https://ts.meeseva.telangana.gov.in/" },
    applyUrl: "https://ts.meeseva.telangana.gov.in/",
    keywords: [
      "residence",
      "domicile",
      "nativity",
      "local",
      "address proof",
      "certificate",
      "state quota",
    ],
  },
  {
    slug: "death-certificate",
    name: "Death Certificate",
    shortName: "Death Certificate",
    category: "Certificates",
    department: "Municipal Corporation / Registrar of Births & Deaths",
    summary:
      "Register a death and obtain the certificate required for insurance claims, pension transfer and property matters.",
    description:
      "A death certificate is the legal record of a death, issued by the local registrar. It is mandatory for settling insurance claims, transferring property and claiming family pension.",
    eligibility: [
      "Death must have occurred within the registrar's jurisdiction",
      "Application by a family member, hospital or the person who performed last rites",
    ],
    documents: [
      "Hospital or medical certificate of cause of death",
      "Aadhaar of the deceased",
      "Aadhaar of the applicant and relationship proof",
      "Cremation / burial receipt",
    ],
    steps: [
      "Report the death to the registrar within 21 days",
      "Submit Form 2 with the medical certificate",
      "Verification by the registrar",
      "Download or collect the death certificate",
    ],
    processingTime: "5–15 working days",
    fee: "Free within 21 days; late fee thereafter",
    mode: "Online and at municipal offices",
    states: ["All India"],
    officialSource: {
      label: "Civil Registration System, Govt. of India",
      url: "https://crsorgi.gov.in/",
    },
    applyUrl: "https://crsorgi.gov.in/",
    keywords: ["death", "certificate", "insurance claim", "family pension", "mrityu"],
  },
];

export const CATEGORIES: ServiceCategory[] = [
  "Certificates",
  "Social Welfare",
  "Identity",
  "Food & Supplies",
  "Revenue",
];

export const LOCATIONS = [
  "All India",
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Delhi",
  "Uttar Pradesh",
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Lightweight keyword-match relevance scoring used by the discovery engine. */
export function searchServices(query: string): { service: Service; score: number; reason: string }[] {
  const q = query.toLowerCase().trim();
  if (!q) return SERVICES.map((service) => ({ service, score: 0.5, reason: "Commonly used service" }));
  const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 2);

  const scored = SERVICES.map((service) => {
    let score = 0;
    const matched: string[] = [];
    for (const kw of service.keywords) {
      if (q.includes(kw)) {
        score += kw.split(" ").length > 1 ? 4 : 3;
        matched.push(kw);
      }
    }
    for (const w of words) {
      if (service.name.toLowerCase().includes(w)) score += 2;
      if (service.summary.toLowerCase().includes(w)) score += 1;
      if (service.category.toLowerCase().includes(w)) score += 1;
      if (service.keywords.some((k) => k.startsWith(w))) score += 1;
    }
    const reason = matched.length
      ? `Matched your words: ${[...new Set(matched)].slice(0, 3).join(", ")}`
      : "Related to your described need";
    return { service, score, reason };
  });

  const hits = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  if (hits.length) return hits;
  return scored
    .map((s) => ({ ...s, reason: "Frequently needed for similar requests" }))
    .slice(0, 4);
}

export type ServiceCenter = {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  distanceKm: number;
  hours: string;
  phone: string;
  services: string[];
};

export const CENTERS: ServiceCenter[] = [
  {
    id: "c1",
    name: "MeeSeva Centre – Ameerpet",
    type: "Citizen Service Centre",
    address: "Shop 12, Maitrivanam Complex, Ameerpet",
    city: "Hyderabad, Telangana – 500038",
    distanceKm: 1.2,
    hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    phone: "040-2345 6789",
    services: ["Income Certificate", "Caste Certificate", "Residence Certificate"],
  },
  {
    id: "c2",
    name: "Aadhaar Seva Kendra – Begumpet",
    type: "UIDAI Centre",
    address: "1st Floor, Prakash Towers, Begumpet Main Road",
    city: "Hyderabad, Telangana – 500016",
    distanceKm: 3.4,
    hours: "Mon–Sun, 9:30 AM – 5:30 PM",
    phone: "1947 (UIDAI Helpline)",
    services: ["Aadhaar Services"],
  },
  {
    id: "c3",
    name: "GHMC Zonal Office – Khairatabad",
    type: "Municipal Office",
    address: "GHMC Zonal Office, Khairatabad Circle",
    city: "Hyderabad, Telangana – 500004",
    distanceKm: 4.8,
    hours: "Mon–Fri, 10:00 AM – 5:00 PM",
    phone: "040-2111 1111",
    services: ["Birth Certificate", "Death Certificate"],
  },
  {
    id: "c4",
    name: "Tahsildar Office – Serilingampally",
    type: "Revenue Office",
    address: "Mandal Revenue Office, Serilingampally",
    city: "Hyderabad, Telangana – 500019",
    distanceKm: 8.1,
    hours: "Mon–Sat, 10:30 AM – 5:00 PM",
    phone: "040-2300 4455",
    services: ["Income Certificate", "Caste Certificate", "Pension Services"],
  },
  {
    id: "c5",
    name: "Civil Supplies Office – Kukatpally",
    type: "Civil Supplies",
    address: "Near Bus Depot, KPHB Phase 1, Kukatpally",
    city: "Hyderabad, Telangana – 500072",
    distanceKm: 9.6,
    hours: "Mon–Sat, 10:00 AM – 5:00 PM",
    phone: "040-2305 9080",
    services: ["Ration Card"],
  },
];

export type TrackingStage = "Submitted" | "Verified" | "Under Review" | "Completed";
export const STAGES: TrackingStage[] = ["Submitted", "Verified", "Under Review", "Completed"];

export type Application = {
  reference: string;
  serviceSlug: string;
  serviceName: string;
  applicant: string;
  appliedOn: string;
  currentStage: TrackingStage;
  office: string;
  note: string;
  history: { stage: TrackingStage; date: string; detail: string }[];
};

export const APPLICATIONS: Application[] = [
  {
    reference: "CS-2026-001234",
    serviceSlug: "income-certificate",
    serviceName: "Income Certificate",
    applicant: "R. Lakshmi",
    appliedOn: "02 Sep 2026",
    currentStage: "Under Review",
    office: "Tahsildar Office, Serilingampally",
    note: "Field verification completed. Pending Tahsildar approval.",
    history: [
      { stage: "Submitted", date: "02 Sep 2026", detail: "Application received online with 4 documents." },
      { stage: "Verified", date: "05 Sep 2026", detail: "Documents verified by Village Revenue Officer." },
      { stage: "Under Review", date: "09 Sep 2026", detail: "Pending digital signature of the Tahsildar." },
    ],
  },
  {
    reference: "CS-2026-005678",
    serviceSlug: "birth-certificate",
    serviceName: "Birth Certificate",
    applicant: "S. Kumar",
    appliedOn: "18 Aug 2026",
    currentStage: "Completed",
    office: "GHMC Zonal Office, Khairatabad",
    note: "Certificate issued. Download available from the portal.",
    history: [
      { stage: "Submitted", date: "18 Aug 2026", detail: "Application submitted at GHMC counter." },
      { stage: "Verified", date: "20 Aug 2026", detail: "Hospital record matched successfully." },
      { stage: "Under Review", date: "23 Aug 2026", detail: "Registrar review in progress." },
      { stage: "Completed", date: "26 Aug 2026", detail: "Digitally signed certificate issued." },
    ],
  },
  {
    reference: "CS-2026-009900",
    serviceSlug: "old-age-pension",
    serviceName: "Old Age Pension",
    applicant: "M. Venkatesh",
    appliedOn: "12 Sep 2026",
    currentStage: "Submitted",
    office: "Gram Panchayat, Shamirpet",
    note: "Awaiting field officer visit.",
    history: [
      { stage: "Submitted", date: "12 Sep 2026", detail: "Application accepted at panchayat office." },
    ],
  },
];

export function getApplication(reference: string): Application | undefined {
  const r = reference.trim().toUpperCase();
  return APPLICATIONS.find((a) => a.reference.toUpperCase() === r);
}
