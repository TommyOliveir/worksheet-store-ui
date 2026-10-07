import Navbar from '@/shared/components/layout/Navbar';
import CartDrawer from '@/features/cart/components/CartDrawer';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CartDrawer />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Educational Worksheets. All rights reserved.
      </footer>
    </div>
  );
}
