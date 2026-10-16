import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContinueShoppingButton() {
  return (
    <Button
      className="mt-6"
      nativeButton={false}
      render={<Link href="/worksheets">Continue shopping</Link>}
    />
  );
}
