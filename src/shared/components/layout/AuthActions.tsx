import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { NavOrientation } from "@/shared/types/navigation";

const LAYOUT_STYLES: Record<NavOrientation, { group: string; button: string }> =
  {
    row: { group: "flex items-center gap-2", button: "" },
    column: { group: "flex flex-col gap-2", button: "w-full" },
  };

interface AuthActionsProps {
  orientation: NavOrientation;
  onNavigate?: () => void;
}

export const AuthActions = ({ orientation, onNavigate }: AuthActionsProps) => {
  const styles = LAYOUT_STYLES[orientation];

  return (
    <div className={styles.group}>
      <Button
        variant="ghost"
        className={styles.button}
        nativeButton={false}
        render={<Link href="/login" onClick={onNavigate} />}
      >
        Log in
      </Button>
      <Button
        className={styles.button}
        nativeButton={false}
        render={<Link href="/register" onClick={onNavigate} />}
      >
        Sign up
      </Button>
    </div>
  );
};
