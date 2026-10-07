import Link from "next/link";
import { MOCK_WORKSHEETS } from "./worksheets/page";
import WorksheetCard from "@/features/worksheets/components/WorksheetCard";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Printable Worksheets for Teachers & Educators
      </h1>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl">
        High-quality, ready-to-use educational resources for Kindergarten
        through Grade 12.
      </p>
      <div className="mt-8 flex gap-4">
        {MOCK_WORKSHEETS.map((worksheet) => (
          <div key={worksheet.id} className="flex-1">
            <WorksheetCard worksheet={worksheet} />
          </div>
        ))}
      </div>
      <Link
        href="/worksheets"
        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
      >
        Browse All Worksheets
      </Link>
    </div>
  );
}
