import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import OrderSuccessContent from "@/features/checkout/components/OrderSuccessContent";

function OrderSuccessFallback() {
  return (
    <div className="max-w-lg mx-auto my-16 text-center bg-card text-card-foreground p-8 border border-border rounded-xl shadow-sm">
      <div className="flex justify-center mb-4">
        <Loader2 className="size-12 text-primary animate-spin" />
      </div>
      <h1 className="text-2xl font-bold">Verifying your payment...</h1>
      <p className="text-muted-foreground mt-2">
        Hang tight while we confirm your order with Stripe. This only takes a
        moment.
      </p>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessFallback />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
