# Sigma Protocol — Steps

The core 14-step product development methodology. Each step is a self-contained prompt injection that guides an AI coding assistant through a structured phase sequence with human-in-the-loop checkpoints.

## Step Files

| Step | File | Description | Lines |
|------|------|-------------|-------|
| 0 | `step-0-environment-setup` | Environment validation & setup | ~1,500 |
| 1 | `step-1-ideation` | Discovery-first PRD and problem framing | ~1,150 |
| 1.5 | `step-1.5-offer-architecture` | Monetization and offer architecture (if monetized) | ~720 |
| 2 | `step-2-architecture` | System Architecture | ~1,250 |
| 3 | `step-3-ux-design` | UX/UI Design & User Flows | ~1,590 |
| 4 | `step-4-flow-tree` | Navigation Flow & Screen Inventory | ~1,860 |
| 5 | `step-5-wireframe-prototypes` | Wireframe Prototypes | ~2,980 |
| 6 | `step-6-design-system` | Design System & Tokens | ~1,650 |
| 7 | `step-7-interface-states` | Full State Coverage, Recovery & Accessibility | ~1,320 |
| 8 | `step-8-technical-spec` | Technical Specification | ~1,210 |
| 9 | `step-9-landing-page` | Landing Page (optional) | ~1,670 |
| 10 | `step-10-feature-breakdown` | Feature Breakdown | ~1,160 |
| 11 | `step-11-prd-generation` | PRD Generation | ~2,940 |
| 12 | `step-12-context-engine` | Context Engine | ~1,270 |
| 13 | `step-13-skillpack-generator` | Platform Configuration | ~950 |
| 14 | `step-14-agent-runtime-bootstrap` | Agent Runtime Bootstrap | ~1,300 |

**Utility files:** `dev-loop` and `validate-methodology`

## Active Workflow Contract

Sigma's active workflow is limited to Steps `0-14` plus conditional Step `1.5`.

After the numbered steps:
1. Run `sigma prd-json --mode prototype` after Step 5 to write `.sigma/backlogs/prototype/prd.json`.
2. Run `sigma prd-json --mode implementation` after Step 11 to write `.sigma/backlogs/implementation/prd.json`.
3. Optionally run `sigma prd-orchestrate` to write dependency-aware planning artifacts under `.sigma/orchestration/`.
4. Run `step-14-agent-runtime-bootstrap` after Step 13 to generate the runtime contract, memory scaffolds, and graph/runtime overlays.

Removed pseudo-step labels and legacy step-style aliases are not part of the active workflow vocabulary.

## Structure

Every step follows a consistent structure:

1. **YAML Frontmatter** — Version, allowed tools, parameters
2. **Mission** — Role and objective
3. **`<goal>` Block** — Phase roadmap table, execution order, quality gate threshold
4. **Frameworks** — Domain-specific reference material (inline, not extracted)
5. **Phases A-N** — Sequential execution with `>>> CHECKPOINT` markers
6. **Final Review Gate** — Output checklist and blocking approval
7. **`<verification>` Block** — 100-point scoring rubric

## Platform Support

Steps are authored once and mirrored across supported platforms.

- **Codex** and **Claude Code** are the active runtimes for the numbered workflow.
- **OpenCode** and **Factory Droid** remain passive mirrors fed from canonical source.
- **Cursor** is archived history only and is not part of the active workflow contract.

## Related

- [WORKFLOW-OVERVIEW.md](../docs/WORKFLOW-OVERVIEW.md)
- [FILE-PATH-REFERENCE.md](../docs/FILE-PATH-REFERENCE.md)
- [COMMANDS.md](../docs/COMMANDS.md)
