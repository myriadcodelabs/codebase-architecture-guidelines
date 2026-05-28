# Backend Orchestration Instructions
(Backend-Local Full Feature Execution Path)

This file defines full sequence for backend feature generation.

Companion docs used in order:
1. `backend/Feature-Contracts.md`
2. `backend/Architecture-Patterns.md`
3. `backend/Dependency-Boundaries.md`
4. `backend/Module-Boundaries.md`
5. `backend/Test_Backend.md`
6. `backend/Test-Traceability.md`
7. `backend/Refactoring.md`

## Phase 0: Intake

1. Read feature request and identify capability boundary.
2. Decide if change is feature work or refactor-only work.
3. If behavior changes, use full feature flow below.

Gate:
- No implementation before phase classification is explicit.

## Phase 1: Feature Contract (Before Architecture and Tests)

1. Create/update feature contract per `Feature-Contracts.md`.
2. Ensure required fields exist (flow, requirements, test strategy, mock policy, visibility links).
3. Ensure each behavior step is testable and maps to a boundary/component.

Gate:
- No architecture or code generation before feature contract exists.

## Phase 2: Architecture Planning (Derived from Contract)

1. Map placement using `Backend.md` and `Module-Boundaries.md`:
   - target module
   - target layer (`api`, `application`, `domain`, `infrastructure`, `contracts`, `shared`)
2. Validate dependency direction using `Dependency-Boundaries.md`.
3. Validate pattern fit using `Architecture-Patterns.md`:
   - DDD boundary ownership
   - ports/adapters placement
   - optional CQRS decision (if relevant)
4. List architecture decisions in feature notes:
   - what new/changed files are expected by layer
   - which ports/adapters are introduced or reused

Gate:
- No test or code generation until architecture placement and dependency direction are clear.

## Phase 3: Test Intent Planning (Visibility Layer, Before Code)

1. Create `backend/test-trace/plans/<FEATURE_ID>.plan.md`.
2. Define planned tests from contract behavior:
   - top-down behavior mapping
   - inside-out execution order
3. For each planned test include:
   - intent
   - input example
   - expected output example
   - planned file path
   - change kind (`added`/`modify-candidate`/`remove-candidate`)
4. If any existing test may be modified or removed, record it in phase-3 plan before generation.

Gate:
- No code generation before plan file is complete.
- No test modify/remove unless it was declared in phase-3 plan.

## Phase 4: Generation and Implementation

Generate tests and code in inside-out sequence:
1. Unit tests for feature collaborators (not private helper internals unless behavior-critical).
2. Integration tests for use-case composition.
3. Contract tests for API/event/storage boundaries.
4. System/non-functional tests when feature risk requires.
5. Implement code to satisfy planned tests while preserving boundary rules.

Architecture checks during implementation:
- no forbidden dependency direction
- no domain/application direct concrete infrastructure usage
- module ownership remains explicit

## Phase 5: Finalize Test Traceability Artifacts

1. Update `backend/test-trace/final/<FEATURE_ID>.final.md`:
   - planned-to-final mapping
   - finalized tests with I/O examples
   - status (`added`/`modified`/`unchanged`/`removed`)
2. Update `backend/test-trace/changes/<FEATURE_ID>.changes.md`:
   - added tests
   - modified tests with semantic deltas
   - removed tests with reason
   - indirect impacts

Gates:
- No planned test may disappear without explicit reason.
- No unplanned generated test without explicit reason.
- No test removal/semantic weakening without explicit reason.
- No modified/removed test unless it appeared in phase-3 plan as candidate.

## Phase 6: Refactor Safety Check (When Applicable)

If structural cleanup occurred, apply `Refactoring.md` checks:
- behavior preserved
- contracts unchanged unless explicitly approved
- boundaries improved or preserved

Gate:
- If behavior-preserving refactor impossible, escalate for human decision.

## Definition of Done

Feature is complete only when:
- architecture placement and dependency direction are explicit
- feature contract exists and is coherent
- plan trace file exists before code generation
- final and changes trace files explain resulting tests without reading code
- boundary and refactor invariants are not violated
