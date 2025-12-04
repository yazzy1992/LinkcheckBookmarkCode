javascript:(()=>{try{
  const EXISTING = document.getElementById("lc-overlay");
  if (EXISTING) { EXISTING.remove(); return; }

  const d = document;
  const body = d.body || d.documentElement;

  // ---- CSS -------------------------------------------------------
  const style = d.createElement("style");
  style.textContent = `
  #lc-overlay {
    position: fixed;
    top: 10px;
    right: 10px;
    bottom: 10px;
    width: 440px;
    z-index: 999999;
    font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    font-size: 12px;
    color: #e5e7eb;
    background: linear-gradient(135deg,#020617,#111827);
    box-shadow: 0 10px 30px rgba(0,0,0,.6);
    border-radius: 12px;
    border: 1px solid rgba(148,163,184,.5);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .lc-header {
    padding: 10px 12px;
    border-bottom: 1px solid #1f2937;
    background: rgba(15,23,42,.95);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 6px;
  }
  .lc-title {
    font-size: 13px;
    font-weight: 600;
    margin: 0 0 2px;
  }
  .lc-sub {
    margin: 0;
    font-size: 11px;
    color: #9ca3af;
  }
  .lc-close {
    background: transparent;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 14px;
    padding: 2px 6px;
    border-radius: 999px;
  }
  .lc-close:hover {
    background: #1f2937;
    color: #e5e7eb;
  }
  .lc-section {
    padding: 8px 12px;
    border-bottom: 1px solid #1f2937;
  }
  .lc-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 6px;
  }
  .lc-input {
    flex: 1 1 auto;
    padding: 4px 6px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,.6);
    background: #020617;
    color: #e5e7eb;
    font-size: 11px;
  }
  .lc-input-small {
    flex: 0 0 70px;
  }
  .lc-input::placeholder {
    color: #6b7280;
  }
  .lc-label-small {
    font-size: 10px;
    color: #9ca3af;
  }
  .lc-checkbox {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #9ca3af;
    padding: 2px 6px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,.5);
    background: #020617;
  }
  .lc-checkbox input {
    accent-color: #22d3ee;
  }
  .lc-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }
  .lc-btn {
    border-radius: 999px;
    border: none;
    padding: 5px 10px;
    font-size: 11px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
    transition: transform .08s ease, box-shadow .08s ease, background-color .12s ease, border-color .12s ease;
  }
  .lc-btn:active {
    transform: translateY(1px);
    box-shadow: none;
  }
  .lc-btn-primary {
    background: linear-gradient(135deg,#22d3ee,#0ea5e9);
    color: #0b1120;
    box-shadow: 0 6px 14px rgba(56,189,248,.5);
  }
  .lc-btn-secondary {
    background: transparent;
    color: #9ca3af;
    border: 1px solid rgba(148,163,184,.7);
  }
  .lc-btn-secondary:disabled {
    opacity: .45;
    cursor: not-allowed;
  }
  .lc-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 11px;
    margin-top: 4px;
  }
  .lc-stat {
    padding: 3px 8px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,.4);
    background: rgba(15,23,42,.9);
  }
  .lc-stat-local {
    border-color: rgba(52,211,153,.6);
    color: #34d399;
  }
  .lc-stat-external {
    border-color: rgba(251,146,60,.7);
    color: #fb923c;
  }
  .lc-stat-ok {
    border-color: rgba(52,211,153,.7);
    color: #34d399;
  }
  .lc-stat-error {
    border-color: rgba(248,113,113,.7);
    color: #f97373;
  }
  .lc-stat-unknown {
    border-color: rgba(148,163,184,.7);
    color: #9ca3af;
  }
  .lc-table-wrap {
    flex: 1 1 auto;
    overflow: auto;
    border-top: 1px solid #1f2937;
    border-bottom: 1px solid #1f2937;
    background: rgba(15,23,42,.95);
  }
  .lc-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    min-width: 640px;
  }
  .lc-table th, .lc-table td {
    padding: 4px 6px;
    border-bottom: 1px solid #1f2937;
    text-align: left;
  }
  .lc-table thead {
    position: sticky;
    top: 0;
    background: #020617;
    z-index: 1;
  }
  .lc-table th {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .05em;
    color: #9ca3af;
  }
  .lc-table tbody tr:nth-child(even) { background: #020617; }
  .lc-table tbody tr:nth-child(odd) { background: #030712; }
  .lc-table tbody tr:hover { background: #1e293b; }
  .lc-badge {
    display: inline-block;
    border-radius: 999px;
    padding: 1px 7px;
    font-size: 10px;
    font-weight: 500;
  }
  .lc-badge-local {
    background: rgba(52,211,153,.12);
    color: #34d399;
    border: 1px solid rgba(52,211,153,.5);
  }
  .lc-badge-external {
    background: rgba(251,146,60,.12);
    color: #fb923c;
    border: 1px solid rgba(251,146,60,.6);
  }
  .lc-url {
    font-family: ui-monospace,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    font-size: 10px;
    color: #cbd5f5;
    word-break: break-all;
  }
  .lc-source {
    font-family: ui-monospace,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    font-size: 10px;
    color: #9ca3af;
    word-break: break-all;
  }
  .lc-status {
    font-size: 10px;
    font-weight: 500;
  }
  .lc-status-ok { color: #34d399; }
  .lc-status-error { color: #f97373; }
  .lc-status-warn { color: #fb923c; }
  .lc-status-unk { color: #9ca3af; }
  .lc-status-pend { color: #60a5fa; }
  .lc-footer {
    padding: 6px 10px;
    font-size: 10px;
    color: #9ca3af;
    background: rgba(15,23,42,.95);
  }
  .lc-log {
    max-height: 90px;
    overflow: auto;
    border-radius: 8px;
    border: 1px dashed #1f2937;
    padding: 4px 6px;
    font-family: ui-monospace,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    font-size: 10px;
    color: #9ca3af;
    margin-top: 4px;
    background: rgba(15,23,42,.9);
    white-space: pre-line;
  }
  .lc-log-line-important { color: #22d3ee; }
  .lc-log-line-error { color: #f97373; }
  `;
  d.head.appendChild(style);

  // ---- Overlay-Grundstruktur ------------------------------------
  const overlay = d.createElement("div");
  overlay.id = "lc-overlay";
  body.appendChild(overlay);

  const header = d.createElement("div");
  header.className = "lc-header";

  const hWrap = d.createElement("div");
  const title = d.createElement("h2");
  title.className = "lc-title";
  title.textContent = "Domain-Linkchecker (Bookmarklet)";
  const sub = d.createElement("p");
  sub.className = "lc-sub";
  sub.textContent = "Prüft Links der aktuellen Seite oder crawlt die Domain (gleiche Origin).";
  hWrap.appendChild(title);
  hWrap.appendChild(sub);

  const closeBtn = d.createElement("button");
  closeBtn.className = "lc-close";
  closeBtn.textContent = "×";
  closeBtn.title = "Overlay schließen";
  closeBtn.onclick = () => overlay.remove();

  header.appendChild(hWrap);
  header.appendChild(closeBtn);
  overlay.appendChild(header);

  const section = d.createElement("div");
  section.className = "lc-section";

  // Crawl-Konfiguration
  const rowConfig = d.createElement("div");
  rowConfig.className = "lc-row";

  const startInput = d.createElement("input");
  startInput.type = "text";
  startInput.className = "lc-input";
  startInput.placeholder = "Start-URL für Domain-Crawl (Standard: aktuelle Seite)";
  startInput.value = window.location.href;

  const depthInput = d.createElement("input");
  depthInput.type = "number";
  depthInput.className = "lc-input lc-input-small";
  depthInput.value = "1";
  depthInput.min = "0";
  depthInput.max = "5";

  const depthLabel = d.createElement("div");
  depthLabel.className = "lc-label-small";
  depthLabel.textContent = "Tiefe";

  const depthWrap = d.createElement("div");
  depthWrap.style.display = "flex";
  depthWrap.style.flexDirection = "column";
  depthWrap.style.gap = "2px";
  depthWrap.appendChild(depthLabel);
  depthWrap.appendChild(depthInput);

  const maxPagesInput = d.createElement("input");
  maxPagesInput.type = "number";
  maxPagesInput.className = "lc-input lc-input-small";
  maxPagesInput.value = "100";
  maxPagesInput.min = "1";
  maxPagesInput.max = "2000";

  const maxPagesLabel = d.createElement("div");
  maxPagesLabel.className = "lc-label-small";
  maxPagesLabel.textContent = "max. Seiten";

  const maxPagesWrap = d.createElement("div");
  maxPagesWrap.style.display = "flex";
  maxPagesWrap.style.flexDirection = "column";
  maxPagesWrap.style.gap = "2px";
  maxPagesWrap.appendChild(maxPagesLabel);
  maxPagesWrap.appendChild(maxPagesInput);

  rowConfig.appendChild(startInput);
  rowConfig.appendChild(depthWrap);
  rowConfig.appendChild(maxPagesWrap);
  section.appendChild(rowConfig);

  // Filter
  const rowFilters = d.createElement("div");
  rowFilters.className = "lc-row";

  function mkCheckbox(id, labelText, checked) {
    const label = d.createElement("label");
    label.className = "lc-checkbox";
    const inp = d.createElement("input");
    inp.type = "checkbox";
    inp.id = id;
    inp.checked = checked;
    const span = d.createElement("span");
    span.textContent = labelText;
    label.appendChild(inp);
    label.appendChild(span);
    return {label, input: inp};
  }

  const cbAnch = mkCheckbox("lc-ignore-anchors", "#-Anker ignorieren", true);
  const cbMail = mkCheckbox("lc-ignore-mail", "mailto: ignorieren", true);
  const cbJs   = mkCheckbox("lc-ignore-js", "javascript: ignorieren", true);

  rowFilters.appendChild(cbAnch.label);
  rowFilters.appendChild(cbMail.label);
  rowFilters.appendChild(cbJs.label);
  section.appendChild(rowFilters);

  // Buttons
  const rowBtns = d.createElement("div");
  rowBtns.className = "lc-buttons";

  const btnPage = d.createElement("button");
  btnPage.className = "lc-btn lc-btn-primary";
  btnPage.textContent = "Nur diese Seite erfassen";

  const btnCrawl = d.createElement("button");
  btnCrawl.className = "lc-btn lc-btn-secondary";
  btnCrawl.textContent = "Domain-Crawl starten";

  const btnStatus = d.createElement("button");
  btnStatus.className = "lc-btn lc-btn-secondary";
  btnStatus.textContent = "Status prüfen";
  btnStatus.disabled = true;

  const btnCsv = d.createElement("button");
  btnCsv.className = "lc-btn lc-btn-secondary";
  btnCsv.textContent = "CSV exportieren";
  btnCsv.disabled = true;

  rowBtns.appendChild(btnPage);
  rowBtns.appendChild(btnCrawl);
  rowBtns.appendChild(btnStatus);
  rowBtns.appendChild(btnCsv);
  section.appendChild(rowBtns);

  // Stats
  const statsRow = d.createElement("div");
  statsRow.className = "lc-stats";

  function mkStat(label, cls) {
    const span = d.createElement("span");
    span.className = "lc-stat" + (cls ? " " + cls : "");
    span.innerHTML = label + ' <span>0</span>';
    return {wrap: span, val: span.querySelector("span")};
  }

  const sTotal = mkStat("Links gesamt:", "");
  const sLocal = mkStat("Lokal:", "lc-stat-local");
  const sExt   = mkStat("Extern:", "lc-stat-external");
  const sOk    = mkStat("Status OK:", "lc-stat-ok");
  const sErr   = mkStat("Status Fehler:", "lc-stat-error");
  const sUnk   = mkStat("Status unbekannt:", "lc-stat-unknown");

  statsRow.appendChild(sTotal.wrap);
  statsRow.appendChild(sLocal.wrap);
  statsRow.appendChild(sExt.wrap);
  statsRow.appendChild(sOk.wrap);
  statsRow.appendChild(sErr.wrap);
  statsRow.appendChild(sUnk.wrap);
  section.appendChild(statsRow);

  // Log
  const logBox = d.createElement("div");
  logBox.className = "lc-log";
  section.appendChild(logBox);

  overlay.appendChild(section);

  // Tabelle
  const tableWrap = d.createElement("div");
  tableWrap.className = "lc-table-wrap";
  const table = d.createElement("table");
  table.className = "lc-table";
  const thead = d.createElement("thead");
  thead.innerHTML = "<tr><th>#</th><th>Typ</th><th>Quell-Seite</th><th>Link-Text</th><th>URL</th><th>Status</th></tr>";
  const tbody = d.createElement("tbody");
  table.appendChild(thead);
  table.appendChild(tbody);
  tableWrap.appendChild(table);
  overlay.appendChild(tableWrap);

  const footer = d.createElement("div");
  footer.className = "lc-footer";
  footer.textContent = "Hinweis: Domain-Crawl funktioniert nur für dieselbe Origin. Externe Links können wegen CORS oft nicht vollständig geprüft werden.";
  overlay.appendChild(footer);

  // ---- Logik -----------------------------------------------------

  const origin = window.location.origin;
  let links = [];          // {source,url,text,type,statusType,statusLabel,statusEl}
  let visitedPages = new Set();
  let crawling = false;
  let stopRequested = false;  // aktuell nicht per UI, aber vorbereitet

  function log(msg, type) {
    const line = d.createElement("div");
    line.textContent = msg;
    if (type === "important") line.classList.add("lc-log-line-important");
    if (type === "error") line.classList.add("lc-log-line-error");
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  }

  function resetStats() {
    sTotal.val.textContent = "0";
    sLocal.val.textContent = "0";
    sExt.val.textContent   = "0";
    sOk.val.textContent    = "0";
    sErr.val.textContent   = "0";
    sUnk.val.textContent   = "0";
  }

  function updateCounts() {
    sTotal.val.textContent = String(links.length);
    sLocal.val.textContent = String(links.filter(l => l.type === "lokal").length);
    sExt.val.textContent   = String(links.filter(l => l.type === "extern").length);
    sOk.val.textContent    = String(links.filter(l => l.statusType === "ok").length);
    sErr.val.textContent   = String(links.filter(l => l.statusType === "error").length);
    sUnk.val.textContent   = String(links.filter(l => !l.statusType || l.statusType === "unknown").length);
  }

  function clearLinks() {
    links = [];
    visitedPages.clear();
    tbody.innerHTML = "";
    logBox.textContent = "";
    resetStats();
    btnStatus.disabled = true;
    btnCsv.disabled = true;
  }

  function classifyUrl(url) {
    try {
      const u = new URL(url);
      return u.origin === origin ? "lokal" : "extern";
    } catch (e) {
      return "extern";
    }
  }

  function addLinkRow(linkObj) {
    const tr = d.createElement("tr");

    const tdIdx = d.createElement("td");
    tdIdx.textContent = String(linkObj.idx + 1);

    const tdType = d.createElement("td");
    const badge = d.createElement("span");
    badge.className = "lc-badge " + (linkObj.type === "lokal" ? "lc-badge-local" : "lc-badge-external");
    badge.textContent = linkObj.type;
    tdType.appendChild(badge);

    const tdSource = d.createElement("td");
    tdSource.className = "lc-source";
    tdSource.textContent = linkObj.source;

    const tdText = d.createElement("td");
    tdText.textContent = linkObj.text || "[kein Text]";

    const tdUrl = d.createElement("td");
    tdUrl.className = "lc-url";
    tdUrl.textContent = linkObj.url;

    const tdStatus = d.createElement("td");
    const st = d.createElement("span");
    st.className = "lc-status lc-status-unk";
    st.textContent = "Noch nicht geprüft";
    tdStatus.appendChild(st);

    tr.appendChild(tdIdx);
    tr.appendChild(tdType);
    tr.appendChild(tdSource);
    tr.appendChild(tdText);
    tr.appendChild(tdUrl);
    tr.appendChild(tdStatus);

    tbody.appendChild(tr);

    linkObj.statusEl = st;
  }

  function collectFromDocument(doc, pageUrl) {
    const ignoreAnch = cbAnch.input.checked;
    const ignoreMail = cbMail.input.checked;
    const ignoreJs   = cbJs.input.checked;

    const as = Array.from(doc.querySelectorAll("a[href]"));

    as.forEach(a => {
      const raw = (a.getAttribute("href") || "").trim();
      if (!raw) return;
      const lower = raw.toLowerCase();
      if (ignoreAnch && raw.startsWith("#")) return;
      if (ignoreMail && lower.startsWith("mailto:")) return;
      if (ignoreJs && lower.startsWith("javascript:")) return;

      let abs;
      try { abs = new URL(raw, pageUrl).href; }
      catch(e) { abs = raw; }

      const type = classifyUrl(abs);
      const text = (a.textContent || "").trim() || "[kein Text]";

      const linkObj = {
        idx: links.length,
        source: pageUrl,
        url: abs,
        text,
        type,
        statusType: "unknown",
        statusLabel: "Noch nicht geprüft",
        statusEl: null
      };
      links.push(linkObj);
      addLinkRow(linkObj);
    });
  }

  // Nur aktuelle Seite erfassen
  function scanCurrentPage() {
    clearLinks();
    const pageUrl = window.location.href;
    log("Erfasse Links der aktuellen Seite: " + pageUrl, "important");
    collectFromDocument(d, pageUrl);
    updateCounts();
    btnStatus.disabled = links.length === 0;
    btnCsv.disabled = links.length === 0;
  }

  // Domain-Crawl
  async function crawlDomain() {
    if (crawling) return;
    clearLinks();
    crawling = true;
    stopRequested = false;

    let startRaw = startInput.value.trim();
    if (!startRaw) startRaw = window.location.href;

    let depth = parseInt(depthInput.value, 10);
    if (isNaN(depth) || depth < 0) depth = 1;

    let maxPages = parseInt(maxPagesInput.value, 10);
    if (isNaN(maxPages) || maxPages < 1) maxPages = 100;

    let startAbs;
    try {
      startAbs = new URL(startRaw, window.location.href).href;
    } catch(e) {
      alert("Start-URL ist ungültig.");
      crawling = false;
      return;
    }

    if (new URL(startAbs).origin !== origin) {
      alert("Start-URL muss auf derselben Origin liegen wie die aktuelle Seite.");
      crawling = false;
      return;
    }

    log("Starte Domain-Crawl ab: " + startAbs, "important");
    log("Tiefe: " + depth + ", max. Seiten: " + maxPages);

    btnPage.disabled   = true;
    btnCrawl.disabled  = true;
    btnStatus.disabled = true;
    btnCsv.disabled    = true;

    const queue = [];
    const queued = new Set();
    queue.push({url: startAbs, d: 0});
    queued.add(startAbs);

    while (queue.length > 0 && !stopRequested && visitedPages.size < maxPages) {
      const {url, d: curDepth} = queue.shift();
      if (visitedPages.has(url)) continue;
      visitedPages.add(url);
      log("Hole Seite (Tiefe " + curDepth + "): " + url);

      let html;
      try {
        const resp = await fetch(url, {method: "GET"});
        if (!resp.ok) {
          log("Antwort nicht OK (" + resp.status + ") für: " + url, "error");
          continue;
        }
        html = await resp.text();
      } catch(e) {
        log("Fehler beim Abruf: " + url + " → " + e.message, "error");
        continue;
      }

      const parser = new DOMParser();
      let doc;
      try {
        doc = parser.parseFromString(html, "text/html");
      } catch(e) {
        log("Fehler beim Parsen von HTML: " + url, "error");
        continue;
      }

      collectFromDocument(doc, url);
      updateCounts();

      if (curDepth < depth) {
        const ignoreAnch = cbAnch.input.checked;
        const ignoreMail = cbMail.input.checked;
        const ignoreJs   = cbJs.input.checked;
        const as = Array.from(doc.querySelectorAll("a[href]"));
        as.forEach(a => {
          const raw = (a.getAttribute("href") || "").trim();
          if (!raw) return;
          const lower = raw.toLowerCase();
          if (ignoreAnch && raw.startsWith("#")) return;
          if (ignoreMail && lower.startsWith("mailto:")) return;
          if (ignoreJs && lower.startsWith("javascript:")) return;

          let abs;
          try { abs = new URL(raw, url).href; }
          catch(e) { return; }

          if (classifyUrl(abs) === "lokal" && !visitedPages.has(abs) && !queued.has(abs)) {
            queue.push({url: abs, d: curDepth + 1});
            queued.add(abs);
          }
        });
      }
    }

    if (visitedPages.size >= maxPages) {
      log("Maximale Seitenanzahl erreicht: " + maxPages, "important");
    }
    if (stopRequested) {
      log("Crawl gestoppt.", "important");
    } else {
      log("Crawl abgeschlossen. Besuchte Seiten: " + visitedPages.size, "important");
    }

    crawling = false;
    btnPage.disabled   = false;
    btnCrawl.disabled  = false;
    btnStatus.disabled = links.length === 0;
    btnCsv.disabled    = links.length === 0;
    updateCounts();
  }

  // Statusprüfung intern
  async function checkInternal(link) {
    const el = link.statusEl;
    if (!el) return;
    el.textContent = "Prüfe (intern)…";
    el.className = "lc-status lc-status-pend";
    try {
      let resp;
      try {
        resp = await fetch(link.url, {method:"HEAD"});
        if (!resp.ok && resp.status === 405) {
          resp = await fetch(link.url, {method:"GET"});
        }
      } catch(e) {
        resp = await fetch(link.url, {method:"GET"});
      }
      if (resp.ok) {
        link.statusType = "ok";
        link.statusLabel = "INTERN: OK (" + resp.status + ")";
        el.textContent = link.statusLabel;
        el.className = "lc-status lc-status-ok";
      } else {
        link.statusType = "error";
        link.statusLabel = "INTERN: FEHLER (" + resp.status + ")";
        el.textContent = link.statusLabel;
        el.className = "lc-status lc-status-error";
      }
    } catch(e) {
      link.statusType = "error";
      link.statusLabel = "INTERN: FEHLER (Netzwerk/Browserverhalten)";
      el.textContent = link.statusLabel;
      el.className = "lc-status lc-status-error";
    }
    updateCounts();
  }

  // Statusprüfung extern
  async function checkExternal(link) {
    const el = link.statusEl;
    if (!el) return;
    el.textContent = "Prüfe (extern)…";
    el.className = "lc-status lc-status-pend";
    try {
      const resp = await fetch(link.url, {method:"HEAD", mode:"cors"});
      if (resp.type === "opaque") {
        link.statusType = "unknown";
        link.statusLabel = "EXTERN & UNGEPRÜFT (opaque/CORS)";
        el.textContent = link.statusLabel;
        el.className = "lc-status lc-status-unk";
      } else if (resp.ok) {
        link.statusType = "ok";
        link.statusLabel = "EXTERN: OK (" + resp.status + ")";
        el.textContent = link.statusLabel;
        el.className = "lc-status lc-status-ok";
      } else {
        link.statusType = "error";
        link.statusLabel = "EXTERN: MÖGLICHER FEHLER (" + resp.status + ")";
        el.textContent = link.statusLabel;
        el.className = "lc-status lc-status-warn";
      }
    } catch(e) {
      link.statusType = "unknown";
      link.statusLabel = "EXTERN & UNGEPRÜFT (CORS/Netzwerk)";
      el.textContent = link.statusLabel;
      el.className = "lc-status lc-status-unk";
    }
    updateCounts();
  }

  // Alle Status prüfen
  async function checkAllStatuses() {
    if (!links.length) {
      alert("Keine Links zum Prüfen.");
      return;
    }
    log("Starte Statusprüfung für " + links.length + " Links.", "important");

    btnPage.disabled   = true;
    btnCrawl.disabled  = true;
    btnStatus.disabled = true;
    btnCsv.disabled    = true;

    links.forEach(l => {
      l.statusType = "unknown";
      l.statusLabel = "Wird geprüft…";
      if (l.statusEl) {
        l.statusEl.textContent = l.statusLabel;
        l.statusEl.className = "lc-status lc-status-pend";
      }
    });
    updateCounts();

    const tasks = links.map(link => {
      return () => link.type === "lokal" ? checkInternal(link) : checkExternal(link);
    });

    const concurrency = 8;
    let current = 0;

    async function worker() {
      while (current < tasks.length) {
        const idx = current++;
        const t = tasks[idx];
        try { await t(); } catch(e) {}
      }
    }

    const workers = [];
    const effective = Math.min(concurrency, tasks.length || 1);
    for (let i=0;i<effective;i++) workers.push(worker());
    await Promise.all(workers);

    log("Statusprüfung abgeschlossen.", "important");

    btnPage.disabled   = false;
    btnCrawl.disabled  = false;
    btnStatus.disabled = false;
    btnCsv.disabled    = false;
    updateCounts();
  }

  // CSV-Export
  function exportCsv() {
    if (!links.length) {
      alert("Keine Daten zum Exportieren.");
      return;
    }
    const header = ["Nr","Typ","Quell-Seite","Link-Text","URL","Status"];
    const lines = [];
    lines.push(header.join(";"));
    links.forEach((l, i) => {
      const arr = [
        i+1,
        l.type,
        l.source,
        l.text,
        l.url,
        l.statusLabel || "Noch nicht geprüft"
      ].map(v => '"' + String(v).replace(/"/g,'""') + '"');
      lines.push(arr.join(";"));
    });
    const csv = lines.join("\r\n");
    const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = d.createElement("a");
    a.href = url;
    a.download = "link-report-"+(new Date().toISOString().slice(0,10))+".csv";
    d.body.appendChild(a);
    a.click();
    d.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Events
  btnPage.onclick  = () => scanCurrentPage();
  btnCrawl.onclick = () => crawlDomain();
  btnStatus.onclick = () => { checkAllStatuses(); };
  btnCsv.onclick    = () => exportCsv();

  // Beim ersten Öffnen: aktuelle Seite erfassen
  scanCurrentPage();

}catch(e){alert("Fehler im Bookmarklet: "+e.message);}})();    
