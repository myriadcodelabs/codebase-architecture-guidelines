# Backend Architecture Guidelines
(DDD-based Modular Monolith)

## Purpose

This document defines the **structural organization** of the backend codebase.
These guidelines are **normative rules** for this codebase and reflect the author's coding style.
It exists solely to:
- make navigation predictable
- preserve separation of concerns
- keep domain logic isolated
- support modular growth over time

It **does not** prescribe:
- implementation techniques
- communication styles
- persistence strategies
- use of events, messaging, or patterns

All such decisions remain contextual and task-driven.

Scope boundary:
- this file defines **directory structure and placement intent only**
- it does not define dependency rules, behavior rules, or implementation tactics

---

## Architectural Style

- **Domain-Driven Design (DDD)** is used as the organizing principle.
- The system is a **modular monolith**:
    - one deployable unit
    - internally divided into well-defined modules
- Modules represent **business capabilities**, not technical layers.

---

## Top-Level Structure

src/
├── modules/
├── shared/
└── bootstrap/


### `modules/`
- Each module represents a **bounded context** or domain area.
- Modules are the primary unit of organization.

Example:

modules/
├── billing/
├── user-management/
└── reporting/

Concrete example:

modules/
├── user-management/
├── learning-session/
└── notifications/


### `shared/`
- Contains **cross-cutting abstractions** that are not owned by any single module.
- Must not contain domain logic specific to one module.
- Should remain small and stable.

Examples:
- base types
- technical utilities
- shared kernel concepts (if any)

### `bootstrap/`
- Application startup and wiring code.
- Configuration, composition, and runtime assembly.
- No domain logic belongs here.

---

## Inside a Module

Each module organizes its internal structure around **domain concepts**, not layers.

Typical internal structure (illustrative only):

modules/order/
├── domain/
├── application/
├── infrastructure/
└── api/

Concrete example:

modules/learning-session/
├── domain/
├── application/
├── infrastructure/
└── api/

Notes:
- Use `kebab-case` for module directory names.
- Keep module boundaries reflected in folder names, not just package names.

- Exact sub-structure may vary per module.

---

## Sub-Contexts Within a Module

Some modules may define **sub-contexts** that further separate domain areas.
When a module is subdivided this way, the sub-context folder becomes the primary placement target.

Example:

modules/language-learning-system/
├── reading-and-listening/
├── writing/
└── vocabulary/

Rules:
- Place new or moved code inside the correct sub-context folder when one exists.
- Do not put domain/application/infrastructure/api code directly under the module root unless explicitly intended.
- When relocating functionality, move the entire flow (api/application/domain/infrastructure/tests) into the target sub-context.

---

## Growth Rules

- New functionality should be added **inside an existing module** when it belongs to that domain.
- New modules are introduced only when a **new bounded context** emerges.
- Modules may evolve independently as long as boundaries are preserved.

---

## Non-Goals

This document intentionally avoids:
- defining patterns
- enforcing specific architectural tactics
- prescribing control flow styles

Its role is **structural clarity**, not behavioral design.
