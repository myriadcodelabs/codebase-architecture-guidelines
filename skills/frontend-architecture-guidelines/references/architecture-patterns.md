# Architecture Patterns

## Purpose

Use these mandatory and optional architecture patterns for frontend web system code to keep systems extensible, testable, and maintainable across web frameworks.

## Normative Baseline

Feature-slice boundaries and ports/adapters are mandatory.

Rules:
- Organize feature behavior by capability slices, not by framework primitives alone.
- Separate use-case orchestration from framework shell and runtime adapters.
- Require ports/adapters, meaning interface-based boundaries, for external/platform integrations.
- Use CQRS only when read/write concerns materially diverge.
- Keep behavior close to feature ownership unless reuse is proven.

## Feature Slice Requirement

Required:
- Use feature-aligned names for modules, flows, and contracts.
- Keep shell composition in `app` separate from feature behavior in `features` and `flows`.
- Keep domain logic separate from platform/runtime adapter logic.

Recommended placement:
- `features/<feature>/*`
- `flows/<feature>/*`
- shared cross-feature domain/contracts in `shared/*`

## Ports and Adapters Requirement

Required:
- Define ports for integration points used by flow logic.
- Implement adapters in `platform/*`.
- Wire concrete adapters in `bootstrap/*` or app startup composition.
- Flows depend on ports, not concrete adapters.

Required structure:
- Port interfaces: `flows/<feature>/ports/*` or `shared/ports/*` if cross-feature.
- Adapter implementations: `platform/*`.

Integration points that must use ports:
- network/data providers
- storage and cache boundaries
- runtime/device APIs
- telemetry and analytics sinks

## Shell vs Feature

Framework shell files, such as entry, route config, layout, and screen registration, stay thin.

Feature behavior and orchestration live in `features/*` and `flows/*`.

Shell files compose and delegate; they must not become behavior hubs.

## CQRS Policy

CQRS is optional by default.

Adopt CQRS when:
- read and write concerns have materially different complexity
- command side effects need distinct handling from query paths
- separation reduces coupling and improves maintainability

Suggested structure when used:
- `flows/<feature>/commands/*`
- `flows/<feature>/queries/*`
- `flows/<feature>/contracts/*`

Do not adopt CQRS only for style consistency.

## Enforcement

Review requirements:
- Every feature preserves shell/feature/adapter separation.
- External/runtime integrations pass through declared ports/adapters.
- Any direct concrete integration inside flow code is an architecture violation.
- CQRS is required only when divergence criteria are met.

Objective gates:
- Import-boundary checks pass for `app`, `features`, `ui`, `flows`, `state`, `platform`, and `shared`.
- Any direct runtime API usage in `flows/*` fails review unless explicitly approved.
- Any direct concrete adapter import in `flows/*` fails review unless explicitly approved.
- New feature modules declare boundary placement in PR notes when PR notes are being written.
