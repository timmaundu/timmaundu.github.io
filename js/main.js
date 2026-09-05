/* ============================================================
   TIM MAUNDU — site scripts
   (vanilla JS, no dependencies — GitHub Pages friendly)
   ============================================================ */
(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- header scroll state + progress bar ---------- */
  const nav = $(".nav");
  const progress = $("#progress");
  const toTop = $("#toTop");

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 12);
    if (progress && document.documentElement.scrollHeight > innerHeight) {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    }
    if (toTop) toTop.classList.toggle("show", y > 640);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const burger = $(".burger");
  const mobileMenu = $(".mobile-menu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("show");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", mobileMenu).forEach((a) =>
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- scrollspy (active nav link) ---------- */
  const spyLinks = $$(".nav-links a[href^='#']");
  const sections = spyLinks
    .map((a) => $(a.getAttribute("href")))
    .filter(Boolean);

  const spy = () => {
    const pos = window.scrollY + 140;
    let current = sections[0]?.id;
    for (const sec of sections) if (sec.offsetTop <= pos) current = sec.id;
    spyLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
  };
  if (spyLinks.length) window.addEventListener("scroll", spy, { passive: true });

  /* ---------- typed roles ---------- */
  const typedEl = $(".typed");
  if (typedEl) {
    const roles = [
      "AI & full-stack engineer",
      "agents • RAG • automation",
      "LLM-powered product builder",
      "model economics & evals",
      "software that reaches production",
      "Kenya • East Africa Time",
    ];
    let ri = 0, ci = 0, deleting = false;

    const tick = () => {
      const word = roles[ri];
      if (!deleting) {
        ci += 1;
        typedEl.textContent = word.slice(0, ci);
        if (ci === word.length) {
          deleting = true;
          setTimeout(tick, 1900);
          return;
        }
        setTimeout(tick, prefersReduced ? 0 : 55);
      } else {
        ci -= 1;
        typedEl.textContent = word.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, prefersReduced ? 0 : 26);
      }
    };
    tick();
  }

  /* ---------- reveal on scroll ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- current year ---------- */
  $$(".year").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- back to top ---------- */
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }));

  /* ---------- stagger children of revealed grids ---------- */
  $$("[data-stagger]").forEach((grid) => {
    [...grid.children].forEach((child, i) => {
      child.style.transitionDelay = `${(i % 3) * 70}ms`;
    });
  });
})();
