# Backend Test Visibility & Traceability Instructions (LLM-Guided)
(Plan-First Test Trace Layer)

## Purpose

This document defines mandatory visibility artifacts for backend test generation.
Goal: allow humans to understand planned and generated tests without reading code.

This file is normative.

---

## Scope Boundary

This document:
- applies to backend feature work that adds/modifies/removes tests
- defines planning and traceability artifacts only
- complements `backend/Test_Backend.md`

This document does not:
- define architecture structure
- define runtime execution/reporting metrics
- replace test semantics in `backend/Test_Backend.md`

---

## Required Artifacts Per Feature

For each backend feature, maintain exactly three files:

1. `backend/test-trace/plans/<FEATURE_ID>.plan.md`
2. `backend/test-trace/final/<FEATURE_ID>.final.md`
3. `backend/test-trace/changes/<FEATURE_ID>.changes.md`

`FEATURE_ID` must be stable across all three files.

---

## Artifact 1: Plan File (Before Code)

Timing rule:
- Must be created before generating production code or tests.

Required sections:
- feature scope
- behavior list
- planned tests in inside-out execution order
- for each planned test:
  - planned test id (`P-xx`)
  - test type (unit/integration/contract/system/non-functional)
  - target component or boundary
  - intent sentence
  - input example
  - expected output example
  - planned file path
  - change kind (`added` | `modify-candidate` | `remove-candidate`)
- existing test impact section

Planning control rule:
- Any test that may be modified or removed must be declared in this plan as:
  - `modify-candidate` or
  - `remove-candidate`
- Undeclared modify/remove actions are forbidden.

---

## Artifact 2: Final File (After Generation)

Timing rule:
- Must be updated after tests are generated/refined.

Required sections:
- mapping from planned ids (`P-xx`) to final ids (`F-xx`)
- for each final test:
  - final test id
  - source planned id
  - final file path
  - assertion intent summary
  - input example
  - expected output example
  - status (`added` | `modified` | `unchanged` | `removed`)
- unplanned additions (if any) with reason
- dropped planned tests (if any) with reason

Rule:
- If a planned test is not present in final output, reason is mandatory.
- Any modified/removed final test must reference its phase-3 candidate entry.

---

## Artifact 3: Changes File (Diff of Test Landscape)

Purpose:
- summarize how test suite changed for this feature.

Required sections:
- added tests list
- modified tests list, including semantic change summary
- removed tests list, including reason
- impacted existing tests not directly edited
- feature-level risk note for removed/modified coverage

Rule:
- test removal without explicit reason is forbidden.
- test modification/removal not declared in phase-3 plan is forbidden.

---

## Planning and Execution Model

- Planning is top-down (feature behavior first).
- Test generation sequence is inside-out:
  1. unit tests for feature collaborators
  2. integration tests for use-case composition
  3. contract tests for boundary stability
  4. system/non-functional tests when required by risk

Private helper methods are not required test targets unless they are externally meaningful behavior boundaries.

---

## Invariants

- No code generation before plan file exists.
- No feature completion before final and changes files exist.
- Every generated test must map to a planned test or be marked unplanned with reason.
- Humans must be able to understand test intent and I/O from trace artifacts alone.
