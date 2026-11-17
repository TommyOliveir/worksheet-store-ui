import type { NavLink, NavVisibility } from "@/shared/types/navigation";

export const NAV_LINKS: NavLink[] = [
  { href: "/worksheets", label: "Catalog", visibility: "always" },
  { href: "/purchases", label: "My purchases", visibility: "signedIn" },
];

const NAV_VISIBILITY: Record<NavVisibility, (signedIn: boolean) => boolean> = {
  always: () => true,
  signedIn: (signedIn) => signedIn,
};

export function visibleNavLinks(signedIn: boolean): NavLink[] {
  return NAV_LINKS.filter((link) => NAV_VISIBILITY[link.visibility](signedIn));
}

// Nested pages count as their section, so a worksheet's detail page
// (/worksheets/<slug>) still highlights Catalog.
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
