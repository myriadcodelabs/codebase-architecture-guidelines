# Project Orchestration Instructions
(Multi-Domain Execution Flow)

This file defines orchestration when a project uses multiple guideline domains together (for example: backend + frontend).

## Scope

- Use this file as top-level router.
- Delegate domain-specific execution to domain-local instructions.

## Domain Delegation

- Backend work: follow `backend/AGENTS.md` as authoritative execution path.
- Frontend work: follow `frontend/FrontEnd.md` and companion frontend docs (`Architecture-Patterns.md`, `Dependency-Boundaries.md`, `Module-Boundaries.md`, `Test.md`, `Refactoring.md`).
- Browser extension work: follow `browser-extension/Browser-Extension.md` and companion extension docs.

## Multi-Domain Feature Flow

1. Identify feature slices by domain (`backend`, `frontend`, `browser-extension`).
2. Create domain contracts/plans before implementation in each impacted domain.
3. Execute each domain using its own local rules and test policy.
4. Keep traceability artifacts per domain (do not merge backend and frontend trace files into one mixed artifact).
5. Integrate at boundary contracts (API/schema/message) after domain-level checks are complete.

## Backend Reference

For any backend-involved feature, run backend sequence from:
- `backend/AGENTS.md`

Backend-local gates and traceability requirements are mandatory and not optional in multi-domain mode.

## Conflict Rule

When top-level and domain-level instructions overlap:
- domain-local file is authoritative for that domain's implementation details.
- this file only coordinates ordering and cross-domain routing.

