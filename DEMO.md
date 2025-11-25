# 🎯 Guía de Demostración - DentalSys

Esta guía te ayudará a demostrar el prototipo a tu cliente de manera efectiva.
## Isntalar Antes
```bash 
npm install tailwindcss
```
```bash 
npm install autoprefixer postcss
```

## 🚀 Inicio Rápido

1. **Inicia el servidor:**
   ```bash
   npm run dev
   ```

2. **Abre el navegador:**
   - Ve a: `http://localhost:3000`

## 🔐 Accesos Demo (Botones en la Página de Login)

En la página de inicio verás 3 botones de acceso demo:

### 1️⃣ **Superadmin** (Super Admin)
- **Email:** `superadmin@demo.com`
- **Password:** `demo`
- **Qué ver:**
  - Dashboard con métricas globales
  - Gestión de clínicas
  - Gestión de usuarios
  - Configuración del sistema
  - Logs y auditoría

### 2️⃣ **Doctor** (Odontólogo)
- **Email:** `doctor@demo.com`
- **Password:** `demo`
- **Qué ver:**
  - Dashboard con métricas de la clínica
  - 📋 **Historias Clínicas** ⭐ (Funcionalidad principal)
  - Gestión de pacientes
  - Calendario de citas
  - Facturación
  - Reportes
  - Blog/Promociones

### 3️⃣ **Paciente** (Cliente)
- **Email:** `paciente@demo.com`
- **Password:** `demo`
- **Qué ver:**
  - Dashboard del paciente
  - Mis citas
  - Historial médico (vista limitada)
  - Facturas y pagos
  - Perfil

## ⭐ Funcionalidades Implementadas para Demostrar

### 🏥 **1. Historias Clínicas (LA MÁS IMPORTANTE)**

**Cómo acceder:**
1. Login como **Doctor**
2. Click en "Historias Clínicas" en el menú lateral
3. Verás el listado de historias

**Qué mostrar:**
- ✅ **Listado** con búsqueda
- ✅ **Formulario completo** con 12 secciones:
  1. Datos del Paciente
  2. Motivo de Consulta
  3. Enfermedad o Problema Actual
  4. Antecedentes (médicos, alergias)
  5. Signos Vitales (presión, temperatura, etc.)
  6. Examen Estomatognático (labios, lengua, etc.)
  7. **Odontograma Interactivo** ⭐
  8. Indicadores de Salud Bucal
  9. Índices CPO-ceo
  10. Planes (diagnóstico, terapéutico, educacional)
  11. Diagnóstico (con códigos CIE-10)
  12. Tratamiento por Sesiones

**Características del Odontograma:**
- 32 dientes permanentes
- 20 dientes temporales
- Símbolos: Caries, Obturado, Endodoncia, Corona, Extracción, Sellante
- Movilidad y Recesión
- Zoom in/out
- Panel de control para editar cada pieza

### 📊 **2. Dashboard del Doctor**

**Qué mostrar:**
- Métricas en tiempo real (simuladas)
- Próximas citas del día
- Alertas importantes
- Navegación rápida a módulos

### 👥 **3. Sistema de Roles**

**Demostración:**
1. Haz logout (botón rojo en el menú)
2. En la página de login, usa los 3 botones demo
3. Muestra cómo cada rol tiene interfaces diferentes

## 📝 Notas Importantes para la Demo

### ✅ **Funciona Sin Backend**
- Todos los datos son simulados (mock)
- No necesitas base de datos
- Perfecto para prototipos

### ⚠️ **Datos No Persisten**
- Los cambios en formularios se pierden al recargar
- Es solo para demostración visual

### 🎨 **Diseño Profesional**
- Interfaz moderna y limpia
- Responsive (funciona en móvil)
- Colores corporativos (azul #1976D2)

## 🗣️ Guión de Presentación Sugerido

### **Inicio (2 min)**
1. Muestra la página de login
2. Explica los 3 roles del sistema
3. Menciona que es un prototipo funcional

### **Demo Doctor (8 min)** ⭐ ENFOQUE PRINCIPAL
1. **Login como Doctor**
2. **Dashboard:**
   - "Aquí el doctor ve sus métricas diarias"
   - "Próximas citas de hoy"
   - "Alertas importantes"

3. **Historias Clínicas:** (DEDICAR MÁS TIEMPO)
   - "Click en Historias Clínicas"
   - "Listado con búsqueda"
   - "Click en Nueva Historia o Ver/Editar"
   - Muestra las 12 secciones navegando con tabs
   - **ODONTOGRAMA:**
     - "Este es el odontograma interactivo"
     - Click en un diente
     - Marca caries, obturado, etc.
     - Muestra zoom
     - "Todos los símbolos dentales estándar"

4. **Otros Módulos:**
   - Menciona brevemente: Pacientes, Citas, Facturación

### **Demo Rápida Otros Roles (2 min)**
1. Logout
2. Login como Superadmin: "Gestión global del sistema"
3. Login como Paciente: "Vista del paciente"

### **Cierre (1 min)**
- Menciona que falta integrar el backend (NestJS)
- Siguiente fase: Conectar con base de datos real
- Preguntas

## 🎯 Puntos Clave a Destacar

1. **Sistema Completo:** 3 roles diferentes
2. **Historia Clínica Profesional:** Basada en estándares odontológicos
3. **Odontograma Interactivo:** Fácil de usar
4. **Diseño Moderno:** Interfaz intuitiva
5. **Escalable:** Arquitectura Next.js lista para producción
6. **Tecnología Moderna:** React 18, TypeScript, Tailwind CSS

## 🐛 Si Algo No Funciona

### **Problema: Se redirige automáticamente**
**Solución:** Abre el navegador en modo incógnito o limpia el localStorage:
```javascript
// En la consola del navegador (F12):
localStorage.clear()
// Luego recarga la página (F5)
```

### **Problema: Error 404**
**Solución:** Verifica que el servidor esté corriendo en el puerto correcto:
- Puerto 3000: `http://localhost:3000`
- Si usa otro puerto, verifica la terminal

### **Problema: Botones demo no funcionan**
**Solución:**
1. Verifica la consola del navegador (F12)
2. Recarga la página (F5)
3. Si persiste, reinicia el servidor (Ctrl+C y `npm run dev`)

## 📞 Contacto

Si tienes problemas durante la demo, verifica:
1. Terminal - sin errores de compilación
2. Consola del navegador (F12) - sin errores en rojo
3. Puerto correcto (3000 por defecto)

---

**¡Éxito en tu presentación!** 🚀
