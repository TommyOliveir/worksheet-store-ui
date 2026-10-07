import Link from 'next/link';
import Image from 'next/image';
import { Worksheet } from '@/shared/types/worksheet';

export default function WorksheetCard({ worksheet }: { worksheet: Worksheet }) {
  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
      <div className="relative w-full h-48 bg-slate-100">
        <Image
          src={worksheet.previewImageUrl || '/placeholder-preview.png'}
          alt={worksheet.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase">
            {worksheet.gradeLevel}
          </span>
          <h3 className="font-bold text-lg mt-1 text-slate-900">{worksheet.title}</h3>
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-2">
          <span className="font-semibold text-slate-800">${worksheet.price.toFixed(2)}</span>
          <Link
            href={`/worksheets/${worksheet.slug}`}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}