"use client";

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";

interface GenerateDownloadUrlParams {
  sessionId: string;
  worksheetId: string;
}

interface DownloadUrlResponse {
  downloadUrl: string;
}

async function generateDownloadUrl({
  sessionId,
  worksheetId,
}: GenerateDownloadUrlParams): Promise<DownloadUrlResponse> {
  const res = await apiClient.get<DownloadUrlResponse>(
    `/orders/session/${sessionId}/download/${worksheetId}`,
  );
  return res.data;
}

export function useGenerateDownloadUrl() {
  return useMutation({ mutationFn: generateDownloadUrl });
}
