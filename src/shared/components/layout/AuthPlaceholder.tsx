import { cn } from "@/lib/utils";

// Holds the auth area's place while the session is being checked, so neither
// "Log in" nor the avatar flashes up wrongly and the bar doesn't shift.
export const AuthPlaceholder = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn(
      "block size-9 animate-pulse rounded-full bg-slate-200",
      className,
    )}
  />
);
