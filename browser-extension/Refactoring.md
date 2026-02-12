# Browser Extension Refactoring Instructions (LLM-Guided)
(Safety Rules for Behavior-Preserving Change)

## Purpose

This document defines **how refactoring is performed, constrained, and validated**
in this browser extension codebase when using AI-assisted development.

These rules are **normative** and reflect the author's quality goals:
- bug resistance
- maintainability
- safe long-term evolution

This file exists to:
- preserve behavior while improving structure
- reduce accidental regressions across extension contexts
- keep LLM-assisted refactors predictable and auditable

---

## Scope Boundary

This document:
- defines **refactoring intent and safety process**
- applies only to **browser extension code**
- governs **how LLMs may refactor code**

This document does **not**:
- authorize feature work
- redefine business behavior
- replace architecture or testing guides

---

## Core Invariant

> **Refactoring changes structure, not behavior.**

Behavior changes are feature changes and require explicit human instruction.

---

## What Counts as Refactoring

Allowed refactoring categories:
- rename for clarity
- extract function/module for cohesion
- split oversized files by responsibility
- move code to correct architectural boundary
- replace duplicated logic with shared abstraction
- remove dead code that is provably unused

Not refactoring:
- adding new behaviors
- changing user-visible outcomes
- modifying message contracts or storage semantics
- changing error policy semantics

---

## LLM Refactoring Rules

### What LLMs MAY Do Automatically

- reorganize code to match architecture boundaries
- improve naming and file placement
- isolate side effects behind adapters/ports
- reduce coupling and cyclic dependencies
- simplify control flow without semantic change

### What LLMs MUST NOT Do Automatically

- change externally observable behavior
- alter assertions in existing tests to "fit" refactored code
- silently change message payload shapes
- silently change persistence keys/schema semantics
- remove fallback/error paths without explicit approval

---

## Refactoring Triggers

Refactor is recommended when one or more apply:
- file exceeds maintainability threshold defined in `Module-Boundaries.md`
- one module has multiple unrelated reasons to change
- flow code directly depends on runtime APIs (`chrome.*`, DOM)
- adapter/runtime concerns leak into `shared` modules
- repeated logic appears across contexts/features
- dependency direction violates `Dependency-Boundaries.md`

---

## Required Refactoring Workflow

1. Identify invariant behavior to preserve.
2. Identify target boundary and intended module responsibilities.
3. Refactor in small, reviewable steps.
4. Run relevant tests after each step.
5. Confirm no contract drift (messages, storage, API surface).
6. Stop and escalate if behavior-preserving change is impossible.

No large "all-at-once" refactors without explicit human request.

---

## Browser-Extension Specific Safety Checks

For each refactor, verify:
- context ownership remains explicit (`contexts`, `background`, `ui`)
- runtime APIs stay in adapters/runtime-facing modules
- `flows` continue to use ports/contracts rather than concrete adapters
- message handler routing and payload validation behavior are preserved
- long-lived background lifecycle logic remains stable

---

## Contract Preservation Rules

Treat the following as contract boundaries:
- message types and payload structures
- storage keys and stored value schema
- flow input/output contracts
- user-visible UI state transitions

Changing any contract boundary is not refactoring unless explicitly approved.

---

## Anti-Patterns

Reject these changes as unsafe refactoring:
- "cleanup" that also changes behavior
- moving code across boundaries without updating dependency direction
- replacing domain/flow logic with runtime-specific shortcuts
- extracting generic helpers that hide domain meaning
- deleting tests because refactor "made them hard to maintain"

---

## Completion Criteria

A refactor is complete only when:
- architectural boundaries are improved or preserved
- tests pass without weakening assertions
- no contract boundary changed unintentionally
- code is easier to navigate and reason about than before

---

## Final Invariant

> **LLMs may optimize structure.**
> **They may not reinterpret intent.**
> **They may not weaken guarantees.**

All refactoring automation must preserve this invariant.
