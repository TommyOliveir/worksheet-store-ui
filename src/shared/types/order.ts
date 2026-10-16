export type CheckoutSessionStatus = "paid" | "pending" | "failed";

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  downloadUrl?: string;
}

export interface VerifiedCheckoutSession {
  sessionId: string;
  status: CheckoutSessionStatus;
  email?: string;
  total: number;
  items: OrderItem[];
}
