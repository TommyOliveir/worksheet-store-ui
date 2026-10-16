import Image from "next/image";
import AddToCartButton from "@/features/cart/components/AddToCartButton";
import type { Worksheet } from "@/shared/types/worksheet";

export default function WorksheetDetail({
  worksheet,
}: {
  worksheet: Worksheet;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="border rounded-lg p-4 bg-gray-50 flex flex-col items-center">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Preview</h2>
        <div className="relative w-full h-[500px]">
          <Image
            src={worksheet.previewImageUrl}
            alt={`${worksheet.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
            className="object-contain rounded"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            {worksheet.gradeLevel} • {worksheet.subject}
          </span>
          <h1 className="text-3xl font-bold mt-2 text-gray-900">
            {worksheet.title}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            by {worksheet.author.fullName}
          </p>
          <p className="text-2xl font-semibold text-gray-800 mt-4">
            ${worksheet.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mt-4 leading-relaxed">
            {worksheet.description}
          </p>
        </div>

        <div className="mt-8">
          <AddToCartButton worksheet={worksheet} />
        </div>
      </div>
    </div>
  );
}
