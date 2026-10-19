"use client";

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";

interface DownloadUrlResponse {
  downloadUrl: string;
}

async function downloadWorksheet(
  worksheetId: string,
): Promise<DownloadUrlResponse> {
  const res = await apiClient.get<DownloadUrlResponse>(
    `/worksheets/${worksheetId}/download`,
  );
  return res.data;
}

export function useDownloadWorksheet() {
  return useMutation({ mutationFn: downloadWorksheet });
}
