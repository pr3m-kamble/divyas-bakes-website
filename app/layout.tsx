import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Divya’s Bakes",
  description: "Freshly baked cakes made with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}