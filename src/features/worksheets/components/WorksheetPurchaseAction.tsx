"use client";

import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import AddToCartButton from "@/features/cart/components/AddToCartButton";
import { DownloadButton } from "@/features/checkout/components/DownloadButton";
import { useOwnedWorksheetIds } from "@/features/orders/hooks/useOwnedWorksheetIds";
import type { Worksheet } from "@/shared/types/worksheet";
import type { PurchaseActionState } from "@/features/worksheets/types/worksheet.types";

const PURCHASE_ACTIONS: Record<
  PurchaseActionState,
  (worksheet: Worksheet) => ReactNode
> = {
  // Disabled rather than hidden, so the layout doesn't jump, and an owned
  // worksheet can't slip into the cart while the orders are loading.
  checking: (worksheet) => <AddToCartButton worksheet={worksheet} disabled />,
  owned: (worksheet) => (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
      <p className="flex items-center gap-2 text-sm font-medium">
        <CheckCircle2 className="size-5 text-green-600" />
        You own this worksheet
      </p>
      <DownloadButton worksheetId={worksheet.id} />
    </div>
  ),
  available: (worksheet) => <AddToCartButton worksheet={worksheet} />,
};

// Smart component: decides from the viewer's purchases whether the product
// page offers "Add to Cart" or a download.
export function WorksheetPurchaseAction({
  worksheet,
}: {
  worksheet: Worksheet;
}) {
  const { ownedIds, isLoading } = useOwnedWorksheetIds();

  const state: PurchaseActionState = isLoading
    ? "checking"
    : ownedIds.has(worksheet.id)
      ? "owned"
      : "available";

  return PURCHASE_ACTIONS[state](worksheet);
}
