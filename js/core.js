/* ============================================================================
   CORE — theme, navigation, reveal animations, and all data renderers.
   Every renderer is guarded by element existence, so one file drives all pages.
   ============================================================================ */
(function () {
  "use strict";
  const D = window.DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* --- inline icon set (monochrome, stroke) ------------------------------- */
  const ICON = {
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    brain: '<path d="M12 5a3 3 0 0 0-3 3 3 3 0 0 0-3 3 3 3 0 0 0 1 5 3 3 0 0 0 5 1 3 3 0 0 0 5-1 3 3 0 0 0 1-5 3 3 0 0 0-3-3 3 3 0 0 0-3-3Z"/>',
    sigma: '<path d="M18 7V5H6l6 7-6 7h12v-2"/>',
    rocket: '<path d="M4.5 16.5 3 21l4.5-1.5M9 15l6-6M14 4s4 0 6 2 2 6 2 6-3 1-6-2-2-6-2-6Z"/><circle cx="15" cy="9" r="1"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2Z"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3-.3 6-1.5 6-6.6a5 5 0 0 0-1.4-3.5 4.7 4.7 0 0 0-.1-3.5s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.6 1 5.5 1.4 5.5 1.4a4.7 4.7 0 0 0-.1 3.5A5 5 0 0 0 4 8.4c0 5 3 6.3 6 6.6a3.4 3.4 0 0 0-1 2.6V21"/>',
    linkedin: '<rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/><path d="M10 9h4v2a4 4 0 0 1 8 0v10h-4v-8a2 2 0 0 0-4 0v8h-4z"/>',
    kaggle: '<path d="M8 3v18M8 13l7-7M8 13l8 8"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    school: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 3 2 6 2s6-1 6-2v-5"/>',
    ext: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
  };
  const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ""}</svg>`;

  /* --- brand logos (Simple Icons, single-path, filled with currentColor) -- */
  const LOGO = {
    anthropic: 'M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z',
    openai: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z',
    claude: 'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z',
    githubcopilot: 'M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z',
    jupyter: 'M7.157 22.201A1.784 1.799 0 0 1 5.374 24a1.784 1.799 0 0 1-1.784-1.799 1.784 1.799 0 0 1 1.784-1.799 1.784 1.799 0 0 1 1.783 1.799zM20.582 1.427a1.415 1.427 0 0 1-1.415 1.428 1.415 1.427 0 0 1-1.416-1.428A1.415 1.427 0 0 1 19.167 0a1.415 1.427 0 0 1 1.415 1.427zM4.992 3.336A1.047 1.056 0 0 1 3.946 4.39a1.047 1.056 0 0 1-1.047-1.055A1.047 1.056 0 0 1 3.946 2.28a1.047 1.056 0 0 1 1.046 1.056zm7.336 1.517c3.769 0 7.06 1.38 8.768 3.424a9.363 9.363 0 0 0-3.393-4.547 9.238 9.238 0 0 0-5.377-1.728A9.238 9.238 0 0 0 6.95 3.73a9.363 9.363 0 0 0-3.394 4.547c1.713-2.04 5.004-3.424 8.772-3.424zm.001 13.295c-3.768 0-7.06-1.381-8.768-3.425a9.363 9.363 0 0 0 3.394 4.547A9.238 9.238 0 0 0 12.33 21a9.238 9.238 0 0 0 5.377-1.729 9.363 9.363 0 0 0 3.393-4.547c-1.712 2.044-5.003 3.425-8.772 3.425Z',
    github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  };
  const logo = (name) => LOGO[name] ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${`<path d="${LOGO[name]}"/>`}</svg>` : svg("code");
  const statusEl = (s) => `<span class="status" data-s="${s}"><span class="dot"></span>${s}</span>`;
  window.__ICON = ICON; window.__svg = svg; // shared with palette/terminal

  /* ====================================================================== */
  /* THEME                                                                   */
  /* ====================================================================== */
  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    const btn = $("#themeToggle");
    if (btn) btn.innerHTML = t === "dark" ? MOON : SUN;
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  (function initTheme() {
    let t = "dark";
    try { t = localStorage.getItem("theme") || "dark"; } catch (e) {}
    applyTheme(t);
    const btn = $("#themeToggle");
    if (btn) btn.addEventListener("click", () => applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"));
  })();
  window.__toggleTheme = () => applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");

  /* ====================================================================== */
  /* NAV                                                                     */
  /* ====================================================================== */
  const nav = $("#nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  const burger = $("#hamburger"), navLinks = $("#navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      burger.classList.remove("open"); navLinks.classList.remove("open");
    }));
  }

  /* ====================================================================== */
  /* REVEAL ON SCROLL                                                        */
  /* ====================================================================== */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  const observeReveals = () => document.querySelectorAll("[data-reveal]:not(.in)").forEach((n) => io.observe(n));

  /* ====================================================================== */
  /* ANIMATED COUNTERS                                                       */
  /* ====================================================================== */
  function animateCount(node, target, suffix, raw) {
    if (raw) { node.textContent = target + (suffix || ""); return; }
    const dur = 1100, t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(target * eased) + (suffix || "");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function countOnView(node, target, suffix, raw) {
    const o = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { animateCount(node, target, suffix, raw); o.disconnect(); } });
    }, { threshold: 0.4 });
    o.observe(node);
  }

  /* ====================================================================== */
  /* HERO — typing roles                                                     */
  /* ====================================================================== */
  function typeRoles() {
    const node = $("#heroRoles");
    if (!node) return;
    const roles = D.profile.roles;
    let ri = 0, ci = 0, deleting = false;
    const cursor = '<span class="cursor"></span>';
    const tick = () => {
      const word = roles[ri];
      ci += deleting ? -1 : 1;
      node.innerHTML = esc(word.slice(0, ci)) + cursor;
      let delay = deleting ? 40 : 75;
      if (!deleting && ci === word.length) { deleting = true; delay = 1600; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 300; }
      setTimeout(tick, delay);
    };
    tick();
  }

  /* --- Kaggle public-activity heatmap ------------------------------------ */
  // Deterministic (seeded) so it's stable across loads. Recent `activeMonths`
  // render dense, older weeks sparse — mirroring the real profile pattern.
  function renderKaggleActivity(K) {
    const grid = $("#kaggleActivity");
    if (!grid) return;
    const DAY = 86400000, WEEKS = 52;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = new Date(today.getTime() - (WEEKS * 7 - 1) * DAY);
    start.setDate(start.getDate() - start.getDay());
    const activeMonths = (K.activity && K.activity.activeMonths) || 6;
    const cutoff = new Date(today); cutoff.setMonth(cutoff.getMonth() - activeMonths);

    let seed = 1337;
    const rnd = () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

    const cells = [];
    for (let w = 0; w < WEEKS; w++) {
      for (let dow = 0; dow < 7; dow++) {
        const d = new Date(start.getTime() + (w * 7 + dow) * DAY);
        if (d > today) { cells.push('<span class="cell" data-l="0" style="visibility:hidden"></span>'); continue; }
        const r = rnd();
        let lvl;
        if (d >= cutoff) lvl = r < 0.15 ? 0 : r < 0.4 ? 2 : r < 0.72 ? 3 : 4;
        else lvl = r < 0.9 ? 0 : r < 0.97 ? 1 : 2;
        cells.push(`<span class="cell" data-l="${lvl}"></span>`);
      }
    }
    grid.innerHTML = cells.join("");
    const lbl = $("#kaggleActLabel");
    if (lbl) lbl.innerHTML = `<span class="dot"></span> Public activity · ${K.activity && K.activity.note ? esc(K.activity.note) : "kaggle.com/" + esc(K.handle)}`;
  }

  /* ====================================================================== */
  /* RENDERERS                                                               */
  /* ====================================================================== */
  function render() {
    const P = D.profile;

    // hero links + tag
    if ($("#heroTag")) $("#heroTag").textContent = P.tagline;
    const setHref = (id, href) => { const n = $(id); if (n) n.href = href; };
    setHref("#githubBtn", P.socials.github);
    setHref("#kaggleBtn", P.socials.kaggle);
    setHref("#resumeBtn", P.resume);
    if ($("#githubBtn")) $("#githubBtn").textContent = "GitHub ↗";
    if ($("#kaggleBtn")) $("#kaggleBtn").textContent = "Kaggle ↗";

    // stat bar
    const sb = $("#statbar");
    if (sb) {
      D.stats.forEach((s) => {
        const box = el("div", "stat", `<div class="num" data-count>0</div><div class="lbl">${esc(s.label)}</div>`);
        sb.appendChild(box);
        countOnView(box.querySelector(".num"), s.value, s.suffix, s.raw);
      });
    }

    // about
    const bio = $("#aboutBio");
    if (bio) bio.innerHTML = P.bio.map((p) => `<p>${p.replace(/\*(.+?)\*/g, "<em>$1</em>")}</p>`).join("");
    const meta = $("#aboutMeta");
    if (meta) {
      const rows = [
        ["Role", P.roles.slice(0, 3).join(" · ")],
        ["Education", P.education.degree],
        ["College", P.education.school],
        ["Location", P.location],
        ["Focus", "Production ML · Higher studies"],
      ];
      meta.innerHTML = rows.map(([k, v]) => `<div class="row"><span class="k">${k}</span><span class="v">${esc(v)}</span></div>`).join("");
    }

    // journey
    const jr = $("#journey");
    if (jr) jr.innerHTML = D.journey.map((j) => `
      <div class="j-item" data-s="${j.status}">
        <div class="j-num">PHASE ${esc(j.phase)} · ${j.status.toUpperCase()}</div>
        <div class="j-title">${esc(j.title)}</div>
        <div class="j-desc">${esc(j.desc)}</div>
      </div>`).join("");

    // current learning (home) + now (logs)
    ["#learnGrid", "#nowGrid"].forEach((sel) => {
      const g = $(sel);
      if (!g) return;
      g.innerHTML = D.learning.map((l) => `
        <div class="learn-item">
          <div class="learn-top">
            <span class="learn-name">${esc(l.name)}<span class="grp">${esc(l.group)}</span></span>
            <span class="learn-pct">${l.pct}%</span>
          </div>
          <div class="track"><div class="fill" data-fill="${l.pct}"></div></div>
        </div>`).join("");
      // animate fills on view
      g.querySelectorAll(".fill").forEach((f) => {
        const o = new IntersectionObserver((es) => es.forEach((e) => {
          if (e.isIntersecting) { f.style.width = f.dataset.fill + "%"; o.disconnect(); }
        }), { threshold: 0.3 });
        o.observe(f);
      });
    });

    // skills
    const sg = $("#skillsGrid");
    if (sg) sg.innerHTML = D.skills.map((c) => `
      <div class="skill-cat card">
        <h3>${svg(c.icon)} ${esc(c.category)}</h3>
        <div class="skill-list">
          ${c.items.map((it) => `<div class="skill-row"><span>${esc(it.name)}</span><span class="lvl">${[1, 2, 3].map((n) => `<i class="${n <= it.level ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}
        </div>
      </div>`).join("");

    // tech marquee (skills flattened, duplicated for seamless loop)
    const mq = $("#marquee");
    if (mq) {
      const all = D.skills.flatMap((c) => c.items.map((i) => i.name));
      const one = all.map((n) => `<span>${esc(n)}</span>`).join("");
      mq.innerHTML = one + one;
    }

    // AI toolbox
    const tg = $("#toolsGrid");
    if (tg && D.tools) tg.innerHTML = D.tools.map((t) => `
      <div class="card tool-card">
        <span class="tool-logo">${logo(t.logo)}</span>
        <div>
          <div class="tool-name">${esc(t.name)}</div>
          <p class="tool-use">${esc(t.use)}</p>
        </div>
      </div>`).join("");

    // experience
    const eg = $("#experienceList");
    if (eg && D.experience) eg.innerHTML = D.experience.map((x) => `
      <article class="card exp-card">
        <div class="exp-head">
          <div><h3>${esc(x.role)} · <span class="exp-org">${esc(x.org)}</span></h3><span class="yr">${esc(x.period)}</span></div>
          ${statusEl(x.status)}
        </div>
        <ul class="exp-points">${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </article>`).join("");

    // featured projects (home) + all projects (projects page)
    const projCard = (p) => `
      <article class="card card--tick project" data-tags="${p.tags.map(esc).join("|")}">
        <div class="project-head">
          <div><h3>${esc(p.title)}</h3><span class="yr">${esc(p.year)}</span></div>
          ${statusEl(p.status)}
        </div>
        <p class="project-sum">${esc(p.summary)}</p>
        <div class="project-tech">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        <details class="case">
          <summary>Case study</summary>
          <div class="case-body">
            <h4>Problem</h4><p>${esc(p.problem)}</p>
            <h4>Approach</h4><ul>${p.approach.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
            <h4>Result</h4><p>${esc(p.result)}</p>
          </div>
        </details>
        <div class="project-links">
          ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">${svg("github")} Source</a>` : ""}
          ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">${svg("ext")} Demo</a>` : ""}
        </div>
      </article>`;
    const fp = $("#featuredProjects");
    if (fp) fp.innerHTML = D.projects.map(projCard).join("");
    const ap = $("#allProjects");
    if (ap) ap.innerHTML = D.projects.map(projCard).join("");

    // project filters
    const pf = $("#projectFilters");
    if (pf && ap) {
      const tags = ["All", ...new Set(D.projects.flatMap((p) => p.tags))];
      pf.innerHTML = tags.map((t, i) => `<button class="filter ${i === 0 ? "active" : ""}" data-f="${esc(t)}">${esc(t)}</button>`).join("");
      pf.addEventListener("click", (e) => {
        const b = e.target.closest(".filter"); if (!b) return;
        pf.querySelectorAll(".filter").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        const f = b.dataset.f;
        ap.querySelectorAll(".project").forEach((card) => {
          const show = f === "All" || card.dataset.tags.split("|").includes(f);
          card.style.display = show ? "" : "none";
        });
      });
    }

    // kaggle (projects page)
    if ($("#kaggleHandle")) $("#kaggleHandle").textContent = "@" + P.socials.kaggleUser;
    setHref("#kaggleLink", P.socials.kaggle);
    const K = D.kaggle;
    if (K) {
      const head = $("#kaggleHeadline");
      if (head) head.innerHTML =
        `<span class="status" data-s="live"><span class="dot"></span> ${esc(K.headline)}</span>` +
        (K.subtitle ? `<div style="color:var(--ink-3);font-size:.85rem;margin-top:.4rem">${esc(K.subtitle)}</div>` : "");

      // headline stat tiles: rank, highest, medals, followers + category counts
      const kt = $("#kaggleTiers");
      if (kt) {
        const m = K.medals || {};
        const medalTotal = (m.gold || 0) + (m.silver || 0) + (m.bronze || 0);
        const tiles = [];
        if (K.rank) tiles.push([`#${K.rank.toLocaleString()}`, K.totalRanked ? `of ${K.totalRanked.toLocaleString()}` : "Rank"]);
        if (K.highestRank) tiles.push([`#${K.highestRank.toLocaleString()}`, "Highest ever"]);
        if (medalTotal) tiles.push([`🥉 ${medalTotal}`, "Medals"]);
        (K.categories || []).forEach((c) => tiles.push([c.count, c.tier ? `${c.category} · ${c.tier}` : c.category]));
        if (K.followers != null) tiles.push([K.followers, "Followers"]);
        kt.innerHTML = tiles.map(([n, l]) =>
          `<div class="gh-stat"><div class="num" style="font-size:1.35rem">${esc(n)}</div><div class="lbl">${esc(l)}</div></div>`).join("");
      }

      const kn = $("#kaggleNotebooks");
      if (kn && K.notebooks && K.notebooks.length) {
        kn.innerHTML = `<div class="lab-kind" style="margin-bottom:.5rem">Featured notebooks &amp; datasets</div>` +
          K.notebooks.map((n) => `<div class="project-links" style="margin:.2rem 0"><a href="${esc(n.url)}" target="_blank" rel="noopener">${svg("ext")} ${esc(n.title)}</a></div>`).join("");
      }

      renderKaggleActivity(K);
    }

    // hackathons
    const hk = $("#hackList");
    if (hk && D.hackathons) hk.innerHTML = D.hackathons.map((h) => `
      <article class="card card--tick hack-card">
        <div class="exp-head">
          <div><h3>${esc(h.name)}</h3><span class="yr">${esc(h.year)}</span></div>
          ${statusEl(h.status)}
        </div>
        <div class="hack-result">${esc(h.result)}</div>
        <p style="color:var(--ink-2);font-size:.92rem">${esc(h.desc)}</p>
        <div class="project-tech"><span class="chip">Team · ${esc(h.team)}</span></div>
        <div class="project-links">
          ${h.certificate ? `<a href="${esc(h.certificate)}" target="_blank" rel="noopener">${svg("ext")} Certificate</a>` : ""}
        </div>
      </article>`).join("");

    // build in public
    const bg = $("#buildGrid");
    if (bg) {
      D.buildLog.forEach((b) => {
        const c = el("article", "card build-card", `<div class="metric">${esc(b.metric)}</div><div class="value" data-count>0</div><div class="note">${esc(b.note)}</div>`);
        bg.appendChild(c);
        countOnView(c.querySelector(".value"), b.value, "", false);
      });
    }

    // roadmap
    const rg = $("#roadmapGrid");
    if (rg) {
      const col = (tag, label, items) => `
        <div class="roadmap-col card">
          <h3><span class="tag">${tag}</span> · ${label}</h3>
          <ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
        </div>`;
      rg.innerHTML = col("NOW", "Short term", D.roadmap.short) + col("NEXT", "Mid term", D.roadmap.mid) + col("GOAL", "Long term", D.roadmap.long);
    }

    // contact info
    const ci = $("#contactInfo");
    if (ci) {
      ci.innerHTML = [
        `<a class="line" href="mailto:${esc(P.email)}">${svg("mail")} ${esc(P.email)}</a>`,
        `<a class="line" href="${esc(P.socials.github)}" target="_blank" rel="noopener">${svg("github")} github.com/${esc(P.socials.githubUser)}</a>`,
        `<a class="line" href="${esc(P.socials.kaggle)}" target="_blank" rel="noopener">${svg("kaggle")} kaggle.com/${esc(P.socials.kaggleUser)}</a>`,
        `<a class="line" href="${esc(P.socials.linkedin)}" target="_blank" rel="noopener">${svg("linkedin")} LinkedIn</a>`,
        `<a class="line" href="#" onclick="return false">${svg("pin")} ${esc(P.location)}</a>`,
      ].join("");
    }

    // lab
    const lg = $("#labGrid");
    if (lg) lg.innerHTML = D.lab.map((x) => `
      <article class="card lab-card" data-kind="${x.kind}">
        <div class="lab-kind">${x.kind === "failure" ? "failed attempt" : esc(x.kind)}</div>
        <h3>${esc(x.title)}</h3>
        ${statusEl(x.status)}
        <p>${esc(x.desc)}</p>
        ${x.outcome ? `<div class="lab-outcome">${esc(x.outcome)}</div>` : ""}
      </article>`).join("");

    // math
    const mg = $("#mathGrid");
    if (mg) mg.innerHTML = D.math.map((m) => `<div class="card math-card"><div class="area">${esc(m.area)}</div><div class="note">${esc(m.note)}</div></div>`).join("");

    // research
    const resg = $("#researchGrid");
    if (resg) resg.innerHTML = D.research.map((r) => `<div class="card card--tick"><h3 style="font-size:1.1rem;margin-bottom:.5rem">${esc(r.title)}</h3><p style="color:var(--ink-2);font-size:.9rem">${esc(r.desc)}</p></div>`).join("");

    // logs
    const ll = $("#logsList");
    if (ll) ll.innerHTML = D.logs.map((l) => `
      <article class="card log">
        <div class="when"><span class="wk">${esc(l.week)}</span>${esc(l.date)}</div>
        <div>
          <h3>${esc(l.title)}</h3>
          <div class="studied">${l.studied.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
          <p class="concept">${esc(l.concept)}</p>
          ${l.resource ? `<span class="res">↳ <a href="${esc(l.resource.url)}" target="_blank" rel="noopener">${esc(l.resource.label)}</a></span>` : ""}
        </div>
      </article>`).join("");

    // certificates
    const cg = $("#certGrid");
    if (cg) cg.innerHTML = D.certificates.length ? D.certificates.map((c) => `
      <article class="card card--tick">
        ${statusEl(c.status)}
        <h3 style="font-size:1.05rem;margin:.6rem 0 .3rem">${esc(c.title)}</h3>
        <p style="color:var(--ink-2);font-size:.88rem">${esc(c.issuer)} · ${esc(c.year)}</p>
        ${c.url ? `<div class="project-links"><a href="${esc(c.url)}" target="_blank" rel="noopener">${svg("ext")} View</a></div>` : ""}
      </article>`).join("") : `<p class="loading">Certificates will appear here as they're earned.</p>`;

    // blog
    const blg = $("#blogGrid");
    if (blg) blg.innerHTML = D.blog.length ? D.blog.map((b) => `
      <article class="card card--tick blog-card">
        <span class="date">${esc(b.date)}</span>
        <h3>${esc(b.title)}</h3>
        <p class="excerpt">${esc(b.excerpt)}</p>
        <div class="project-tech">${b.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        ${b.url ? `<div class="project-links"><a href="${esc(b.url)}" target="_blank" rel="noopener">${svg("ext")} Read</a></div>` : `<p class="form-note" style="margin-top:.8rem">Draft — publishing soon.</p>`}
      </article>`).join("") : `<p class="loading">Notes coming soon.</p>`;

    // footer socials + year
    const fs = $("#footerSocials");
    if (fs) fs.innerHTML = [
      ["github", P.socials.github], ["kaggle", P.socials.kaggle], ["linkedin", P.socials.linkedin],
    ].map(([k, u]) => `<a class="icon-btn" href="${esc(u)}" target="_blank" rel="noopener" aria-label="${k}">${svg(k)}</a>`).join("");
    const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ====================================================================== */
  /* CONTACT FORM — dependency-free.                                         */
  /* No backend, no third-party service. On submit we open the visitor's own */
  /* email client, pre-addressed to you with their message. Works anywhere.  */
  /* ====================================================================== */
  function initForm() {
    const form = $("#contact-form");
    if (!form) return;
    const note = $("#formNote");
    if (note) note.textContent = "Sending opens your email app, addressed to me.";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const msg = (data.get("message") || "").toString().trim();

      const subject = `Portfolio contact from ${name || "someone"}`;
      const body =
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `${msg}\n`;
      const href = `mailto:${D.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = href;
      if (note) note.textContent = "Opening your email app… if nothing happens, email me directly at " + D.profile.email + ".";
    });
  }

  /* --- smooth in-page anchors -------------------------------------------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const t = document.querySelector(id);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
  });

  /* --- boot -------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    render();
    typeRoles();
    initForm();
    observeReveals();
    // re-observe any late-added reveal nodes
    setTimeout(observeReveals, 300);
  });
  window.__observeReveals = observeReveals;
})();
