# 📘 Documentación Técnica - DentalSys Frontend

## 🎯 Propósito de este Documento

Este documento explica **cómo funciona el código** del sistema DentalSys para que cualquier desarrollador de LATAM pueda entender, mantener y ampliar el proyecto fácilmente.

---

## 📁 Estructura del Proyecto

```
FrontEnd-clinicadental/
├── src/
│   ├── app/                    # Next.js App Router (páginas y rutas)
│   ├── components/             # Componentes React reutilizables
│   ├── contexts/               # Contextos de React (estado global)
│   ├── types/                  # Definiciones TypeScript
│   ├── lib/                    # Utilidades y funciones helper
│   └── styles/                 # Archivos CSS globales
├── public/                     # Archivos estáticos (imágenes, etc.)
└── node_modules/               # Dependencias (no modificar)
```

---

## 🔑 Conceptos Clave

### 1. Next.js App Router

**¿Qué es?** Sistema de rutas basado en carpetas introducido en Next.js 13+.

**Cómo funciona:**
- Cada carpeta en `src/app/` se convierte en una ruta URL
- El archivo `page.tsx` define el contenido de esa ruta
- `layout.tsx` define el diseño que envuelve las páginas

**Ejemplos:**
```
src/app/page.tsx                    → URL: /
src/app/dashboard/doctor/page.tsx   → URL: /dashboard/doctor
src/app/dashboard/patient/page.tsx  → URL: /dashboard/patient
```

### 2. React Context API

**¿Qué es?** Forma de compartir datos entre componentes sin pasar props manualmente.

**Dónde se usa:**
- `src/contexts/AuthContext.tsx` → Maneja autenticación en toda la app

**Cómo usarlo:**
```typescript
// En cualquier componente:
import { useAuth } from '@/contexts/AuthContext';

function MiComponente() {
  const { user, login, logout } = useAuth();
  // Ahora puedes usar user, login, logout
}
```

### 3. TypeScript

**¿Qué es?** JavaScript con tipos. Previene errores al definir qué tipo de dato espera cada variable.

**Dónde están los tipos:**
- `src/types/index.ts` → Todas las interfaces del proyecto

**Ejemplo:**
```typescript
// En lugar de:
let paciente = {};  // ❌ No sabemos qué propiedades tiene

// Usamos:
let paciente: Patient = {  // ✅ TypeScript nos ayuda
  id: "123",
  firstName: "Juan",
  lastName: "Pérez",
  // ... TypeScript sugiere las propiedades
};
```

---

## 🏗️ Arquitectura del Sistema

### Flujo de Autenticación

```
1. Usuario abre la app
   ↓
2. AuthContext verifica si hay sesión guardada en localStorage
   ↓
3. Si hay sesión → Redirige al dashboard según rol
   Si no hay sesión → Muestra Login
   ↓
4. Usuario hace login
   ↓
5. AuthContext.login() crea sesión mock y guarda en localStorage
   ↓
6. Usuario es redirigido a su dashboard
```

**Archivos involucrados:**
- `src/app/page.tsx` → Punto de entrada, verifica sesión
- `src/contexts/AuthContext.tsx` → Lógica de autenticación
- `src/components/Login.tsx` → Pantalla de login
- `src/types/index.ts` → Define tipos User, UserRole

### Sistema de Roles

El sistema tiene 3 roles de usuario:

| Rol | Descripción | Dashboard |
|-----|-------------|-----------|
| `superadmin` | Administrador total | `/dashboard/superadmin` |
| `doctor` | Odontólogo | `/dashboard/doctor` |
| `patient` | Paciente | `/dashboard/patient` |

**Cómo funciona:**
1. Al hacer login, `AuthContext` determina el rol según el email (MOCK)
2. Cada dashboard verifica que el usuario tenga el rol correcto
3. Si el rol no coincide, redirige al login

---

## 📦 Componentes Principales

### 1. Login (`src/components/Login.tsx`)

**Propósito:** Pantalla de inicio de sesión.

**Características:**
- Validación de email y contraseña
- Botón mostrar/ocultar contraseña
- Checkbox "Recordarme"
- 3 botones de acceso demo rápido

**Estados:**
```typescript
email: string              // Email ingresado
password: string           // Contraseña ingresada
showPassword: boolean      // Mostrar u ocultar contraseña
rememberMe: boolean        // Checkbox recordarme
errors: object             // Errores de validación
```

**Funciones:**
- `validateForm()` → Valida email y contraseña
- `handleSubmit()` → Procesa el login

### 2. AuthContext (`src/contexts/AuthContext.tsx`)

**Propósito:** Maneja la autenticación en toda la aplicación.

**Funciones principales:**

#### `login(email, password, skipPersistence)`
```typescript
// ¿Qué hace?
// 1. Simula delay de API (500ms)
// 2. Determina rol según el email
// 3. Crea objeto User
// 4. Guarda en estado y localStorage (si skipPersistence es false)

// Uso:
await login('doctor@demo.com', 'demo');
```

#### `logout()`
```typescript
// ¿Qué hace?
// 1. Limpia el estado del usuario
// 2. Remueve del localStorage

// Uso:
logout();
```

#### `register(email, password, name)`
```typescript
// ¿Qué hace?
// 1. Crea usuario con rol 'patient'
// 2. Guarda sesión

// Uso:
await register('nuevo@email.com', 'password123', 'Juan Pérez');
```

**IMPORTANTE:** Estas funciones son MOCK. Cuando conectes al backend real:
1. Reemplaza el delay simulado con llamadas `fetch()` o `axios`
2. Envía credenciales al API
3. Guarda el token JWT que recibas
4. Usa ese token en las peticiones posteriores

### 3. Odontogram (`src/components/Odontogram.tsx`)

**Propósito:** Componente interactivo para marcar el estado de los dientes.

**Estructura de dientes:**

**Dientes Permanentes (32):**
```
Cuadrante 1 (Superior Derecho): 18-11
Cuadrante 2 (Superior Izquierdo): 21-28
Cuadrante 3 (Inferior Izquierdo): 38-31
Cuadrante 4 (Inferior Derecho): 41-48
```

**Dientes Temporales (20):**
```
Cuadrante 5 (Superior Derecho): 55-51
Cuadrante 6 (Superior Izquierdo): 61-65
Cuadrante 7 (Inferior Izquierdo): 75-71
Cuadrante 8 (Inferior Derecho): 81-85
```

**Estados de un diente (ToothState):**
```typescript
{
  number: string       // Número del diente (ej: "18")
  caries?: boolean     // Tiene caries
  restored?: boolean   // Tiene obturación
  endodontic?: boolean // Tiene endodoncia
  crown?: boolean      // Tiene corona
  extraction?: boolean // Marcado para extracción
  sealant?: boolean    // Tiene sellante
  total?: boolean      // Prótesis total
  mobility?: number    // Movilidad (0-3)
  recession?: number   // Recesión gingival (mm)
}
```

**Funciones principales:**

#### `initializeTeeth()`
```typescript
// ¿Qué hace?
// Crea el objeto inicial con todos los dientes (52 en total)
// Si hay initialTeeth (props), los usa
// Si no, crea dientes vacíos
```

#### `updateTooth(toothNumber, updates)`
```typescript
// ¿Qué hace?
// Actualiza el estado de un diente específico

// Ejemplo:
updateTooth('18', { caries: true, mobility: 2 });
```

#### `resetTooth(toothNumber)`
```typescript
// ¿Qué hace?
// Limpia todas las marcas de un diente

// Ejemplo:
resetTooth('18');  // Diente 18 queda vacío
```

### 4. MedicalRecordForm (`src/components/MedicalRecordForm.tsx`)

**Propósito:** Formulario completo de historia clínica con 12 secciones.

**Secciones:**

1. **Datos del Paciente** - Información personal
2. **Motivo de Consulta** - Por qué vino
3. **Enfermedad Actual** - Síntomas y características
4. **Antecedentes** - Historial médico y alergias
5. **Signos Vitales** - Presión, temperatura, etc.
6. **Examen Estomatognático** - Examen físico de boca
7. **Odontograma** - Mapa de dientes (usa componente Odontogram)
8. **Indicadores** - Higiene, enfermedad periodontal, etc.
9. **Índices CPO-ceo** - Indicadores de salud dental
10. **Planes** - Diagnóstico, terapéutico, educacional
11. **Diagnóstico** - Presuntivo y definitivo
12. **Tratamiento** - Sesiones realizadas

**Sistema de Tabs:**
El formulario usa Tabs de shadcn/ui para organizar las secciones.

**Guardado:**
- **Borrador automático**: Se guarda en localStorage mientras se edita
- **Guardado final**: Se debe conectar con el backend

---

## 🗄️ Sistema de Tipos TypeScript

Ubicación: `src/types/index.ts`

### Tipos Principales

#### User
```typescript
interface User {
  id: string
  email: string
  name: string
  role: 'superadmin' | 'doctor' | 'patient'
  avatar?: string
}
```

#### MedicalRecord
```typescript
interface MedicalRecord {
  // Datos básicos
  id: string
  patientId: string
  patientName: string
  recordNumber: string
  createdAt: string
  updatedAt: string

  // 12 secciones (ver sección Componentes Principales)
  // ...
}
```

#### Patient
```typescript
interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  identificationNumber: string
  dateOfBirth: string
  gender: 'M' | 'F'
  // ...
}
```

#### Appointment
```typescript
interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  time: string
  reason: string
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  // ...
}
```

---

## 🎨 Sistema de Estilos

### Tailwind CSS

**¿Qué es?** Framework CSS basado en clases utilitarias.

**Configuración:** `tailwind.config.ts`

**Ejemplos de clases comunes:**
```css
/* Espaciado */
p-4          /* padding: 1rem */
m-2          /* margin: 0.5rem */
mt-6         /* margin-top: 1.5rem */

/* Flexbox */
flex         /* display: flex */
flex-col     /* flex-direction: column */
gap-4        /* gap: 1rem */

/* Colores */
bg-blue-500  /* background azul */
text-white   /* texto blanco */

/* Texto */
text-xl      /* font-size: 1.25rem */
font-bold    /* font-weight: 700 */
```

### shadcn/ui Components

**¿Qué es?** Librería de componentes UI pre-diseñados.

**Ubicación:** `src/components/ui/`

**Componentes disponibles:**
- Button, Input, Label
- Card, Dialog, Sheet
- Tabs, Table, Form
- Calendar, Select, Checkbox
- Y 40+ más...

**Cómo usar:**
```typescript
import { Button } from '@/components/ui/button';

<Button variant="outline">Click me</Button>
```

---

## 🔌 Integración con Backend (TODO)

### Estado Actual: MOCK

Actualmente todo funciona con datos simulados:
- Login valida solo formato, no verifica contraseña real
- Datos se guardan en `localStorage` del navegador
- No hay conexión a base de datos

### Pasos para Conectar Backend Real

#### 1. Configurar Variables de Entorno

Crear archivo `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

#### 2. Crear Servicio de API

Archivo: `src/services/api.ts`
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  // Login
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Login failed');

    return await response.json();  // { token, user }
  },

  // Obtener pacientes
  async getPatients(token: string) {
    const response = await fetch(`${API_URL}/patients`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  },

  // Crear historia clínica
  async createMedicalRecord(data: MedicalRecord, token: string) {
    const response = await fetch(`${API_URL}/medical-records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },

  // ... más endpoints
};
```

#### 3. Actualizar AuthContext

En `src/contexts/AuthContext.tsx`, reemplazar:

```typescript
// ANTES (Mock):
const login = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const mockUser = { ... };
  setUser(mockUser);
};

// DESPUÉS (Real):
const login = async (email: string, password: string) => {
  try {
    const { token, user } = await api.login(email, password);

    // Guardar token
    localStorage.setItem('token', token);

    // Guardar usuario
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
```

#### 4. Proteger Rutas con Token

Crear middleware: `src/middleware.ts`
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  // Si no hay token y está intentando acceder al dashboard
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

---

## 🧪 Datos Mock Actuales

### Usuarios Demo

```typescript
// Superadmin
{
  email: 'superadmin@demo.com',
  password: 'demo',  // No se valida
  role: 'superadmin'
}

// Doctor
{
  email: 'doctor@demo.com',
  password: 'demo',
  role: 'doctor'
}

// Paciente
{
  email: 'paciente@demo.com',
  password: 'demo',
  role: 'patient'
}
```

### Pacientes de Ejemplo

Los dashboards muestran datos ficticios hardcodeados. Cuando conectes el backend:
1. Elimina los arrays de datos mock
2. Reemplaza con llamadas a API
3. Usa `useEffect` para cargar datos al montar componente

Ejemplo:
```typescript
// ANTES (Mock):
const patients = [
  { id: '1', name: 'Juan Pérez', ... },
  { id: '2', name: 'María García', ... },
];

// DESPUÉS (Real):
const [patients, setPatients] = useState<Patient[]>([]);

useEffect(() => {
  async function loadPatients() {
    const token = localStorage.getItem('token');
    const data = await api.getPatients(token);
    setPatients(data);
  }

  loadPatients();
}, []);
```

---

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (puerto 3000)

# Producción
npm run build        # Crea build optimizado
npm run start        # Ejecuta el build de producción

# Calidad de código
npm run lint         # Verifica código con ESLint
```

---

## 📚 Recursos para Aprender

### Next.js
- Documentación oficial: https://nextjs.org/docs
- Tutorial interactivo: https://nextjs.org/learn

### TypeScript
- Documentación: https://www.typescriptlang.org/docs
- Playground: https://www.typescriptlang.org/play

### React
- Documentación: https://react.dev
- Hooks: https://react.dev/reference/react

### Tailwind CSS
- Documentación: https://tailwindcss.com/docs
- Cheatsheet: https://nerdcave.com/tailwind-cheat-sheet

### shadcn/ui
- Documentación: https://ui.shadcn.com
- Componentes: https://ui.shadcn.com/docs/components

---

## 🐛 Problemas Comunes

### 1. "Cannot find module '@/components/...'"

**Solución:** El alias `@` está configurado en `tsconfig.json`. Asegúrate de que apunte a `./src`.

### 2. "localStorage is not defined"

**Problema:** Next.js renderiza en servidor donde no hay `localStorage`.

**Solución:** Usa `useEffect` para código que depende del navegador:
```typescript
useEffect(() => {
  const data = localStorage.getItem('key');
  // ...
}, []);
```

### 3. Errores de TypeScript

**Solución:** Lee el mensaje de error. TypeScript te dice exactamente qué tipo esperaba y qué recibió.

### 4. Estilos de Tailwind no funcionan

**Solución:**
1. Verifica que el archivo esté importado en `tailwind.config.ts`
2. Reinicia el servidor de desarrollo

---

## 📞 Soporte

Para dudas sobre el código:
1. Revisa esta documentación
2. Busca en los archivos comentados (`src/types/index.ts`, `src/contexts/AuthContext.tsx`)
3. Consulta la documentación oficial de las tecnologías
4. Crea un issue en GitHub describiendo el problema

---

**Última actualización:** Noviembre 2024
**Versión:** 0.1.0
**Mantenido por:** Equipo DentalSys
