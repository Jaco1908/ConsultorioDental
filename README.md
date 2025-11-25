# DentalSys - Sistema Odontológico Integral

Sistema completo de gestión para clínicas dentales desarrollado con Next.js 15, React 18, TypeScript y Tailwind CSS.

## 🚀 Tecnologías Utilizadas

- **Frontend Framework**: Next.js 15 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Autoprefixer + PostCSS
- **Component Library**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Form Management**: React Hook Form
- **Date Picker**: react-day-picker

## 📦 Instalación

### Requisitos Previos
- **Node.js** 20.x o superior
- **npm** o **yarn**

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd FrontEnd-clinicadental
   ```

2. **Instalar todas las dependencias:**
   ```bash
   npm install
   ```

3. **Verificar que Tailwind CSS y PostCSS estén instalados** (ya incluidos en package.json):
   ```bash
   # Estas dependencias ya están en package.json, pero si necesitas reinstalarlas:
   npm install -D tailwindcss postcss autoprefixer
   ```

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir el navegador:**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo (puerto 3000)
npm run build    # Crea build optimizado para producción
npm run start    # Ejecuta el build de producción
npm run lint     # Ejecuta ESLint para verificar código
```

## 🔐 Accesos Demo

Para probar el sistema sin backend, usa los **botones de acceso demo** en la página de login:

### 👨‍💼 Superadmin
- **Email:** `superadmin@demo.com`
- **Password:** `demo`
- **Acceso:** Dashboard de administración global del sistema

### 👨‍⚕️ Doctor (Odontólogo)
- **Email:** `doctor@demo.com`
- **Password:** `demo`
- **Acceso:** Dashboard médico con todas las funcionalidades clínicas

### 👤 Paciente
- **Email:** `paciente@demo.com`
- **Password:** `demo`
- **Acceso:** Dashboard del paciente con vista limitada

> **💡 Tip:** Los botones demo NO guardan la sesión, permitiendo cambiar fácilmente entre roles para demostración.

## 🎯 Funcionalidades Implementadas

### ✅ Sistema de Autenticación
- Login con validación de formularios
- Context API para gestión de estado global
- Protección de rutas por rol de usuario
- Persistencia opcional de sesión con localStorage
- 3 roles de usuario: Superadmin, Doctor, Paciente
- Botones de acceso demo para presentaciones

### ✅ Dashboard del Doctor
- Vista general con métricas en tiempo real
- Panel de próximas citas del día
- Sistema de alertas y notificaciones
- Navegación rápida a módulos principales
- Función de logout segura

### ✅ Historias Clínicas (⭐ Funcionalidad Principal)
- **Listado completo** con búsqueda por paciente o número
- **Formulario profesional** con 12 secciones:
  1. **Datos del Paciente** - Información personal y establecimiento
  2. **Motivo de Consulta** - Razón de la visita
  3. **Enfermedad o Problema Actual** - Síntomas, cronología, localización
  4. **Antecedentes** - Médicos, alergias, enfermedades previas
  5. **Signos Vitales** - Presión arterial, temperatura, frecuencia cardíaca
  6. **Examen Estomatognático** - Evaluación completa (labios, lengua, etc.)
  7. **Odontograma Interactivo** ⭐ - 32 permanentes + 20 temporales
  8. **Indicadores de Salud Bucal** - Higiene, periodontal, maloclusión
  9. **Índices CPO-ceo** - Cálculo automático de salud dental
  10. **Planes** - Diagnóstico, terapéutico y educacional
  11. **Diagnóstico** - Presuntivo y definitivo con códigos CIE-10
  12. **Tratamiento por Sesiones** - Registro detallado con prescripciones
- **Guardado de borrador** durante edición
- **Sistema de tabs** para navegación intuitiva entre secciones

### ✅ Odontograma Interactivo
- Visualización profesional de **32 dientes permanentes** y **20 temporales**
- **Símbolos dentales estándar:**
  - Caries (○)
  - Obturado/Restaurado (●)
  - Endodoncia (△)
  - Corona (⊡)
  - Extracción indicada (✕)
  - Sellante (*)
  - Prótesis Total
- **Registro de:**
  - Movilidad dental (escala 0-3)
  - Recesión gingival (mm)
- **Controles interactivos:**
  - Zoom in/out
  - Panel de edición por pieza dental
  - Selección y marcado visual
  - Leyenda de símbolos

### ✅ Dashboards Adicionales
- **Dashboard Superadmin:** Gestión global del sistema
- **Dashboard Paciente:** Vista personalizada para clientes

## 📁 Estructura del Proyecto

> **Ver estructura detallada en:** [ESTRUCTURA_PROYECTO.md](./ESTRUCTURA_PROYECTO.md)

```
FrontEnd-clinicadental/
├── docs/                             # Documentación adicional
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Layout principal
│   │   ├── page.tsx                  # Página de login
│   │   ├── globals.css               # Estilos globales ⭐
│   │   └── dashboard/                # Rutas de dashboards
│   │       ├── doctor/               # Dashboard del doctor
│   │       ├── patient/              # Dashboard del paciente
│   │       └── superadmin/           # Dashboard del superadmin
│   │
│   ├── components/                   # Componentes organizados ⭐
│   │   ├── common/                   # Componentes compartidos
│   │   │   ├── Login.tsx
│   │   │   └── LogoutConfirmDialog.tsx
│   │   ├── dashboards/               # Dashboards por rol
│   │   │   ├── DoctorDashboard.tsx
│   │   │   ├── PatientDashboard.tsx
│   │   │   └── SuperadminDashboard.tsx
│   │   ├── medical/                  # Componentes médicos
│   │   │   ├── MedicalRecordForm.tsx
│   │   │   ├── Odontogram.tsx
│   │   │   ├── Tooth.tsx
│   │   │   └── DentalSymbol.tsx
│   │   ├── modules/                  # Módulos funcionales
│   │   │   ├── AppointmentCalendar.tsx
│   │   │   ├── BillingModule.tsx
│   │   │   ├── PatientsList.tsx
│   │   │   └── ReportsModule.tsx
│   │   └── ui/                       # shadcn/ui (52 componentes)
│   │
│   ├── contexts/                     # Contextos React
│   │   └── AuthContext.tsx
│   ├── types/                        # TypeScript
│   │   └── index.ts
│   └── lib/                          # Utilidades
│       └── utils.ts
│
├── LEEME_PRIMERO.md                  # 👈 Empieza aquí
├── DOCUMENTACION_TECNICA.md          # Documentación completa
├── GUIA_DESARROLLO.md                # Ejemplos prácticos
├── ESTRUCTURA_PROYECTO.md            # Estructura detallada
└── package.json                      # Dependencias
```

## 📋 Roadmap (Pendiente de Implementación)

### 🔴 Alta Prioridad
- [ ] Mejorar validaciones del formulario de historia clínica
- [ ] Cálculo automático de índices CPO-ceo desde odontograma
- [ ] Vista de impresión de historia clínica (PDF)
- [ ] Página pública (Landing Page) con información de la clínica
- [ ] Completar dashboard del paciente
- [ ] Completar dashboard del superadmin

### 🟡 Media Prioridad
- [ ] CRUD completo de gestión de pacientes
- [ ] Calendario de citas completo con disponibilidad
- [ ] Módulo de facturación funcional
- [ ] Reportes y métricas avanzadas
- [ ] Sistema de registro de pacientes
- [ ] Recuperación de contraseña
- [ ] Gestión de blog/promociones para doctores

### 🟢 Baja Prioridad (Requiere Backend)
- [ ] Integración con API REST (NestJS)
- [ ] Conexión con base de datos PostgreSQL
- [ ] Facturación electrónica real
- [ ] Notificaciones push en tiempo real
- [ ] Sistema de mensajería doctor-paciente
- [ ] Multi-tenancy para múltiples clínicas
- [ ] Backup automático de datos
- [ ] Exportación de reportes a PDF/Excel

## 📝 Notas Importantes

### ⚠️ Mock Data
Actualmente el sistema funciona con **datos simulados (mock)** para permitir la demostración del prototipo sin necesidad de backend. Los datos se almacenan temporalmente en `localStorage` del navegador y se pierden al limpiar la cache.

### 🔌 Backend Pendiente
Este es **solo el frontend**. El backend con NestJS, PostgreSQL y autenticación JWT está **pendiente de implementación**. La arquitectura actual ya está preparada para conectarse a una API REST.

### 🔒 Seguridad
- Las validaciones actuales son básicas
- Antes de producción se debe implementar validación robusta (Zod/Yup)
- El sistema de autenticación actual es solo para demo
- Se requiere implementar autenticación real con JWT

## 🐛 Solución de Problemas

### Problema: Error de módulos no encontrados
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problema: Puerto 3000 en uso
```bash
# El servidor usará automáticamente el puerto 3001 o superior
# O puedes matar el proceso:
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### Problema: Errores de compilación de Tailwind
```bash
# Reinstalar dependencias de Tailwind
npm install -D tailwindcss postcss autoprefixer
```

### Problema: Se redirige automáticamente al dashboard
```bash
# Limpia el localStorage desde la consola del navegador (F12):
localStorage.clear()
# Luego recarga la página (F5)
```

## 🎨 Personalización

### Cambiar colores del tema
Edita `src/app/globals.css` para modificar las variables CSS:
```css
:root {
  --primary: 222.2 47.4% 11.2%;  /* Color principal */
  --secondary: 210 40% 96.1%;    /* Color secundario */
  /* ... más variables */
}
```

### Agregar componentes de shadcn/ui
```bash
npx shadcn@latest add [component-name]
```

## 📄 Licencia

Este proyecto es privado y confidencial. Todos los derechos reservados.

## 👥 Equipo

Desarrollado para **Clínica Dental** como sistema de gestión integral.

---

**Versión:** 0.1.0
**Última actualización:** Noviembre 2024
**Estado:** ✅ Prototipo funcional - Listo para demostración

---

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- **DEMO.md** - Guía completa para presentaciones al cliente
