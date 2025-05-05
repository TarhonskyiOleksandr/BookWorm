import type { Metadata } from "next";
import { DM_Sans, Quantico } from "next/font/google";

import "./globals.css";
import Header from "@/layout/Header";
import { Toaster } from "@/shared/ui";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

const quantico = Quantico({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-quantico',
});

export const metadata: Metadata = {
  title: "Book Worm",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${quantico.variable}`}>
        <Header />
        {children}
        <Toaster
          position="top-right"
          theme="light"
          richColors
        />
      </body>
    </html>
  );
}
