# Architectural Rules & Workflow Standards

## Core Architecture & File Structure

- **TypeScript Types Location:**
  - Place feature-specific types in their respective feature folder (e.g., `src/features/auth/types/auth.types.ts`).
  - NEVER put component-level TS types inside the component file if they are feature or global models.
  - Common/shared types MUST live in `src/shared/types/`.
- **Component Reuse Policy:**
  - ALWAYS search existing UI components (`src/components/ui/`, `src/shared/components/`, `src/features/*/components/`) BEFORE implementing any new component or UI block.
  - Do not duplicate UI components, buttons, inputs, modals, or layout primitives.
- **Smart vs. Dumb (Container vs. Presentational) Components:**
  - **Dumb Components:** Pure UI/presentational only. Accept data and callbacks via props. No direct store/API side-effects or business logic.
  - **Smart Components:** Handle state management, hooks, data fetching, and business orchestration, passing props down to Dumb components.
- **Design Patterns & Maintainability:**
  - **Data Mapping Objects:** Use explicit mapping objects/lookup tables instead of inline `if/else` or `switch` statements to encapsulate dynamic configurations (e.g., UI states, status colors, action handlers).
  - **Modern Strategy Pattern:** Implement behavior variations using functional class factories, strategy objects, or composable hook strategies rather than bloated monolithic conditional logic.

## Modularity & Rules

- Additional detailed rules live in `.claude/rules/`.
- Run the `component-check` skill before creating or modifying UI or feature code.
