# Browser Extension Architecture Guidelines
(Structural & Context-Oriented)

## Purpose

This document defines a **clear and debuggable directory structure**
for browser extension development.
These guidelines are **normative rules** for this codebase and reflect the author's coding style.

Its goal is to make it immediately obvious:
- where execution starts
- which context code runs in
- how responsibilities are separated

It **does not**:
- mandate architectural patterns
- imply the use of events, flows, or messaging
- dictate how logic should be implemented

Scope boundary:
- this file defines **directory structure and placement intent only**
- it does not define dependency rules, behavior rules, or control-flow rules

---

## Core Principle

> **Directory structure must reflect execution context and responsibility.**

This is essential for understanding, debugging, and maintaining extensions.

---

## Top-Level Structure

src/
├── entrypoints/
├── contexts/
├── flows/
├── background/
├── ui/
├── shared/
└── bootstrap/


---

## Directory Intent

### `entrypoints/`
- Defines **where execution can begin**.
- Maps directly to extension-defined entry mechanisms.
- Contains no business logic.

Purpose: orientation, not behavior.

---

### `contexts/`
- Code organized by **runtime environment**.
- Each context represents a distinct execution boundary.
- Used for context-specific code that runs within a concrete execution context
  (for example: page, extension, isolated).

Examples:

contexts/
├── page/
├── extension/
└── isolated/


---

### `flows/`
- Represents **logical groupings of related functionality**.
- Used purely for organization and traceability.
- Does not imply a programming model or control style.

---

### `background/`
- Code that can run without popup UI being open.
- Primarily async/background tasks and related orchestration.
- Kept separate from context folders for navigational clarity.

---

### `ui/`
- All user-facing extension UI.
- No assumptions about how UI communicates internally.

---

### `shared/`
- Cross-context shared code.
- Must be context-agnostic and side-effect free where possible.

---

### `bootstrap/`
- Initialization and wiring logic.
- No domain or feature logic.

---

## Modularity & Domain Concepts

- Domain concepts may exist **where meaningful**, but are lightweight.
- Structure favors **clarity of responsibility** over architectural purity.
- The extension is treated as a multi-context system, not a traditional app.

---

## Non-Goals

This document intentionally avoids:
- prescribing control-flow styles
- suggesting architectural patterns
- influencing design decisions

Its purpose is **structural clarity only**.
