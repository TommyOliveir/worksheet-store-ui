import type { Worksheet } from "@/shared/types/worksheet";
import WorksheetCard from "./WorksheetCard";

export default function WorksheetGrid({
  worksheets,
  emptyMessage = "No worksheets found.",
}: {
  worksheets: Worksheet[];
  emptyMessage?: string;
}) {
  if (worksheets.length === 0) {
    return <p className="text-slate-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {worksheets.map((worksheet) => (
        <WorksheetCard key={worksheet.id} worksheet={worksheet} />
      ))}
    </div>
  );
}
