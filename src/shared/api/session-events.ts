// The HTTP clients run outside React and can't reach auth state directly, so
// a component registers a handler here and they signal through it when the
// server reports a session is no longer valid.
type UnauthorizedHandler = () => void;

let handler: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(next: UnauthorizedHandler): () => void {
  handler = next;

  return () => {
    // Only clear if nothing else registered in the meantime, so an unmount
    // can't drop a newer handler.
    if (handler === next) {
      handler = null;
    }
  };
}

export function notifyUnauthorized(): void {
  handler?.();
}
