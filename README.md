# Cardio-Diabetic Brand Desk

A static website for pharma brand teams. Search any cardio-diabetic molecule or fixed-dose combination to see:

- the top 10 brands in India, ranked by last-year revenue, with their available doses
- the specialists to target, by priority
- interactive tools: a strength gap finder, a field-force planner and a 12-month launch timeline you can play
- the **CTD series**: Chlorthalidone and 9 combinations (Telmisartan + Chlorthalidone, Telmisartan + Amlodipine + Chlorthalidone, Olmesartan, Azilsartan, Cilnidipine, Metoprolol, Atenolol and the Telmisartan triple combinations)
- a **Campaign & in-clinic activity studio**, all in one place:
  1. pick from three creative campaign ideas for the molecule, your company style, goal and doctor type (14 campaigns, e.g. *Mission 7 AM*, *One Strip, Not Three*, *Kidney First 90*, *Season One*, *Practice Mirror Programme*), each with insight, idea, visual idea, channels and a four-step flow
  2. see the professional in-clinic activities that deliver that campaign (25 activities: practice audits, case huddles, staff academies, patient-experience rituals and more)
  3. calculate the ROI live: doctors enrolled, adoption, new patients, persistence, revenue per patient-month, margin and costs give investment, revenue, gross profit, ROI, payback month, return per rupee, break-even adoption and cautious / base / strong scenarios
  4. download the campaign pack PDF with the ROI
- a **Build our brand plan** button that asks whether your company is **sales-, marketing- or scientific-oriented** and downloads a designed PDF brand plan built around that answer

Search also understands field shorthand: `telmi + amlo + ctd`, `olme ctd`, `cilni ch`, `aten + ctd`.

No server, no database and no AI service. Everything runs in the browser, so it also works offline once downloaded.

## Deploy on GitHub Pages (5 minutes)

1. Create a new repository on GitHub, for example `brand-desk`.
2. Upload every file and folder from this package to the repository root (drag and drop on the GitHub web page works), then commit.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
5. After a minute your site is live at `https://<your-username>.github.io/brand-desk/`.

To use it offline, open `index.html` directly in Chrome or Edge.

## Updating the market data

All data lives in **`assets/js/data.js`**. Edit it on GitHub (pencil icon), commit, and the website updates for everyone.

Each brand looks like this:

```js
{ brand: "Telma", company: "Glenmark", doses: ["20 mg", "40 mg", "80 mg"], revenue_cr: 512, period: "MAT Mar 2026" }
```

- `revenue_cr` is last-year revenue in ₹ crore from your AWACS / PharmaTrac / Pharmarack MAT report. Use `null` if unknown.
- Brands are ranked by `revenue_cr`, highest first. Only the top 10 are shown.
- To add a new molecule, copy an existing block and set `cls` to one of: `SGLT2`, `DPP4`, `SUMET`, `BIG`, `ARB`, `CCB`, `BB`, `CTD`, `STATIN`, `ARNI`, `ANTIPLT`, `GLITAZAR`, `MRA`, `OTHER`. The class decides which specialists are shown and how the brand plan is written.

### Quick import (one browser only)

Use **Import revenue CSV** on the site to try new numbers without editing code. The format is in `data/brand-revenue-template.csv` (doses separated by `;`). Imported rows are saved only in that browser.

## Files

```
index.html                      page
assets/css/style.css            design
assets/fonts/                   Instrument Sans (self-hosted, SIL Open Font Licence) so the site looks right offline
assets/js/data.js               market data (edit this)
assets/js/studio.js             campaigns, activity library, ROI model, big ideas, sales / marketing / scientific playbooks
assets/js/plan.js               specialist rules, brand-plan rules, PDF layout (plan and activity pack)
assets/js/studio-ui.js          campaign & activity studio and ROI calculator on the page (phone and desktop layouts)
assets/js/app.js                search, list, modal, CSV import
assets/js/interact.js           animations, gap finder, field-force planner, timeline player, live preview
assets/vendor/jspdf.umd.min.js  PDF library (jsPDF 2.5.1, MIT licence)
data/brand-revenue-template.csv CSV import template
```

## Company orientation

The plan form asks: *Is your company sales-oriented, marketing-oriented or scientific-oriented?* The answer changes:

| | Sales-oriented | Marketing-oriented | Scientific-oriented |
|---|---|---|---|
| Big idea | Prescription-conversion platform | Campaign platform with visual idea | Scientific narrative platform |
| Pillars | Coverage, conversion, availability, rep excellence | One brand idea, four-act campaign, patient experience, omnichannel | Evidence platform, KOL pyramid, CME curriculum, RWE |
| Engine page | Prescriber conversion ladder | Campaign architecture | Scientific narrative in four chapters |
| Budget split, field effort, workstreams, KPIs, activities | Weighted to field, trade, GPs | Weighted to creative and digital | Weighted to medical education, KOLs, specialists |

To edit the playbooks, big ideas or activities, change `assets/js/studio.js`.

## What the brand plan PDF contains

Ten to eleven pages, built mostly from charts rather than paragraphs, with one type scale throughout:

- Cover with an at-a-glance strip (brands in market, benchmark, revenue or strengths, company approach)
- Executive summary as three short cards: the market, our play, who we target
- Strategic direction: orientation, brand ambition, the big idea, four strategic pillars and the budget split
- Market landscape: stat tiles, revenue bar chart and revenue-share bar (shown only when two or more brands have revenue), and a strength-coverage matrix showing which brand sells which strength, with our launch range as the last row
- Positioning statement, target patient and benchmark card
- Key messages and differentiation levers as cards
- Specialist targeting: field-effort split chart, priority and calls a month per specialty
- Conversion ladder, campaign architecture or scientific narrative (by orientation)
- Signature campaign and ROI: the campaign picked on the page (with your ROI numbers) or the best fit for your orientation, with flow, ROI tiles, payback chart, scenarios, assumptions and cost build-up
- The in-clinic activities in that campaign, with steps, kit, measures and compliance guardrails
- 12-month plan as a Gantt timeline, colour-coded by workstream
- KPI target trajectory chart and KPI table, risk heat map, compliance note

Columns are never left blank: revenue appears only as a chart when there is enough data to compare, and the brand table shows strengths, which every brand has.

## Notes

- Built-in brand lists contain well-established brands only. Built-in revenue is filled only where a public figure exists (Glycomet-GP, MAT Aug 2025). Add the rest from your licensed audit data.
- CTD-series brands and strengths were checked against Indian pharmacy listings in November 2026; revenue is left blank for your audit data.
- In-clinic activities are written to sit within UCPMP 2024, but every activity needs medical, legal and compliance review before use.
- The brand plan is a rule-based starting draft for internal planning. Keep all promotion within UCPMP 2024.

## How the ROI is calculated

Month by month for 12 months: adopting doctors ramp up over the first months (enrolled doctors × adoption %), each starts new patients every month, a share of patients stays on therapy each month, and active patients × net revenue per patient-month × gross margin gives gross profit. Investment is the one-time cost plus cost per doctor × doctors. ROI = (gross profit − investment) ÷ investment. Payback is the first month cumulative profit covers cumulative spend. It is a planning estimate: replace the defaults with your audit, RCPA and finance numbers.
