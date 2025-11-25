# 📁 Estructura del Proyecto - DentalSys

## 🎯 Organización Optimizada

Este proyecto ha sido reorganizado para facilitar el mantenimiento y escalabilidad.

---

## 📂 Estructura Completa

```
FrontEnd-clinicadental/
│
├── 📁 docs/                          # Documentación adicional
│   ├── Attributions.md               # Atribuciones de recursos
│   └── Guidelines.md                 # Guías de desarrollo
│
├── 📁 public/                        # Archivos estáticos
│
├── 📁 src/
│   │
│   ├── 📁 app/                       # Next.js App Router (páginas)
│   │   ├── layout.tsx                # Layout principal
│   │   ├── page.tsx                  # Página de login (/)
│   │   ├── globals.css               # Estilos globales ⭐
│   │   │
│   │   └── 📁 dashboard/             # Rutas de dashboards
│   │       ├── doctor/               # Dashboard del doctor
│   │       │   ├── page.tsx          # /dashboard/doctor
│   │       │   └── medical-records/  # /dashboard/doctor/medical-records
│   │       ├── patient/              # Dashboard del paciente
│   │       └── superadmin/           # Dashboard del superadmin
│   │
│   ├── 📁 components/                # Componentes React organizados ⭐
│   │   │
│   │   ├── 📁 common/                # Componentes compartidos
│   │   │   ├── Login.tsx             # Pantalla de login
│   │   │   ├── LogoutConfirmDialog.tsx
│   │   │   └── index.ts              # Exportaciones
│   │   │
│   │   ├── 📁 dashboards/            # Componentes de dashboards
│   │   │   ├── DoctorDashboard.tsx
│   │   │   ├── PatientDashboard.tsx
│   │   │   ├── SuperadminDashboard.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 medical/               # Componentes médicos/odontológicos
│   │   │   ├── MedicalRecordForm.tsx # Formulario de historia clínica
│   │   │   ├── Odontogram.tsx        # Odontograma interactivo
│   │   │   ├── Tooth.tsx             # Diente individual
│   │   │   ├── DentalSymbol.tsx      # Símbolos dentales
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 modules/               # Módulos funcionales
│   │   │   ├── AppointmentCalendar.tsx # Calendario de citas
│   │   │   ├── BillingModule.tsx       # Facturación
│   │   │   ├── PatientsList.tsx        # Lista de pacientes
│   │   │   ├── ReportsModule.tsx       # Reportes
│   │   │   └── index.ts
│   │   │
│   │   └── 📁 ui/                    # Componentes UI (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       └── ... (52 componentes)
│   │
│   ├── 📁 contexts/                  # Contextos de React
│   │   └── AuthContext.tsx           # Contexto de autenticación ⭐
│   │
│   ├── 📁 types/                     # Definiciones TypeScript
│   │   └── index.ts                  # Todas las interfaces ⭐
│   │
│   └── 📁 lib/                       # Utilidades
│       └── utils.ts                  # Funciones helper
│
├── 📄 LEEME_PRIMERO.md               # Punto de entrada
├── 📄 DOCUMENTACION_TECNICA.md       # Documentación técnica
├── 📄 GUIA_DESARROLLO.md             # Guía de desarrollo
├── 📄 ESTRUCTURA_PROYECTO.md         # Este archivo
│
├── 📄 package.json                   # Dependencias
├── 📄 tsconfig.json                  # Config TypeScript
├── 📄 tailwind.config.ts             # Config Tailwind
└── 📄 next.config.ts                 # Config Next.js
```

---

## 🗂️ Organización de Componentes

### ✅ Principios de Organización

Los componentes están organizados por **propósito funcional**:

#### 1. `src/components/common/`
**Componentes compartidos en toda la aplicación**
- Login
- LogoutConfirmDialog
- Otros componentes reutilizables

#### 2. `src/components/dashboards/`
**Componentes de dashboard específicos por rol**
- DoctorDashboard → Vista principal del doctor
- PatientDashboard → Vista principal del paciente
- SuperadminDashboard → Vista principal del admin

#### 3. `src/components/medical/`
**Componentes relacionados con funcionalidad médica/odontológica**
- MedicalRecordForm → Formulario de historia clínica
- Odontogram → Odontograma interactivo
- Tooth → Diente individual
- DentalSymbol → Símbolos dentales

#### 4. `src/components/modules/`
**Módulos funcionales del sistema**
- AppointmentCalendar → Gestión de citas
- BillingModule → Facturación
- PatientsList → Listado de pacientes
- ReportsModule → Reportes y métricas

#### 5. `src/components/ui/`
**Componentes UI de shadcn/ui**
- Componentes de diseño reutilizables
- No modificar directamente
- Usar como están o crear wrappers

---

## 📦 Sistema de Imports

### Imports Optimizados con Index Files

Cada carpeta de componentes tiene un archivo `index.ts` que facilita los imports:

```typescript
// ❌ Antes (importar componente individual)
import { DoctorDashboard } from '@/components/dashboards/DoctorDashboard';

// ✅ Después (importar desde index)
import { DoctorDashboard } from '@/components/dashboards';
```

### Rutas de Import Recomendadas

```typescript
// Componentes comunes
import { Login, LogoutConfirmDialog } from '@/components/common';

// Dashboards
import { DoctorDashboard, PatientDashboard, SuperadminDashboard } from '@/components/dashboards';

// Componentes médicos
import { MedicalRecordForm, Odontogram, Tooth } from '@/components/medical';

// Módulos
import { AppointmentCalendar, BillingModule, PatientsList, ReportsModule } from '@/components/modules';

// UI
import { Button, Input, Card } from '@/components/ui';

// Contextos
import { useAuth } from '@/contexts/AuthContext';

// Tipos
import type { User, Patient, MedicalRecord } from '@/types';
```

---

## 🎨 Archivos de Estilos

### ✅ Archivo Único de Estilos

Eliminados archivos CSS duplicados. Solo existe:

```
src/app/globals.css  → Único archivo de estilos globales
```

**Eliminados:**
- ❌ `src/index.css` (duplicado)
- ❌ `src/styles/globals.css` (duplicado)

---

## 📁 Carpetas Eliminadas

Las siguientes carpetas estaban vacías o no se usaban:

- ❌ `src/services/` → Vacía (se creará cuando se conecte backend)
- ❌ `src/components/figma/` → Componente no utilizado
- ❌ `src/styles/` → CSS duplicado
- ❌ `src/guidelines/` → Movido a `docs/`

---

## 🚀 Ventajas de esta Estructura

### 1. Escalabilidad
- Fácil agregar nuevos componentes en la categoría correcta
- Estructura clara para equipos grandes

### 2. Mantenibilidad
- Componentes agrupados por funcionalidad
- Más fácil encontrar lo que necesitas

### 3. Legibilidad
- Imports más claros y concisos
- Menos confusión sobre dónde va cada cosa

### 4. Performance
- Builds más rápidos
- Menos archivos innecesarios

---

## 📝 Guía de Uso

### ¿Dónde agregar un nuevo componente?

**Pregúntate:**

1. **¿Es un componente compartido genérico?**
   → `src/components/common/`
   - Ejemplo: Modal, Notification, Header

2. **¿Es específico de un dashboard?**
   → `src/components/dashboards/`
   - Ejemplo: ReceptionistDashboard (nuevo rol)

3. **¿Es funcionalidad médica/odontológica?**
   → `src/components/medical/`
   - Ejemplo: PrescriptionForm, DiagnosisPanel

4. **¿Es un módulo funcional del sistema?**
   → `src/components/modules/`
   - Ejemplo: InventoryModule, MessagingModule

5. **¿Es un componente de UI genérico?**
   → `src/components/ui/`
   - Usar shadcn/ui: `npx shadcn@latest add [component]`

### Ejemplo: Agregar Módulo de Inventario

```bash
# 1. Crear componente
src/components/modules/InventoryModule.tsx

# 2. Agregar export en index
# src/components/modules/index.ts
export { InventoryModule } from './InventoryModule';

# 3. Usar en página
import { InventoryModule } from '@/components/modules';
```

---

## 🔄 Migración de Código Antiguo

Si tienes código que usa la estructura antigua:

```typescript
// ❌ Estructura antigua
import { Login } from '@/components/Login';
import { DoctorDashboard } from '@/components/DoctorDashboard';
import { Odontogram } from '@/components/Odontogram';

// ✅ Nueva estructura
import { Login } from '@/components/common';
import { DoctorDashboard } from '@/components/dashboards';
import { Odontogram } from '@/components/medical';
```

---

## ✅ Checklist de Estructura

Al crear nuevos archivos, verifica:

- [ ] ¿Está en la carpeta correcta según su función?
- [ ] ¿Agregaste el export en el `index.ts` correspondiente?
- [ ] ¿Usas rutas absolutas (`@/...`) en lugar de relativas?
- [ ] ¿Los imports UI usan `@/components/ui/`?

---

## 📞 Ayuda

Si no estás seguro dónde va algo:
1. Revisa componentes similares existentes
2. Consulta esta documentación
3. Pregunta al equipo

---

**Última actualización:** Noviembre 2024
**Versión:** 1.0 (Estructura optimizada)
