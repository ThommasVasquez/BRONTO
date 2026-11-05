# BRONTO | Plataforma Integral de Alquiler y Suministro de Equipos

> **“PIDA TODO EN BRONTO.”**  
> *“LA OBRA NO SE DETIENE. Equipos, maquinaria y soluciones para construir sin límites.”*

---

## 1. Visión y Propósito

**BRONTO** es una plataforma colombiana de nivel internacional diseñada para la gestión, exhibición y solicitud comercial de alquiler y suministro de:
1. **Maquinaria y Equipos de Construcción** (flota pesada, compactación, demolición, bombeo y generación diésel).
2. **Formaletas y Sistemas de Construcción** (formaleta modular para muros, Steel-Ply, andamios certificados bajo Res. 4272 y puntales).
3. **Concretos y Soluciones Estructurales** (concretos premezclados e industrializados NSR-10 y servicio de bombeo pluma/estacionario).
4. **Icopores y Sistemas Modulados** (casetones recuperables, casetones perdidos EPS, paneles aligerados y juntas de dilatación).

La aplicación opera simultáneamente como **sitio web corporativo de alto impacto**, **catálogo técnico comercial escalable** y **Progressive Web App (PWA) instalable** en dispositivos móviles y de escritorio.

---

## 2. Identidad Visual y Sistema de Diseño

- **Amarillo industrial:** `#FEE123` (color primario de potencia y presencia en obra)
- **Negro carbón:** `#151515` (fondo y base estructural de alto contraste)
- **Grafito:** `#242424` (superficies y divisiones)
- **Blanco:** `#FFFFFF` (tipografía de lectura y contraste)
- **Gris técnico:** `#A6A6A6` (detalles y etiquetas secundarias)
- **Naranja energético:** `#FF6511` (inspirado en ENERGYSOFTmedia®, reservado exclusivamente para microinteracciones, acentos sutiles e indicadores activos).

### Símbolo Marcario
Silueta vectorial estilizada del escarabajo **Dynastes** (escarabajo Hércules), símbolo de fuerza proporcional y resistencia inquebrantable ante condiciones severas.

> **Regla de Marca:** El símbolo ® se mantiene oculto en las interfaces públicas hasta la confirmación formal del registro marcario, configurable de manera centralizada mediante `siteConfig.showRegisteredSymbol`.

---

## 3. Stack Tecnológico

- **Framework:** Next.js 15 (App Router, Server Components y Static Site Generation).
- **Lenguaje:** TypeScript 5 (tipado estricto para datos de catálogo, filtros y cotizaciones).
- **Motion Design:** GSAP 3 + ScrollTrigger con validación de accesibilidad (`prefers-reduced-motion`).
- **Estilos:** Tailwind CSS con variables CSS personalizadas y paleta industrial unificada.
- **Iconografía:** Lucide React + Componentes SVG propios de alta precisión geométrica.
- **PWA:** Service Worker propio con estrategia Network First + Stale While Revalidate, manifiesto W3C y pantalla `/offline`.
- **Despliegue:** Optimizado para Cloudflare Workers mediante OpenNext (`wrangler.jsonc`) y GitHub Actions.

---

## 4. Estructura de Rutas

- `/` — Inicio con 7 secciones narrativas y visuales:
  1. Hero cinematográfico con "LA OBRA NO SE DETIENE" y métricas de capacidad operativa.
  2. Familias de Catálogo en composición editorial dinámica.
  3. BRONTO en acción (inspección de 40 puntos, telemetría y logística de cama baja).
  4. Servicios y soluciones integrales.
  5. Catálogo destacado con botones directos de detalle y cotización.
  6. ¿Por qué BRONTO? (diferenciadores técnicos reales).
  7. CTA final ("SU PRÓXIMO PROYECTO EMPIEZA AQUÍ").
- `/catalogo` — Catálogo comercial interactivo con búsqueda en tiempo real, filtros por familia y modalidad, ordenamiento y alternador de vista (grid/list).
- `/catalogo/[slug]` — Ficha técnica de cada equipo: galería fotográfica, tabla de especificaciones NSR-10, características de rendimiento, condiciones de despacho y selector de cotización directa.
- `/servicios` — Desglose de servicios (alquiler, suministro, logística de transporte, soporte en campo y modulación en planos).
- `/nosotros` — Propósito empresarial, filosofía del escarabajo Dynastes y pilares de ingeniería.
- `/contacto` — Directorio de canales, horarios de despacho, ubicación y formulario de contacto.
- `/cotizar` — Flujo comercial de cotización: lista acumulada de equipos, cantidades, duración estimada, datos de la constructora y generación de mensaje estructurado para WhatsApp Business o radicado en demostración.
- `/preguntas-frecuentes` — Respuestas directas clasificadas por temas, enriquecidas con esquema `FAQPage` para buscadores e IAs.
- `/offline` — Pantalla de soporte fuera de línea cuando no hay conexión disponible.

---

## 5. SEO Técnico y GEO (Generative Engine Optimization)

- **Metadata dinámica:** Títulos, descripciones y canonicals únicos generados por ruta.
- **Datos Estructurados (JSON-LD):**
  - `Organization` y `WebSite` con acciones de búsqueda integradas.
  - `Product` con parámetros de disponibilidad técnica y notas de cotización.
  - `BreadcrumbList` para navegación jerárquica.
  - `Service` para cada solución operativa.
  - `FAQPage` para las preguntas frecuentes.
- **Archivos de Descubrimiento:**
  - `sitemap.xml` dinámico (`src/app/sitemap.ts`) con todas las rutas y productos.
  - `robots.txt` (`src/app/robots.ts`) con directivas específicas para buscadores y agentes de IA (GPTBot, ClaudeBot, PerplexityBot, etc.).
  - `llms.txt` (`public/llms.txt`) para referencia contextual directa por modelos de lenguaje.

---

## 6. Firma de Desarrollador Permanente

Por requerimiento comercial estricto, la firma de desarrollador:
```
Desarrollado por ENERGYSOFTmedia® ⚡️
```
Se encuentra permanentemente visible en el pie de página de todas las vistas públicas, tanto en resoluciones de escritorio como en dispositivos móviles, con enlace directo y configurable a https://energysoftmedia.com.

---

## 7. Ejecución Local y Despliegue en Cloudflare

### Desarrollo Local
```bash
npm install
npm run dev
```
La aplicación iniciará en `http://localhost:3000`.

### Compilación de Producción
```bash
npm run build
```

### Previsualización con Wrangler (Cloudflare)
```bash
npm run preview
```

### Despliegue en Cloudflare Workers
Configurar los siguientes secretos en el repositorio de GitHub:
- `CLOUDFLARE_API_TOKEN`: Token con permisos de Worker en Cloudflare.
- `CLOUDFLARE_ACCOUNT_ID`: ID de cuenta de Cloudflare.
- `NEXT_PUBLIC_SITE_URL`: URL de producción (ej: `https://bronto.com.co`).

Al hacer `push` a la rama `main`, la GitHub Action `.github/workflows/deploy-cloudflare.yml` compilará y desplegará la plataforma de forma automática.

