import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold tracking-tight">Admin Portal</h2>
        <nav className="flex flex-col gap-2 mt-4">
          <Link href="/admin/dashboard" className="px-3 py-2 rounded hover:bg-slate-800">
            Dashboard
          </Link>
          <Link href="/admin/worksheets" className="px-3 py-2 rounded hover:bg-slate-800">
            Worksheets
          </Link>
          <Link href="/admin/worksheets/new" className="px-3 py-2 rounded hover:bg-slate-800">
            + New Upload
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-slate-50 p-8">{children}</main>
    </div>
  );
}
