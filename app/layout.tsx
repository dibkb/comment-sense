import type { Metadata } from "next";

import "./globals.css";
import { body } from "@/fonts";
import Navbar from "@/components/Navigation/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={body.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
