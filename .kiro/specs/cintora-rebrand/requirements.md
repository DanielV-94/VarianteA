# Requirements Document

## Introduction

Complete rebrand of the existing "LAA Real Estate" luxury real estate website into "CINTORA" — a high-end architecture firm. The transformation encompasses brand identity, color palette, typography, imagery, content, and animated loader while preserving the Awwwards-level animation quality, smooth scroll experience, and responsive design of the original site.

## Glossary

- **Site**: The single-page website consisting of index.html, styles.css, and script.js
- **Loader**: The full-screen animated overlay displayed while the page initializes
- **Logo_SVG**: The SVG file at assets/logo/logo.svg containing two animatable paths (id="der" and id="izq") in orange (#ff7e00)
- **Draw_Animation**: An SVG stroke animation technique where paths appear to draw themselves on screen by animating stroke-dashoffset from full length to zero
- **Hero_Section**: The full-viewport opening section with particle canvas, background image, and headline text
- **Scrollytelling_Section**: The three full-height pinned panels that reveal services via scroll-driven animations
- **Collection_Section**: The grid of project cards showcasing portfolio work
- **Contact_Section**: The closing section with firm contact information and call-to-action
- **Stats_Bar**: The horizontal section displaying key firm metrics with animated counters
- **Custom_Cursor**: The magnetic dot-and-ring cursor that follows mouse movement on desktop
- **Arkhip_Font**: Custom display typeface (OTF/TTF) used for headings and hero titles
- **Concept_Font**: Custom accent typeface (OTF) used for kickers and labels
- **Modamode_Font**: Custom typeface (OTF/TTF) used for special decorative elements
- **Color_Palette**: The set of CSS custom properties defining background, text, accent, and muted colors
- **Breakpoint**: A viewport width/orientation threshold at which layout and animations adapt (tablet landscape ≤1024px landscape, tablet portrait ≤1024px portrait, mobile portrait ≤599px, mobile landscape ≤768px landscape)

## Requirements

### Requirement 1: Brand Identity Replacement

**User Story:** As a site visitor, I want the website to present CINTORA as a professional architecture firm, so that I perceive it as a legitimate architecture brand rather than a real estate agency.

#### Acceptance Criteria

1. THE Site SHALL display "CINTORA" as the brand name in the navigation logo, footer, loader, page title, and meta description
2. THE Site SHALL replace all textual references previously occupied by real estate content (taglines, kickers, subtitles, descriptions) with text referencing architecture firm services (design, construction, consultation) while maintaining the site language in Spanish
3. THE Site SHALL replace the favicon with an inline SVG icon that uses the orange (#ff7e00) accent color on a dark background and visually references the CINTORA brand identity (letter "C" or Logo_SVG silhouette) at a base viewBox of 100×100
4. THE Site SHALL include a meta description element of 50 to 160 characters that contains the brand name "CINTORA" and identifies it as an architecture firm
5. THE Site SHALL contain zero remaining instances of the strings "LAA", "Real Estate", or "inmobiliaria" in any user-visible text, page title, or meta content

### Requirement 2: Animated Logo Loader

**User Story:** As a site visitor, I want to see the CINTORA logo animate (draw itself) on the screen during page load, so that I experience a polished brand introduction before entering the main content.

#### Acceptance Criteria

1. WHEN the page loads, THE Loader SHALL display as a full-viewport overlay with the Color_Palette background color, showing the Logo_SVG horizontally and vertically centered with both paths initially invisible (stroke-dashoffset equal to total path length)
2. WHEN the Loader activates, THE Loader SHALL animate both SVG paths simultaneously using Draw_Animation so that each path draws from start to end over a duration between 1.2 and 2.0 seconds
3. WHEN both paths complete their Draw_Animation, THE Loader SHALL fade out (opacity 1 to 0) and reveal the main page content within 0.5 seconds, removing the overlay from the visual flow upon completion
4. THE Loader SHALL display the brand name "CINTORA" below the animated logo in the Arkhip_Font
5. WHILE the Draw_Animation plays, THE Loader SHALL use the orange (#ff7e00) color for the SVG stroke matching the Logo_SVG source
6. IF the user has prefers-reduced-motion enabled, THEN THE Loader SHALL skip the Draw_Animation, display the logo statically for no more than 0.5 seconds, and then fade out to reveal the main page content
7. WHILE the Loader is visible, THE Loader SHALL prevent page scroll on the underlying content

### Requirement 3: Color Palette Transformation

**User Story:** As a site visitor, I want the website colors to evoke luxury architecture (concrete, warmth, precision), so that the visual tone aligns with a high-end architecture firm.

#### Acceptance Criteria

1. THE Color_Palette SHALL define the primary accent color as orange (#ff7e00) replacing all instances of the current gold (#c9a55a) in the --gold CSS custom property
2. THE Color_Palette SHALL define background colors (--bg and --bg2) using dark tones with a warm undertone (hue between 15° and 45° on the HSL scale, lightness no greater than 8%) replacing the current ultra-dark blue-black (#06070a)
3. THE Color_Palette SHALL define a secondary light accent (--gold-light) as a tint of the orange accent with lightness between 70% and 85% on the HSL scale, replacing the current gold-light (#f0ddb0)
4. THE Color_Palette SHALL define the muted text color (--muted) using a warm gray with hue between 15° and 45° that maintains a minimum contrast ratio of 3:1 against the background color (--bg)
5. THE Color_Palette SHALL define line and border colors (--line and --line-gold) using RGBA values derived from the orange accent with opacity between 0.10 and 0.30
6. THE Color_Palette SHALL maintain a minimum contrast ratio of 4.5:1 between the body text color (--text) and background color (--bg) per WCAG AA compliance
7. THE Three.js particle field SHALL use the orange accent color (#ff7e00) for primary particles and a neutral color with lightness above 90% for secondary particles, replacing the current gold and cream
8. THE Color_Palette SHALL define all colors as CSS custom properties within the :root selector, preserving the existing property names (--bg, --bg2, --text, --muted, --gold, --gold-light, --gold-dim, --line, --line-gold) to ensure site-wide propagation without additional selector changes

### Requirement 4: Typography System Replacement

**User Story:** As a site visitor, I want the typography to feel architectural and editorial, so that the reading experience reinforces the premium brand positioning of CINTORA.

#### Acceptance Criteria

1. THE Site SHALL load Arkhip_Font via @font-face declarations using the OTF file at assets/fonts/Arkhip-Font/Arkhip_font.otf with font-display set to swap
2. THE Site SHALL load Concept_Font via @font-face declarations using the OTF file at assets/fonts/concept-font/Concept-JLd7.otf with font-display set to swap
3. THE Site SHALL load Modamode_Font via @font-face declarations using the OTF file at assets/fonts/modamode/Modamode.otf with font-display set to swap
4. THE Site SHALL apply Arkhip_Font to the hero title (h1), all section headings (h2, h3), panel titles (.panel-title), and the navigation logo text (.logo)
5. THE Site SHALL apply Concept_Font to kickers (.kicker), labels, stat descriptions (.stat-item p), panel kickers (.panel-kicker), and elements with text-transform uppercase used as accent text
6. THE Site SHALL apply Modamode_Font to the loader brand name (.loader-inner p) and the footer logo text (.logo-text)
7. THE Site SHALL remove all references to the Google Fonts stylesheet (Manrope and Sora) from the HTML, including the preconnect links to fonts.googleapis.com and fonts.gstatic.com
8. THE Site SHALL define a system sans-serif font stack of -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif as the body text font replacing Manrope
9. IF a custom font file fails to load, THEN THE Site SHALL fall back to the system sans-serif stack defined in criterion 8 without breaking layout or causing invisible text for more than 100ms

### Requirement 5: Imagery Replacement

**User Story:** As a site visitor, I want to see architecture project photography throughout the site, so that the portfolio visually communicates the firm's expertise in architecture.

#### Acceptance Criteria

1. THE Hero_Section SHALL display an Imagen file from the assets folder as its full-viewport background image with object-fit: cover, replacing the current hero-mansion.jpg
2. THE Scrollytelling_Section panel 1 SHALL display architecture-service.jpg as its visual image
3. THE Scrollytelling_Section panel 2 SHALL display consultation-service.jpg as its visual image
4. THE Scrollytelling_Section panel 3 SHALL display an Imagen file from the assets folder as its visual image, distinct from the file used in the Hero_Section and from the Collection_Section images
5. THE Collection_Section SHALL display three Imagen files from the assets folder in its project cards, each file being distinct from one another and from the images used in the Hero_Section and Scrollytelling_Section panel 3
6. THE Site SHALL apply the loading="lazy" attribute to all img elements that are not in the Hero_Section (Scrollytelling, Collection, and Contact sections)
7. THE Site SHALL provide a descriptive alt attribute on every img element that identifies the architectural subject of the image

### Requirement 6: Content Overhaul — Hero Section

**User Story:** As a site visitor, I want the hero section to communicate CINTORA's architectural philosophy, so that I immediately understand the firm's value proposition.

#### Acceptance Criteria

1. THE Hero_Section kicker SHALL display text that includes the brand name "CINTORA", identifies the discipline as architecture, and includes a founding year or "Est." reference (maximum 60 characters total)
2. THE Hero_Section title SHALL present a statement referencing architectural concepts (such as space, form, design, structure, or craft) and SHALL NOT contain real estate terminology (property, listing, investment, luxury homes, or sales language) — maximum 80 characters
3. THE Hero_Section lead paragraph SHALL mention all three service domains (architecture, interiors, consultation) in a single paragraph of 20 to 50 words, written in third-person declarative voice
4. THE Hero_Section scroll cue SHALL display a label referencing project exploration or portfolio discovery (such as "Explorar Proyectos" or "Descubrir") — maximum 25 characters

### Requirement 7: Content Overhaul — Services (Scrollytelling)

**User Story:** As a site visitor, I want the scrollytelling panels to showcase CINTORA's three core architecture services, so that I understand the full scope of the firm's capabilities.

#### Acceptance Criteria

1. THE Scrollytelling_Section SHALL contain exactly 3 sequential panels, each presenting one distinct architecture service with a kicker label, a multi-word title, a description paragraph of at least 20 words, and exactly 3 detail tag spans
2. THE Scrollytelling_Section panel 1 SHALL present architectural design as the primary service, with the kicker label indicating "Architectural Design" (or its Spanish equivalent), a title summarizing the service, a description paragraph explaining the service scope, and 3 detail tags naming specific sub-capabilities
3. THE Scrollytelling_Section panel 2 SHALL present construction management as the secondary service, with the kicker label indicating "Construction Management" (or its Spanish equivalent), a title summarizing the service, a description paragraph explaining the service scope, and 3 detail tags naming specific sub-capabilities
4. THE Scrollytelling_Section panel 3 SHALL present consultation and master planning as the tertiary service, with the kicker label indicating "Consultation & Master Planning" (or its Spanish equivalent), a title summarizing the service, a description paragraph explaining the service scope, and 3 detail tags naming specific sub-capabilities
5. WHEN a panel's top edge crosses 72% of the viewport height during scroll, THE Scrollytelling_Section SHALL trigger the existing scroll-driven animations on that panel: clip-path inset reveal on the image wrapper, word-by-word title entrance with stagger, and kicker/description/detail fade-in sequence

### Requirement 8: Content Overhaul — Collection (Portfolio)

**User Story:** As a site visitor, I want the collection section to showcase architecture projects rather than properties for sale, so that I can evaluate the firm's design portfolio.

#### Acceptance Criteria

1. THE Collection_Section heading SHALL contain the word "Proyectos" or "Portfolio" and SHALL NOT contain real estate terminology such as "propiedades", "venta", or "properties"
2. THE Collection_Section SHALL display exactly three project cards, each showing: a project name (maximum 60 characters), a location (city or region name), a project type label (e.g., "Residencial", "Comercial", "Cultural"), and an area displayed as a numeric value followed by the "m²" unit symbol
3. THE Collection_Section cards SHALL NOT display monetary prices, currency symbols, or any sales-related text (replacing the real estate pricing with the project metadata defined in criterion 2)
4. THE Collection_Section decorative background text SHALL display an architecture-related term (such as "PROYECTOS", "OBRAS", or "PORTFOLIO") replacing the previous "COLECCIÓN" text
5. THE Collection_Section cards SHALL preserve the existing card tilt hover effect using the orange (#ff7e00) accent color from the Color_Palette

### Requirement 9: Content Overhaul — Stats Bar

**User Story:** As a site visitor, I want the stats bar to present metrics relevant to an architecture firm, so that I gain confidence in CINTORA's experience and track record.

#### Acceptance Criteria

1. THE Stats_Bar SHALL display exactly four metrics in the following order: projects completed (data-count target between 80 and 250), years of experience (data-count target between 10 and 30), awards received (data-count target between 10 and 60), and square meters designed (data-count target between 50000 and 500000)
2. THE Stats_Bar SHALL preserve the existing scroll-driven counter animation for each metric, counting from 0 up to the data-count target value when the section enters the viewport
3. THE Stats_Bar each metric item SHALL display its numeric value, an appropriate suffix ("+" for counts, "m²" for area), and a descriptor label in Spanish identifying the metric (e.g., "Proyectos", "Años de experiencia", "Premios", "m² diseñados")
4. IF the Stats_Bar section is not visible in the viewport, THEN THE Stats_Bar counters SHALL remain at 0 until scroll position triggers the animation

### Requirement 10: Content Overhaul — Contact Section

**User Story:** As a site visitor, I want the contact section to present CINTORA's studio information, so that I can reach the firm for project inquiries.

#### Acceptance Criteria

1. THE Contact_Section heading SHALL contain text related to architecture design or project consultation, and SHALL NOT contain real estate terminology (investment, properties, ROI, listings, buying, selling)
2. THE Contact_Section SHALL display a studio address (containing at minimum a street and city), a phone number, and an email address using a CINTORA-branded domain (e.g., @cintora.com or equivalent brand domain)
3. THE Contact_Section call-to-action button SHALL contain text that references scheduling, booking, or requesting an architecture consultation
4. THE Contact_Section kicker SHALL contain text that includes the word "CINTORA" and identifies the firm as an architecture studio
5. THE Contact_Section SHALL NOT contain any content referencing real estate sales, property investment, or brokerage services from the previous brand

### Requirement 11: Content Overhaul — Footer

**User Story:** As a site visitor, I want the footer to show CINTORA's firm details, so that I see consistent branding at every touchpoint.

#### Acceptance Criteria

1. THE footer SHALL display "CINTORA" as the firm name in Arkhip_Font, followed by a discipline subtitle indicating "Arquitectura" or equivalent architecture identifier
2. THE footer SHALL display the studio address and a contact email address using a CINTORA brand domain, replacing all references to "LAA Real Estate" and "laarealestate.com"
3. THE footer copyright SHALL display the text "© [year] CINTORA. Todos los derechos reservados." where [year] is no earlier than 2025
4. THE footer SHALL preserve the "back to top" navigation link that scrolls the page to the top when activated
5. IF the footer contact email is activated (clicked or tapped), THEN THE footer SHALL open the user's default mail client with the CINTORA email address pre-filled in the recipient field

### Requirement 12: Navigation Update

**User Story:** As a site visitor, I want the navigation to reflect CINTORA's site structure, so that I can find architecture-relevant sections easily.

#### Acceptance Criteria

1. THE navigation logo SHALL display "CINTORA" in the Arkhip_Font as a link to the top of the page, with a subtitle element displaying a discipline identifier of maximum 20 characters (e.g., "Arquitectura")
2. THE navigation SHALL contain exactly 3 internal anchor links with labels relevant to architecture sections (e.g., Studio, Proyectos, Contacto), each linking to the corresponding section id in the page
3. THE navigation call-to-action button SHALL display text of maximum 25 characters referencing architecture consultation (e.g., "Agendar consulta") and SHALL link to the Contact_Section
4. WHILE the user scrolls past 30px, THE navigation SHALL add the "scrolled" class applying a frosted-glass state with backdrop-filter blur and a background color derived from the Color_Palette dark concrete tones at partial opacity
5. IF the user scrolls back above 30px, THEN THE navigation SHALL remove the "scrolled" class and return to a fully transparent background with no backdrop-filter effect

### Requirement 13: Responsive Adaptation

**User Story:** As a site visitor on any device, I want the rebranded site to render correctly and maintain its luxury feel across all viewport sizes, so that the experience is consistent on desktop, tablet, and mobile.

#### Acceptance Criteria

1. THE Site SHALL include responsive styles covering layout, typography, and spacing for desktop base (no media query), tablet landscape (≤1024px landscape), tablet portrait (≤1024px portrait), mobile portrait (≤599px), and mobile landscape (≤768px landscape), with each breakpoint containing either adapted rules or an explicit comment indicating inheritance from the previous tier
2. THE Site SHALL wrap all hover styles with @media (hover: hover) and (pointer: fine) to prevent activation on touch devices, and SHALL provide :focus-visible styles as an accessible alternative for keyboard and touch users
3. WHILE viewport width is ≤1024px, THE navigation desktop links SHALL be hidden and the mobile menu toggle SHALL be the sole navigation method
4. WHILE viewport width is ≤599px, THE Collection_Section grid SHALL collapse to a single column layout with each card occupying 100% of the container width
5. WHILE viewport width is ≤1024px, THE Scrollytelling_Section panel grid SHALL collapse to single column with image above text and the scroll-driven animations SHALL adapt via gsap.matchMedia() to use simplified or reduced-distance transforms appropriate for the viewport size
6. WHILE viewport width is ≤599px, THE Hero_Section headline SHALL scale to a maximum of 10vw font size, the particle canvas SHALL remain visible, and the background image SHALL use object-fit: cover to fill the viewport without distortion
7. THE Site SHALL ensure all interactive elements (buttons, links, navigation items) have a minimum tap target size of 44×44 CSS pixels on viewports ≤1024px
8. WHILE viewport width is ≤599px, THE Site SHALL adapt GSAP ScrollTrigger animations via gsap.matchMedia() to use reduced distances and simplified sequences that maintain visual continuity without causing performance degradation on mobile devices

### Requirement 14: Animation Preservation

**User Story:** As a site visitor, I want all existing scroll animations, parallax effects, and micro-interactions to continue working with the new brand, so that the Awwwards-level experience quality is maintained.

#### Acceptance Criteria

1. THE Site SHALL preserve the Three.js dual particle field animation in the Hero_Section using the Color_Palette primary accent color (#ff7e00) for primary particles and off-white for secondary particles, maintaining scroll-driven rotation and opacity fade as the Hero_Section scrolls out of view
2. THE Site SHALL preserve the GSAP ScrollTrigger-based scrollytelling panel animations (clip-path reveal, image parallax, word-by-word title reveal with stagger, and kicker/description/detail stagger entrance)
3. THE Site SHALL preserve the hero title character-by-character entrance animation that fires after the Loader completes, including random slight rotation per character resolving to zero
4. THE Site SHALL preserve the Lenis smooth scroll integration with ScrollTrigger so that scroll position updates are synchronized between Lenis and GSAP
5. WHILE the device supports hover and fine pointer (matching @media (hover: hover) and (pointer: fine)), THE Site SHALL preserve the Custom_Cursor magnetic dot-and-ring behavior that follows the mouse with the ring showing an expanded hover state on interactive elements (links, buttons, cards)
6. THE Site SHALL preserve the card tilt hover effect (rotateX/rotateY based on pointer position within the card) using the Color_Palette accent color, and the scroll-triggered card entrance stagger animation
7. THE Site SHALL preserve the hero background parallax effect (vertical shift and scale reduction on scroll) using ScrollTrigger scrub
8. IF the user has prefers-reduced-motion enabled, THEN THE Site SHALL disable the Lenis smooth scroll, Three.js particle field, Custom_Cursor animation, and all GSAP scroll-triggered animations while keeping static content visible and accessible
