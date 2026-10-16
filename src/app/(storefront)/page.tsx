import Link from "next/link";
import { MOCK_WORKSHEETS } from "./worksheets/page";
import WorksheetCard from "@/features/worksheets/components/WorksheetCard";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Full-Screen, Edge-to-Edge Hero Section (No padding/margins, no blur) */}
      <section className="min-h-screen w-full flex items-center justify-start p-0 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-bg.jpg"
            alt="Hero background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Hero Content Container (Aligned Left with padding inside the content box) */}
        {/* <div className="max-w-2xl text-left pl-8 sm:pl-16 md:pl-24 pr-6 py-12"> */}
        <div className="max-w-2xl text-left pl-8 sm:pl-16 md:pl-24 pr-6 pb-50 pt-12">
          <p className="mt-4 text-lg sm:text-xl text-slate-700 font-normal leading-relaxed mb-8">
            For curious little minds
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900 leading-[1.15]">
            Little worksheets. Big{" "}
            <span className="relative inline-block text-rose-600">
              discovery.
              {/* Paint Brush Underline SVG */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-rose-500/80 pointer-events-none"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2.5 8.5C40 3.5 120 2 197.5 7.5C140 10.5 70 11.5 22.5 10"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-slate-700 font-normal leading-relaxed">
            Playful printables that turn everyday learning into little moments
            of joy.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/worksheets"
              className="px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
            >
              Browse Worksheets
            </Link>

            <Link
              href="#featured"
              className="px-6 py-3.5 bg-white text-slate-800 font-semibold rounded-xl border border-slate-300 hover:bg-slate-50 transition shadow-sm"
            >
              Explore Bundles
            </Link>
          </div>

          <p className="mt-10 text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-600">
            Download. Print. Let the fun begin.
          </p>
        </div>
      </section>

      {/* Cards Section Below */}
      <section id="featured" className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Featured Worksheets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {MOCK_WORKSHEETS.map((worksheet) => (
            <WorksheetCard key={worksheet.id} worksheet={worksheet} />
          ))}
        </div>
      </section>
    </div>
  );
}
