# Frontend Workflow

This file defines strict phase order for frontend feature work.

## Universal Command Modes

Modes:
- `review` / `validate` / `analyze`: no code generation.
- `test-only`: test work only, no production code generation.
- `write` / `rewrite` / `implement` / `feature`: full generation flow.
- `refactor-only`: behavior-preserving structural changes only.

Mode-to-phase requirements:
- `review`/`validate`/`analyze`: phases 0, 1, 2, 3, and 5 required; phase 4 = `NO-OP`; phase 6 conditional.
- `test-only`: phases 0, 1, 2, 3, 4, and 5 required; phase 4 limited to tests.
- `write`/`rewrite`/`implement`/`feature`: phases 0, 1, 2, 3, 4, and 5 required; phase 6 conditional.
- `refactor-only`: phases 0, 1, 2, 3, 5, and 6 required; phase 4 = `NO-OP`.

Rules:
- Each phase status must be `DONE` or `NO-OP`.
- `SKIPPED` is forbidden.
- Every `NO-OP` needs explicit reason.
- User validation is required after each phase.
- Next phase is blocked until current phase is approved.
- Phase jumps or merged multi-phase execution are forbidden.

## Phase 0: Intake

1. Read request and identify impacted frontend feature slices.
2. Classify mode.
3. State expected impacted boundaries: `app`, `features`, `flows`, `state`, `platform`, `ui`, `shared`.

Gate: no next phase until phase-0 output approved.

## Phase 1: Behavior and Scope Declaration

1. Declare explicit frontend behavior guarantees.
2. Identify critical journeys, interaction states, navigation expectations, and accessibility expectations.
3. Mark behavior-change intent vs refactor-only intent.

Gate: no architecture or generation work until phase-1 output approved.

## Phase 2: Architecture Planning

1. Place changes using `structure.md` and `module-boundaries.md`.
2. Validate dependency direction using `dependency-boundaries.md`.
3. Validate pattern fit using `architecture-patterns.md`.
4. Ensure shell remains thin and behavior stays in `features`, `flows`, and `state`.

Gate: no test/code generation until phase-2 output approved.

## Phase 3: Test Planning

1. Define planned tests from declared behavior.
2. Plan coverage in this order:
   - feature and interaction guarantees
   - state/flow guarantees
   - adapter contract guarantees in `platform/*`
   - navigation/accessibility/responsive guarantees
   - system journey guarantees where risk requires
3. If existing tests must change or be removed, declare that before generation.

Gate: no generation until phase-3 output approved.

## Phase 4: Generation and Implementation

1. Generate tests in planned order.
2. Implement code to satisfy declared/planned tests.
3. Preserve architecture boundaries during edits.
4. Keep assertions intent intact; do not weaken guarantees.

Mode gate: `review`, `validate`, `analyze`, and `refactor-only` require phase 4 as `NO-OP`.

Gate: no next phase until phase-4 output or `NO-OP` rationale is approved.

## Phase 5: Finalization

1. Summarize tests added, modified, or removed and why.
2. Summarize code changes and boundary impact.
3. Confirm behavior-to-test mapping is complete.

Gate: no next phase until phase-5 output is approved.

## Phase 6: Refactor Safety Check

Apply when refactor occurred.

1. Validate behavior preservation and no contract drift.
2. Verify no unintended user-visible behavior change.
3. Escalate if behavior-preserving refactor is impossible.

Gate: no completion until phase-6 output or `NO-OP` rationale is approved.

## Definition of Done

Work is complete only when:
- required phases for mode are done
- no phases are skipped
- phase order is respected
- each required phase is approved
- frontend boundaries and behavior guarantees are preserved
