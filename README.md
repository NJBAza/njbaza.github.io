# Javier Buitrago — Personal Portfolio

A single‑page, fully responsive personal portfolio for **N. Javier Buitrago Aza — Senior MLOps Engineer & Lead Data Scientist** (currently at Capgemini).
Built with plain **HTML, CSS and JavaScript** (no build step, no framework).

The site showcases:

- A short professional bio and summary of skills (ML/DL, Data Engineering, MLOps/LLMOps, BI & Analytics).
- Industries I have delivered value for (Oil & Gas, Logistics, Finance, E‑commerce & Marketing).
- Tooling I work with daily (AWS, Azure, GCP, Databricks, Python, SQL, GitHub Actions, Airflow, Docker, dbt, Terraform, Flask, FastAPI, …).
- A resume‑style timeline of experience and education.
- A filterable portfolio of selected projects (Sales Forecasting, Topic Modeling, Analytics Engineering, Credit Scoring, RAG system).

> Layout and base styles are derived from the open‑source [vCard Personal Portfolio](https://github.com/codewithsadee/vcard-personal-portfolio) template by **codewithsadee** (MIT). All content, copy, imagery and structural changes are by Javier Buitrago.

---

## Preview

| Desktop | Mobile |
| --- | --- |
| ![Desktop preview](./website-demo-image/desktop.png) | ![Mobile preview](./website-demo-image/mobile.png) |

---

## Project structure

```text
portfolio/
├── index.html                  # Single‑page site (sections: About, Resume, Portfolio)
├── assets/
│   ├── css/
│   │   └── style.css           # All styling (CSS custom properties, responsive breakpoints)
│   ├── js/
│   │   └── script.js           # Sidebar toggle, page navigation, portfolio filter
│   └── images/
│       ├── data_engineering/   # Diagrams & icons for the Data Engineering project
│       ├── mlops_llmops/       # Diagrams & icons for the RAG / LLMOps project
│       └── _unused/            # Template assets kept for reference (not shipped in HTML)
├── website-demo-image/         # Screenshots used in this README
├── LICENSE
└── README.md
```

---

## Run locally

No dependencies, no build step. Any static file server works:

```bash
# option 1 — Python
python3 -m http.server 8000

# option 2 — Node (npx, no install)
npx --yes serve .
```

Then open <http://localhost:8000>.

Opening `index.html` directly with `file://` also works, but a local server is recommended so that lazy‑loaded images and the embedded Ionicons module behave correctly.

---

## Editing the content

All the copy lives in [index.html](index.html). The sections are clearly delimited by HTML comments:

- `#SIDEBAR` — name, role, contact info, social links.
- `#NAVBAR` — top navigation buttons; each `data-nav-link` text must match a `data-page` attribute on an `<article>`.
- `#ABOUT` — bio, “Summary of Skills” (service cards), “Some Industries” (testimonial‑style cards), “Tools” (logos strip).
- `#RESUME` — experience timeline, skills bars, education timeline.
- `#PORTFOLIO` — filter chips/dropdown plus the project grid (`data-category` on each item drives the filter).

Styling tokens (colors, font sizes, shadows, transitions) are defined as CSS custom properties at the top of [assets/css/style.css](assets/css/style.css#L1) — change them there to re‑skin the whole site.

---

## Tech notes

- **No framework.** Vanilla HTML/CSS/JS for portability and zero‑dependency hosting (GitHub Pages, Netlify, S3, …).
- **Icons** via [Ionicons 5.5.2](https://ionic.io/ionicons) loaded from the CDN.
- **Fonts** via Google Fonts (Poppins, weights 300/400/500/600).
- **Responsive** down to 320 px wide; the sidebar collapses on mobile and expands with the “Show Contacts” button.
- **Long‑form articles** are written in [Quarto](https://quarto.org) under [contributions/](contributions/) and rendered directly into [assets/papers/](assets/papers/). They appear on the Portfolio page under the **Articles** filter.

---

## Deploy

A GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) renders every Quarto paper and publishes the repo to **GitHub Pages** on each push to `main`. To enable it: push to GitHub, then **Settings → Pages → Source: GitHub Actions**.

Because the rendered HTML is committed under [assets/papers/](assets/papers/), the site also works on Netlify, Vercel, Cloudflare Pages or any plain static host with no build step required.

---

## License

Released under the [MIT License](LICENSE). The underlying template by codewithsadee is also MIT‑licensed; this repository preserves that license accordingly.
