// User roles
export type UserRole = 'superadmin' | 'doctor' | 'patient';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, skipPersistence?: boolean) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

// Medical Record Types
export interface ToothState {
  number: string;
  caries?: boolean;
  restored?: boolean;
  endodontic?: boolean;
  crown?: boolean;
  extraction?: boolean;
  sealant?: boolean;
  total?: boolean;
  mobility?: number;
  recession?: number;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  recordNumber: string;
  createdAt: string;
  updatedAt: string;
  // Sección 1: Datos
  establishment?: string;
  firstName?: string;
  lastName?: string;
  identificationNumber?: string;
  gender?: 'M' | 'F';
  age?: number;
  isMinor?: boolean;
  // Sección 2: Motivo
  consultationReason?: string;
  // Sección 3: Enfermedad
  symptoms?: string;
  chronology?: string;
  location?: string;
  intensity?: 'leve' | 'moderada' | 'severa';
  characteristics?: string;
  apparentCause?: string;
  associatedSymptoms?: string;
  // Sección 4: Antecedentes
  allergies?: {
    antibiotics?: string;
    anesthesia?: string;
    other?: string;
  };
  medicalHistory?: {
    hemorrhages?: boolean;
    hiv?: boolean;
    tuberculosis?: boolean;
    asthma?: boolean;
    diabetes?: 'tipo1' | 'tipo2' | null;
    hypertension?: boolean;
    heartDisease?: string;
    other?: string;
  };
  // Sección 5: Signos vitales
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
  };
  // Sección 6: Examen
  examination?: {
    lips?: string;
    cheeks?: string;
    upperJaw?: string;
    lowerJaw?: string;
    tongue?: string;
    palate?: string;
    floorOfMouth?: string;
    buccalMucosa?: string;
    salivaryGlands?: string;
    oropharynx?: string;
    tmj?: string;
    lymphNodes?: string;
  };
  // Sección 7: Odontograma
  teeth?: Record<string, ToothState>;
  // Sección 8: Indicadores
  indicators?: {
    oralHygiene?: 'buena' | 'regular' | 'mala';
    periodontalDisease?: 'ninguna' | 'leve' | 'moderada' | 'severa';
    malocclusion?: 'ninguna' | 'angle1' | 'angle2' | 'angle3';
    fluorosis?: 'ninguna' | 'leve' | 'moderada' | 'severa';
    bacterialPlaque?: number;
  };
  // Sección 9: Índices
  cpoIndex?: {
    decayed: number;
    missing: number;
    filled: number;
    total: number;
  };
  ceoIndex?: {
    decayed: number;
    extracted: number;
    filled: number;
    total: number;
  };
  // Sección 10: Planes
  plans?: {
    diagnostic?: string;
    therapeutic?: string;
    educational?: string;
  };
  // Sección 11: Diagnóstico
  diagnosis?: {
    presumptive?: {
      code?: string;
      description?: string;
    };
    definitive?: {
      code?: string;
      description?: string;
    };
  };
  // Sección 12: Tratamiento
  sessions?: TreatmentSession[];
}

export interface TreatmentSession {
  id: string;
  sessionNumber: number;
  date: string;
  sheetCode?: string;
  diagnosisAndComplications?: string;
  proceduresPerformed?: string;
  prescriptions?: Prescription[];
  doctorSignature?: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
}

// Appointment types
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  notes?: string;
}

// Patient types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  identificationNumber: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  address?: string;
  city?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: string;
  lastVisit?: string;
}

// Invoice types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  paymentMethod?: string;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Blog/Promotion types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: {
    id: string;
    name: string;
  };
  category: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercentage?: number;
  discountAmount?: number;
  image?: string;
  validFrom: string;
  validUntil: string;
  active: boolean;
  termsAndConditions?: string;
}
