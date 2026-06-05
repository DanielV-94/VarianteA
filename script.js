/**
 * CINTORA — Arquitectura
 * Awwwards-level architectural portfolio
 * —————————————————————————————
 * · Custom magnetic cursor
 * · SplitText char-by-char hero title
 * · Animated stats counters (scrub)
 * · Per-panel scroll experience:
 *     – clip-path reveal on image (scrub)
 *     – image parallax (scrub)
 *     – panel number parallax float
 *     – word-by-word title reveal (stagger)
 *     – kicker / desc / detail stagger
 * · Card premium tilt + scale
 * · Three.js dual particle field
 */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

/* ── Setup ────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* ── Lenis smooth scroll ──────────────────────────── */
if (typeof Lenis !== "undefined" && !prefersReduced) {
  const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
  const raf = (t) => {
    lenis.raf(t);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/* ── Loader (SVG draw animation) ──────────────── */
const loader = document.getElementById("loader");
const loaderLogo = document.getElementById("loaderLogo");
const pathDer = loader?.querySelector("#der");
const pathIzq = loader?.querySelector("#izq");
const loaderBrand = loader?.querySelector(".loader-brand");

if (loader && pathDer && pathIzq) {
  // Lock scroll during loader
  document.body.style.overflow = "hidden";

  const lenDer = pathDer.getTotalLength();
  const lenIzq = pathIzq.getTotalLength();

  // Set initial state — paths invisible
  gsap.set(pathDer, { strokeDasharray: lenDer, strokeDashoffset: lenDer });
  gsap.set(pathIzq, { strokeDasharray: lenIzq, strokeDashoffset: lenIzq });

  const loaderTl = gsap.timeline();

  if (prefersReduced) {
    // Reduced motion: show static logo, then fade
    gsap.set([pathDer, pathIzq], { strokeDashoffset: 0 });
    gsap.set(loaderBrand, { opacity: 1 });
    loaderTl.to(loader, {
      autoAlpha: 0,
      duration: 0.3,
      delay: 0.3,
      ease: "power2.in",
      onComplete: () => {
        loader.classList.add("is-hidden");
        document.body.style.overflow = "";
      },
      onStart: initPage,
    });
  } else {
    // Full draw animation
    loaderTl
      .to([pathDer, pathIzq], {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(loaderBrand, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3")
      .to(loader, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          loader.classList.add("is-hidden");
          document.body.style.overflow = "";
        },
        onStart: initPage,
      }, "+=0.3");
  }
}

/* ── Nav scroll class ─────────────────────────────── */
const nav = document.querySelector(".nav");
window.addEventListener(
  "scroll",
  () => {
    nav?.classList.toggle("scrolled", window.scrollY > 30);
  },
  { passive: true },
);

/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════════ */
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");

if (cursorDot && cursorRing && !prefersReduced) {
  let mx = 0,
    my = 0;
  let rx = 0,
    ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    gsap.to(cursorDot, { x: mx, y: my, duration: 0.08, overwrite: true });
  });

  const updateRing = () => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    gsap.set(cursorRing, { x: rx, y: ry });
    requestAnimationFrame(updateRing);
  };
  requestAnimationFrame(updateRing);

  // Hover targets: cards, links, buttons, CTAs
  document.querySelectorAll("a, button, .card, [data-tilt]").forEach((el) => {
    el.addEventListener("mouseenter", () =>
      cursorRing.classList.add("is-hovering"),
    );
    el.addEventListener("mouseleave", () =>
      cursorRing.classList.remove("is-hovering"),
    );
  });
}

/* ═══════════════════════════════════════════════════
   THREE.JS DUAL PARTICLE FIELD
   ═══════════════════════════════════════════════════ */
const canvas = document.getElementById("heroCanvas");
if (canvas && !prefersReduced) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    innerWidth / innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 36;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
  });

  const resize = () => {
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  };
  resize();
  addEventListener("resize", resize);

  /* Factory: creates a point cloud */
  const createField = ({ count, color, size, opacity, sx, sy, sz }) => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * sx;
      pos[i + 1] = (Math.random() - 0.5) * sy;
      pos[i + 2] = (Math.random() - 0.5) * sz;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    return pts;
  };

  const isMob = innerWidth < 768;
  const primary = createField({
    count: isMob ? 1600 : 3200,
    color: "#ff7e00",
    size: 0.18,
    opacity: 0.65,
    sx: 88,
    sy: 50,
    sz: 60,
  });
  const secondary = createField({
    count: isMob ? 600 : 1100,
    color: "#f5f2ee",
    size: 0.1,
    opacity: 0.38,
    sx: 70,
    sy: 42,
    sz: 80,
  });

  // Scroll-driven rotation
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      primary.rotation.y = p * 0.6;
      secondary.rotation.y = -p * 0.5;
      primary.material.opacity = 0.65 * (1 - p * 0.7);
      secondary.material.opacity = 0.38 * (1 - p * 0.6);
    },
  });

  const animate = () => {
    primary.rotation.y += 0.0007;
    primary.rotation.x += 0.0002;
    secondary.rotation.y -= 0.0009;
    secondary.rotation.x += 0.00015;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
}

/* ═══════════════════════════════════════════════════
   HERO BG PARALLAX (responsive via matchMedia)
   ═══════════════════════════════════════════════════ */
const mm = gsap.matchMedia();

// Desktop — full parallax
mm.add("(min-width: 1025px)", () => {
  gsap.fromTo(
    ".hero-bg",
    { scale: 1.1, yPercent: 0 },
    {
      yPercent: 18,
      scale: 1.0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    },
  );
});

// Tablet landscape — slightly reduced parallax
mm.add("(max-width: 1024px) and (orientation: landscape)", () => {
  gsap.fromTo(
    ".hero-bg",
    { scale: 1.08, yPercent: 0 },
    {
      yPercent: 12,
      scale: 1.0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    },
  );
});

// Tablet portrait — reduced parallax
mm.add("(max-width: 1024px) and (orientation: portrait)", () => {
  gsap.fromTo(
    ".hero-bg",
    { scale: 1.06, yPercent: 0 },
    {
      yPercent: 10,
      scale: 1.0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    },
  );
});

// Mobile portrait — minimal parallax for performance
mm.add("(max-width: 599px)", () => {
  gsap.fromTo(
    ".hero-bg",
    { scale: 1.04, yPercent: 0 },
    {
      yPercent: 6,
      scale: 1.0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    },
  );
});

// Mobile landscape — reduced parallax
mm.add("(max-width: 768px) and (orientation: landscape)", () => {
  gsap.fromTo(
    ".hero-bg",
    { scale: 1.05, yPercent: 0 },
    {
      yPercent: 8,
      scale: 1.0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    },
  );
});

/* ═══════════════════════════════════════════════════
   PAGE INIT (called after loader completes)
   ═══════════════════════════════════════════════════ */
function initPage() {
  heroEntrance();
  initShowcaseVideo();
  initStats();
  initPanels();
  initCards();
  initRevealGeneric();
}

/* ─── Showcase video: sound + play state ───────── */
function initShowcaseVideo() {
  const video = document.querySelector(".showcase-video-media");
  const toggleBtn = document.getElementById("showcaseVideoToggle");
  const label = toggleBtn?.querySelector("[data-video-label]");
  const icon = toggleBtn?.querySelector(".showcase-video-toggle-icon");

  if (!video || !toggleBtn || !label || !icon) return;

  const setUiState = () => {
    const isPlaying = !video.paused && !video.ended;
    const isMuted = video.muted || video.volume === 0;

    if (!isPlaying) {
      label.textContent = "Reproducir con sonido";
      icon.textContent = "▶";
      toggleBtn.classList.remove("is-live");
      toggleBtn.setAttribute("aria-pressed", "false");
      toggleBtn.setAttribute("aria-label", "Reproducir video con sonido");
      return;
    }

    if (isMuted) {
      label.textContent = "Activar sonido";
      icon.textContent = "🔊";
      toggleBtn.classList.remove("is-live");
      toggleBtn.setAttribute("aria-pressed", "false");
      toggleBtn.setAttribute("aria-label", "Activar sonido del video");
      return;
    }

    label.textContent = "Silenciar video";
    icon.textContent = "🔇";
    toggleBtn.classList.add("is-live");
    toggleBtn.setAttribute("aria-pressed", "true");
    toggleBtn.setAttribute("aria-label", "Silenciar audio del video");
  };

  const playMutedFallback = async () => {
    try {
      await video.play();
    } catch {
      // El autoplay puede bloquearse por el navegador; se resolverá con clic del usuario.
    }
    setUiState();
  };

  toggleBtn.addEventListener("click", async () => {
    const isPlaying = !video.paused && !video.ended;

    if (!isPlaying) {
      video.muted = false;
      video.volume = 1;
      try {
        await video.play();
      } catch {
        // Si falla, mantenemos UI consistente.
      }
      setUiState();
      return;
    }

    if (video.muted || video.volume === 0) {
      video.muted = false;
      video.volume = 1;
    } else {
      video.muted = true;
    }

    setUiState();
  });

  video.addEventListener("play", setUiState);
  video.addEventListener("pause", setUiState);
  video.addEventListener("volumechange", setUiState);

  playMutedFallback();
}

/* ─── Hero entrance ──────────────────────────────── */
function heroEntrance() {
  // Split hero title into chars
  const titleEl = document.getElementById("heroTitle");
  if (!titleEl) return;

  // Asegura que el contenedor no quede oculto por .reveal-title
  gsap.set(titleEl, {
    opacity: 1,
    y: 0,
    clearProps: "visibility",
  });

  const rawHTML = titleEl.innerHTML;
  // Preserve <br> tags, split rest into chars
  const parts = rawHTML.split(/(<br\s*\/?>)/i);
  titleEl.innerHTML = parts
    .map((part) => {
      if (/^<br/i.test(part)) return part;
      return part
        .split("")
        .map((ch) =>
          ch.trim() === ""
            ? `<span style="display:inline-block">&nbsp;</span>`
            : `<span class="char" style="display:inline-block;opacity:0;transform:translateY(60%) rotate(${(Math.random() - 0.5) * 8}deg)">${ch}</span>`,
        )
        .join("");
    })
    .join("");

  const chars = titleEl.querySelectorAll(".char");
  gsap.to(chars, {
    opacity: 1,
    y: "0%",
    rotate: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: { each: 0.028, from: "start" },
    delay: 0.1,
  });

  // Kicker + lead
  gsap.fromTo(
    ".hero-content .kicker",
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.15 },
  );
  gsap.fromTo(
    ".lead",
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.85, ease: "power2.out", delay: 0.55 },
  );
  gsap.fromTo(
    ".hero-scroll-cue",
    { y: 14, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.9 },
  );
}

/* ─── Stats counters ─────────────────────────────── */
function initStats() {
  document.querySelectorAll(".stat-item").forEach((item) => {
    const numEl = item.querySelector(".stat-num");
    const target = parseInt(item.dataset.count, 10);
    if (!numEl || isNaN(target)) return;

    const obj = { val: 0 };
    gsap.fromTo(
      obj,
      { val: 0 },
      {
        val: target,
        ease: "none",
        snap: { val: 1 },
        onUpdate: () => {
          numEl.textContent = Math.round(obj.val).toLocaleString("es-MX");
        },
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
          end: "top 45%",
          scrub: true,
        },
      },
    );
  });
}

/* ─── Scrollytelling panels ──────────────────────── */
function initPanels() {
  // Determine responsive animation parameters
  const isSmall = window.innerWidth <= 599;
  const isMedium = window.innerWidth <= 1024;

  // Adapted values: reduced distances/durations on smaller viewports
  const panelCfg = {
    clipDuration: isSmall ? 0.7 : 1.1,
    scaleDuration: isSmall ? 0.9 : 1.4,
    wordDuration: isSmall ? 0.55 : 0.75,
    wordStagger: isSmall ? 0.04 : 0.07,
    numYStart: isSmall ? "6%" : "12%",
    numYEnd: isSmall ? "-6%" : "-12%",
    imgYStart: isSmall ? -2 : (isMedium ? -3 : -4),
    imgYEnd: isSmall ? 3 : (isMedium ? 4 : 6),
  };

  document.querySelectorAll(".scrolly-panel").forEach((panel) => {
    const imgWrap = panel.querySelector(".panel-img-wrap");
    const img = panel.querySelector(".panel-img-wrap img");
    const numEl = panel.querySelector(".panel-num");
    const title = panel.querySelector(".panel-title");
    const kicker = panel.querySelector(".panel-kicker");
    const desc = panel.querySelector(".panel-desc");
    const detail = panel.querySelector(".panel-detail");

    /* ---- Word-split the panel title ---- */
    if (title) {
      const words = [];
      title.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent
            .split(" ")
            .filter(Boolean)
            .forEach((w) => words.push({ type: "word", text: w }));
        } else if (node.nodeName === "BR") {
          words.push({ type: "br" });
        } else if (node.nodeName === "EM") {
          // Preserve <em> block
          words.push({ type: "em", text: node.textContent });
        }
      });

      title.innerHTML = "";
      words.forEach(({ type, text }) => {
        if (type === "br") {
          title.appendChild(document.createElement("br"));
        } else {
          const isEm = type === "em";
          const wrap = document.createElement(isEm ? "em" : "span");
          wrap.className = "word";
          const inner = document.createElement("span");
          inner.className = "word-inner";
          inner.textContent = text;
          if (isEm) {
            wrap.style.display = "block";
            inner.style.display = "block";
          }
          wrap.appendChild(inner);
          title.appendChild(wrap);
          // Add space after non-em words
          if (!isEm) title.append(" ");
        }
      });
    }

    /* ---- ScrollTrigger per panel ---- */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top 72%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      },
    });

    // 1. Clip-path reveal on image (curtain wipe)
    if (imgWrap) {
      tl.to(
        imgWrap,
        {
          clipPath: "inset(0 0% 0 0 round 1.6rem)",
          duration: panelCfg.clipDuration,
          ease: "power3.inOut",
        },
        0,
      );
    }

    // 2. Image scale-down as it reveals (parallax feel)
    if (img) {
      tl.to(
        img,
        {
          scale: 1,
          duration: panelCfg.scaleDuration,
          ease: "power2.out",
        },
        0,
      );
    }

    // 3. Word-by-word title reveal
    const wordInners = panel.querySelectorAll(".word-inner");
    if (wordInners.length) {
      tl.to(
        wordInners,
        {
          y: "0%",
          duration: panelCfg.wordDuration,
          ease: "power3.out",
          stagger: panelCfg.wordStagger,
        },
        0.12,
      );
    }

    // 4. Kicker, desc, detail stagger
    if (kicker)
      tl.to(
        kicker,
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
        0.05,
      );
    if (desc)
      tl.to(
        desc,
        { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
        0.3,
      );
    if (detail)
      tl.to(
        detail,
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
        0.45,
      );

    /* ---- Panel number parallax (scrub) — reduced on mobile ---- */
    if (numEl) {
      gsap.fromTo(
        numEl,
        { y: panelCfg.numYStart, opacity: 0.06 },
        {
          y: panelCfg.numYEnd,
          opacity: 0.18,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    }

    /* ---- Image subtle scrub parallax — reduced on mobile ---- */
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: panelCfg.imgYStart },
        {
          yPercent: panelCfg.imgYEnd,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }
  });
}

/* ─── Cards: premium tilt ────────────────────────── */
function initCards() {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.03, duration: 0.35, ease: "power2.out" });
    });
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      gsap.to(card, {
        rotateY: (x - 0.5) * 22,
        rotateX: (0.5 - y) * 18,
        duration: 0.3,
        transformPerspective: 640,
        ease: "power1.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      });
    });
  });

  // Card entrance stagger — reduced distance on mobile
  const cardY = window.innerWidth <= 599 ? 24 : 48;
  gsap.fromTo(
    ".card",
    { y: cardY, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".grid",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    },
  );
}

/* ─── Generic reveal (kickers, close card) ──────── */
function initRevealGeneric() {
  // Reduced reveal distance on mobile for performance
  const revealY = window.innerWidth <= 599 ? 12 : 22;
  const closeY = window.innerWidth <= 599 ? 20 : 40;

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { y: revealY, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play reverse play reverse",
        },
      },
    );
  });

  // Close card reveal
  gsap.fromTo(
    ".close-card",
    { y: closeY, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".close-card",
        start: "top 78%",
        toggleActions: "play reverse play reverse",
      },
    },
  );
}
