# Module Boundaries
(Responsibility & Size Rules)

## Purpose

This document complements `Browser-Extension.md` by defining practical module boundaries.
It keeps modules understandable, testable, and safe to change as features grow.

---

## Core Rule

> One module should have one primary reason to change.

A module can coordinate multiple calls, but it should not mix unrelated concerns.

Baseline requirement:
- Module decomposition must preserve DDD-aligned feature boundaries and Ports/Adapters separation.

---

## Responsibility Boundaries by Folder

### `entrypoints/`
- Starts execution only.
- Imports bootstrap code and exits.
- No orchestration, domain logic, or business branching.

### `bootstrap/`
- Wiring and initialization only.
- Binds entrypoints to runtime starters.
- No feature logic.

### `contexts/`
- Runtime adapters and environment-specific behavior.
- Allowed: `window`, `document`, `chrome.*`, `MutationObserver`, `history` integration.
- Not allowed: domain decision trees and reusable business policy.

### `flows/`
- Use-case orchestration.
- Coordinates steps (read, decide, execute, persist).
- Contains feature behavior, but avoids direct dependency on concrete environment APIs when possible.

### `background/`
- Long-lived or event-driven execution outside popup lifecycle.
- Scheduling, alarms, persistent listeners, async coordination.

### `ui/`
- Presentation and UI interaction logic.
- UI state and rendering concerns.
- No direct domain persistence/network policy inside components.

### `shared/`
- Reusable, context-agnostic modules.
- Prefer pure functions and typed value objects.
- Must not read global browser runtime state at import time.

---

## File Size and Complexity Guardrails

- Target file size: `<= 150` lines.
- Review threshold: `> 200` lines should be split unless justified.
- Hard threshold: `> 300` lines is a required split.

Split triggers:
- Mixes adaptation + orchestration + policy.
- Requires more than one section header to explain behavior.
- Multiple unrelated tests would be needed for one file.

---

## State Ownership

- Context-local mutable runtime state lives in `contexts/`.
- Use-case state for a single operation lives in `flows/`.
- Shared modules should be stateless or explicitly stateful with narrow purpose.

---

## Side-Effect Boundaries

Allowed side effects:
- `entrypoints/`, `bootstrap/`, `contexts/`, `background/`

Prefer side-effect free:
- `shared/`, most of `flows/` (except orchestration calls)

---

## Naming Conventions

Use names that reflect intent:
- `startX`, `initX`, `observeX` for lifecycle and runtime hooks
- `runXFlow` for orchestration
- `selectX`, `mapX`, `translateX` for focused operations

Avoid generic names such as `helpers.ts`, `utils.ts`, `manager.ts` unless folder-scoped and purpose-scoped.

---

## Boundary Violations (Examples)

- A context file that performs full business workflow decisions.
- A shared module importing `chrome` or `document` directly.
- A UI component directly calling low-level browser APIs when a flow/module should mediate.

When violated, split by axis:
1. adapter code (context)
2. orchestration (flow)
3. reusable rule/transform (shared)
