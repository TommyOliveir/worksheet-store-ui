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

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}
