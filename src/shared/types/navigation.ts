// Who a navbar link is shown to.
export type NavVisibility = "always" | "signedIn";

export interface NavLink {
  href: string;
  label: string;
  visibility: NavVisibility;
}

// Desktop bar vs. stacked inside the phone menu.
export type NavOrientation = "row" | "column";

// `checking` is the moment before the session has been confirmed with the
// API, when neither "Log in" nor the avatar would be correct yet.
export type AuthNavState = "checking" | "signedIn" | "signedOut";
