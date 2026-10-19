"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDownloadWorksheet } from "@/features/checkout/hooks/useDownloadWorksheet";

interface DownloadButtonProps {
  worksheetId: string;
}

export function DownloadButton({ worksheetId }: DownloadButtonProps) {
  const { mutate, isPending, isError } = useDownloadWorksheet();

  const handleClick = () => {
    mutate(worksheetId, {
      onSuccess: (data) => {
        window.location.href = data.downloadUrl;
      },
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        size="sm"
        variant="outline"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" />
            Preparing...
          </>
        ) : (
          "Download"
        )}
      </Button>
      {isError && (
        <p className="text-xs text-destructive">
          Couldn&apos;t generate link. Try again.
        </p>
      )}
    </div>
  );
}
