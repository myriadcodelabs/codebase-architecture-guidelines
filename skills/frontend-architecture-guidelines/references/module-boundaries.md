# Module Boundaries

## Purpose

Use these rules to keep frontend modules understandable, testable, and safe to change as systems grow.

## Core Rule

One module should have one primary reason to change.

A module can coordinate multiple calls, but must not mix unrelated concerns.

Baseline:
- Preserve feature boundaries and ports/adapters separation.
- Maximize locality of behavior and minimize cognitive load.

## Responsibility by Folder

`app/`: framework shell surfaces and app-level composition. Entry-level layout, navigation, and screen registration. Must not become feature policy or integration orchestration hub.

`features/`: feature-local modules and composition. Feature-specific UI and contracts. Feature boundaries stay explicit.

`flows/`: use-case orchestration and behavior decisions. Coordinates reads, decisions, and updates. Avoid direct dependency on concrete runtime/platform APIs.

`state/`: state contracts, selectors, reducers/transitions. Cross-feature state ownership and access points. Not a dumping ground for unrelated orchestration.

`platform/`: integration adapters for network, runtime, device, and storage boundaries. Translates external protocols into internal contracts. No feature UI composition logic.

`ui/`: cross-feature reusable UI primitives and composition helpers. No feature-specific behavior assumptions.

`shared/`: reusable, context-agnostic modules. Prefer pure functions and typed value objects. Must not depend on framework shell internals.

`bootstrap/`: wiring and initialization only. Binds startup concerns to app composition. No feature policy logic.

## File Size and Complexity Guardrails

- Target file size: `<= 150` lines.
- Review threshold: `> 200` lines should be split unless justified.
- Hard threshold: `> 300` lines is a required split.

Split when a file:
- mixes shell composition, orchestration, and platform adapter concerns
- requires multiple unrelated section headers to explain behavior
- needs unrelated tests for one file to be understandable

## State Ownership

- Feature-local transient state stays near feature modules.
- Cross-feature state belongs in `state/`.
- Use-case operation state belongs in `flows/`.
- Shared modules should be stateless or explicitly stateful with narrow purpose.
- Do not extract feature-local behavior into shared modules unless reuse is demonstrated.

## Side-Effect Boundaries

Allowed side effects:
- `bootstrap/`
- `app/`
- `platform/`
- selected `state/` adapters

Prefer side-effect free:
- `shared/`
- most `flows/`, except orchestration calls

## Naming

Use names that reflect intent:
- `startX`, `initX`, `mountX` for lifecycle/startup hooks
- `runXFlow` for orchestration
- `selectX`, `mapX`, `normalizeX` for focused operations

Avoid generic names such as `helpers.ts`, `utils.ts`, and `manager.ts` unless folder-scoped and purpose-scoped.

## Boundary Violations

Examples:
- Shell/app files containing full feature orchestration policy.
- Flow modules directly calling runtime/platform APIs.
- Shared modules depending on shell/framework-specific files.
- Platform modules importing feature UI composition code.

When violated, split by axis:
1. shell composition in `app`
2. feature logic in `features`
3. orchestration policy in `flows`
4. integration adapter in `platform`
5. reusable transform/contract in `shared`
