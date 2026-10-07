export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Store Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Total Revenue</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Total Sales</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Active Worksheets</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
