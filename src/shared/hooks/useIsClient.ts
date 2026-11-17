import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// False during server rendering and hydration, true after. For values that
// only exist in the browser, such as the cart restored from localStorage,
// so the first client render matches the server's HTML instead of causing a
// hydration mismatch.
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
