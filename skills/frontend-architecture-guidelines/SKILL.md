---
name: frontend-architecture-guidelines
description: Frontend web architecture, testing, and refactoring rules for AI-assisted development. Use when Codex is asked to review, validate, analyze, test, write, implement, rewrite, or refactor frontend web systems, especially SPA, SSR, SSG, or hybrid UI code with feature slices, ports/adapters, dependency boundaries, module placement, behavioral tests, or behavior-preserving refactors.
---

# Frontend Architecture Guidelines

Apply these rules to frontend web systems only: SPA, SSR, SSG, and hybrid web UI code.

Use this skill as a strict execution guide. Do not skip required phases. When user approval is required by the workflow, stop and ask before moving to the next phase unless the user has explicitly waived stepwise approval.

## Required References

Load only the references needed for the current phase:

- For phase order and mode gates, read [workflow.md](references/workflow.md).
- For structure and placement, read [structure.md](references/structure.md).
- For feature slices, ports/adapters, and CQRS policy, read [architecture-patterns.md](references/architecture-patterns.md).
- For import direction and isolation rules, read [dependency-boundaries.md](references/dependency-boundaries.md).
- For module responsibility, file size, naming, and side-effect boundaries, read [module-boundaries.md](references/module-boundaries.md).
- For test creation and test repair rules, read [testing.md](references/testing.md).
- For behavior-preserving refactors, read [refactoring.md](references/refactoring.md).

## Operating Sequence

1. Classify the user request mode: `review`, `validate`, `analyze`, `test-only`, `write`, `rewrite`, `implement`, `feature`, or `refactor-only`.
2. Follow [workflow.md](references/workflow.md) phase requirements for that mode.
3. For each phase, mark status as `DONE` or `NO-OP` with reason. Never use `SKIPPED`.
4. Preserve frontend boundaries from the references while editing or reviewing.
5. Treat behavior as human-owned. Do not infer new behavior from component names, routes, data shapes, or existing code.
6. Treat test assertions as protected intent. Repair setup/wiring freely when appropriate, but do not weaken assertions or expected values without explicit human instruction.

## Boundary Defaults

Use this canonical structure unless the framework requires a different shell convention:

```text
src/
|-- app/
|-- features/
|-- flows/
|-- ui/
|-- state/
|-- platform/
|-- shared/
`-- bootstrap/
```

Framework-mandated entrypoints, routing, layout, and registration belong in `app/`. Keep `app/` thin. Put feature behavior in `features/` and orchestration in `flows/`. Put runtime and external integrations behind ports and adapters in `platform/`. Put startup wiring in `bootstrap/`.

## Non-Negotiable Rules

- Feature boundaries are primary; framework boundaries are respected, not duplicated.
- Locality of behavior is mandatory.
- Ports/adapters are mandatory for network, storage, runtime APIs, telemetry, analytics, and external SDKs used by flow logic.
- Flows depend on ports, never concrete adapters.
- `ui/*` must not depend on `features/*`, `flows/*`, or `platform/*`.
- `shared/*` must not depend on app, feature, UI, platform, or framework shell internals.
- Refactoring changes structure, not behavior.
- New behavior requires explicit human declaration and new or updated planned tests.
