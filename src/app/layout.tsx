import QueryProvider from '@/shared/providers/QueryProvider';
import './global.css'; // or '@/app/globals.css'

export const metadata = {
  title: 'Teacher Worksheet Store',
  description: 'High-quality printable educational worksheets.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
