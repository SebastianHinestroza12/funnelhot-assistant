# 🤖 Funnelhot AI – Prueba Técnica

Aplicación web para la **creación, entrenamiento y gestión de asistentes de inteligencia artificial**, desarrollada como prueba técnica enfocada en **arquitectura, experiencia de usuario y buenas prácticas frontend**.

---

## 📸 Screenshots

### Landing Page

![Landing Page](https://res.cloudinary.com/dafsjo7al/image/upload/v1767970729/iPhone-13-PRO-localhost_nwqlsh.webp)

### Home

![Listado Asistentes](https://res.cloudinary.com/dafsjo7al/image/upload/v1767970729/Macbook-Air-localhost_1_tbyw3l.webp)

![Modal Creación/Edición](https://res.cloudinary.com/dafsjo7al/image/upload/v1767970729/Macbook-Air-localhost_3_lreux1.webp)  

![Chat Y Entrenamiento](https://res.cloudinary.com/dafsjo7al/image/upload/v1767970729/Macbook-Air-localhost_5_sthddt.webp)

![Modal Eliminacion](https://res.cloudinary.com/dafsjo7al/image/upload/v1767970729/Macbook-Air-localhost_6_cbskdz.webp) 

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/SebastianHinestroza12/funnelhot-assistant.git

cd funnelhot-assistant

```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000) con su navegador para ver el resultado.


## Enfoque y decisiones técnicas

Next.js (App Router)

Se utilizó Next.js con App Router para:

Manejar layouts por ruta (Landing Page separada del dashboard)

Mejor organización del proyecto

Preparar la app para escalabilidad futura

TypeScript

Tipado estricto para entidades como Assistant, Rules, formularios y estados

Mayor seguridad y mantenibilidad del código

Mejora la experiencia en pruebas técnicas y revisiones

Tailwind CSS

Diseño moderno y consistente

Alta velocidad de desarrollo

Material UI (MUI)

Uso puntual para componentes complejos

Tema global centralizado (createTheme)

Coherencia visual en toda la aplicación

Framer Motion

Animaciones suaves y profesionales

Mejora la percepción de calidad del producto

Microinteracciones sin afectar rendimiento

React Toastify

Feedback inmediato al usuario

Manejo claro de estados de éxito y error

UX limpia y no intrusiva

## 🧱 Arquitectura del proyecto

El proyecto está organizado por features para facilitar mantenimiento y escalabilidad:


## ✨ Funcionalidades implementadas

✅ Landing Page independiente (full width)

✅ Dashboard de asistentes IA

✅ Creación de asistentes con:

Idioma

Tono

Longitud de respuesta

Reglas personalizadas

✅ Edición y eliminación de asistentes

✅ Confirmación de acciones críticas (modales)

✅ Simulación de entrenamiento y el chat

✅ Notificaciones de éxito y error

✅ Animaciones y microinteracciones

✅ Diseño responsive (mobile / desktop)

✅ Persistencia simulada en localStorage



## Tiempo aproximado de desarrollo

Analisis : 1 hora

Diseño UI / UX: ~3 horas

Arquitectura y estructura: ~2 horas

Implementación funcional: ~3 horas

Animaciones y pulido UX: ~2 horas

🕒 Total estimado: 11 horas