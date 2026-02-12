# Codebase Architecture Guidelines

A small, opinionated set of architecture and directory-structure rules used to guide coding agents and human contributors.

These documents are **normative** for projects that adopt them. They define how code should be organized and what architectural style should be followed for each project type.

## What This Repository Contains

- `frontend/FrontEnd.md`
  - Frontend structure and route-centric architecture rules.
- `backend/Backend.md`
  - Backend modular monolith (DDD-aligned) structure and module organization rules.
- `browser-extension/Browser-Extension.md`
  - Browser extension multi-context structure and placement rules.

## Purpose

Use these files to:

- keep codebases easy to navigate,
- make architecture expectations explicit,
- reduce ambiguity for coding agents,
- keep placement decisions consistent over time.

## Scope

These files are intended to define:

- directory structure,
- architecture shape,
- code placement intent.

These files intentionally do not define:

- dependency rules,
- global concern policy,
- state-management strategy,
- data-flow strategy,
- implementation techniques.

Those decisions are left to the implementing agent unless a project adds extra rules.

## How To Use In Other Projects (Manual)

1. Copy the relevant file(s) into your target repository.
2. Place them in a visible docs location, for example: `docs/architecture/`.
3. Tell your coding agent these files are authoritative for that project.
4. When this repo updates, re-copy the files you use.

## CLI Usage (npm Global Install)

You can install this package globally and copy guideline directories into your current project path.

1. Install globally:

```bash
npm install -g codebase-architecture-guidelines
```

2. From your target project root, run with directory-level targets:

```bash
codebase-guidelines copy backend
codebase-guidelines copy frontend browser-extension
```

Valid targets:

```bash
backend
frontend
browser-extension
```

Each command copies selected directories into:
`<current-working-directory>/codebase-architecture-guidelines/`

3. Overwrite existing copied directories:

```bash
codebase-guidelines copy backend --force
```

## Adaptations and Sharing

- Pull requests are optional. You are not required to contribute changes back to this repository.
- If you adapt these guidelines, please open an issue in this repo and link your adapted version (repo, gist, or docs URL).
- Keep attribution to this repository in downstream copies and include a link to your adapted version so others can discover improvements.
- See `CONTRIBUTING.md` for the contribution and adaptation policy.
