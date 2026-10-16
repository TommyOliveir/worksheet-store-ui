import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorksheetDetail from "@/features/worksheets/components/WorksheetDetail";
import { fetchWorksheetBySlug } from "@/features/worksheets/queries/worksheetQueries";
import { ApiError } from "@/shared/api/client";
import type { Worksheet } from "@/shared/types/worksheet";

// Memoized per request so generateMetadata and the page share one fetch.
// Resolving here also settles the 404 before the response starts streaming,
// which is what lets notFound() set a real 404 status.
const getWorksheet = cache((slug: string): Promise<Worksheet> =>
  fetchWorksheetBySlug(slug).catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const worksheet = await getWorksheet(slug);

  return {
    title: worksheet.title,
    description: worksheet.description,
  };
}

export default async function WorksheetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const worksheet = await getWorksheet(slug);

  return (
    <main className="container mx-auto px-4 py-8">
      <WorksheetDetail worksheet={worksheet} />
    </main>
  );
}
