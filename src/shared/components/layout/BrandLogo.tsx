import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  onNavigate?: () => void;
}

export const BrandLogo = ({ className, onNavigate }: BrandLogoProps) => (
  <Link
    href="/"
    onClick={onNavigate}
    aria-label="WorksheetStore home"
    className={cn(
      "flex shrink-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
      className,
    )}
  >
    <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/30">
      <BookOpenCheck className="size-4.5" />
    </span>
    <span className="text-lg tracking-tight">
      <span className="font-bold text-slate-900">Worksheet</span>
      <span className="font-medium text-primary">Store</span>
    </span>
  </Link>
);
