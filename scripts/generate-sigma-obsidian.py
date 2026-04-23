#!/usr/bin/env python3
"""
Generate Obsidian notes for Sigma Protocol departments and skills.
Reads SKILL.md files from a Sigma clone and writes into the vault.

Usage:
  python3 scripts/generate-sigma-obsidian.py
  SIGMA_ROOT=~/sigma-protocol OBSIDIAN_SIGMA_DIR=~/obsidian-brain/... python3 scripts/generate-sigma-obsidian.py

Writes:
  Departments/, Skills/, Maps/Categories/, Maps/000 — Categories index.md
  (Maps = auto split by skill category so you do not hand-maintain those MOCs.)
"""
from __future__ import annotations

import os
import re
import sys
from collections import defaultdict
from itertools import groupby
from pathlib import Path

DEFAULT_SIGMA = Path.home() / "Downloads" / "sigma-protocol-main"
DEFAULT_VAULT_SIGMA = (
    Path.home()
    / "obsidian-brain"
    / "03-Resources"
    / "Frameworks"
    / "Sigma Protocol"
)


def categorize_skill(slug: str) -> str:
    """Match scripts/sync-skills-to-platforms.sh categorize_codex_skill."""
    if re.match(r"step-.*", slug) or slug in ("validate-methodology", "wireframe"):
        return "steps"
    if slug in (
        "dev-loop",
        "orchestrate",
        "prd-orchestrate",
        "stream",
        "stream-work",
        "tail",
        "fork-worker",
        "swarm",
        "step-chain",
    ):
        return "orchestration"
    if slug in (
        "ship-check",
        "ship-stage",
        "ship-prod",
        "render-deploy",
        "vercel-deploy",
    ):
        return "deploy"
    if slug in (
        "continue",
        "status",
        "daily-standup",
        "backlog-groom",
        "job-status",
        "sprint-plan",
        "pr-review",
        "changelog",
        "maid",
        "maintenance-plan",
        "dependency-update",
        "repair-manifest",
        "sync-workspace-commands",
        "docs-update",
    ):
        return "ops"
    if re.match(r"system-health.*", slug) or re.match(r"security-.*", slug):
        return "audit"
    if slug in (
        "gap-analysis",
        "holes",
        "verify-prd",
        "verification",
        "test-review",
        "qa-plan",
        "qa-run",
        "qa-report",
        "ui-healer",
        "step-verify",
        "doctor-fix",
        "license-check",
        "load-test",
        "performance-check",
        "accessibility-audit",
        "seo-audit",
        "tech-debt-audit",
        "code-quality-report",
        "lint-commands",
    ):
        return "audit"
    if slug in (
        "platform-sync",
        "onboard",
        "new-project",
        "new-command",
        "new-feature",
        "retrofit-analyze",
        "retrofit-sync",
        "retrofit-enhance",
        "retrofit-generate",
        "step-12-context-engine",
        "step-13-skillpack-generator",
        "skill-creator",
        "agent-development",
        "opencode-agent-generator",
        "memory-systems",
        "api-docs-gen",
        "analyze",
    ) or slug.startswith("prompt-enhancer"):
        return "platform"
    if re.match(r"[0-9][0-9]-.*", slug) or slug in (
        "ai-image-prompt",
        "ai-video-prompt",
        "brand-voice",
        "direct-response-copy",
        "launch-strategy",
        "marketing-psychology",
        "social-content",
        "video-hooks",
        "proposal",
        "prototype-proposal",
        "nda",
        "contract",
        "client-handoff",
        "notebooklm-format",
        "community-analytics",
    ) or slug.startswith("manychat-") or slug.startswith("telegram-") or slug.startswith("discord-"):
        return "marketing"
    if (
        slug.startswith("sigma-")
        or slug == "cleanup-repo"
        or "ralph" in slug
        or slug.startswith("step-5a")
        or slug.startswith("step-5b")
        or slug.startswith("step-11a")
        or slug.startswith("step-11b")
    ):
        return "deprecated"
    return "dev"


def route_to_department(slug: str, category: str) -> str:
    if slug.startswith("departments/"):
        d = slug.split("/")[1]
        # Single Ops exec canon + orchestration/deploy/ops-tagged skills share one hub
        if d == "ops":
            return "operations"
        return d
    if category == "steps":
        return "methodology"
    if category in ("orchestration", "deploy", "ops"):
        return "operations"
    if category == "audit":
        if (
            slug.startswith("security")
            or "owasp" in slug
            or slug
            in (
                "secrets-detection",
                "dependency-security",
                "saas-security-patterns",
                "security-audit",
                "security-code-review",
            )
        ):
            return "security"
        return "qa"
    if category == "platform":
        return "engineering"
    if category == "marketing":
        if (
            slug.startswith("discord")
            or slug.startswith("telegram")
            or slug.startswith("manychat")
            or slug == "community-analytics"
        ):
            return "community"
        if slug.startswith("08-") or slug.startswith("09-") or "ads" in slug:
            return "ads"
        if "content" in slug or slug.startswith("12-") or slug.startswith("13-") or slug.startswith("14-"):
            return "content"
        if "sales" in slug or slug.startswith("05-") or slug.startswith("11-partnership"):
            return "sales"
        return "marketing"
    if category == "deprecated":
        return "sigma-meta"
    return "engineering"


def parse_frontmatter(body: str) -> tuple[dict[str, str], str]:
    if not body.startswith("---"):
        return {}, body
    end = body.find("\n---\n", 3)
    if end == -1:
        return {}, body
    raw = body[4:end]
    rest = body[end + 5 :]
    meta: dict[str, str] = {}
    for line in raw.splitlines():
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        meta[k.strip()] = v.strip().strip('"')
    return meta, rest


def title_case_dept(key: str) -> str:
    mapping = {
        "methodology": "Methodology",
        "operations": "Operations",
        "sigma-meta": "Sigma meta",
        "qa": "Quality & QA",
        "engineering": "Engineering",
        "security": "Security",
        "marketing": "Marketing",
        "product": "Product",
        "design": "Design",
        "legal": "Legal",
        "finance": "Finance",
        "sales": "Sales",
        "support": "Support",
        "trading": "Trading",
        "ads": "Ads",
        "content": "Content",
        "growth": "Growth",
        "community": "Community",
    }
    return mapping.get(key, key.replace("-", " ").title())


def dept_filename(key: str) -> str:
    return f"{title_case_dept(key)}.md"


def category_label(cat: str) -> str:
    return {
        "steps": "Methodology & steps",
        "orchestration": "Orchestration & streams",
        "deploy": "Deploy & ship",
        "ops": "Ops & delivery rhythm",
        "audit": "Audit, QA & verification",
        "platform": "Platform, scaffolding & tooling",
        "marketing": "Marketing & growth copy",
        "deprecated": "Sigma meta & legacy",
        "dev": "Engineering & implementation",
        "department-canon": "Department persona (canon)",
    }.get(cat, cat.replace("-", " ").title())


def truncate(s: str, n: int) -> str:
    s = (s or "").strip()
    if len(s) <= n:
        return s or "—"
    return s[: n - 1].rstrip() + "…"


def skill_heading(name: str, slug: str) -> str:
    """Prefer human-readable title when Sigma uses slug as name."""
    if slug.startswith("departments/"):
        tail = slug.split("/")[-1]
        return f"Department canon — {tail.replace('-', ' ').title()}"
    tail = slug.split("/")[-1]
    if name == tail or name.replace(" ", "-").lower() == tail.lower():
        return tail.replace("-", " ").title()
    return name


def main() -> int:
    sigma_root = Path(os.environ.get("SIGMA_ROOT", DEFAULT_SIGMA)).expanduser()
    out_root = Path(os.environ.get("OBSIDIAN_SIGMA_DIR", DEFAULT_VAULT_SIGMA)).expanduser()
    skills_root = sigma_root / ".codex" / "skills"

    if not skills_root.is_dir():
        print(f"Missing skills dir: {skills_root}", file=sys.stderr)
        return 1

    dept_dir = out_root / "Departments"
    skill_dir = out_root / "Skills"
    dept_dir.mkdir(parents=True, exist_ok=True)
    skill_dir.mkdir(parents=True, exist_ok=True)

    skill_files: list[tuple[str, Path]] = []
    for skill_md in sorted(skills_root.rglob("SKILL.md")):
        rel = skill_md.relative_to(skills_root)
        parts = rel.parts
        if len(parts) == 2:
            slug = parts[0]
        elif len(parts) == 3 and parts[0] == "departments":
            slug = f"departments/{parts[1]}"
        else:
            slug = str(rel.parent).replace("\\", "/")
        skill_files.append((slug, skill_md))

    by_dept: dict[str, list[tuple[str, str, dict[str, str]]]] = defaultdict(list)

    for slug, path in skill_files:
        text = path.read_text(encoding="utf-8", errors="replace")
        meta, _ = parse_frontmatter(text)
        name = meta.get("name", slug.replace("/", " — "))
        desc = meta.get("description", "").replace('"', "'")
        if slug.startswith("departments/"):
            cat = "department-canon"
        else:
            cat = categorize_skill(slug)
        dept = route_to_department(slug, cat)
        by_dept[dept].append((slug, cat, {"name": name, "description": desc, "path": str(path)}))

    # Per-skill notes
    for slug, path in skill_files:
        text = path.read_text(encoding="utf-8", errors="replace")
        meta, body_preview = parse_frontmatter(text)
        name = meta.get("name", slug)
        desc = meta.get("description", "")
        if slug.startswith("departments/"):
            cat = "department-canon"
        else:
            cat = categorize_skill(slug)
        dept = route_to_department(slug, cat)
        safe_slug = slug.replace("/", " — ")
        fn = skill_dir / f"{safe_slug}.md"
        rel_skill = f"Skills/{safe_slug}"
        rel_dept = f"Departments/{dept_filename(dept).replace('.md', '')}"

        desc_one_line = " ".join((desc or "").split())
        desc_block = (
            desc_one_line
            if desc_one_line
            else "*No `description` in the Sigma `SKILL.md` frontmatter — open the source file for full text.*"
        )
        dept_link = dept_filename(dept).replace(".md", "")
        heading = skill_heading(name, slug)
        lines = [
            "---",
            "tags: [sigma, skill]",
            "cssclasses: [sigma-maps]",
            f"sigma-slug: {slug}",
            f"sigma-category: {cat}",
            f"sigma-department: {dept}",
            "---",
            "",
            f"# {heading}",
            "",
            "> [!abstract] What this skill does",
            f"> {desc_block}",
            "",
            "## Meta",
            "",
            "| | |",
            "|:---|:---|",
            f"| **Slug** | `{slug}` |",
            f"| **Category** | `{cat}` — *{category_label(cat)}* |",
            "",
            "## Department hub",
            "",
            f"[[../Departments/{dept_link}|{title_case_dept(dept)}]]",
            "",
            "## Source file",
            "",
            "Open in the Sigma clone (or your editor):",
            "",
            "```text",
            f"{path}",
            "```",
            "",
            "---",
            "",
            "**Navigate**",
            "",
            "- [[../Overview|Overview]]",
            "- [[000 — Skills index|Skills A–Z]]",
            "- [[../Departments/000 — Departments MOC|Departments]]",
            "",
        ]
        fn.write_text("\n".join(lines), encoding="utf-8")

    # Department notes
    dept_keys = sorted(by_dept.keys(), key=lambda k: title_case_dept(k).lower())
    for dept in dept_keys:
        items = sorted(by_dept[dept], key=lambda x: (x[1], x[0]))
        title = title_case_dept(dept)
        canon_dept = "ops" if dept == "operations" else dept
        canon_path = skills_root / "departments" / canon_dept / "SKILL.md"
        if not canon_path.is_file():
            canon_path = None  # type: ignore
        lines = [
            "---",
            "tags: [sigma, department]",
            "cssclasses: [sigma-maps]",
            f"sigma-department: {dept}",
            f"sigma-skill-count: {len(items)}",
            "---",
            "",
            f"# Sigma — {title}",
            "",
            f"> [!info] Skill count",
            f"> **{len(items)}** skills mapped to this hub (see sections below).",
            "",
            "## Department canon",
            "",
        ]
        if canon_path and canon_path.is_file():
            lines.extend(
                [
                    "> [!quote] Exec persona source",
                    f"> `{canon_path}`",
                    "",
                    "In the Sigma clone, open that file for the full department brief (voice, mission, methodology).",
                    "",
                ]
            )
        else:
            lines.extend(
                [
                    "> [!note] No single exec canon in clone",
                    "> There is no `departments/<name>/SKILL.md` for this hub — skills are grouped by **practice area** using generator rules.",
                    "",
                ]
            )
        lines.extend(["## Skills by area", ""])
        for cat, group_iter in groupby(items, key=lambda x: x[1]):
            group = list(group_iter)
            label = category_label(cat)
            lines.append(f"### {label} (`{cat}`)")
            lines.append("")
            for slug, _c, info in group:
                safe = slug.replace("/", " — ")
                display = info["name"] if info["name"] != slug else slug
                blurb = truncate(" ".join((info.get("description") or "").split()), 72)
                lines.append(f"- **[[../Skills/{safe}|{display}]]** — {blurb}")
            lines.append("")
        lines.extend(
            [
                "---",
                "",
                "**Navigate**",
                "",
                "- [[../Overview|Overview]]",
                "- [[000 — Departments MOC|All departments]]",
                "- [[../Skills/000 — Skills index|Skills A–Z]]",
                "",
            ]
        )
        (dept_dir / dept_filename(dept)).write_text("\n".join(lines), encoding="utf-8")

    # MOC files
    moc_dept = dept_dir / "000 — Departments MOC.md"
    moc_lines = [
        "---",
        "tags: [sigma, moc, department]",
        "cssclasses: [sigma-maps]",
        "---",
        "",
        "# Sigma — Departments (MOC)",
        "",
        "> [!abstract] What you are looking at",
        "> Each row is a **department hub**: exec canon (when Sigma ships one) plus skills **grouped by practice area** with short blurbs.",
        "",
        "> [!info] Grouping rules",
        "> Same **category** heuristics as Sigma’s `sync-skills-to-platforms.sh`, then routed into hubs (e.g. orchestration + deploy + rhythm → **Operations**; audit → **Quality & QA** or **Security**). Edit `herdia-lyra/scripts/generate-sigma-obsidian.py` to change routing.",
        "",
        "> [!tip] Category splits (auto)",
        "> **[[../Maps/000 — Categories index|Skills by category]]** — one generated page per category; regenerate with the script instead of editing those lists by hand.",
        "",
        "```bash",
        "python3 ~/herdia-lyra/scripts/generate-sigma-obsidian.py",
        "```",
        "",
        "## Departments",
        "",
    ]
    moc_lines.extend(
        [
            "",
            "| Department | Skills |",
            "| --- | ---: |",
        ]
    )
    for dept in dept_keys:
        title = title_case_dept(dept)
        fn = dept_filename(dept).replace(".md", "")
        # Escape | inside wikilinks so markdown tables parse correctly
        moc_lines.append(f"| [[{fn}\\|{title}]] | {len(by_dept[dept])} |")
    moc_lines.extend(
        [
            "",
            "> [!tip] Compact list",
            "> Prefer this table for scanning; each row links to the full hub.",
            "",
            "[[../Overview|← Sigma Protocol overview]]",
            "",
        ]
    )
    moc_dept.write_text("\n".join(moc_lines), encoding="utf-8")

    skill_slugs = sorted(s.replace("/", " — ") for s, _ in skill_files)
    moc_skill = skill_dir / "000 — Skills index.md"
    by_letter: dict[str, list[str]] = defaultdict(list)
    for safe in skill_slugs:
        head = safe[0].upper()
        if not head.isalpha():
            head = "# · other"
        by_letter[head].append(safe)

    idx_lines = [
        "---",
        "tags: [sigma, moc, skill]",
        "cssclasses: [sigma-maps]",
        "---",
        "",
        "# Sigma — Skills index",
        "",
        f"> [!abstract] {len(skill_slugs)} skills",
        "> Jump to a letter, or search (`Cmd/Ctrl+O`) by skill name.",
        "",
    ]
    letter_order = sorted(by_letter.keys(), key=lambda x: (x == "# · other", x))
    for letter in letter_order:
        idx_lines.append(f"## {letter}")
        idx_lines.append("")
        for safe in sorted(by_letter[letter]):
            idx_lines.append(f"- [[{safe}|{safe}]]")
        idx_lines.append("")
    idx_lines.extend(
        [
            "---",
            "",
            "[[../Departments/000 — Departments MOC|Departments]] · [[../Overview|Overview]]",
            "",
        ]
    )
    moc_skill.write_text("\n".join(idx_lines), encoding="utf-8")

    # --- Maps: skills grouped by category (split views; do not hand-edit outputs) ---
    maps_dir = out_root / "Maps"
    cat_dir = maps_dir / "Categories"
    maps_dir.mkdir(parents=True, exist_ok=True)
    cat_dir.mkdir(parents=True, exist_ok=True)

    by_cat: dict[str, list[tuple[str, str, dict[str, str]]]] = defaultdict(list)
    for slug, path in skill_files:
        text = path.read_text(encoding="utf-8", errors="replace")
        meta, _ = parse_frontmatter(text)
        name = meta.get("name", slug)
        desc = meta.get("description", "").replace('"', "'")
        if slug.startswith("departments/"):
            cat = "department-canon"
        else:
            cat = categorize_skill(slug)
        dept = route_to_department(slug, cat)
        by_cat[cat].append((slug, dept, {"name": name, "description": desc}))

    cat_keys = sorted(by_cat.keys(), key=lambda c: (category_label(c).lower(), c))
    idx_cat_lines = [
        "---",
        "tags: [sigma, moc, auto-generated]",
        "cssclasses: [sigma-maps]",
        "---",
        "",
        "# Sigma — Skill maps · by category",
        "",
        "> [!abstract] Auto-generated",
        "> One page per **skill category** (same `categorize_skill` heuristic as department routing). Regenerate with `generate-sigma-obsidian.py`; change grouping in that script, not in these notes.",
        "",
        "## Categories",
        "",
    ]
    for ck in cat_keys:
        safe_fn = re.sub(r"[^a-z0-9]+", "-", ck).strip("-") or "uncategorized"
        label = category_label(ck)
        idx_cat_lines.append(f"- [[Categories/{safe_fn}|{label} (`{ck}`)]] — {len(by_cat[ck])} skills")
    idx_cat_lines.extend(
        [
            "",
            "---",
            "",
            "[[../Departments/000 — Departments MOC|Departments]] · [[../Skills/000 — Skills index|Skills A–Z]] · [[../Overview|Overview]]",
            "",
        ]
    )
    (maps_dir / "000 — Categories index.md").write_text("\n".join(idx_cat_lines), encoding="utf-8")

    for ck in cat_keys:
        safe_fn = re.sub(r"[^a-z0-9]+", "-", ck).strip("-") or "uncategorized"
        label = category_label(ck)
        items = sorted(by_cat[ck], key=lambda x: (x[1], x[0]))
        lines = [
            "---",
            "tags: [sigma, moc, auto-generated, category-map]",
            "cssclasses: [sigma-maps]",
            f"sigma-category-map: {ck}",
            "---",
            "",
            f"# Sigma · {label}",
            "",
            f"> **Category:** `{ck}` · **Skills:** {len(items)}",
            "",
        ]
        for slug, dept, info in items:
            safe = slug.replace("/", " — ")
            blurb = truncate(" ".join((info.get("description") or "").split()), 72)
            display = info["name"] if info["name"] != slug else slug
            dtitle = title_case_dept(dept)
            dept_file_stem = dept_filename(dept).replace(".md", "")
            lines.append(
                f"- **[[../Skills/{safe}|{display}]]** · [[../Departments/{dept_file_stem}|{dtitle}]] — {blurb}"
            )
        lines.extend(
            [
                "",
                "---",
                "",
                "[[../000 — Categories index|↑ Category index]] · [[../Skills/000 — Skills index|Skills A–Z]]",
                "",
            ]
        )
        (cat_dir / f"{safe_fn}.md").write_text("\n".join(lines), encoding="utf-8")

    print(
        f"Wrote {len(skill_slugs)} skills + {len(dept_keys)} departments + {len(cat_keys)} category maps under {out_root}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
