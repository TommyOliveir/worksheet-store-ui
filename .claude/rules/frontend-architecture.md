# Frontend Architecture & Component Rules

## 1. Type Location Standards

- Types local to a feature live at: `src/features/<feature-name>/types/<name>.types.ts` (e.g. `auth.types.ts`, `order.types.ts`).
- Globally shared types live at: `src/shared/types/`.
- Components should only define internal props interfaces directly related to display logic, referencing domain types imported from the feature or shared types folder.

## 2. Smart / Dumb Component Separation

- **Dumb Component Pattern:**
  ```tsx
  // Pure UI - receives data and event handlers
  export const UserCard = ({ name, role, onSelect }: UserCardProps) => (
    <div onClick={onSelect}>
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
  ```
- **Smart Component Pattern:**
  ```tsx
  // Container - owns hooks, data fetching and orchestration
  export default function MyPurchasesContent() {
    const { user, isAuthenticated } = useAuth();
    const { data, isPending } = useMyOrders(user?.id);

    if (isPending) {
      return <StatusCard title="Loading your purchases..." />;
    }

    return <PurchaseList orders={data} />;
  }
  ```
- Data fetching goes through the feature's `hooks/` or `queries/` folder (React Query), never directly inside a Dumb component.
- In this repo, `StatusCard` and `WorksheetCard` are Dumb components; `MyPurchasesContent` and `OrderSuccessContent` are Smart components.

## 3. Component Reuse

- UI primitives (shadcn) live in `src/components/ui/`. Extend them with variants instead of creating a new button, input or modal.
- App-wide layout lives in `src/shared/components/`.
- When a feature component is needed by a second feature, move it to `src/shared/components/` rather than importing across features or copying it.

## 4. Design Patterns

- **Data Mapping Objects** instead of `if/else` / `switch` chains:
  ```ts
  const ORDER_STATUS_UI: Record<
    OrderStatus,
    { label: string; className: string }
  > = {
    PENDING: { label: "Pending", className: "text-amber-600" },
    COMPLETED: { label: "Paid", className: "text-green-600" },
    FAILED: { label: "Failed", className: "text-destructive" },
    CANCELLED: { label: "Cancelled", className: "text-muted-foreground" },
  };

  const { label, className } = ORDER_STATUS_UI[order.status];
  ```
- **Strategy objects** for behavior that varies by type:
  ```ts
  type ExportStrategy = (worksheet: Worksheet) => Promise<void>;

  const exportStrategies: Record<ExportFormat, ExportStrategy> = {
    pdf: downloadPdf,
    print: openPrintDialog,
  };

  await exportStrategies[format](worksheet);
  ```
- Typing the map as `Record<Union, ...>` makes TypeScript flag a missing case when a new status or format is added.
