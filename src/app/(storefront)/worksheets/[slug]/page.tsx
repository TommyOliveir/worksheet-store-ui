import { apiClient } from "@/shared/lib/api-client";
import AddToCartButton from "@/features/cart/components/AddToCartButton";
import Image from "next/image";

interface PageProps {
  params: { slug: string };
}

async function getWorksheet(slug: string) {
  try {
    const res = await apiClient.get(`/worksheets/${slug}`);
    return res.data;
  } catch (err) {
    return null;
  }
}

export default async function WorksheetDetailPage({ params }: PageProps) {
  const worksheet = await getWorksheet(params.slug);

  if (!worksheet) {
    return <div className="container mx-auto p-8">Worksheet not found.</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="border rounded-lg p-4 bg-gray-50 flex flex-col items-center">
        <h2 className="text-sm font-medium text-gray-500 mb-2">
          Watermarked Preview
        </h2>
        <div className="relative w-full h-[500px]">
          <Image
            src={worksheet.previewImageUrl}
            alt={`${worksheet.title} sample`}
            fill
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
    </main>
  );
}
