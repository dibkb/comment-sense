import type { Metadata } from "next";

import "./globals.css";
import { body } from "@/fonts";
import Navbar from "@/components/Navigation/Navbar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Comments Sense",
  description:
    "Measure and Analyze YouTube Comment Sentiment Like Never Before",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      ></meta>
      <body className={body.className}>
        <Navbar />
        <main className="mt-12">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
