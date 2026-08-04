# Frontend Refactoring

## Purpose

Use these rules for behavior-preserving frontend web system refactors during AI-assisted development.

These rules preserve behavior while improving structure, reduce accidental regressions across feature boundaries, and keep refactors predictable and auditable.

This reference defines refactoring intent and safety process only. It does not authorize feature work, redefine business behavior, or replace architecture/testing references.

## Core Invariant

Refactoring changes structure, not behavior.

Behavior changes are feature changes and require explicit human instruction.

## What Counts as Refactoring

Allowed:
- rename for clarity
- extract function/module for cohesion
- split oversized files by responsibility
- move code to correct architectural boundary
- replace duplicated logic with shared abstraction
- remove dead code that is provably unused

Not refactoring:
- adding new behaviors
- changing user-visible outcomes
- modifying feature/state/platform contracts
- changing error policy semantics

## Automation Rules

May automatically:
- reorganize code to match architecture boundaries
- improve naming and file placement
- isolate side effects behind adapters/ports
- reduce coupling and cyclic dependencies
- simplify control flow without semantic change

Must not automatically:
- change externally observable behavior
- alter assertions in existing tests to fit refactored code
- silently change contract shapes
- silently change feature/state outcomes
- remove fallback/error paths without explicit approval

## Refactoring Triggers

Refactor when one or more apply:
- file exceeds maintainability threshold in `module-boundaries.md`
- one module has multiple unrelated reasons to change
- flow code directly depends on runtime/platform APIs
- adapter concerns leak into app/feature/flow modules
- repeated logic appears across features
- dependency direction violates `dependency-boundaries.md`

## Required Workflow

1. Identify invariant behavior to preserve.
2. Identify target boundary and intended module responsibilities.
3. Refactor in small, reviewable steps.
4. Run relevant tests after each step.
5. Confirm no contract drift in feature/state/platform interfaces.
6. Stop and ask the user if behavior-preserving change is impossible.

Avoid large all-at-once refactors unless explicitly requested.

## Safety Checks

For each refactor, verify:
- framework shell files remain thin and compositional
- feature boundaries remain explicit
- flow orchestration remains separate from shell and platform adapters
- platform/runtime APIs remain in `platform/*` or explicit shell entry points
- user-visible behavior and error states remain stable

## Contract Preservation

Treat these as contract boundaries:
- feature input/output contracts
- state contract shapes and selector outputs
- platform adapter input/output contracts
- URL path/query/hash semantics and deep-link behavior
- user-visible interaction and view-state outcomes

Changing any contract boundary is not refactoring unless explicitly approved.

## Anti-Patterns

Reject unsafe refactors:
- cleanup that also changes behavior
- moving code across boundaries without updating dependency direction
- placing integration logic directly into feature or shell files
- extracting generic helpers that hide domain meaning
- deleting tests because refactor made them hard to maintain

## Completion Criteria

A refactor is complete only when:
- architectural boundaries are improved or preserved
- tests pass without weakening assertions
- no contract boundary changed unintentionally
- code is easier to navigate and reason about

Final invariant:
- Optimize structure.
- Do not reinterpret intent.
- Do not weaken guarantees.
