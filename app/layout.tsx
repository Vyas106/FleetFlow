import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "FleetFlow | Modern Fleet Management",
  description: "Modular Fleet & Logistics Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary`}>
        <main className="flex-1 flex flex-col">{children}</main>
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}

