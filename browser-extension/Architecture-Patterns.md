# Architecture Patterns for Browser Extensions
(DDD, Ports/Adapters, CQRS)

## Purpose

This document defines mandatory and optional architecture patterns for browser extension code.
It is normative for this codebase and intended to keep extension systems extensible, testable, and maintainable.

---

## Normative Baseline

> DDD and Ports/Adapters are mandatory.

Rules:
- DDD-aligned domain language and domain boundaries are required for feature code.
- Ports/Adapters (interface-based boundaries) are required for runtime and external integrations.
- CQRS is optional and should be used when read/write concerns materially diverge.

---

## DDD Requirement

Required usage:
- Use domain-aligned names for features, flows, and contracts.
- Keep domain concepts explicit (value objects, domain services, feature contracts) when behavior is non-trivial.
- Keep domain logic separate from runtime-specific adapter logic.

Recommended placement:
- `flows/<feature>/domain/*`
- `flows/<feature>/contracts/*`
- shared cross-feature domain types in `shared/domain/*`.

---

## Ports and Adapters Requirement

Required usage:
- Define interfaces (ports) for integration points used by flow logic.
- Implement interfaces as adapters in runtime-specific folders.
- Wire concrete adapters in bootstrap/startup composition code.

Required structure:
- Port interfaces: `flows/<feature>/ports/*` (or `shared/ports/*` if cross-feature)
- Adapter implementations: `contexts/*/adapters`, `background/adapters`, `ui/adapters`
- Flows depend on ports, not concrete adapters.

Examples of integration points that must use ports:
- translation providers
- browser runtime APIs (`chrome.*`)
- DOM/navigation observers
- storage and network clients

---

## CQRS Policy (Optional)

CQRS is optional by default.

Adopt CQRS when:
- read and write paths have different performance/complexity requirements
- command side effects require distinct handling from query paths
- separate read/write models materially reduce coupling

Suggested structure when used:
- `flows/<feature>/commands/*`
- `flows/<feature>/queries/*`
- `flows/<feature>/contracts/*`

Do not adopt CQRS only for stylistic consistency.

---

## Enforcement

Code review requirements:
- Every new feature flow must show DDD-aligned naming and contracts.
- Every integration with runtime/external systems must pass through a declared port and adapter.
- Any direct concrete integration in flow code is an architecture violation.
- CQRS is required only when divergence criteria are met.

---

## Non-Goals

This guide does not mandate:
- event sourcing
- full enterprise tactical patterns for every small feature
- unnecessary abstraction beyond DDD + Ports/Adapters baseline

Primary goal: stable boundaries with pragmatic complexity control.
