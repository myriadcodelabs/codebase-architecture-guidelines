# Frontend Architecture Guidelines
(Locality of Behaviour & Route-Centric Design)

## Purpose

This document defines how frontend code is **organized and navigated**.
These guidelines are **normative rules** for this codebase and reflect the author's coding style.
Its sole goal is to:
- maximize locality of behaviour
- reduce cognitive load
- make feature boundaries obvious

It **does not** define:
- how state is managed
- how data flows
- how UI logic is implemented
- whether specific patterns should be used

Scope boundary:
- this file defines **directory structure and placement intent only**
- it does not define dependency rules, global concern policy, or behavior rules

---

## Core Principle

> **Routes are the primary module boundary.**

Everything required to understand a route should live **with that route**.

---

## Top-Level Structure

src/
├── routes/
├── shared/
├── state/
├── services/
└── bootstrap/


### `routes/`
- Each route represents a **feature boundary**.
- Route-specific components live *inside* their route.
- Non-reusable components must not be lifted out.

Example:

routes/
├── dashboard/
│ ├── DashboardPage.tsx
│ ├── components/
│ └── hooks/
└── settings/


### `shared/`
- Contains **generic, reusable UI primitives**.
- Only components with no route-specific assumptions belong here.

Examples:
- buttons
- inputs
- dropdowns
- layout primitives

### `state/`
- Shared or cross-route state definitions.
- Must not contain route-specific UI logic.

### `services/`
- External interaction or non-UI concerns.
- Organized by responsibility, not by technology.

### `bootstrap/`
- Application initialization and wiring.
- No feature logic.

---

## Component Placement Rules

- Components used by **only one route** stay inside that route.
- A component is promoted to `shared/` **only when**:
  - it is used by multiple independent routes
  - it contains no route-specific assumptions

---

## Modularity

- Frontend modules are **feature-aligned**, not layer-aligned.
- Domain concepts may exist in the frontend, but are adapted to UI needs.
- This is a **domain-aligned design**, inspired by DDD—not a strict DDD implementation.

---

## Non-Goals

This document does not:
- enforce architectural patterns
- dictate state or interaction models
- define control-flow mechanisms

It exists purely to keep the codebase **understandable and navigable**.
