export const queryKeys = {
  checkout: {
    session: (sessionId: string) => ["checkout", "session", sessionId] as const,
  },
} as const;
