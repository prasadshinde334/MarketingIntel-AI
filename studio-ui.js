/* Cardio-Diabetic Brand Desk — campaign & in-clinic activity studio on the page.
   Flow: orientation + goal + doctor → campaign ideas → selected campaign (idea, flow,
   in-clinic activities) → live ROI calculator → campaign pack PDF.
   Shares the company orientation with the brand-plan form (localStorage "cdbd-orient", event "cdbd:orient")
   and exposes the selected campaign + ROI inputs as window.CDBD_CAMPAIGN for the brand plan. */
(function () {
  "use strict";
  const S = window.BrandStudio, BP = window.BrandPlan;
  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = String(text); return e; };
  const clear = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const svgEl = (tag, attrs) => { const e = document.createElementNS("http://www.w3.org/2000/svg", tag); Object.entries(attrs || {}).forEach(([k, v]) => e.setAttribute(k, v)); return e; };
  const TYPE_CLS = { "Scientific": "t-sci", "Experiential": "t-exp", "Practice-building": "t-prac", "Patient experience": "t-pat", "Digital in-clinic": "t-dig" };
  const inr = n => { const a = Math.abs(n), s = n < 0 ? "−" : ""; return a >= 1e7 ? s + "₹" + (a / 1e7).toFixed(2) + " Cr" : a >= 1e5 ? s + "₹" + (a / 1e5).toFixed(1) + " L" : s + "₹" + Math.round(a).toLocaleString("en-IN"); };

  /* ROI inputs. keep = remembered across campaigns (company-level numbers). */
  const FIELDS = [
    { k: "doctors", label: "Doctors enrolled", hint: "Core doctors who run the campaign", min: 25, max: 2000, step: 25, keep: true },
    { k: "conv", label: "Doctors who adopt", hint: "Start prescribing for the target patient", min: 0.05, max: 0.6, step: 0.01, pct: true },
    { k: "ppm", label: "New patients per adopting doctor / month", min: 0.5, max: 10, step: 0.5 },
    { k: "persist", label: "Patients who stay on therapy each month", min: 0.6, max: 0.98, step: 0.01, pct: true },
    { k: "revPPM", label: "Net revenue per patient-month (₹)", hint: "Company realisation, after trade margins", min: 50, max: 3000, step: 10, keep: true },
    { k: "margin", label: "Gross margin", min: 0.2, max: 0.85, step: 0.01, pct: true, keep: true },
    { k: "fixedCost", label: "One-time campaign cost (₹)", hint: "Creative, medical review, production, events", min: 0, max: 5000000, step: 25000 },
    { k: "perDocCost", label: "Cost per enrolled doctor (₹)", hint: "Kits, sessions, training share", min: 0, max: 20000, step: 100 }
  ];

  let ctx = null, seed = 0, camps = [], sel = 0, assume = null;

  /* ---------- orientation sharing ---------- */
  function getStored(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }
  function setOrient(v, from) {
    try { localStorage.setItem("cdbd-orient", v); } catch (e) { }
    window.CDBD_ORIENT = v;
    document.dispatchEvent(new CustomEvent("cdbd:orient", { detail: { orient: v, from } }));
  }
  window.CDBD_ORIENT = getStored("cdbd-orient");
  const orientNow = () => (document.querySelector('input[name="sorient"]:checked') || {}).value || "scientific";
  const syncRadios = v => document.querySelectorAll('input[name="sorient"]').forEach(r => { r.checked = r.value === v; });
  if (window.CDBD_ORIENT) syncRadios(window.CDBD_ORIENT);

  function kept() { try { return JSON.parse(getStored("cdbd-roi-keep") || "{}"); } catch (e) { return {}; } }
  function saveKept() { const o = {}; FIELDS.filter(f => f.keep).forEach(f => o[f.k] = assume[f.k]); try { localStorage.setItem("cdbd-roi-keep", JSON.stringify(o)); } catch (e) { } }
  const withKept = c => Object.assign({}, c.assume, { campaignMonths: c.months }, kept());

  function fillSelects() {
    const o = $("studioObj"), a = $("studioAud"), keepO = o.value, keepA = a.value;
    clear(o); Object.entries(S.OBJ).forEach(([k, v]) => { const x = el("option", "", v); x.value = k; o.appendChild(x); });
    clear(a); const any = el("option", "", "Any doctor"); any.value = "any"; a.appendChild(any);
    const seen = new Set();
    ctx.C.spec.forEach(([s]) => { const k = S.audOf(s); if (seen.has(k)) return; seen.add(k); const x = el("option", "", S.AUD[k]); x.value = k; a.appendChild(x); });
    o.value = keepO && [...o.options].some(x => x.value === keepO) ? keepO : "any";
    a.value = keepA && [...a.options].some(x => x.value === keepA) ? keepA : "any";
  }

  /* ---------- 1. campaign ideas ---------- */
  function generate(animate) {
    if (!ctx) return;
    const orient = orientNow(), strengths = ctx.st.strengths;
    camps = S.generateCampaigns(ctx.m, { orient, obj: $("studioObj").value, aud: $("studioAud").value, n: 3, seed, strengths });
    const strat = S.strategy(ctx.m, orient, { strengths });
    const idea = $("studioIdea"); clear(idea);
    idea.append(el("span", "si-k", "Big idea for a " + strat.label.toLowerCase() + " launch"), el("b", "", strat.bigIdea.name), el("span", "si-line", strat.bigIdea.line));

    const list = $("campList"); clear(list);
    camps.forEach((c, i) => {
      const r = S.roi(withKept(c));
      const b = el("button", "camp" + (animate ? " act-in" : ""));
      b.type = "button"; b.setAttribute("role", "radio"); b.style.setProperty("--i", i);
      b.append(el("span", "camp-k", `${c.months} months · ${c.channels.slice(0, 2).join(" · ")}`), el("b", "camp-name", c.name), el("span", "camp-tag", c.tagline));
      const foot = el("span", "camp-foot");
      foot.append(el("span", "", `${c.activities.length} in-clinic activities`), el("span", "camp-roi " + (r.roiPct >= 0 ? "pos" : "neg"), `Est. ROI ${Math.round(r.roiPct)}%`));
      b.append(foot);
      b.onclick = () => select(i, true);
      list.appendChild(b);
    });
    select(0, false);
  }

  /* ---------- selected campaign ---------- */
  function select(i, user) {
    sel = i;
    [...$("campList").children].forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-checked", String(k === i)); });
    const c = camps[i]; if (!c) return;
    assume = withKept(c);

    const d = $("campDetail"); clear(d);
    const left = el("div", "cd-idea");
    left.append(el("span", "cd-k", "The campaign"), el("h3", "cd-name", c.name), el("p", "cd-tag", c.tagline));
    const ins = el("p", "cd-insight"); ins.append(el("b", "", "Insight. "), document.createTextNode(c.insight));
    const vis = el("p", "cd-visual"); vis.append(el("b", "", "Visual idea. "), document.createTextNode(c.visual || ""));
    const ch = el("div", "cd-ch"); c.channels.forEach(x => ch.appendChild(el("span", "", x)));
    left.append(ins, el("p", "cd-text", c.idea), vis, ch);
    const flow = el("ol", "cd-flow");
    c.phases.forEach((p, k) => { const li = el("li"); li.style.setProperty("--i", k); li.append(el("span", "cd-m", p.m), el("b", "", p.t), el("span", "cd-d", p.d)); flow.appendChild(li); });
    const right = el("div", "cd-right"); right.append(el("span", "cd-k", "Campaign flow"), flow);
    d.append(left, right);
    if (user) { d.classList.remove("act-in"); void d.offsetWidth; d.classList.add("act-in"); }

    renderActs(c);
    buildInputs();
    calc();
  }

  function section(title, body) { const d = el("div", "act-sec"); d.append(el("h4", "", title)); if (typeof body === "string") d.append(el("p", "", body)); else d.append(body); return d; }
  function renderActs(c) {
    const box = $("studioActs"); clear(box);
    box.classList.toggle("n4", c.activities.length === 4);
    c.activities.forEach((a, i) => {
      const card = el("article", "act " + (TYPE_CLS[a.type] || ""));
      const head = el("div", "act-head"); head.append(el("span", "act-type", a.type), el("span", "act-num", String(i + 1).padStart(2, "0")));
      const meta = el("ul", "act-meta");
      [["Format", a.dur], ["Rhythm", a.freq], ["Best for", a.aud.join(", ")]].forEach(([k, v]) => { const li = el("li"); li.append(el("span", "", k), document.createTextNode(v)); meta.appendChild(li); });
      const goals = el("div", "act-goals"); a.obj.forEach(g => goals.appendChild(el("span", "", g)));
      const det = el("details", "act-more"); det.append(el("summary", "", "How it runs, kit and guardrails"));
      const ol = el("ol", "act-steps"); a.steps.forEach(s => ol.appendChild(el("li", "", s)));
      const kit = el("ul", "act-kit"); a.kit.forEach(k => kit.appendChild(el("li", "", k)));
      det.append(section("The idea", a.concept), section("How it runs", ol), section("Kit", kit), section("What the doctor gets", a.gets), section("How we measure it", a.measure));
      const g = section("Compliance guardrail", a.guard); g.classList.add("act-guard"); det.append(g);
      card.append(head, el("h3", "act-name", a.name), el("p", "act-hook", a.hook), meta, goals, det);
      box.appendChild(card);
    });
  }

  /* ---------- 3. ROI calculator ---------- */
  const disp = (f, v) => f.pct ? Math.round(v * 100) : v;
  const parse = (f, v) => { let n = Number(v); if (!isFinite(n)) return null; if (f.pct) n /= 100; return Math.min(f.max, Math.max(f.min, n)); };
  function buildInputs() {
    const box = $("roiInputs"); clear(box);
    FIELDS.forEach(f => {
      const row = el("div", "roi-in");
      const top = el("label", "roi-top"); top.htmlFor = "roi-" + f.k;
      top.append(el("span", "roi-l", f.label));
      const wrap = el("span", "roi-num");
      const num = el("input"); num.type = "number"; num.id = "roi-" + f.k; num.inputMode = "decimal";
      num.min = disp(f, f.min); num.max = disp(f, f.max); num.step = f.pct ? 1 : f.step; num.value = disp(f, assume[f.k]);
      wrap.append(num); if (f.pct) wrap.append(el("span", "roi-u", "%"));
      top.append(wrap);
      const rng = el("input"); rng.type = "range"; rng.min = f.min; rng.max = f.max; rng.step = f.step; rng.value = assume[f.k];
      rng.setAttribute("aria-label", f.label);
      const fillR = () => rng.style.setProperty("--p", ((rng.value - rng.min) / (rng.max - rng.min) * 100) + "%");
      fillR();
      rng.addEventListener("input", () => { assume[f.k] = Number(rng.value); num.value = disp(f, assume[f.k]); fillR(); if (f.keep) saveKept(); calc(); });
      num.addEventListener("input", () => { const v = parse(f, num.value); if (v == null) return; assume[f.k] = v; rng.value = v; fillR(); if (f.keep) saveKept(); calc(); });
      row.append(top, rng);
      if (f.hint) row.append(el("span", "roi-hint", f.hint));
      box.appendChild(row);
    });
  }

  function calc() {
    const c = camps[sel]; if (!c || !assume) return;
    const r = S.roi(assume), sc = S.scenarios(assume);
    window.CDBD_CAMPAIGN = { molecule: ctx.m.name, orient: orientNow(), c, assume: Object.assign({}, assume) };

    const tiles = $("roiTiles"); clear(tiles);
    [["Investment", inr(r.invest), "c-red"], ["Incremental revenue", inr(r.revenue), "c-blue"], ["Gross profit", inr(r.profit), "c-teal"],
     ["ROI", Math.round(r.roiPct) + "%", r.roiPct >= 0 ? "c-teal big" : "c-red big"], ["Payback", r.payback ? "Month " + r.payback : "After M12", "c-honey"], ["Return per ₹1", "₹" + r.perRupee.toFixed(2), "c-violet"]]
      .forEach(([l, v, cls]) => { const t = el("div", "roi-tile " + cls); t.append(el("b", "", v), el("span", "", l)); tiles.appendChild(t); });

    /* chart */
    const svg = $("roiChart"); clear(svg);
    const narrow = (svg.parentNode.clientWidth || 560) < 480;
    const W = narrow ? 340 : 560, H = narrow ? 230 : 230, L = narrow ? 50 : 58, R = 10, T = 16, B = 28, cw = W - L - R, ch = H - T - B;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.classList.toggle("narrow", narrow);
    const maxV = Math.max(1, ...r.rows.map(x => Math.max(x.cumP, x.cumC)));
    const xs = i => L + cw * i / (r.rows.length - 1), ys = v => T + ch - ch * v / maxV;
    [0, 0.25, 0.5, 0.75, 1].forEach(k => {
      svg.appendChild(svgEl("line", { x1: L, x2: W - R, y1: ys(maxV * k), y2: ys(maxV * k), class: "grid" }));
      const t = svgEl("text", { x: L - 8, y: ys(maxV * k) + 4, "text-anchor": "end", class: "ax" }); t.textContent = inr(maxV * k); svg.appendChild(t);
    });
    r.rows.forEach((x, i) => { if (i % 2 === 0 || i === r.rows.length - 1) { const t = svgEl("text", { x: xs(i), y: H - 8, "text-anchor": "middle", class: "ax" }); t.textContent = "M" + x.t; svg.appendChild(t); } });
    const path = key => r.rows.map((x, i) => (i ? "L" : "M") + xs(i).toFixed(1) + " " + ys(x[key]).toFixed(1)).join(" ");
    const area = path("cumP") + ` L${xs(r.rows.length - 1)} ${T + ch} L${L} ${T + ch} Z`;
    svg.appendChild(svgEl("path", { d: area, class: "ar-p" }));
    svg.appendChild(svgEl("path", { d: path("cumC"), class: "ln-c" }));
    svg.appendChild(svgEl("path", { d: path("cumP"), class: "ln-p" }));
    if (r.payback) {
      const i = r.payback - 1, x = xs(i), y = ys(r.rows[i].cumP);
      svg.appendChild(svgEl("line", { x1: x, x2: x, y1: T, y2: T + ch, class: "pb-l" }));
      svg.appendChild(svgEl("circle", { cx: x, cy: y, r: 6, class: "pb" }));
      const t = svgEl("text", { x: Math.min(x + 8, W - 90), y: T + 12, class: "pb-t" }); t.textContent = "Payback M" + r.payback; svg.appendChild(t);
    }

    /* scenarios */
    const scB = $("roiScen"); clear(scB);
    const tbl = el("table", "scen"), th = el("tr");
    ["Scenario", "Adopt", "Gross profit", "ROI"].forEach(h => th.appendChild(el("th", "", h)));
    const thead = el("thead"); thead.appendChild(th); tbl.appendChild(thead);
    const tb = el("tbody");
    sc.forEach(x => { const tr = el("tr", x.label === "Base" ? "base" : ""); tr.append(el("td", "", x.label), el("td", "", Math.round(x.conv * 100) + "%"), el("td", "", inr(x.r.profit)), el("td", x.r.roiPct >= 0 ? "pos" : "neg", Math.round(x.r.roiPct) + "%")); tb.appendChild(tr); });
    tbl.appendChild(tb); scB.appendChild(tbl);

    $("roiNote").textContent = `${Math.round(r.adopters)} adopting doctors start about ${Math.round(r.newPatients).toLocaleString("en-IN")} new patients in 12 months; ${Math.round(r.activeEnd).toLocaleString("en-IN")} are still on therapy at month 12.` +
      (r.breakEvenConv != null ? ` Break-even needs ${Math.round(r.breakEvenConv * 100)}% of enrolled doctors to adopt.` : "") + " A planning estimate from your assumptions, not a forecast.";

    /* refresh the estimate on the selected card */
    const card = $("campList").children[sel];
    if (card) { const t = card.querySelector(".camp-roi"); t.textContent = `Est. ROI ${Math.round(r.roiPct)}%`; t.className = "camp-roi " + (r.roiPct >= 0 ? "pos" : "neg"); }
  }

  /* ---------- events ---------- */
  document.querySelectorAll('input[name="sorient"]').forEach(r => r.addEventListener("change", () => { seed = 0; setOrient(r.value, "studio"); generate(true); }));
  ["studioObj", "studioAud"].forEach(id => $(id).addEventListener("change", () => { seed = 0; generate(true); }));
  $("studioMore").addEventListener("click", () => { seed++; generate(true); });
  $("roiReset").addEventListener("click", () => { try { localStorage.removeItem("cdbd-roi-keep"); } catch (e) { } select(sel, false); });
  $("studioPdf").addEventListener("click", () => {
    const c = camps[sel]; if (!ctx || !c) return;
    if (!window.jspdf) { $("studioMsg").textContent = "The PDF library didn’t load."; return; }
    const orient = orientNow(), strat = S.strategy(ctx.m, orient, { strengths: ctx.st.strengths });
    const s = id => { const x = $(id); return x.options[x.selectedIndex] ? x.options[x.selectedIndex].text : ""; };
    try {
      BP.saveCampaignPDF({ entry: ctx.m, campaign: c, acts: c.activities, roiAssume: Object.assign({}, assume), roiRes: S.roi(assume), roiScen: S.scenarios(assume),
        orientLabel: strat.label, goalLabel: s("studioObj"), audLabel: s("studioAud"), company: getStored("cdbd-company"), bigIdea: strat.bigIdea });
      $("studioMsg").textContent = "Campaign pack downloaded.";
    } catch (err) { console.error(err); $("studioMsg").textContent = "The PDF couldn’t be built: " + err.message; }
  });

  let rz = null, lastNarrow = null;
  window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { const n = ($("roiChart").parentNode.clientWidth || 560) < 480; if (n !== lastNarrow) { lastNarrow = n; calc(); } }, 150); });
  document.addEventListener("cdbd:orient", e => { if (e.detail.from !== "studio") { syncRadios(e.detail.orient); seed = 0; generate(false); } });
  document.addEventListener("cdbd:show", e => { ctx = e.detail; seed = 0; fillSelects(); generate(false); });

  window.CDBD_setOrient = setOrient;
})();
