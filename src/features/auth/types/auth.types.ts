// Not exported: the API assigns the role, so nothing outside this file names
// the type any more.
type UserRole = "TEACHER" | "BUYER" | "ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

// The tokens themselves are set as httpOnly cookies and never reach this code.
export interface AuthResponse {
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// `credential` is the ID token (a JWT) Google Identity Services returns. The
// API verifies it; the browser never decodes or trusts it.
export interface GoogleLoginPayload {
  credential: string;
}

// Which page the Google button sits on; picks the button's wording.
export type GoogleSignInMode = "signin" | "signup";

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}
