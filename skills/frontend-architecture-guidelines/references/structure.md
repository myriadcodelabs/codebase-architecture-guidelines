# Frontend Structure

## Purpose

Use these structural rules for frontend web systems: SPA, SSR, SSG, and hybrid web systems.

The goal is to make feature boundaries, UI composition, and platform/runtime integrations obvious while maximizing locality of behavior and reducing maintenance cost.

This reference defines directory structure and placement intent only. It does not define dependency rules, behavior rules, or control-flow rules.

## Core Principle

Feature boundaries are primary; framework boundaries are respected, not duplicated.

Locality of behavior is mandatory.

If a framework mandates specific folders or files for routing, layout, entrypoints, or lifecycle, use those directly and map feature logic around them.

## Canonical Structure

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

## Directory Intent

`app/`: framework-owned surfaces and app shell. Examples: framework entrypoints, layout shells, route declarations, screen registration. Keep thin; delegate behavior/orchestration to feature and flow modules.

`features/`: primary feature slices. Contains feature-local UI, contracts, and composition modules. Anything specific to one feature stays here. Behavior should live closest to where it is used.

`flows/`: use-case orchestration and behavior decisions. Coordinates reads, decisions, updates, and side-effect requests. Avoid direct dependency on framework/runtime APIs when possible.

`ui/`: cross-feature reusable UI composition and primitives. Not framework boilerplate storage. No feature-specific behavior assumptions.

`state/`: cross-feature state contracts, selectors, reducers/transitions. State model ownership lives here, not scattered across feature views.

`platform/`: runtime/platform adapters and external integration points. Examples: network, storage, browser/runtime bridges, analytics adapters.

`shared/`: reusable context-agnostic modules. Pure helpers, value objects, shared contracts, cross-feature primitives.

`bootstrap/`: wiring, startup composition, dependency construction. No feature policy logic.

## Framework Adaptation

Do not force a synthetic directory model that fights the framework.

Required behavior:
- If framework mandates routing/layout folders, keep them in `app/`.
- If framework uses config-declared navigation, keep navigation declaration in `app/`.
- Keep feature behavior in `features/` and `flows/`, not in framework shell files.
- Keep platform integrations in `platform/` regardless of framework.

Anti-pattern:
- Creating duplicate route trees or duplicated `routes` folders only to satisfy a guideline.

## Component and Module Placement

- Feature-specific modules stay inside `features/<feature>/...`.
- Promote modules to `ui/` or `shared/` only when reused across independent features.
- Flow logic does not belong in framework shell files.
- Platform/runtime API usage belongs in `platform/` adapters.
- Prefer co-location by default; extract only when reuse or boundary clarity is proven.

## Precedence

When rules overlap, apply documents in this order:

1. `architecture-patterns.md`
2. `dependency-boundaries.md`
3. `module-boundaries.md`
4. `testing.md`
5. `refactoring.md`
6. `structure.md`

Interpretation:
- `structure.md` governs structure and placement.
- Companion references govern architecture constraints, dependency direction, testing policy, and safe refactoring behavior.
