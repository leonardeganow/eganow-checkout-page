"use client";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Toaster richColors position="top-center" />
      <body>{children}</body>
    </html>
  );
}
