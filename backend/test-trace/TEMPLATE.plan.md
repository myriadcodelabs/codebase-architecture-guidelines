# <FEATURE_ID>.plan.md

Feature ID: <FEATURE_ID>
Feature: <short feature name>
Scope: backend only
Planning Mode: top-down behavior mapping
Execution Mode: inside-out test generation

## Behavior Scope
- BHV-1: ...
- BHV-2: ...

## Planned Tests (inside-out order)

### P-01
Type: Unit | Integration | Contract | System | Non-functional
Target: <component/boundary>
Intent: <single guarantee sentence>
Input Example:
<example input>
Expected Output Example:
<example expected output>
Planned Test File:
<path>
Change Kind:
added | modify-candidate | remove-candidate

## Existing Test Impact (planned)
- <existing test path>: <reuse/modify/no-change>

## Planned Modify/Remove Candidates
- <test path>: <reason>

## Modify/Remove Control
- Any test not listed as `modify-candidate` or `remove-candidate` must not be modified/removed in this feature.
