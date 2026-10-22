---
name: component-check
description: Always search for existing components, common types, and design patterns before implementing new UI or feature logic.
---

# Pre-Implementation Checklist Skill

Before generating or modifying any UI or feature code, run this process:

1. **Check Existing Components:**
   - Search `src/components/ui`, `src/shared/components`, and existing `src/features/*/components` for existing UI components that match the required presentation.
   - Reuse existing primitives (Buttons, Modals, Inputs, Cards) rather than creating new ones.

2. **Check Existing Types:**
   - Verify if required interfaces or types already exist in `src/shared/types/` or `src/features/<feature>/types/`.
   - Keep types outside component files.

3. **Verify Component Separation:**
   - Split complex components into a Smart component (container/logic) and a Dumb component (UI).

4. **Verify Modern Patterns:**
   - Check if conditional blocks can be refactored into a Data Mapping object or a Functional Strategy factory.

See `.claude/rules/frontend-architecture.md` for the full rules and examples.
