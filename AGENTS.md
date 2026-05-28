# Project Orchestration Instructions
(Multi-Domain Execution Flow)

This file defines orchestration when a project uses multiple guideline domains together (for example: backend + frontend).

Path note:
- Use installed copied output paths: `codebase-architecture-guidelines/...`.

## Scope

- Use this file as top-level router.
- Delegate domain-specific execution to domain-local instructions.

## Domain Delegation

- Backend work: follow `codebase-architecture-guidelines/backend/AGENTS.md` as authoritative execution path.
- Frontend work: follow `codebase-architecture-guidelines/frontend/AGENTS.md` as authoritative execution path.
- Browser extension work: follow `codebase-architecture-guidelines/browser-extension/Browser-Extension.md` and companion extension docs.

## Multi-Domain Feature Flow

1. Identify feature slices by domain (`backend`, `frontend`, `browser-extension`).
2. Create domain contracts/plans before implementation in each impacted domain.
3. Execute each domain using its own local rules and test policy.
4. Integrate at boundary contracts (API/schema/message) after domain-level checks are complete.

## Universal No-Skip Rule

For every command type (`review`, `validate`, `test`, `write`, `rewrite`, `refactor`, and others):
- domain phases must still execute in required order for that mode
- phases may be marked `NO-OP` with reason when mode does not require generation
- phase `SKIPPED` is forbidden
- each phase requires user validation before next phase starts
- phase jumps or merged multi-phase execution are forbidden

## Backend Reference

For any backend-involved feature, run backend sequence from:
- `codebase-architecture-guidelines/backend/AGENTS.md`

Backend-local gates are mandatory and not optional in multi-domain mode.

## Frontend Reference

For any frontend-involved feature, run frontend sequence from:
- `codebase-architecture-guidelines/frontend/AGENTS.md`

Frontend-local gates are mandatory and not optional in multi-domain mode.

## Conflict Rule

When top-level and domain-level instructions overlap:
- domain-local file is authoritative for that domain's implementation details.
- this file only coordinates ordering and cross-domain routing.
