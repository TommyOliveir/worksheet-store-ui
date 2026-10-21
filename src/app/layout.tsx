import QueryProvider from "@/shared/providers/QueryProvider";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { SessionSync } from "@/features/auth/components/SessionSync";
import "./global.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Teacher Worksheet Store",
  description: "High-quality printable educational worksheets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        <QueryProvider>
          <AuthProvider>
            <SessionSync />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
