/* ============================================================================
   COMMAND PALETTE (⌘K / Ctrl+K) — fuzzy navigation + actions across all pages.
   Self-contained: builds its own DOM, needs only a [data-cmdk-open] trigger.
   ============================================================================ */
(function () {
  "use strict";
  const D = window.DATA;
  const svg = window.__svg || (() => "");
  const P = D.profile;

  // Command registry --------------------------------------------------------
  const cmds = [
    { g: "Navigate", icon: "code", label: "Home", meta: "index", act: () => go("index.html") },
    { g: "Navigate", icon: "rocket", label: "Projects & case studies", meta: "projects", act: () => go("projects.html") },
    { g: "Navigate", icon: "brain", label: "AI Lab — experiments", meta: "lab", act: () => go("lab.html") },
    { g: "Navigate", icon: "compass", label: "Learning logs", meta: "logs", act: () => go("logs.html") },
    { g: "Navigate", icon: "mail", label: "Contact", meta: "#contact", act: () => go("index.html#contact") },
    { g: "Sections", icon: "sigma", label: "Current learning", act: () => go("index.html#learning") },
    { g: "Sections", icon: "code", label: "Skills", act: () => go("index.html#skills") },
    { g: "Sections", icon: "kaggle", label: "Kaggle profile", act: () => go("index.html#kaggle") },
    { g: "Sections", icon: "rocket", label: "Future roadmap", act: () => go("index.html#roadmap") },
    { g: "Actions", icon: "sigma", label: "Toggle theme (light / dark)", meta: "⇧D", act: () => window.__toggleTheme && window.__toggleTheme() },
    { g: "Actions", icon: "compass", label: "Open terminal", meta: "~", act: () => window.__openTerminal && window.__openTerminal() },
    { g: "Actions", icon: "ext", label: "Download résumé", act: () => go(P.resume) },
    { g: "Links", icon: "github", label: "GitHub profile", meta: "↗", act: () => open(P.socials.github) },
    { g: "Links", icon: "kaggle", label: "Kaggle profile", meta: "↗", act: () => open(P.socials.kaggle) },
    { g: "Links", icon: "linkedin", label: "LinkedIn", meta: "↗", act: () => open(P.socials.linkedin) },
    { g: "Links", icon: "mail", label: "Email me", meta: "↗", act: () => open("mailto:" + P.email) },
  ];
  // add projects as jump targets
  D.projects.forEach((p) => cmds.push({ g: "Projects", icon: "rocket", label: p.title, meta: "open", act: () => open(p.repo || "projects.html") }));

  function go(href) { window.location.href = href; }
  function open(href) { window.open(href, href.startsWith("mailto") ? "_self" : "_blank"); }

  // DOM ---------------------------------------------------------------------
  const overlay = document.createElement("div");
  overlay.className = "cmdk-overlay";
  overlay.innerHTML = `
    <div class="cmdk" role="dialog" aria-modal="true" aria-label="Command palette">
      <div class="cmdk-input">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        <input id="cmdkInput" placeholder="Search pages, sections, links…" autocomplete="off" spellcheck="false" />
      </div>
      <div class="cmdk-list" id="cmdkList"></div>
      <div class="cmdk-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> select</span><span><kbd>esc</kbd> close</span></div>
    </div>`;
  document.body.appendChild(overlay);
  const input = overlay.querySelector("#cmdkInput");
  const list = overlay.querySelector("#cmdkList");
  let filtered = [], active = 0;

  const score = (q, s) => {
    s = s.toLowerCase(); q = q.toLowerCase();
    if (!q) return 1;
    if (s.includes(q)) return 100 - s.indexOf(q);
    let i = 0; for (const ch of s) if (ch === q[i]) i++; // subsequence
    return i === q.length ? 20 : -1;
  };

  function paint() {
    const q = input.value.trim();
    filtered = cmds
      .map((c) => ({ c, s: score(q, c.label + " " + c.g + " " + (c.meta || "")) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.c);
    active = 0;
    if (!filtered.length) { list.innerHTML = `<div class="cmdk-empty">No matches for “${q}”.</div>`; return; }
    let html = "", lastG = "";
    filtered.forEach((c, i) => {
      if (c.g !== lastG) { html += `<div class="cmdk-group">${c.g}</div>`; lastG = c.g; }
      html += `<div class="cmdk-item" data-i="${i}">${svg(c.icon)}<span>${c.label}</span>${c.meta ? `<span class="meta">${c.meta}</span>` : ""}</div>`;
    });
    list.innerHTML = html;
    highlight();
  }
  function highlight() {
    list.querySelectorAll(".cmdk-item").forEach((n) => n.classList.toggle("active", +n.dataset.i === active));
    const a = list.querySelector(".cmdk-item.active");
    if (a) a.scrollIntoView({ block: "nearest" });
  }
  function run(i) { const c = filtered[i]; if (c) { close(); c.act(); } }

  function openPalette() { overlay.classList.add("open"); input.value = ""; paint(); setTimeout(() => input.focus(), 20); }
  function close() { overlay.classList.remove("open"); }

  input.addEventListener("input", paint);
  list.addEventListener("click", (e) => { const it = e.target.closest(".cmdk-item"); if (it) run(+it.dataset.i); });
  list.addEventListener("mousemove", (e) => { const it = e.target.closest(".cmdk-item"); if (it && +it.dataset.i !== active) { active = +it.dataset.i; highlight(); } });
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, filtered.length - 1); highlight(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); highlight(); }
    else if (e.key === "Enter") { e.preventDefault(); run(active); }
    else if (e.key === "Escape") { close(); }
  });

  document.querySelectorAll("[data-cmdk-open]").forEach((b) => b.addEventListener("click", openPalette));
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); overlay.classList.contains("open") ? close() : openPalette(); }
    else if (e.shiftKey && e.key.toLowerCase() === "d" && !/input|textarea/i.test(document.activeElement.tagName)) { window.__toggleTheme && window.__toggleTheme(); }
  });
  window.__openPalette = openPalette;
})();
