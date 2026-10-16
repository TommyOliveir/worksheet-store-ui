import Image from "next/image";
import WorksheetGrid from "@/features/worksheets/components/WorksheetGrid";
import { fetchWorksheets } from "@/features/worksheets/queries/worksheetQueries";

export default async function WorksheetsPage() {
  const worksheets = await fetchWorksheets();

  return (
    <div className="min-h-screen w-full py-12 px-6 sm:px-12 md:px-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="Page background"
          fill
          priority
          className="object-cover object-center scale-105"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8">
          Worksheet Catalog
        </h1>

        <WorksheetGrid worksheets={worksheets} />
      </div>
    </div>
  );
}
