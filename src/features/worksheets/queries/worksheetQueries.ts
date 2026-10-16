import { get } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { Worksheet } from "@/shared/types/worksheet";

export function fetchWorksheets(): Promise<Worksheet[]> {
  return get<Worksheet[]>(ENDPOINTS.worksheets.list, {
    requiresAuth: false,
    cache: "no-store",
  });
}

export function fetchWorksheetBySlug(slug: string): Promise<Worksheet> {
  return get<Worksheet>(ENDPOINTS.worksheets.bySlug(slug), {
    requiresAuth: false,
    cache: "no-store",
  });
}
