const DEFAULT_REDIRECT = "/worksheets";

/**
 * Narrows a `?redirect=` value to a path on this site.
 *
 * The value comes from the query string, so it is attacker-controlled: Next's
 * router executes `javascript:` URLs handed to push/replace, and an absolute
 * URL would send someone straight off the site from a page they trust.
 */
export function safeRedirectPath(
  value: string | null | undefined,
  fallback: string = DEFAULT_REDIRECT,
): string {
  if (!value) {
    return fallback;
  }

  // Must start with a single slash. "//evil.com" and "/\evil.com" are
  // protocol-relative and leave the origin despite that leading slash.
  if (!/^\/(?![/\\])/.test(value)) {
    return fallback;
  }

  return value;
}
