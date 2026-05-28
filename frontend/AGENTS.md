# Frontend Orchestration Instructions
(Frontend-Local Full Feature Execution Path)

This file defines strict sequence for frontend feature work.

Path note:
- Use installed copied output paths: `codebase-architecture-guidelines/frontend/...`.

Companion docs used in order:
1. `codebase-architecture-guidelines/frontend/Architecture-Patterns.md`
2. `codebase-architecture-guidelines/frontend/Dependency-Boundaries.md`
3. `codebase-architecture-guidelines/frontend/Module-Boundaries.md`
4. `codebase-architecture-guidelines/frontend/Test.md`
5. `codebase-architecture-guidelines/frontend/Refactoring.md`
6. `codebase-architecture-guidelines/frontend/FrontEnd.md`

## Universal Command Modes (Mandatory)

Modes:
- `review` / `validate` / `analyze`: no code generation.
- `test-only`: test work only, no production code generation.
- `write` / `rewrite` / `implement` / `feature`: full generation flow.
- `refactor-only`: behavior-preserving structural changes only.

Mode-to-phase requirements:
- `review`/`validate`/`analyze`: phases 0,1,2,3,5 required; phase 4 = `NO-OP`; phase 6 conditional.
- `test-only`: phases 0,1,2,3,4,5 required; phase 4 limited to tests.
- `write`/`rewrite`/`implement`/`feature`: phases 0,1,2,3,4,5 required; phase 6 conditional.
- `refactor-only`: phases 0,1,2,3,5,6 required; phase 4 = `NO-OP`.

Rules:
- Each phase status must be `DONE` or `NO-OP`.
- `SKIPPED` is forbidden.
- Every `NO-OP` needs explicit reason.
- User validation required after each phase.
- Next phase blocked until current phase is approved.
- Phase jumps or merged multi-phase execution forbidden.

## Phase 0: Intake

1. Read request and identify impacted frontend feature slices.
2. Classify mode (`review`/`test-only`/`write`/`refactor-only`...).
3. State expected impacted boundaries (`app`, `features`, `flows`, `state`, `platform`, `ui`, `shared`).

Gate:
- No next phase until phase-0 output approved.

## Phase 1: Behavior and Scope Declaration

1. Declare explicit frontend behavior guarantees (user-visible outcomes).
2. Identify critical journeys, interaction states, navigation and accessibility expectations.
3. Mark any behavior-change intent vs refactor-only intent.

Gate:
- No architecture or generation work until phase-1 output approved.

## Phase 2: Architecture Planning

1. Place changes using `codebase-architecture-guidelines/frontend/FrontEnd.md` and `codebase-architecture-guidelines/frontend/Module-Boundaries.md`.
2. Validate dependency direction using `codebase-architecture-guidelines/frontend/Dependency-Boundaries.md`.
3. Validate pattern fit using `codebase-architecture-guidelines/frontend/Architecture-Patterns.md`.
4. Ensure shell remains thin and behavior stays in `features/flows/state`.

Gate:
- No test/code generation until phase-2 output approved.

## Phase 3: Test Planning

1. Define planned tests from declared behavior.
2. Plan coverage in this order:
   - feature and interaction guarantees
   - state/flow guarantees
   - adapter contract guarantees (`platform/*`)
   - navigation/accessibility/responsive guarantees
   - system journey guarantees where risk requires
3. If existing tests must change/remove, declare that before generation.

Gate:
- No generation until phase-3 output approved.

## Phase 4: Generation and Implementation

1. Generate tests in planned order.
2. Implement code to satisfy declared/planned tests.
3. Preserve architecture boundaries during edits.
4. Keep assertions intent intact; do not weaken guarantees.

Mode gate:
- `review`/`validate`/`analyze`/`refactor-only`: phase 4 must be `NO-OP`.

Gate:
- No next phase until phase-4 output (or NO-OP rationale) approved.

## Phase 5: Finalization

1. Produce final summary of tests added/modified/removed and why.
2. Produce final summary of code changes and boundary impact.
3. Confirm behavior-to-test mapping is complete.

Gate:
- No next phase until phase-5 output approved.

## Phase 6: Refactor Safety Check (When Applicable)

1. If refactor occurred, validate behavior preservation and no contract drift.
2. Verify no unintended user-visible behavior change.
3. If behavior-preserving refactor impossible, escalate.

Gate:
- No completion until phase-6 output (or NO-OP rationale) approved.

## Definition of Done

Work complete only when:
- required phases for mode are done
- no skipped phases
- phase order respected
- each required phase approved
- frontend boundaries and behavior guarantees preserved
