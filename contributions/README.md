# Contributions — Quarto papers

This folder holds long-form technical writing rendered with
[Quarto](https://quarto.org). Quarto and all Python helpers live **inside a
[uv](https://docs.astral.sh/uv/)-managed virtual environment** (`.venv/`), so
nothing is installed system-wide.

| File | Purpose |
| --- | --- |
| [paper.qmd](paper.qmd) | Source of the paper *"Architecting a Business with MLOps and Data Science: From Models to Strategic Decision Systems"*. |
| [paper.md](paper.md) | Original scratch draft (kept for reference; not rendered). |
| [references.bib](references.bib) | BibTeX bibliography shared by every paper in this folder. |
| [_quarto.yml](_quarto.yml) | Project-level Quarto configuration (output dir, formats, citation style, …). |
| [pyproject.toml](pyproject.toml) | uv project: pins `quarto-cli`, Jupyter, and an optional scientific stack. |
| `.python-version` | Python version uv should use for the venv. |
| `uv.lock` | Generated lockfile — commit it. |
| `.venv/` | uv-managed virtual environment (git-ignored). |
| `_extensions/` | Quarto extensions (commit it so renders are reproducible). |
| `../assets/papers/architecting-business-mlops/` | Rendered HTML published by the portfolio (git-tracked). |
| `.quarto/` | Quarto cache (git-ignored). |
| `_freeze/` | Frozen execution results (git-ignored). |

---

## 1. One-time setup

This folder is self-contained: Quarto runs **inside a uv-managed virtual
environment** (no system-wide install). The only system prerequisite is
[uv](https://docs.astral.sh/uv/) itself, plus Java (for PlantUML).

### 1.1 Install uv

```bash
# Linux / macOS
curl -LsSf https://astral.sh/uv/install.sh | sh
```

See <https://docs.astral.sh/uv/getting-started/installation/> for other
platforms.

### 1.2 Create the environment

From this folder:

```bash
cd contributions
uv sync                    # creates .venv/ and installs Quarto + Jupyter
uv sync --group science    # add NumPy / pandas / matplotlib / SciPy (optional)
```

`uv sync` reads [pyproject.toml](pyproject.toml) and pins everything in
`uv.lock` for reproducible builds. The Quarto binary is provided by the
[`quarto-cli`](https://pypi.org/project/quarto-cli/) wheel, so it lives inside
`.venv/` and never touches the rest of your system.

Verify:

```bash
uv run quarto check
```

If you ever want to **uninstall** Quarto, just delete the `.venv/` folder.

### 1.3 Install the PlantUML extension

The paper uses PlantUML for every architecture diagram. The extension lives in
`_extensions/` and only needs to be added once:

```bash
uv run quarto add quarto-ext/plantuml
```

System dependencies for PlantUML:

- **Java** (>= 11). Check with `java -version`. On Debian/Ubuntu:
  `sudo apt install default-jre`.
- **`plantuml.jar`** — easiest install:

  ```bash
  curl -L -o ~/.local/share/plantuml.jar \
       https://github.com/plantuml/plantuml/releases/latest/download/plantuml.jar
  # add to ~/.zshrc or ~/.bashrc:
  export PLANTUML_JAR=$HOME/.local/share/plantuml.jar
  ```

  (Alternatively `sudo apt install plantuml` if you don't mind a system
  package for the diagram tool.)

## 2. Render

Every command is prefixed with `uv run` so it uses the venv's Quarto, not any
stray system install:

```bash
cd contributions

# render the HTML paper into ../assets/papers/architecting-business-mlops/
uv run quarto render

# preview the HTML paper with live reload in your browser
uv run quarto preview paper.qmd --to html
```

Output lands in `../assets/papers/architecting-business-mlops/`.

---

## 3. Editing tips

- **Math.** Use `$inline$` and `$$display$$`. KaTeX renders the HTML output.
- **Citations.** Add a BibTeX entry to [references.bib](references.bib), then
  cite as `[@key]`, `[@key1; @key2]` or `@key` (narrative). The reference list
  is generated automatically at the `# References` section.
- **Citation style.** Currently IEEE (`csl:` field in `_quarto.yml`). Swap for
  APA, ACM, Chicago, etc. by changing the URL to any
  [Zotero style](https://www.zotero.org/styles).
- **Diagrams.** Wrap PlantUML in a fenced code block:

  ```markdown
  ```{plantuml}
  #| label: fig-my-diagram
  #| fig-cap: "A short caption."
  @startuml
  ...
  @enduml
  ```
  ```

  Reference the figure elsewhere with `@fig-my-diagram`.
- **New papers.** Drop another `.qmd` next to `paper.qmd` and add it to the
  `project.render` list in `_quarto.yml`.

---

## 4. Publishing alongside the portfolio

Quarto is configured to render **directly into the static site**
(`output-dir: ../assets/papers/architecting-business-mlops` in
[_quarto.yml](_quarto.yml)), with `output-file: index.html` so the public URL
is clean:

```
https://<your-site>/assets/papers/architecting-business-mlops/
```

The rendered HTML is committed to git so the portfolio deploys without
requiring a build step. The portfolio's [index.html](../index.html) already
links to the paper via a project card under the **Articles** filter.

Every time you change [paper.qmd](paper.qmd):

```bash
cd contributions
uv run quarto render        # regenerates ../assets/papers/architecting-business-mlops/
git add ../assets/papers/architecting-business-mlops/
git commit -m "docs(paper): update rendered article"
```

### Automated deploys (GitHub Pages)

The repo ships a workflow at
[.github/workflows/deploy.yml](../.github/workflows/deploy.yml) that:

1. Installs `uv`.
2. Runs `uv sync` inside `contributions/`.
3. Runs `uv run quarto render --to html`.
4. Publishes the entire repo to **GitHub Pages**.

To turn it on:

1. Push the repo to GitHub.
2. In **Settings → Pages**, set *Source* to **GitHub Actions**.
3. Push to `main` — the paper is rebuilt and the site goes live at
   `https://<user>.github.io/<repo>/` (and
   `https://<user>.github.io/<repo>/assets/papers/architecting-business-mlops/`).

Because the rendered HTML is committed, the site also works on Netlify,
Vercel, Cloudflare Pages, S3 + CloudFront, etc. — point any static host at
the repo root.
