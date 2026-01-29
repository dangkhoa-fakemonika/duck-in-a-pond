import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "duck in a pond 🦆",
  description: "A rubber duck in a pond",
  icons: {
    icon : "/img_1.png",
  },
  openGraph: {
    title: "duck in a pond 🦆",
    description: "A rubber duck in a pond",
    url: "https://duck-in-a-pond.vercel.app",
    siteName: "Duck Pond",
    images: [
      {
        url: "https://duck-in-a-pond.vercel.app/og-image.png", // <--- CRITICAL
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
