export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
  },
  orders: {
    checkout: "/orders/checkout",
    session: (sessionId: string) => `/orders/session/${sessionId}`,
  },
  worksheets: {
    list: "/worksheets",
    detail: (id: string) => `/worksheets/${id}`,
    bySlug: (slug: string) => `/worksheets/slug/${slug}`,
    download: (id: string) => `/worksheets/${id}/download`,
  },
} as const;
