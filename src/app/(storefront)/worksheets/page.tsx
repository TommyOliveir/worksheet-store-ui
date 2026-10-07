import WorksheetCard from '@/features/worksheets/components/WorksheetCard';
import { Worksheet } from '@/shared/types/worksheet';

export const MOCK_WORKSHEETS: Worksheet[] = [
  {
    id: '1',
    slug: 'algebra-foundations',
    title: 'Algebra Foundations',
    description: 'Basic linear equations, slope-intercept form, and single-variable inequalities.',
    price: 4.99,
    subject: 'Mathematics',
    gradeLevel: 'Grade 8',
    previewImageUrl: 'https://placehold.co/600x400/2563eb/ffffff?text=Algebra+Foundations',
    createdAt: '2026-03-15T10:00:00.000Z',
    updatedAt: '2026-03-15T10:00:00.000Z',
  },
  {
    id: '2',
    slug: 'cellular-biology-photosynthesis',
    title: 'Cellular Biology & Photosynthesis',
    description: 'Diagrams and study questions covering plant cell structures and energy production.',
    price: 0, // Free worksheet
    subject: 'Science',
    gradeLevel: 'Grade 9',
    previewImageUrl: 'https://placehold.co/600x400/059669/ffffff?text=Cellular+Biology',
    createdAt: '2026-03-20T14:30:00.000Z',
    updatedAt: '2026-03-21T09:15:00.000Z',
  },
  {
    id: '3',
    slug: 'world-war-ii-timeline-analysis',
    title: 'World War II Timeline Analysis',
    description: 'Primary source reading comprehension and critical event mapping.',
    price: 3.50,
    subject: 'History',
    gradeLevel: 'Grade 10',
    previewImageUrl: 'https://placehold.co/600x400/d97706/ffffff?text=WWII+Timeline',
    createdAt: '2026-03-28T08:00:00.000Z',
    updatedAt: '2026-03-28T08:00:00.000Z',
  },
];

export default async function WorksheetsPage() {
  const worksheets = MOCK_WORKSHEETS;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Worksheet Catalog</h1>
      {worksheets.length === 0 ? (
        <p className="text-slate-500">No worksheets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {worksheets.map((worksheet) => (
            <WorksheetCard key={worksheet.id} worksheet={worksheet} />
          ))}
        </div>
      )}
    </div>
  );
}