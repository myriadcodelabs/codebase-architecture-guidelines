# Codebase Architecture Guidelines

A small, opinionated set of architecture and directory-structure rules used to guide coding agents and human contributors.

These documents are **normative** for projects that adopt them. They define how code should be organized and what architectural style should be followed per project type.

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

Implementation details, dependency choices, and control-flow decisions are left to the implementing agent unless a project explicitly adds extra rules.

## How To Use In Other Projects (Manual)

1. Copy the relevant file(s) into your target repository.
2. Place them in a visible docs location, for example: `docs/architecture/`.
3. Tell your coding agent these files are authoritative for that project.
4. When this repo updates, re-copy the files you use.

## Suggested Public Repo Name

`codebase-architecture-guidelines`
