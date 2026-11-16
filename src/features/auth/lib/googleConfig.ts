// Read as a literal `process.env.NEXT_PUBLIC_…` so Next inlines it at build
// time. Unset means Google sign-in is hidden rather than broken.
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
