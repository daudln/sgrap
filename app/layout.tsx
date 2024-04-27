import type { Metadata } from "next";
import localFont from "next/font/local";

const font = localFont({
  src: "fonts/PlusJakartaSans/PlusJakartaSans-VariableFont_wght.ttf",
});

import "./globals.css";
import QueryProvider from "@/providers/query.provider";

export const metadata: Metadata = {
  title: "SGRAP - Student Grading, Reporting, and Assessment Platform",
  description:
    "SGRAP is a comprehensive platform designed for managing student grading, reporting, and assessments. It provides teachers and administrators with the tools they need to create, grade, and analyze assessments, while also offering students insight into their performance and progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
