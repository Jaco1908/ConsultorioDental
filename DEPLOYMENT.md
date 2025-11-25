# 📤 Guía de Deployment a GitHub

Esta guía te ayudará a subir correctamente el proyecto a GitHub.

## ✅ Checklist Pre-Deploy

Antes de subir a GitHub, verifica que:

- [ ] El servidor funciona correctamente (`npm run dev`)
- [ ] No hay errores de compilación
- [ ] Todas las dependencias están en `package.json`
- [ ] El `.gitignore` está configurado
- [ ] No hay archivos sensibles (claves, tokens, etc.)

## 🚀 Pasos para Subir a GitHub

### 1. Inicializar Git (si no está inicializado)

```bash
# Verifica si ya tienes git inicializado
git status

# Si no está inicializado:
git init
```

### 2. Agregar archivos al staging

```bash
# Agregar todos los archivos (excepto los del .gitignore)
git add .

# Verificar qué archivos se agregarán
git status
```

### 3. Crear el primer commit

```bash
git commit -m "Initial commit: DentalSys frontend con Next.js 15"
```

### 4. Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Click en **"New repository"**
3. Nombre sugerido: `dentalsys-frontend`
4. Descripción: `Sistema Odontológico Integral - Frontend con Next.js 15`
5. **NO inicialices con README** (ya tienes uno)
6. Click en **"Create repository"**

### 5. Conectar con el repositorio remoto

```bash
# Reemplaza <tu-usuario> con tu nombre de usuario de GitHub
git remote add origin https://github.com/<tu-usuario>/dentalsys-frontend.git

# Verificar que se agregó correctamente
git remote -v
```

### 6. Subir el código

```bash
# Primera vez (crea la rama main)
git branch -M main
git push -u origin main

# Siguientes veces (solo):
git push
```

## 📋 Archivos que SE SUBEN a GitHub

Estos archivos SÍ se incluyen en el repositorio:

```
✅ src/                  # Todo el código fuente
✅ public/               # Archivos estáticos
✅ package.json          # Dependencias
✅ package-lock.json     # Lock de versiones
✅ next.config.ts        # Configuración Next.js
✅ tailwind.config.ts    # Configuración Tailwind
✅ postcss.config.mjs    # Configuración PostCSS
✅ tsconfig.json         # Configuración TypeScript
✅ .eslintrc.json        # Configuración ESLint
✅ .gitignore            # Lista de archivos ignorados
✅ README.md             # Documentación principal
✅ DEMO.md               # Guía de demostración
✅ DEPLOYMENT.md         # Esta guía
```

## 🚫 Archivos que NO se suben (están en .gitignore)

Estos archivos se ignoran automáticamente:

```
❌ node_modules/         # Dependencias (muy pesado)
❌ .next/                # Build de Next.js
❌ build/                # Build de producción
❌ .env*.local           # Variables de entorno locales
❌ *.log                 # Logs
❌ .DS_Store             # Archivos de sistema Mac
```

## 🔄 Actualizaciones Futuras

Cuando hagas cambios y quieras subirlos:

```bash
# 1. Ver qué archivos cambiaron
git status

# 2. Agregar archivos modificados
git add .

# 3. Crear commit con mensaje descriptivo
git commit -m "feat: Agregar módulo de facturación"

# 4. Subir cambios
git push
```

### Convención de commits sugerida:

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de estilo (formato, espacios)
- `refactor:` Refactorización de código
- `test:` Agregar tests
- `chore:` Tareas de mantenimiento

Ejemplos:
```bash
git commit -m "feat: Agregar odontograma interactivo"
git commit -m "fix: Corregir validación en login"
git commit -m "docs: Actualizar README con instalación"
```

## 🌿 Trabajar con Ramas (Opcional)

Para desarrollo organizado:

```bash
# Crear rama para nueva feature
git checkout -b feature/landing-page

# Hacer cambios y commits
git add .
git commit -m "feat: Crear landing page"

# Subir la rama
git push -u origin feature/landing-page

# Luego en GitHub crear Pull Request para merge a main
```

## 🔐 Seguridad - IMPORTANTE

### ⚠️ NUNCA subas estos archivos:

- ❌ Archivos `.env` con claves reales
- ❌ Tokens o API keys
- ❌ Credenciales de base de datos
- ❌ Certificados SSL privados
- ❌ Información personal sensible

### ✅ Si necesitas variables de entorno:

1. Crea `.env.example` con variables de ejemplo:
   ```
   NEXT_PUBLIC_API_URL=https://api.example.com
   DATABASE_URL=postgresql://user:password@localhost:5432/db
   ```

2. Agrega `.env` al `.gitignore` (ya está)

3. Documenta en el README qué variables se necesitan

## 📊 Verificación Post-Deploy

Después de subir a GitHub:

1. **Verifica que el repositorio se vea bien:**
   - El README se muestra correctamente
   - Los archivos están organizados
   - No hay archivos sensibles

2. **Prueba clonar en otra carpeta:**
   ```bash
   cd ..
   git clone https://github.com/<tu-usuario>/dentalsys-frontend.git test-clone
   cd test-clone
   npm install
   npm run dev
   ```

3. **Verifica que funciona:**
   - El servidor inicia correctamente
   - No faltan dependencias
   - La aplicación carga en el navegador

## 🎯 Próximos Pasos

Después de subir a GitHub:

- [ ] Agregar badges al README (build status, versión, etc.)
- [ ] Configurar GitHub Actions para CI/CD
- [ ] Configurar deployment automático a Vercel
- [ ] Agregar CONTRIBUTING.md si esperas colaboradores
- [ ] Crear issues para tareas pendientes
- [ ] Agregar Projects para tracking

## 🚀 Deploy a Producción (Vercel)

Cuando esté listo para producción:

1. Ve a [Vercel](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Vercel detectará automáticamente Next.js
4. Click en "Deploy"
5. ¡Listo! Tu app estará en línea

### Variables de entorno en Vercel:

1. En el dashboard de Vercel → Settings → Environment Variables
2. Agrega las variables que necesites
3. Redeploy el proyecto

## 📞 Ayuda

Si tienes problemas:

1. Verifica el `.gitignore` esté correcto
2. Asegúrate de que `node_modules/` no se esté subiendo
3. Si el push es muy lento, verifica que no estés subiendo archivos grandes
4. Para problemas de autenticación: configura SSH keys o Personal Access Token

---

**¡Éxito con tu deployment!** 🚀

Si tienes dudas, consulta la [documentación de Git](https://git-scm.com/doc) o [GitHub Docs](https://docs.github.com).
