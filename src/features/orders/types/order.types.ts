export interface PurchasedWorksheet {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseOrderItem {
  id: string;
  worksheetId: string;
  price: number | string;
  worksheet: PurchasedWorksheet;
}

export interface PurchaseOrder {
  id: string;
  totalAmount: number | string;
  status: string;
  createdAt: string;
  items: PurchaseOrderItem[];
}
