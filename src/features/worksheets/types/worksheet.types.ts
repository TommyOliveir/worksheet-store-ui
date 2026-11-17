// What the product page offers for a worksheet, given the viewer's purchases.
// `checking` covers the moment before their orders have loaded.
export type PurchaseActionState = "checking" | "owned" | "available";
