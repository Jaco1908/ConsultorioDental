/**
 * TIPOS DE USUARIO DEL SISTEMA
 * Define los 3 roles principales que puede tener un usuario en el sistema
 * - superadmin: Administrador con acceso total al sistema
 * - doctor: Odontólogo con acceso a funciones clínicas
 * - patient: Paciente con acceso limitado a su información
 */
export type UserRole = 'superadmin' | 'doctor' | 'patient';

/**
 * INTERFAZ DE USUARIO
 * Define la estructura de datos de un usuario autenticado
 */
export interface User {
  id: string;              // Identificador único del usuario
  email: string;           // Correo electrónico (usado para login)
  name: string;            // Nombre completo del usuario
  role: UserRole;          // Rol del usuario (superadmin, doctor o patient)
  avatar?: string;         // URL de la foto de perfil (opcional)
}

/**
 * CONTEXTO DE AUTENTICACIÓN
 * Define los métodos y datos disponibles en el contexto de autenticación
 * Este tipo se usa en el AuthContext para proveer funciones de login/logout
 */
export interface AuthContextType {
  user: User | null;                    // Usuario actualmente autenticado (null si no hay sesión)
  isAuthenticated: boolean;             // Indica si hay un usuario autenticado
  isLoading: boolean;                   // Indica si se está procesando una operación de auth
  login: (email: string, password: string, skipPersistence?: boolean) => Promise<void>;  // Función para iniciar sesión
  logout: () => void;                   // Función para cerrar sesión
  register: (email: string, password: string, name: string) => Promise<void>;  // Función para registrar nuevo usuario
}

/**
 * ESTADO DE UN DIENTE EN EL ODONTOGRAMA
 * Representa todas las condiciones y tratamientos que puede tener un diente
 * Se usa en el componente Odontogram para marcar visualmente cada diente
 */
export interface ToothState {
  number: string;           // Número del diente según nomenclatura internacional (ej: "18", "55")
  caries?: boolean;         // Indica si el diente tiene caries
  restored?: boolean;       // Indica si tiene una obturación/restauración
  endodontic?: boolean;     // Indica si tiene endodoncia (tratamiento de conducto)
  crown?: boolean;          // Indica si tiene una corona dental
  extraction?: boolean;     // Indica si está marcado para extracción
  sealant?: boolean;        // Indica si tiene sellante de fosas y fisuras
  total?: boolean;          // Indica si forma parte de una prótesis total
  mobility?: number;        // Grado de movilidad dental (0-3, donde 0 es normal)
  recession?: number;       // Recesión gingival en milímetros
}

/**
 * HISTORIA CLÍNICA ODONTOLÓGICA COMPLETA
 * Interfaz principal que contiene TODOS los datos de una historia clínica del paciente
 * Esta es la estructura más importante del sistema, dividida en 12 secciones
 */
export interface MedicalRecord {
  // DATOS BÁSICOS DEL REGISTRO
  id: string;                      // ID único de la historia clínica
  patientId: string;               // ID del paciente al que pertenece
  patientName: string;             // Nombre completo del paciente
  recordNumber: string;            // Número de historia clínica (ej: HC-001)
  createdAt: string;               // Fecha de creación del registro
  updatedAt: string;               // Última fecha de modificación

  // SECCIÓN 1: DATOS DEL PACIENTE
  establishment?: string;          // Nombre del establecimiento de salud
  firstName?: string;              // Nombres del paciente
  lastName?: string;               // Apellidos del paciente
  identificationNumber?: string;   // Cédula o DNI
  gender?: 'M' | 'F';             // Género (M = Masculino, F = Femenino)
  age?: number;                    // Edad del paciente
  isMinor?: boolean;               // Indica si es menor de edad

  // SECCIÓN 2: MOTIVO DE CONSULTA
  consultationReason?: string;     // Razón por la que el paciente acude a consulta

  // SECCIÓN 3: ENFERMEDAD O PROBLEMA ACTUAL
  symptoms?: string;               // Síntomas que presenta el paciente
  chronology?: string;             // Cuándo empezaron los síntomas (tiempo de evolución)
  location?: string;               // Dónde se localiza el problema (ej: "molar superior izquierdo")
  intensity?: 'leve' | 'moderada' | 'severa';  // Nivel de intensidad del dolor/molestia
  characteristics?: string;        // Características del dolor (punzante, continuo, etc.)
  apparentCause?: string;          // Qué cree el paciente que causó el problema
  associatedSymptoms?: string;     // Otros síntomas relacionados

  // SECCIÓN 4: ANTECEDENTES MÉDICOS
  allergies?: {
    antibiotics?: string;          // Alergias a antibióticos
    anesthesia?: string;           // Alergias a anestesia
    other?: string;                // Otras alergias
  };
  medicalHistory?: {
    hemorrhages?: boolean;         // Antecedente de hemorragias
    hiv?: boolean;                 // VIH
    tuberculosis?: boolean;        // Tuberculosis
    asthma?: boolean;              // Asma
    diabetes?: 'tipo1' | 'tipo2' | null;  // Tipo de diabetes (si tiene)
    hypertension?: boolean;        // Hipertensión arterial
    heartDisease?: string;         // Enfermedades cardíacas
    other?: string;                // Otros antecedentes médicos importantes
  };

  // SECCIÓN 5: SIGNOS VITALES
  vitalSigns?: {
    bloodPressure?: string;        // Presión arterial (ej: "120/80")
    heartRate?: number;            // Frecuencia cardíaca (pulsaciones por minuto)
    temperature?: number;          // Temperatura corporal en °C
    respiratoryRate?: number;      // Frecuencia respiratoria (respiraciones por minuto)
  };

  // SECCIÓN 6: EXAMEN ESTOMATOGNÁTICO (Examen físico de la boca)
  examination?: {
    lips?: string;                 // Estado de los labios
    cheeks?: string;               // Estado de las mejillas
    upperJaw?: string;             // Estado del maxilar superior
    lowerJaw?: string;             // Estado de la mandíbula
    tongue?: string;               // Estado de la lengua
    palate?: string;               // Estado del paladar
    floorOfMouth?: string;         // Estado del piso de la boca
    buccalMucosa?: string;         // Estado de la mucosa bucal
    salivaryGlands?: string;       // Estado de las glándulas salivales
    oropharynx?: string;           // Estado de la orofaringe
    tmj?: string;                  // Estado de la articulación temporomandibular (ATM)
    lymphNodes?: string;           // Estado de los ganglios linfáticos
  };

  // SECCIÓN 7: ODONTOGRAMA (Mapa visual de los dientes)
  teeth?: Record<string, ToothState>;  // Objeto con el estado de cada diente (clave: número de diente)

  // SECCIÓN 8: INDICADORES DE SALUD BUCAL
  indicators?: {
    oralHygiene?: 'buena' | 'regular' | 'mala';  // Nivel de higiene oral
    periodontalDisease?: 'ninguna' | 'leve' | 'moderada' | 'severa';  // Enfermedad periodontal
    malocclusion?: 'ninguna' | 'angle1' | 'angle2' | 'angle3';  // Tipo de maloclusión según clasificación de Angle
    fluorosis?: 'ninguna' | 'leve' | 'moderada' | 'severa';  // Nivel de fluorosis dental
    bacterialPlaque?: number;      // Porcentaje de placa bacteriana
  };

  // SECCIÓN 9: ÍNDICES CPO-ceo (Indicadores de salud dental)
  cpoIndex?: {                     // Índice CPO para dientes permanentes
    decayed: number;               // C = Cariados (Carious)
    missing: number;               // P = Perdidos (Missing)
    filled: number;                // O = Obturados (Filled)
    total: number;                 // Total CPO
  };
  ceoIndex?: {                     // Índice ceo para dientes temporales
    decayed: number;               // c = cariados
    extracted: number;             // e = extraídos (indicados para extracción)
    filled: number;                // o = obturados
    total: number;                 // Total ceo
  };

  // SECCIÓN 10: PLANES DE TRATAMIENTO
  plans?: {
    diagnostic?: string;           // Plan diagnóstico (qué exámenes/estudios se harán)
    therapeutic?: string;          // Plan terapéutico (qué tratamientos se realizarán)
    educational?: string;          // Plan educacional (qué se le enseñará al paciente)
  };

  // SECCIÓN 11: DIAGNÓSTICO
  diagnosis?: {
    presumptive?: {                // Diagnóstico inicial/probable
      code?: string;               // Código CIE-10
      description?: string;        // Descripción del diagnóstico
    };
    definitive?: {                 // Diagnóstico confirmado
      code?: string;               // Código CIE-10
      description?: string;        // Descripción del diagnóstico
    };
  };

  // SECCIÓN 12: TRATAMIENTO POR SESIONES
  sessions?: TreatmentSession[];   // Array de sesiones de tratamiento realizadas
}

/**
 * SESIÓN DE TRATAMIENTO
 * Representa una sesión/consulta de tratamiento odontológico
 * Cada historia clínica puede tener múltiples sesiones
 */
export interface TreatmentSession {
  id: string;                              // ID único de la sesión
  sessionNumber: number;                   // Número de sesión (1, 2, 3, etc.)
  date: string;                            // Fecha de la sesión
  sheetCode?: string;                      // Código de la hoja de tratamiento
  diagnosisAndComplications?: string;      // Diagnóstico y complicaciones encontradas en esta sesión
  proceduresPerformed?: string;            // Procedimientos odontológicos realizados
  prescriptions?: Prescription[];          // Medicamentos recetados en esta sesión
  doctorSignature?: string;                // Firma digital del doctor
  status: 'completed' | 'pending' | 'cancelled';  // Estado de la sesión
}

/**
 * PRESCRIPCIÓN MÉDICA
 * Representa un medicamento recetado al paciente
 */
export interface Prescription {
  id: string;              // ID único de la prescripción
  medication: string;      // Nombre del medicamento
  dosage: string;          // Dosis (ej: "500mg")
  frequency: string;       // Frecuencia de toma (ej: "Cada 8 horas")
}

/**
 * CITA MÉDICA
 * Representa una cita agendada entre un paciente y un doctor
 */
export interface Appointment {
  id: string;              // ID único de la cita
  patientId: string;       // ID del paciente
  patientName: string;     // Nombre del paciente (para mostrar)
  doctorId: string;        // ID del doctor
  doctorName: string;      // Nombre del doctor (para mostrar)
  date: string;            // Fecha de la cita
  time: string;            // Hora de la cita
  reason: string;          // Motivo de la cita
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';  // Estado de la cita
  notes?: string;          // Notas adicionales sobre la cita
}

/**
 * PACIENTE
 * Representa la información completa de un paciente registrado
 */
export interface Patient {
  id: string;                    // ID único del paciente
  firstName: string;             // Nombres
  lastName: string;              // Apellidos
  email: string;                 // Correo electrónico
  phone: string;                 // Teléfono
  identificationNumber: string;  // Cédula o DNI
  dateOfBirth: string;           // Fecha de nacimiento
  gender: 'M' | 'F';            // Género
  address?: string;              // Dirección (opcional)
  city?: string;                 // Ciudad (opcional)
  emergencyContact?: {           // Contacto de emergencia (opcional)
    name: string;                // Nombre del contacto
    phone: string;               // Teléfono del contacto
    relationship: string;        // Relación con el paciente (ej: "Madre", "Esposo")
  };
  createdAt: string;             // Fecha de registro en el sistema
  lastVisit?: string;            // Fecha de la última visita (opcional)
}

/**
 * FACTURA
 * Representa una factura de servicios odontológicos
 */
export interface Invoice {
  id: string;                    // ID único de la factura
  invoiceNumber: string;         // Número de factura (ej: "FAC-001")
  patientId: string;             // ID del paciente facturado
  patientName: string;           // Nombre del paciente (para mostrar)
  date: string;                  // Fecha de emisión
  dueDate: string;               // Fecha de vencimiento
  items: InvoiceItem[];          // Items/servicios facturados
  subtotal: number;              // Subtotal (antes de impuestos)
  tax: number;                   // Impuesto (IVA)
  total: number;                 // Total a pagar
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';  // Estado del pago
  paymentMethod?: string;        // Método de pago (efectivo, tarjeta, etc.)
  notes?: string;                // Notas adicionales
}

/**
 * ITEM DE FACTURA
 * Representa un servicio individual dentro de una factura
 */
export interface InvoiceItem {
  id: string;              // ID único del item
  description: string;     // Descripción del servicio (ej: "Limpieza dental")
  quantity: number;        // Cantidad
  unitPrice: number;       // Precio unitario
  total: number;           // Total del item (quantity * unitPrice)
}

/**
 * ARTÍCULO DE BLOG
 * Representa un artículo del blog o contenido educativo
 */
export interface BlogPost {
  id: string;              // ID único del artículo
  title: string;           // Título del artículo
  slug: string;            // URL amigable (ej: "cuidado-dental-infantil")
  excerpt: string;         // Extracto o resumen corto
  content: string;         // Contenido completo en HTML o Markdown
  coverImage?: string;     // URL de la imagen de portada
  author: {                // Información del autor
    id: string;            // ID del autor
    name: string;          // Nombre del autor
  };
  category: string;        // Categoría del artículo (ej: "Prevención")
  tags: string[];          // Etiquetas para búsqueda
  published: boolean;      // Indica si está publicado o es borrador
  publishedAt?: string;    // Fecha de publicación
  createdAt: string;       // Fecha de creación
  updatedAt: string;       // Última actualización
}

/**
 * PROMOCIÓN
 * Representa una oferta o promoción de la clínica
 */
export interface Promotion {
  id: string;                      // ID único de la promoción
  title: string;                   // Título de la promoción
  description: string;             // Descripción detallada
  discountPercentage?: number;     // Porcentaje de descuento (ej: 20 para 20%)
  discountAmount?: number;         // Monto fijo de descuento
  image?: string;                  // URL de la imagen promocional
  validFrom: string;               // Fecha de inicio de validez
  validUntil: string;              // Fecha de fin de validez
  active: boolean;                 // Indica si la promoción está activa
  termsAndConditions?: string;     // Términos y condiciones de la promoción
}
