"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheckBig, Clock, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useVerifyCheckoutSession } from "@/features/checkout/hooks/useVerifyCheckoutSession";
import { StatusCard } from "@/features/checkout/components/StatusCard";
import { ContinueShoppingButton } from "@/features/checkout/components/ContinueShoppingButton";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((state) => state.clearCart);

  const { data, isPending, isError, error, refetch, isRefetching } =
    useVerifyCheckoutSession(sessionId);

  useEffect(() => {
    if (data?.status === "paid") {
      clearCart();
    }
  }, [data?.status, clearCart]);

  if (!sessionId) {
    return (
      <StatusCard
        icon={<XCircle className="size-12 text-destructive" />}
        title="Missing order reference"
        description="We couldn't find a checkout session to verify. If you just completed a payment, check your email for a receipt."
      >
        <ContinueShoppingButton />
      </StatusCard>
    );
  }

  if (isPending) {
    return (
      <StatusCard
        icon={<Loader2 className="size-12 text-primary animate-spin" />}
        title="Verifying your payment..."
        description="Hang tight while we confirm your order with Stripe. This only takes a moment."
      />
    );
  }

  if (isError) {
    return (
      <StatusCard
        icon={<XCircle className="size-12 text-destructive" />}
        title="We couldn't verify your payment"
        description={
          error instanceof Error
            ? error.message
            : "Something went wrong while confirming your order. Please try again."
        }
      >
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            {isRefetching ? "Retrying..." : "Try again"}
          </Button>
          <ContinueShoppingButton />
        </div>
      </StatusCard>
    );
  }

  if (!data) {
    return null;
  }

  if (data.status === "pending") {
    return (
      <StatusCard
        icon={<Clock className="size-12 text-muted-foreground" />}
        title="Payment processing"
        description="Your payment is still being processed. This page will update automatically as soon as it's confirmed."
      >
        <ContinueShoppingButton />
      </StatusCard>
    );
  }

  if (data.status === "failed") {
    return (
      <StatusCard
        icon={<XCircle className="size-12 text-destructive" />}
        title="Payment was not completed"
        description="Your payment could not be confirmed. You have not been charged. Please try checking out again."
      >
        <ContinueShoppingButton />
      </StatusCard>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-16 bg-card text-card-foreground p-8 border border-border rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <CircleCheckBig className="size-12 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold">Thank you for your purchase!</h1>
        <p className="text-muted-foreground mt-2">
          {data.email
            ? `A receipt and download links have been sent to ${data.email}.`
            : "A receipt and download links have been sent to your email address."}
        </p>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          Order summary
        </h2>
        <ul className="flex flex-col gap-3">
          {data.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <span className="font-medium">{item.title}</span>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  ${item.price.toFixed(2)}
                </span>
                {item.downloadUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    render={<a href={item.downloadUrl}>Download</a>}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between font-bold text-lg mt-4 pt-4 border-t border-border">
          <span>Total paid</span>
          <span>${data.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <ContinueShoppingButton />
      </div>
    </div>
  );
}
