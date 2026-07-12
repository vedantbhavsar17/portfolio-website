/* ============================================================================
   GITHUB — live stats, language breakdown, contribution heatmap, and repos.
   Uses only the public, unauthenticated GitHub REST API (no token, no backend).
   The heatmap is built from the public Events API (~last 90 days of activity),
   which is honest: recent weeks fill in, older weeks stay empty until there's data.
   ============================================================================ */
(function () {
  "use strict";
  const D = window.DATA;
  const USER = (D && D.profile.socials.githubUser) || "vedantbhavsar17";
  const API = "https://api.github.com";
  const $ = (s) => document.querySelector(s);
  const svg = window.__svg || (() => "");
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  async function j(url) {
    const r = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!r.ok) throw new Error(url + " -> " + r.status);
    return r.json();
  }

  /* ---- STATS + LANGUAGES ------------------------------------------------- */
  async function loadStatsAndRepos() {
    const reposEl = $("#github-repos");
    let user, repos;
    try {
      [user, repos] = await Promise.all([
        j(`${API}/users/${USER}`),
        j(`${API}/users/${USER}/repos?sort=updated&per_page=100`),
      ]);
    } catch (e) {
      console.error(e);
      if (reposEl) reposEl.innerHTML = `<p class="error-msg">Couldn't reach GitHub right now. Visit <a href="https://github.com/${USER}" style="text-decoration:underline">github.com/${USER}</a> directly.</p>`;
      const gs = $("#ghStats"); if (gs) gs.innerHTML = `<p class="error-msg">GitHub stats unavailable offline.</p>`;
      return;
    }

    const owned = repos.filter((r) => !r.fork);
    const stars = owned.reduce((a, r) => a + r.stargazers_count, 0);
    const years = Math.max(1, Math.round((Date.now() - new Date(user.created_at)) / 3.156e10 * 10) / 10);

    // stat tiles
    const gs = $("#ghStats");
    if (gs) {
      const tiles = [
        [user.public_repos, "Public repos"],
        [stars, "Total stars"],
        [user.followers, "Followers"],
        [years + "y", "On GitHub"],
      ];
      gs.innerHTML = tiles.map(([n, l]) => `<div class="gh-stat"><div class="num">${esc(n)}</div><div class="lbl">${esc(l)}</div></div>`).join("");
    }

    // language breakdown (by repo count)
    const langBars = $("#langBars");
    if (langBars) {
      const counts = {};
      owned.forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
      if (top.length) {
        langBars.innerHTML = `<div class="lab-kind" style="margin-bottom:.4rem">Languages · by repository</div>` +
          top.map(([lang, c]) => {
            const pct = Math.round((c / total) * 100);
            return `<div class="lang-row"><span>${esc(lang)}</span><div class="bar"><span style="width:${pct}%"></span></div><span class="pc">${pct}%</span></div>`;
          }).join("");
      }
    }

    // latest repos (non-fork, prefer described)
    if (reposEl) {
      const list = owned
        .sort((a, b) => (b.description ? 1 : 0) - (a.description ? 1 : 0) || new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);
      if (!list.length) {
        reposEl.innerHTML = `<p class="loading">No public repositories yet — the first ones are on the way.</p>`;
      } else {
        reposEl.innerHTML = list.map((r) => `
          <article class="card card--tick repo">
            <a class="repo-name" href="${esc(r.html_url)}" target="_blank" rel="noopener">${svg("github")} ${esc(r.name)}</a>
            <p class="repo-desc">${esc(r.description || "No description yet.")}</p>
            <div class="repo-meta">
              ${r.language ? `<span class="lang">${esc(r.language)}</span>` : ""}
              <span>★ ${r.stargazers_count}</span>
              <span>⑂ ${r.forks_count}</span>
            </div>
          </article>`).join("");
      }
      if (window.__observeReveals) window.__observeReveals();
    }
  }

  /* ---- HEATMAP (from public events) ------------------------------------- */
  async function loadHeatmap() {
    const grid = $("#heatmap");
    if (!grid) return;

    // 53 weeks ending this week, Sunday-first.
    const DAY = 86400000, WEEKS = 53;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = new Date(today.getTime() - (WEEKS * 7 - 1) * DAY);
    start.setDate(start.getDate() - start.getDay()); // back to Sunday
    const key = (d) => d.toISOString().slice(0, 10);

    const counts = {};
    try {
      // up to 3 pages of events (~300), covers roughly the last 90 days
      for (let p = 1; p <= 3; p++) {
        const evs = await j(`${API}/users/${USER}/events/public?per_page=100&page=${p}`);
        if (!evs.length) break;
        evs.forEach((e) => {
          const d = new Date(e.created_at); d.setHours(0, 0, 0, 0);
          let n = 1;
          if (e.type === "PushEvent" && e.payload && e.payload.commits) n = e.payload.commits.length || 1;
          counts[key(d)] = (counts[key(d)] || 0) + n;
        });
        if (evs.length < 100) break;
      }
    } catch (e) { /* keep empty grid — still honest */ }

    const max = Math.max(1, ...Object.values(counts));
    const level = (c) => (!c ? 0 : c >= max * 0.75 ? 4 : c >= max * 0.5 ? 3 : c >= max * 0.25 ? 2 : 1);

    let total = 0, active = 0;
    const cells = [];
    for (let w = 0; w < WEEKS; w++) {
      for (let dow = 0; dow < 7; dow++) {
        const d = new Date(start.getTime() + (w * 7 + dow) * DAY);
        if (d > today) { cells.push('<span class="cell" data-l="0" style="visibility:hidden"></span>'); continue; }
        const c = counts[key(d)] || 0;
        total += c; if (c) active++;
        cells.push(`<span class="cell" data-l="${level(c)}" title="${c} contribution${c === 1 ? "" : "s"} on ${key(d)}"></span>`);
      }
    }
    grid.innerHTML = cells.join("");

    const head = document.querySelector(".heatmap-head .status");
    if (head) head.innerHTML = `<span class="dot"></span> ${total} contributions · ${active} active days (recent)`;
  }

  window.fetchGitHubRepos = () => { loadStatsAndRepos(); loadHeatmap(); };
  document.addEventListener("DOMContentLoaded", () => {
    if ($("#github-repos") || $("#ghStats") || $("#heatmap")) window.fetchGitHubRepos();
  });
})();
