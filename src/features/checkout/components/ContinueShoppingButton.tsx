import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContinueShoppingButton() {
  return (
    <Button
      className="mt-6"
      render={<Link href="/worksheets">Continue shopping</Link>}
    />
  );
}
