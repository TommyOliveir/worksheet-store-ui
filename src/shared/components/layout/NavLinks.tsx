import Link from "next/link";
import { cn } from "@/lib/utils";
import { isActivePath } from "@/shared/components/layout/navLinks";
import type { NavLink, NavOrientation } from "@/shared/types/navigation";

const ORIENTATION_STYLES: Record<
  NavOrientation,
  { list: string; link: string }
> = {
  row: { list: "flex items-center gap-1", link: "px-3 py-2 text-sm" },
  column: { list: "flex flex-col gap-1", link: "px-3 py-2.5 text-base" },
};

const LINK_STATE_STYLES = {
  active: "bg-primary/10 text-primary",
  inactive: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
} as const;

interface NavLinksProps {
  links: NavLink[];
  pathname: string;
  orientation: NavOrientation;
  onNavigate?: () => void;
}

export const NavLinks = ({
  links,
  pathname,
  orientation,
  onNavigate,
}: NavLinksProps) => {
  const styles = ORIENTATION_STYLES[orientation];

  return (
    <ul className={styles.list}>
      {links.map((link) => {
        const isActive = isActivePath(pathname, link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "block rounded-md font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                styles.link,
                LINK_STATE_STYLES[isActive ? "active" : "inactive"],
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
