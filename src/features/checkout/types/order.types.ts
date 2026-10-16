export type CheckoutSessionStatus = "paid" | "pending" | "failed";

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
