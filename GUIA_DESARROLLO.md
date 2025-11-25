# 🛠️ Guía de Desarrollo - DentalSys

## 📌 Propósito

Esta guía contiene **ejemplos prácticos** de cómo realizar tareas comunes en el proyecto. Úsala como referencia cuando necesites:
- Agregar nuevas funcionalidades
- Modificar componentes existentes
- Conectar con el backend
- Solucionar problemas

---

## 🎯 Tabla de Contenidos

1. [Agregar una Nueva Página](#1-agregar-una-nueva-página)
2. [Crear un Nuevo Componente](#2-crear-un-nuevo-componente)
3. [Agregar un Nuevo Campo al Formulario](#3-agregar-un-nuevo-campo-al-formulario)
4. [Modificar el Odontograma](#4-modificar-el-odontograma)
5. [Crear un Nuevo Rol de Usuario](#5-crear-un-nuevo-rol-de-usuario)
6. [Agregar Validaciones](#6-agregar-validaciones)
7. [Conectar con el Backend](#7-conectar-con-el-backend)
8. [Debugging y Solución de Problemas](#8-debugging-y-solución-de-problemas)

---

## 1. Agregar una Nueva Página

### Ejemplo: Crear página de "Configuración"

**Paso 1:** Crear archivo de página

```bash
# Crear carpeta y archivo
src/app/dashboard/doctor/settings/page.tsx
```

**Paso 2:** Escribir el código

```typescript
// src/app/dashboard/doctor/settings/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>

      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl mb-4">Información de Usuario</h2>
        <p>Nombre: {user?.name}</p>
        <p>Email: {user?.email}</p>

        <Button className="mt-4">Guardar Cambios</Button>
      </div>
    </div>
  );
}
```

**Paso 3:** Agregar link en el menú de navegación

```typescript
// En el componente de navegación:
<Link href="/dashboard/doctor/settings">
  <Settings className="w-5 h-5" />
  Configuración
</Link>
```

**Resultado:** Ya puedes acceder a `/dashboard/doctor/settings`

---

## 2. Crear un Nuevo Componente

### Ejemplo: Componente de Tarjeta de Paciente

**Paso 1:** Crear archivo del componente

```typescript
// src/components/PatientCard.tsx
'use client';

import { Patient } from '@/types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Phone, Mail } from 'lucide-react';

/**
 * COMPONENTE: PatientCard
 * Muestra una tarjeta con información resumida del paciente
 */
interface PatientCardProps {
  patient: Patient;                      // Datos del paciente
  onSelect?: (patient: Patient) => void; // Callback al seleccionar
}

export function PatientCard({ patient, onSelect }: PatientCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      {/* Nombre del paciente */}
      <h3 className="text-lg font-semibold mb-2">
        {patient.firstName} {patient.lastName}
      </h3>

      {/* Información de contacto */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{patient.phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>{patient.email}</span>
        </div>
      </div>

      {/* Botón de acción */}
      {onSelect && (
        <Button
          onClick={() => onSelect(patient)}
          className="w-full mt-4"
          variant="outline"
        >
          Ver Detalles
        </Button>
      )}
    </Card>
  );
}
```

**Paso 2:** Usar el componente

```typescript
// En cualquier página:
import { PatientCard } from '@/components/PatientCard';

const patients: Patient[] = [ /* ... */ ];

<div className="grid grid-cols-3 gap-4">
  {patients.map(patient => (
    <PatientCard
      key={patient.id}
      patient={patient}
      onSelect={(p) => console.log('Seleccionado:', p)}
    />
  ))}
</div>
```

---

## 3. Agregar un Nuevo Campo al Formulario

### Ejemplo: Agregar campo "Número de Seguro" a la Historia Clínica

**Paso 1:** Actualizar el tipo TypeScript

```typescript
// src/types/index.ts
export interface MedicalRecord {
  // ... campos existentes ...

  // NUEVO CAMPO
  insuranceNumber?: string;  // Número de seguro médico
}
```

**Paso 2:** Agregar al formulario

```typescript
// src/components/MedicalRecordForm.tsx

// Agregar estado
const [insuranceNumber, setInsuranceNumber] = useState(
  record?.insuranceNumber || ''
);

// Agregar en la sección correspondiente del JSX:
<div className="space-y-2">
  <Label htmlFor="insuranceNumber">
    Número de Seguro
  </Label>
  <Input
    id="insuranceNumber"
    value={insuranceNumber}
    onChange={(e) => setInsuranceNumber(e.target.value)}
    placeholder="Ej: 1234567890"
  />
</div>
```

**Paso 3:** Incluir al guardar

```typescript
const handleSave = () => {
  const recordData: MedicalRecord = {
    // ... campos existentes ...
    insuranceNumber,  // Nuevo campo
  };

  // Guardar...
};
```

---

## 4. Modificar el Odontograma

### Ejemplo 1: Agregar nuevo símbolo dental "Implante"

**Paso 1:** Actualizar ToothState

```typescript
// src/types/index.ts
export interface ToothState {
  number: string;
  // ... símbolos existentes ...

  // NUEVO SÍMBOLO
  implant?: boolean;  // Indica si el diente es un implante
}
```

**Paso 2:** Agregar checkbox en el panel de edición

```typescript
// src/components/Odontogram.tsx

// En la sección de checkboxes:
<div className="flex items-center space-x-2">
  <Checkbox
    id="implant"
    checked={currentTooth?.implant || false}
    onCheckedChange={(checked) =>
      updateTooth(selectedTooth!, { implant: checked as boolean })
    }
  />
  <label htmlFor="implant">Implante</label>
</div>
```

**Paso 3:** Agregar representación visual

```typescript
// src/components/Tooth.tsx

// En la función de renderizado del diente:
{state.implant && (
  <text
    x="50%"
    y="50%"
    textAnchor="middle"
    dy=".3em"
    className="text-lg fill-purple-600 font-bold"
  >
    I  {/* Símbolo del implante */}
  </text>
)}
```

**Paso 4:** Actualizar leyenda

```typescript
// src/components/Odontogram.tsx

// En la sección de leyenda:
<div className="flex items-center gap-2">
  <span className="text-purple-600 font-bold">I</span>
  <span className="text-sm">Implante</span>
</div>
```

### Ejemplo 2: Agregar selector de color para cada diente

**Paso 1:** Actualizar ToothState

```typescript
export interface ToothState {
  // ... campos existentes ...
  color?: string;  // Color del diente (para resaltar)
}
```

**Paso 2:** Agregar selector de color

```typescript
// En Odontogram.tsx, panel de edición:
<div className="space-y-2">
  <Label>Color de Resaltado</Label>
  <Input
    type="color"
    value={currentTooth?.color || '#ffffff'}
    onChange={(e) =>
      updateTooth(selectedTooth!, { color: e.target.value })
    }
  />
</div>
```

**Paso 3:** Aplicar color al diente

```typescript
// En Tooth.tsx:
<rect
  x="5"
  y="5"
  width="40"
  height="50"
  rx="8"
  fill={state.color || 'white'}  // Usa el color personalizado
  stroke={isSelected ? '#3B82F6' : '#D1D5DB'}
  strokeWidth="2"
/>
```

---

## 5. Crear un Nuevo Rol de Usuario

### Ejemplo: Agregar rol "Asistente"

**Paso 1:** Actualizar el tipo UserRole

```typescript
// src/types/index.ts
export type UserRole = 'superadmin' | 'doctor' | 'patient' | 'assistant';
```

**Paso 2:** Actualizar lógica de login

```typescript
// src/contexts/AuthContext.tsx

const login = async (email: string, password: string) => {
  // ... código existente ...

  // Agregar detección de asistente
  if (email.includes('assistant')) {
    role = 'assistant';
    name = 'Asistente Dental';
  }

  // ... resto del código ...
};
```

**Paso 3:** Crear dashboard para asistente

```typescript
// src/app/dashboard/assistant/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';

export default function AssistantDashboard() {
  const { user } = useAuth();

  // Verificar que el usuario sea asistente
  if (user?.role !== 'assistant') {
    redirect('/');
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard del Asistente</h1>

      {/* Funcionalidades específicas del asistente */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* Tarjetas de acción */}
      </div>
    </div>
  );
}
```

**Paso 4:** Agregar acceso demo

```typescript
// src/components/Login.tsx

// En la sección de demos:
<Button
  variant="outline"
  onClick={() => onDemoLogin('assistant@demo.com', 'demo')}
>
  <UserCog className="w-5 h-5" />
  <span>Asistente</span>
</Button>
```

---

## 6. Agregar Validaciones

### Ejemplo 1: Validar cédula ecuatoriana

```typescript
// src/lib/validators.ts

/**
 * Valida cédula ecuatoriana (10 dígitos)
 * @param cedula - Número de cédula
 * @returns true si es válida
 */
export function validateEcuadorianID(cedula: string): boolean {
  // Debe tener exactamente 10 dígitos
  if (!/^\d{10}$/.test(cedula)) {
    return false;
  }

  const digits = cedula.split('').map(Number);
  const province = parseInt(cedula.substring(0, 2));

  // Provincia debe estar entre 01 y 24
  if (province < 1 || province > 24) {
    return false;
  }

  // Algoritmo de validación
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = digits[i];
    if (i % 2 === 0) {  // Posiciones impares
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  const verifier = (10 - (sum % 10)) % 10;
  return verifier === digits[9];
}
```

**Uso en formulario:**

```typescript
// En MedicalRecordForm.tsx
import { validateEcuadorianID } from '@/lib/validators';

const [idError, setIdError] = useState('');

const handleIdChange = (value: string) => {
  setIdentificationNumber(value);

  if (value && !validateEcuadorianID(value)) {
    setIdError('Cédula inválida');
  } else {
    setIdError('');
  }
};

// En el JSX:
<Input
  value={identificationNumber}
  onChange={(e) => handleIdChange(e.target.value)}
/>
{idError && <p className="text-red-500 text-sm">{idError}</p>}
```

### Ejemplo 2: Validar edad mínima

```typescript
// src/lib/validators.ts

/**
 * Valida que una fecha de nacimiento corresponda a edad mínima
 * @param birthDate - Fecha de nacimiento (string ISO)
 * @param minAge - Edad mínima requerida
 */
export function validateMinimumAge(birthDate: string, minAge: number): boolean {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= minAge;
}
```

---

## 7. Conectar con el Backend

### Ejemplo Completo: Endpoint de Pacientes

**Paso 1:** Crear servicio de API

```typescript
// src/services/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Obtener token del localStorage
 */
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

/**
 * Servicio de API para pacientes
 */
export const patientsAPI = {
  /**
   * Obtener todos los pacientes
   */
  async getAll(): Promise<Patient[]> {
    const response = await fetch(`${API_URL}/patients`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener pacientes');
    }

    return await response.json();
  },

  /**
   * Obtener un paciente por ID
   */
  async getById(id: string): Promise<Patient> {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Paciente no encontrado');
    }

    return await response.json();
  },

  /**
   * Crear nuevo paciente
   */
  async create(data: Omit<Patient, 'id' | 'createdAt'>): Promise<Patient> {
    const response = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al crear paciente');
    }

    return await response.json();
  },

  /**
   * Actualizar paciente existente
   */
  async update(id: string, data: Partial<Patient>): Promise<Patient> {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar paciente');
    }

    return await response.json();
  },

  /**
   * Eliminar paciente
   */
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar paciente');
    }
  },
};
```

**Paso 2:** Usar en componente

```typescript
// src/components/PatientsList.tsx
'use client';

import { useState, useEffect } from 'react';
import { Patient } from '@/types';
import { patientsAPI } from '@/services/api';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar pacientes al montar el componente
  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      setLoading(true);
      setError(null);
      const data = await patientsAPI.getAll();
      setPatients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  // Eliminar paciente
  async function handleDelete(id: string) {
    if (!confirm('¿Seguro que deseas eliminar este paciente?')) {
      return;
    }

    try {
      await patientsAPI.delete(id);
      // Recargar lista
      await loadPatients();
    } catch (err) {
      alert('Error al eliminar paciente');
    }
  }

  // Mostrar loading
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Cargando pacientes...</span>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={loadPatients}>Reintentar</Button>
      </div>
    );
  }

  // Mostrar lista
  return (
    <div className="space-y-4">
      {patients.map(patient => (
        <div key={patient.id} className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-sm text-gray-600">{patient.email}</p>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(patient.id)}
            className="mt-2"
          >
            Eliminar
          </Button>
        </div>
      ))}
    </div>
  );
}
```

---

## 8. Debugging y Solución de Problemas

### Técnica 1: console.log Estratégico

```typescript
// ❌ Malo:
console.log(data);

// ✅ Bueno:
console.log('📥 Datos recibidos del API:', data);
console.log('🔍 Usuario actual:', user);
console.log('⚠️ Error en validación:', error);
```

### Técnica 2: Usar React DevTools

1. Instalar extensión: [React Developer Tools](https://react.dev/learn/react-developer-tools)
2. Abrir DevTools (F12)
3. Pestaña "Components" para ver props y estado
4. Pestaña "Profiler" para medir rendimiento

### Técnica 3: Verificar Tipos

```typescript
// Ver el tipo de una variable:
const patient: Patient = { /* ... */ };
console.log('Tipo:', typeof patient);  // "object"
console.log('Es Patient?:', patient.id !== undefined);

// TypeScript te ayudará en el editor mostrando errores
```

### Problemas Comunes y Soluciones

#### Problema: "Hydration failed"

```typescript
// ❌ Malo: usar localStorage directamente
const Component = () => {
  const [data] = useState(localStorage.getItem('key'));
  return <div>{data}</div>;
};

// ✅ Bueno: usar useEffect
const Component = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    setData(localStorage.getItem('key') || '');
  }, []);

  return <div>{data}</div>;
};
```

#### Problema: "Cannot read property 'map' of undefined"

```typescript
// ❌ Malo:
return patients.map(p => <div key={p.id}>{p.name}</div>);

// ✅ Bueno:
return (patients || []).map(p => <div key={p.id}>{p.name}</div>);

// ✅ Mejor:
if (!patients) return <div>Cargando...</div>;
return patients.map(p => <div key={p.id}>{p.name}</div>);
```

#### Problema: Estado no se actualiza

```typescript
// ❌ Malo: mutar estado directamente
const addPatient = (patient) => {
  patients.push(patient);  // NO FUNCIONA
  setPatients(patients);
};

// ✅ Bueno: crear nuevo array
const addPatient = (patient) => {
  setPatients([...patients, patient]);
};
```

---

## 📝 Checklist de Nuevas Features

Cuando agregues una nueva funcionalidad, verifica:

- [ ] ¿Actualicé los tipos TypeScript en `src/types/index.ts`?
- [ ] ¿Agregué comentarios explicando qué hace el código?
- [ ] ¿Manejé casos de error?
- [ ] ¿Agregué loading states?
- [ ] ¿Validé los inputs del usuario?
- [ ] ¿Probé en mobile (responsive)?
- [ ] ¿Funciona sin backend (con mocks)?
- [ ] ¿Documenté los cambios en este archivo?

---

## 🚨 Buenas Prácticas

### 1. Nombres Descriptivos

```typescript
// ❌ Malo
const d = new Date();
const fn = (x) => x * 2;

// ✅ Bueno
const currentDate = new Date();
const doubleValue = (value: number) => value * 2;
```

### 2. Componentes Pequeños

```typescript
// ❌ Malo: Componente gigante de 500 líneas

// ✅ Bueno: Dividir en componentes más pequeños
function PatientPage() {
  return (
    <div>
      <PatientHeader />
      <PatientInfo />
      <PatientActions />
    </div>
  );
}
```

### 3. No Repetir Código (DRY)

```typescript
// ❌ Malo: Código repetido
const patient1 = await fetch('/api/patients/1').then(r => r.json());
const patient2 = await fetch('/api/patients/2').then(r => r.json());

// ✅ Bueno: Función reutilizable
async function getPatient(id: string) {
  const response = await fetch(`/api/patients/${id}`);
  return await response.json();
}

const patient1 = await getPatient('1');
const patient2 = await getPatient('2');
```

---

**¡Listo!** Con esta guía tienes ejemplos prácticos para las tareas más comunes.

**¿Necesitas ayuda?**
1. Revisa `DOCUMENTACION_TECNICA.md` para conceptos
2. Busca ejemplos similares en el código existente
3. Consulta la documentación oficial de las tecnologías

---

**Última actualización:** Noviembre 2024
