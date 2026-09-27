import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern House 01 — ផ្ទះទំនើប ០១",
  description: "Modern House 01: single, Queen and King villas and link houses for sale in Phnom Penh.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif&family=Kantumruy+Pro:wght@400;500;600&family=Moul&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
