# Dependency Boundaries
(Import Direction & Isolation Rules)

## Purpose

This document defines allowed dependency direction for browser extension modules.
It prevents cyclic architecture and keeps runtime concerns isolated from flow and shared modules.

---

## Canonical Dependency Direction

`entrypoints -> bootstrap -> contexts/background/ui/flows -> shared`

Additional allowed paths:
- `ui -> flows -> shared`
- `background -> flows -> shared`
- `contexts -> flows -> shared`

Disallowed examples:
- `shared -> contexts`
- `shared -> ui`
- `flows -> bootstrap`
- `flows -> entrypoints`
- `contexts` directly importing `ui`

---

## Layer Roles

- `entrypoints`: start only
- `bootstrap`: composition and wiring only
- `contexts/background/ui`: adapters and runtime interaction surfaces
- `flows`: use-case orchestration and domain behavior
- `shared`: reusable primitives, contracts, pure transformations

---

## Mandatory Ports and Adapters Rule

Ports/Adapters are mandatory.

Required:
- Port interfaces must define integration boundaries used by flows.
- Adapters must implement those ports in runtime-specific layers.
- Flows must depend on ports, never concrete adapter classes.

Required placement:
- Port interfaces: `flows/<feature>/ports/*` or `shared/ports/*`
- Adapter implementations: `contexts/*/adapters`, `background/adapters`, `ui/adapters`

Example shape:
- `flows/article-translation/ports/TranslatorPort.ts`
- `contexts/isolated/adapters/GoogleTranslateAdapter.ts`

---

## Contract Placement

- Shared DTOs/value objects: `shared/types`
- Feature-specific request/response models: `flows/<feature>/contracts`
- Browser runtime payload contracts (messages/storage schema): `shared/contracts`

---

## Runtime API Access Rule

Only adapters and runtime-facing modules may directly call:
- `chrome.*`
- `window`, `document`, DOM APIs
- environment-specific storage/network primitives

Flow code must consume these capabilities via ports.

---

## Anti-Coupling Rules

- No cross-imports between sibling features in `flows` unless via shared contracts.
- No deep imports across layers that bypass boundary folders.
- No import-time side effects in `shared`.

---

## Practical Enforcement

- Review every new feature for dependency direction.
- Reject flow modules that import concrete runtime adapters.
- Reject runtime integration in flows without a declared port.
