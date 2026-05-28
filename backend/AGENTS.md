# Backend Orchestration Instructions
(Backend-Local Full Feature Execution Path)

This file defines strict sequence for backend feature work.

Path note:
- In this source repo, use `backend/...`.
- In installed copied output, use `codebase-architecture-guidelines/backend/...`.

Companion docs used in order:
1. `backend/Feature-Contracts.md` or `codebase-architecture-guidelines/backend/Feature-Contracts.md`
2. `backend/Architecture-Patterns.md` or `codebase-architecture-guidelines/backend/Architecture-Patterns.md`
3. `backend/Dependency-Boundaries.md` or `codebase-architecture-guidelines/backend/Dependency-Boundaries.md`
4. `backend/Module-Boundaries.md` or `codebase-architecture-guidelines/backend/Module-Boundaries.md`
5. `backend/Test_Backend.md` or `codebase-architecture-guidelines/backend/Test_Backend.md`
6. `backend/Refactoring.md` or `codebase-architecture-guidelines/backend/Refactoring.md`

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
- `refactor-only`: phases 0,2,3,5,6 required; phase 1 optional if no behavior changes.

Rules:
- Each phase status must be `DONE` or `NO-OP`.
- `SKIPPED` is forbidden.
- Every `NO-OP` needs explicit reason.
- User validation required after each phase.
- Next phase blocked until current phase is approved.
- Phase jumps or merged multi-phase execution forbidden.

## Phase 0: Intake

1. Read request and identify capability boundary.
2. Classify mode (`review`/`test-only`/`write`/`refactor-only`...).
3. State expected impacted layers/modules.

Gate:
- No next phase until phase-0 output approved.

## Phase 1: Feature Contract

1. Create/update feature contract per `Feature-Contracts.md` when mode requires it.
2. Ensure required fields exist and behavior is testable.

Gate:
- No architecture or generation work until phase-1 output approved (when phase-1 required).

## Phase 2: Architecture Planning

1. Place changes by module/layer using `Backend.md` and `Module-Boundaries.md`.
2. Validate dependency direction using `Dependency-Boundaries.md`.
3. Validate pattern fit using `Architecture-Patterns.md`.

Gate:
- No test/code generation until phase-2 output approved.

## Phase 3: Test Planning

1. Define planned tests from declared behavior.
2. Plan inside-out execution order:
   - unit collaborator guarantees
   - integration composition guarantees
   - contract/boundary guarantees
   - system/non-functional guarantees when risk requires
3. If existing tests must change/remove, declare that before generation.

Gate:
- No generation until phase-3 output approved.

## Phase 4: Generation and Implementation

1. Generate tests in planned inside-out order.
2. Implement code to satisfy declared/planned tests.
3. Preserve architecture boundaries during edits.

Mode gate:
- `review`/`validate`/`analyze`: phase 4 must be `NO-OP`.

Gate:
- No next phase until phase-4 output (or NO-OP rationale) approved.

## Phase 5: Finalization

1. Produce final summary of what tests were added/modified/removed and why.
2. Produce final summary of code changes and boundary impact.
3. Confirm planned behavior-to-test mapping is complete.

Gate:
- No next phase until phase-5 output approved.

## Phase 6: Refactor Safety Check (When Applicable)

1. If refactor occurred, validate behavior preservation and no contract drift.
2. If behavior-preserving refactor impossible, escalate.

Gate:
- No completion until phase-6 output (or NO-OP rationale) approved.

## Definition of Done

Work complete only when:
- required phases for mode are done
- no skipped phases
- phase order respected
- each required phase approved
- boundaries and behavior guarantees preserved
