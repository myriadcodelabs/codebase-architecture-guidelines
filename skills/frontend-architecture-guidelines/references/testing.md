# Frontend Testing

## Purpose

Use these rules to create, evolve, and maintain frontend web system tests during AI-assisted development.

These rules preserve behavioral intent, keep tests stable under refactoring, prevent silent semantic drift, and make automation auditable.

This reference governs testing intent, semantics, and automation rules. It does not mandate testing frameworks, coverage targets, TDD, mocking libraries, or directory structure.

## Test Taxonomy

Use these categories as behavioral lenses:
- Feature tests: user-observable feature guarantees at feature boundaries.
- UI interaction tests: click, type, select, keyboard, and focus behavior.
- State and flow tests: transition logic, orchestration, async branch handling.
- Adapter contract tests: `platform/*` mapping, transport errors, retries, timeouts.
- Navigation tests: route/view transitions, parameter/query behavior, guard behavior.
- Accessibility tests: semantic role/name behavior and keyboard accessibility guarantees.
- Responsive tests: behavior guarantees across declared viewport classes/breakpoints.
- End-to-end/system tests: critical journey guarantees through real app composition.
- Non-functional tests: performance, security behavior, and browser compatibility guarantees.

Select tests by risk and declared behavior, not framework conventions.

## Core Principles

Tests encode intent, not structure:
- Tests represent human-declared behavioral guarantees.
- Tests are commitments, not experiments.
- Do not invent, assume, or widen behavior.

Unit tests are defined by behavioral scope, not framework/runtime surface:
- Assert one externally meaningful behavioral guarantee.
- May execute with real rendering/runtime facades, real state transitions, and real serialization/mapping logic.
- Still count as unit tests when verifying one behavior.

Integration tests verify composition of multiple behaviors across frontend boundaries:
- Assert interaction between independent guarantees.
- Commonly span `app/features` with `flows`, `flows` with `state`, or `flows/features` with `platform`.
- Must be explicit and intentional.
- Must never be inferred automatically.

End-to-end/system tests verify declared user journeys through full app composition:
- Cover cross-boundary behavior from shell/app through feature/flow/platform integrations.
- Verify business-critical user-visible outcomes.
- Stay small in number and focused on critical flows.
- Must be deterministic and environment-stable.

## Behavior Declaration

Behavior is human-owned.

Do not infer behavior from:
- component names
- view/screen names
- action names
- data shape names

New behavior:
- requires explicit human declaration
- results in new tests
- does not modify existing test intent

## Test Evolution

Additive evolution only:
- Existing tests retain original intent.
- New behavior means new test.
- Old tests are never implicitly re-scoped or reclassified.

Reclassification:
- Never reclassify tests automatically.
- Reclassification is allowed only through explicit human instruction.
- Suggest candidates for reclassification when useful, but do not apply without approval.

## Automation Rules

May automatically:
- Fix production code to satisfy failing tests.
- Repair mechanical test aspects: setup, wiring, fixtures, builders, selectors, imports, renames.

Must not automatically:
- Change assertions.
- Change expected values.
- Remove assertions.
- Add new assertions.
- Broaden or weaken guarantees.
- Change semantic meaning of a test.

Invariant: assertions are sacred; setup is negotiable.

If a test cannot be repaired without changing assertions, ask the user.

## Handling Failing Tests

Default:
1. A test fails.
2. Assume test intent is correct.
3. Fix production code.

Only explicit human instruction may authorize changing test intent, updating assertions, or removing/replacing tests.

## Frontend-Specific Testing Areas

Feature and interaction:
- Test user-observable outcomes at feature boundaries.
- Assert outcomes, not incidental implementation details.
- Include keyboard/focus behavior when interaction depends on them.
- Include validation/error feedback behavior for interactive flows.

State transitions:
- Treat state transitions/selectors as behavior.
- Validate stable outcomes for valid/invalid input paths.
- Validate async transitions explicitly: idle, loading, success, failure.
- Validate race/cancellation behavior where concurrent requests can occur.

Platform adapters:
- Test adapter behavior at `platform/*` boundaries.
- Validate mapping/error behavior for runtime/external integrations.
- Verify normalization of remote payloads into internal contracts.
- Verify timeout, malformed payload, and unavailable network failure modes.

View states:
- Test declared user-visible states: loading, success, empty, failure.
- Avoid over-constraining non-essential markup.
- Prefer assertions on meaning, text, role, and state over brittle DOM shape.

Navigation:
- Treat declared navigation outcomes as behavior.
- Validate route/view transitions, query/parameter handling, back/forward behavior.
- Validate guard/redirect outcomes where applicable.

Accessibility:
- Treat declared accessibility requirements as behavioral guarantees.
- Validate keyboard-only operation for interactive controls.
- Validate visible labels, accessible names, and focus movement outcomes.

Responsive behavior:
- Validate behavior at declared viewport classes/breakpoints.
- Assert intentional behavior changes, such as layout mode, menu behavior, and interaction path.
- Do not snapshot entire pages for responsiveness unless explicitly justified.

SSR/hydration when applicable:
- Validate no behavior drift between server-rendered and hydrated states.
- Validate critical interactions immediately after hydration.
- Validate fallback/error behavior when server data is absent or stale.

Performance:
- Treat declared latency/performance budgets as behavioral guarantees.
- Validate critical interaction latency and page-level rendering budgets.
- Validate expensive rendering paths and re-render hotspots for regression risk.
- Treat declared performance budget failures as test failures.

Security:
- Treat security-relevant behavior as testable contracts.
- Validate authentication/authorization UI boundaries and forbidden-state behavior.
- Validate safe handling of untrusted input and output encoding behavior.
- Validate CSRF/session boundaries where applicable.

Browser compatibility:
- Validate critical journeys on declared browser support matrix.
- Validate behavior differences only where explicitly accepted.
