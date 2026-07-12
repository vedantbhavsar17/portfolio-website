/* ============================================================================
   TERMINAL — a small interactive shell. Type `help`. Data comes from DATA.
   Self-contained: builds its own launcher + window. Toggle with the button or `~`.
   ============================================================================ */
(function () {
  "use strict";
  const D = window.DATA, P = D.profile;

  const fab = document.createElement("div");
  fab.className = "terminal-fab";
  fab.innerHTML = `<button class="term-toggle" aria-label="Open terminal"><span style="color:var(--live)">&gt;_</span> terminal</button>`;
  document.body.appendChild(fab);

  const term = document.createElement("div");
  term.className = "terminal";
  term.innerHTML = `
    <div class="term-bar">
      <span class="dots"><i></i><i></i><i></i></span>
      <span class="title">vedant@portfolio: ~</span>
      <button class="close" aria-label="Close">✕</button>
    </div>
    <div class="term-body" id="termBody"></div>
    <div class="term-input-row"><span class="prompt">&gt;</span><input id="termInput" autocomplete="off" spellcheck="false" aria-label="Terminal input" /></div>`;
  document.body.appendChild(term);

  const body = term.querySelector("#termBody");
  const input = term.querySelector("#termInput");
  const history = []; let hIdx = -1;

  const line = (html, cls) => { const d = document.createElement("div"); d.className = "out " + (cls || ""); d.innerHTML = html; body.appendChild(d); body.scrollTop = body.scrollHeight; };
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  const COMMANDS = {
    help: () => line([
      "Available commands:",
      "  <span class='muted'>about</span>       who I am",
      "  <span class='muted'>skills</span>      current toolkit",
      "  <span class='muted'>learning</span>    what I'm studying now",
      "  <span class='muted'>projects</span>    things I've built",
      "  <span class='muted'>roadmap</span>     where this is going",
      "  <span class='muted'>logs</span>        latest learning log",
      "  <span class='muted'>socials</span>     find me online",
      "  <span class='muted'>resume</span>      download CV",
      "  <span class='muted'>theme</span>       toggle light/dark",
      "  <span class='muted'>goto [page]</span> jump (home|projects|lab|logs)",
      "  <span class='muted'>clear</span>       clear the screen",
    ].join("\n")),
    about: () => { line(P.name + " — " + P.roles.slice(0, 3).join(", ")); line(P.tagline, "muted"); line(P.education.degree + ", " + P.education.school, "muted"); },
    skills: () => D.skills.forEach((c) => line(`<span class='cmd-echo'>${c.category}:</span> ${c.items.map((i) => i.name).join(", ")}`)),
    learning: () => { line("Currently getting good at:"); D.learning.forEach((l) => { const bars = Math.round(l.pct / 10); line(`  ${l.name.padEnd(18, " ")} [${"█".repeat(bars)}${"░".repeat(10 - bars)}] ${l.pct}%`); }); },
    projects: () => D.projects.forEach((p) => { line(`<span class='cmd-echo'>▸ ${esc(p.title)}</span> <span class='muted'>(${p.year})</span>`); line("  " + esc(p.summary), "muted"); }),
    roadmap: () => { line("<span class='cmd-echo'>NOW:</span>"); D.roadmap.short.forEach((x) => line("  · " + esc(x), "muted")); line("<span class='cmd-echo'>NEXT:</span>"); D.roadmap.mid.forEach((x) => line("  · " + esc(x), "muted")); line("<span class='cmd-echo'>GOAL:</span>"); D.roadmap.long.forEach((x) => line("  · " + esc(x), "muted")); },
    logs: () => { const l = D.logs[0]; if (!l) return line("No logs yet.", "muted"); line(`<span class='cmd-echo'>${l.week} — ${esc(l.title)}</span>`); line("Studied: " + l.studied.join(", "), "muted"); line("Insight: " + esc(l.concept)); },
    socials: () => { line(`GitHub   <a href='${P.socials.github}' target='_blank'>${P.socials.github}</a>`); line(`Kaggle   <a href='${P.socials.kaggle}' target='_blank'>${P.socials.kaggle}</a>`); line(`LinkedIn <a href='${P.socials.linkedin}' target='_blank'>${P.socials.linkedin}</a>`); line(`Email    <a href='mailto:${P.email}'>${P.email}</a>`); },
    resume: () => { line("Opening résumé…", "muted"); window.open(P.resume, "_blank"); },
    theme: () => { window.__toggleTheme && window.__toggleTheme(); line("Theme toggled.", "muted"); },
    clear: () => { body.innerHTML = ""; intro(); },
    goto: (arg) => {
      const map = { home: "index.html", index: "index.html", projects: "projects.html", lab: "lab.html", logs: "logs.html" };
      const t = map[(arg || "").toLowerCase()];
      if (t) { line("Navigating to " + t + "…", "muted"); setTimeout(() => (window.location.href = t), 350); }
      else line("Usage: goto home|projects|lab|logs", "muted");
    },
  };
  const ALIASES = { "?": "help", ls: "help", whoami: "about", cd: "goto", cls: "clear", contact: "socials" };

  function exec(raw) {
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    line(`<span class='prompt' style='color:var(--live)'>&gt;</span> <span class='cmd-echo'>${esc(raw)}</span>`);
    if (!cmd) return;
    const name = ALIASES[cmd] || cmd;
    if (COMMANDS[name]) COMMANDS[name](rest.join(" "));
    else line(`command not found: ${esc(cmd)} — try <span class='cmd-echo'>help</span>`, "muted");
  }

  function intro() {
    line(`<span class='cmd-echo'>${esc(P.name)}</span> · interactive shell`);
    line(`Type <span class='cmd-echo'>help</span> to list commands. Try <span class='cmd-echo'>learning</span> or <span class='cmd-echo'>projects</span>.`, "muted");
  }

  const openT = () => { term.classList.add("open"); fab.style.display = "none"; setTimeout(() => input.focus(), 20); };
  const closeT = () => { term.classList.remove("open"); fab.style.display = ""; };
  fab.querySelector(".term-toggle").addEventListener("click", openT);
  term.querySelector(".close").addEventListener("click", closeT);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { const v = input.value; if (v.trim()) { history.push(v); hIdx = history.length; } exec(v); input.value = ""; }
    else if (e.key === "ArrowUp") { if (hIdx > 0) input.value = history[--hIdx] || ""; e.preventDefault(); }
    else if (e.key === "ArrowDown") { if (hIdx < history.length - 1) input.value = history[++hIdx] || ""; else { hIdx = history.length; input.value = ""; } e.preventDefault(); }
    else if (e.key === "Escape") closeT();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "~" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); term.classList.contains("open") ? closeT() : openT(); }
  });

  intro();
  window.__openTerminal = openT;
})();
