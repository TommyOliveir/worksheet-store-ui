export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  orders: {
    checkout: "/orders/checkout",
    session: (sessionId: string) => `/orders/session/${sessionId}`,
    sessionDownload: (sessionId: string, worksheetId: string) =>
      `/orders/session/${sessionId}/download/${worksheetId}`,
  },
  worksheets: {
    list: "/worksheets",
    detail: (id: string) => `/worksheets/${id}`,
    bySlug: (slug: string) => `/worksheets/slug/${slug}`,
    download: (id: string) => `/worksheets/${id}/download`,
  },
} as const;
