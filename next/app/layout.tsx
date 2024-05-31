import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Donations Tracker - UAEM McGill",
    default: "Home - Donations Tracker - UAEM McGill",
  },
  applicationName: "Donations Tracker",
  referrer: "origin-when-cross-origin",
  keywords: ["donations", "tracker", "uaem", "mcgill", "montreal", "canada"],
  description: "UAEM McGill's Donations Tracker",
  creator: "UAEM McGill",
  publisher: "UAEM McGill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
