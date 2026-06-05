# Implementation Plan: CINTORA Rebrand

## Overview

Transform the existing "LAA Real Estate" single-page website into "CINTORA" architecture firm by modifying three files (`index.html`, `styles.css`, `script.js`). The implementation proceeds layer-by-layer: CSS foundation (colors, fonts), then HTML content overhaul, then JavaScript updates (loader animation, particle colors), and finally responsive validation. Each step builds incrementally so the site remains functional throughout.

## Tasks

- [x] 1. CSS Foundation — Color Palette & Typography
  - [x] 1.1 Update CSS custom properties in `:root` with new color palette
    - Replace `--bg` with `#0d0906`, `--bg2` with `#120e09`, `--text` with `#f5f2ee`, `--muted` with `#9a8e7e`, `--gold` with `#ff7e00`, `--gold-light` with `#ffbe73`, `--gold-dim` with `rgba(255,126,0,0.18)`, `--line-gold` with `rgba(255,126,0,0.24)`
    - Keep `--line` and `--radius` unchanged
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8_

  - [x] 1.2 Add `@font-face` declarations and replace font assignments
    - Add three `@font-face` blocks at top of `styles.css` for Arkhip, Concept, and Modamode with `font-display: swap`
    - Update `body`/`html` font-family to system sans-serif stack
    - Update headings (h1, h2, h3), `.title`, `.panel-title`, `.logo` to `'Arkhip', sans-serif`
    - Update `.kicker`, `.panel-kicker`, `.stat-item p`, accent labels to `'Concept', sans-serif`
    - Update `.loader-brand`, `.logo-text` to `'Modamode', sans-serif`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.8_

  - [x] 1.3 Add loader component CSS styles
    - Add `.loader`, `.loader-inner`, `.loader-logo`, `.loader-brand` styles
    - SVG width: `min(280px, 60vw)`, stroke settings (fill: none, stroke: #ff7e00, stroke-width: 5.02)
    - Add `.loader.is-hidden` rule (display: none or pointer-events: none)
    - Add responsive loader styles for all 4 breakpoints (tablet: `min(240px, 50vw)`, mobile portrait: `min(200px, 70vw)`, mobile landscape: `min(180px, 40vw)`)
    - Add `prefers-reduced-motion` media query overrides for loader
    - _Requirements: 2.1, 2.5, 13.1_

- [x] 2. HTML Content Overhaul — Structure & Text
  - [x] 2.1 Update `<head>` section (meta, fonts, favicon)
    - Replace `<title>` with CINTORA architecture title
    - Add/update meta description (50–160 chars, contains "CINTORA" and architecture)
    - Replace favicon with inline SVG data-URI ("C" in orange on dark bg)
    - Remove Google Fonts preconnect links and stylesheet link (Manrope, Sora)
    - _Requirements: 1.1, 1.3, 1.4, 4.7_

  - [x] 2.2 Replace loader HTML markup
    - Replace existing loader content with new structure: `.loader > .loader-inner > svg.loader-logo + p.loader-brand`
    - Inline both SVG paths (`#der` and `#izq`) from `assets/logo/logo.svg` into the loader SVG
    - Set `aria-live="polite"` on loader, `aria-hidden="true"` on SVG
    - Brand text: "CINTORA"
    - _Requirements: 2.1, 2.4, 2.5_

  - [x] 2.3 Update navigation section
    - Logo: "CINTORA" with subtitle "Arquitectura" in appropriate elements
    - Nav links: Studio · Proyectos · Contacto (with correct anchor hrefs)
    - CTA button: "Agendar consulta" linking to contact section
    - _Requirements: 12.1, 12.2, 12.3, 1.1_

  - [x] 2.4 Update hero section content and image
    - Kicker: `CINTORA · ARQUITECTURA · EST. 2018` (≤60 chars)
    - Title (h1): `Diseñamos espacios que trascienden.` (≤80 chars)
    - Lead paragraph: mention architecture, interiors, consultation (20–50 words, Spanish)
    - Scroll cue: `Explorar Proyectos` (≤25 chars)
    - Hero background image `src` → `assets/Imagen1.jpg` with descriptive alt
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 5.1_

  - [x] 2.5 Update stats bar section
    - 4 stat items: `data-count="120"` (Proyectos, suffix "+"), `data-count="15"` (Años de experiencia), `data-count="28"` (Premios, suffix "+"), `data-count="85000"` (m² diseñados)
    - Update labels to Spanish architecture metrics
    - _Requirements: 9.1, 9.3_

  - [x] 2.6 Update scrollytelling panels (services)
    - Panel 1: Diseño Arquitectónico — kicker, title, description (≥20 words), 3 detail tags, image `src` → `assets/architecture-service.jpg`, `loading="lazy"`, descriptive alt
    - Panel 2: Gestión de Obra — kicker, title, description (≥20 words), 3 detail tags, image `src` → `assets/consultation-service.jpg`, `loading="lazy"`, descriptive alt
    - Panel 3: Consultoría & Master Plan — kicker, title, description (≥20 words), 3 detail tags, image `src` → `assets/Imagen5.jpg`, `loading="lazy"`, descriptive alt
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 5.2, 5.3, 5.4, 5.6, 5.7_

  - [x] 2.7 Update collection section (portfolio)
    - Heading: `Proyectos seleccionados en México y Latinoamérica`
    - Background decorative text: `PROYECTOS`
    - Card 1: name, location, type "Residencial", area "m²", image `assets/Imagen10.jpg`, `loading="lazy"`, descriptive alt
    - Card 2: name, location, type "Comercial", area "m²", image `assets/Imagen12.jpg`, `loading="lazy"`, descriptive alt
    - Card 3: name, location, type "Cultural", area "m²", image `assets/Imagen14.jpg`, `loading="lazy"`, descriptive alt
    - Remove all price/currency references
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 5.5, 5.6, 5.7_

  - [x] 2.8 Update contact section
    - Kicker: `Estudio CINTORA · Arquitectura`
    - Heading: `Hablemos sobre su próximo proyecto.`
    - Address: full street + city
    - Phone number and email: `info@cintora.com` (with `mailto:` href)
    - CTA: `Agendar consulta` linking to contact action
    - Remove all real estate references
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [x] 2.9 Update footer
    - Logo: "CINTORA" + "Arquitectura" subtitle
    - Address and email: CINTORA domain (`info@cintora.com` with `mailto:`)
    - Copyright: `© 2025 CINTORA. Todos los derechos reservados.`
    - Preserve back-to-top link
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 3. Checkpoint — Verify HTML/CSS changes
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. JavaScript Updates — Loader Animation & Particles
  - [x] 4.1 Implement loader draw animation in `script.js`
    - Get both SVG paths (`#der`, `#izq`) and compute `getTotalLength()`
    - Set initial `strokeDasharray` and `strokeDashoffset` via `gsap.set()`
    - Create GSAP timeline: draw both paths to `strokeDashoffset: 0` over 1.5s (`power2.inOut`), then fade loader out (autoAlpha: 0, 0.4s), add `is-hidden` class, call `initPage()`
    - Add scroll lock on body while loader is visible, remove after fade
    - Add `prefers-reduced-motion` check: if enabled, skip draw, show static logo 0.3s, then fade
    - _Requirements: 2.1, 2.2, 2.3, 2.6, 2.7_

  - [x] 4.2 Update Three.js particle colors
    - Change primary `createField()` color from `"#c9a55a"` to `"#ff7e00"`
    - Change secondary `createField()` color from `"#f6f2e4"` to `"#f5f2ee"`
    - _Requirements: 3.7, 14.1_

  - [x] 4.3 Verify and update navigation scroll behavior
    - Ensure scrolled class toggle threshold remains at 30px
    - Confirm frosted-glass styles use new Color_Palette values (warm dark at partial opacity)
    - Confirm removal works when scrolling back above 30px
    - _Requirements: 12.4, 12.5_

  - [x] 4.4 Ensure animation preservation and reduced-motion handling
    - Verify hero title char-by-char animation fires after loader completes
    - Verify Lenis + ScrollTrigger sync remains intact
    - Verify custom cursor magnetic behavior preserved
    - Verify card tilt hover effect uses new `--gold` color
    - Add/verify `prefers-reduced-motion` check that disables Lenis, Three.js particles, custom cursor, and GSAP scroll animations
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8_

- [x] 5. Responsive Adaptation
  - [x] 5.1 Add/verify responsive CSS for all new elements across breakpoints
    - Loader responsive styles (already added in 1.3 — verify completeness)
    - Navigation mobile menu toggle visibility at ≤1024px
    - Collection grid single-column at ≤599px
    - Scrollytelling panel single-column at ≤1024px
    - Hero headline max 10vw font-size at ≤599px
    - Minimum 44×44px tap targets at ≤1024px
    - Hover protection: all `:hover` wrapped in `@media (hover: hover) and (pointer: fine)`
    - `:focus-visible` alternatives provided
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

  - [x] 5.2 Add/verify `gsap.matchMedia()` responsive animation logic
    - Scrollytelling panel animations adapt for tablet/mobile (simplified transforms)
    - Hero ScrollTrigger animations use reduced distances on mobile
    - Loader animation uses appropriate viewport-scaled SVG sizes
    - _Requirements: 13.5, 13.8_

- [x] 6. Final Validation
  - [x] 6.1 Verify zero remaining old brand references
    - Search all three files for "LAA", "Real Estate", "inmobiliaria", "laarealestate" — must find zero matches in user-visible text, titles, meta content
    - _Requirements: 1.5_

  - [x] 6.2 Verify WCAG contrast compliance
    - Confirm `--text` on `--bg` ≥ 4.5:1
    - Confirm `--muted` on `--bg` ≥ 3:1 for large text
    - _Requirements: 3.6_

- [x] 7. Final checkpoint — Ensure all changes are complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- This is a static site rebrand (HTML/CSS/JS) with no build tools — changes are direct file edits
- All existing GSAP, Three.js, Lenis, and ScrollTrigger animation logic is preserved; only color values, content text, and the loader implementation change
- The responsive steering rule requires all 4 breakpoints + desktop base for every new element
- Hover styles must be protected with `@media (hover: hover) and (pointer: fine)` throughout
- The loader is the only net-new component; everything else is content/value replacement
- Property-based tests are not applicable (no Correctness Properties section in design — this is a UI/visual rebrand)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.5"] },
    { "id": 3, "tasks": ["2.6", "2.7", "2.8", "2.9"] },
    { "id": 4, "tasks": ["4.1", "4.2"] },
    { "id": 5, "tasks": ["4.3", "4.4"] },
    { "id": 6, "tasks": ["5.1", "5.2"] },
    { "id": 7, "tasks": ["6.1", "6.2"] }
  ]
}
```
