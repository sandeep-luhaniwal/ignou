export interface AssignmentItem {
  code: string;
  title: string;
  programme: string;
  subject: string;
  price: string;
  session?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const assignments: AssignmentItem[] = [
  {
    code: "MCS-011",
    title: "Problem Solving and Programming",
    programme: "BCA",
    subject: "Computer Science",
    price: "₹49",
    session: "2025-2026",
  },
  {
    code: "BCS-012",
    title: "Basic Mathematics",
    programme: "BCA",
    subject: "Mathematics",
    price: "₹49",
    session: "2025-2026",
  },
  {
    code: "MCS-021",
    title: "Data and File Structures",
    programme: "MCA",
    subject: "Computer Science",
    price: "₹59",
    session: "2025-2026",
  },
  {
    code: "MPA-005",
    title: "Public Administration Theory",
    programme: "MA",
    subject: "Public Admin",
    price: "₹49",
    session: "2025-2026",
  },
  {
    code: "MS-08",
    title: "Quantitative Analysis for Managerial Decisions",
    programme: "MBA",
    subject: "Management",
    price: "₹59",
    session: "2025-2026",
  },
  {
    code: "BCOC-131",
    title: "Financial Accounting",
    programme: "BCom",
    subject: "Commerce",
    price: "₹49",
    session: "2025-2026",
  },
  {
    code: "BSOC-101",
    title: "Introduction to Sociology",
    programme: "BA",
    subject: "Sociology",
    price: "₹49",
    session: "2025-2026",
  },
  {
    code: "MEG-01",
    title: "British Poetry",
    programme: "MA",
    subject: "English",
    price: "₹49",
    session: "2025-2026",
  },
  {
    code: "MMPC-001",
    title: "Management Functions and Organizational Processes",
    programme: "MBA",
    subject: "Management",
    price: "₹59",
    session: "2025-2026",
  },
];

export const faqs: FaqItem[] = [
  {
    q: "Are the solved assignments accurate and based on the latest syllabus?",
    a: "Yes. Every solution is drafted and double-checked by subject matter experts following the latest IGNOU guidelines, session question papers, word limits, and reference materials.",
  },
  {
    q: "How soon do I receive my PDF download after payment?",
    a: "Downloads are available instantly upon successful checkout. You can also re-download your files anytime from your student dashboard.",
  },
  {
    q: "How does the handwritten assignment delivery work?",
    a: "Our team writes your assignments neatly on standard IGNOU submission sheets, packs them securely, and couriers them via speed post/courier directly to your address with tracking.",
  },
  {
    q: "Can you help with Project Reports and Synopses (BCA/MCA/MBA)?",
    a: "Yes, we provide structured guidance on project selection, synopsis preparation, guide approval assistance, and complete customized report drafting.",
  },
  {
    q: "Is IGNOU Power affiliated with Indira Gandhi National Open University?",
    a: "IGNOU Power is an independent academic support platform. We provide study guidance, reference solutions, and academic assistance to distance learners.",
  },
  {
    q: "What should I do if I cannot find my course code?",
    a: "You can reach out to our student support desk via WhatsApp, call (+91 98765 43210), or email (support@ignouhelping.com). Our team will arrange the required solution for you.",
  },
];
