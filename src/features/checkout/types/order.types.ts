export type CheckoutSessionStatus = "paid" | "pending" | "failed";

export interface CheckoutPayload {
  worksheetIds: string[];
}

// The hosted Stripe Checkout page to send the browser to.
export interface CheckoutResponse {
  url: string;
}

export interface OrderItem {
  id: string;
  worksheetId: string;
  title: string;
  price: number;
}

export interface VerifiedCheckoutSession {
  sessionId: string;
  status: CheckoutSessionStatus;
  email?: string;
  total: number;
  items: OrderItem[];
}
