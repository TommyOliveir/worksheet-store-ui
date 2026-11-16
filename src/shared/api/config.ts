// Where the browser sends API calls. In production this is "/api", which
// next.config rewrites to the API's real origin, so the session cookies are
// first-party on this site rather than third-party cookies of the API's host
// (which Safari, and Chrome with third-party cookies blocked, refuse).
const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Server-side rendering cannot fetch a relative "/api" URL, so on the server
// calls go straight to the API. Server-only: not inlined into the browser
// bundle.
const SERVER_API_URL = process.env.API_ORIGIN || PUBLIC_API_URL;

export const API_BASE_URL =
  typeof window === "undefined" ? SERVER_API_URL : PUBLIC_API_URL;
