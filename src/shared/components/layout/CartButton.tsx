import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartButtonProps {
  count: number;
  // The count comes from localStorage, which the server can't see; it is
  // only shown once rendering in the browser, so hydration matches.
  showCount: boolean;
  onClick: () => void;
}

export const CartButton = ({ count, showCount, onClick }: CartButtonProps) => {
  const hasItems = showCount && count > 0;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={hasItems ? `Open cart, ${count} items` : "Open cart"}
      className="relative cursor-pointer text-slate-700"
    >
      <ShoppingCart className="size-5" />
      {hasItems && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground ring-2 ring-white">
          {count}
        </span>
      )}
    </Button>
  );
};
