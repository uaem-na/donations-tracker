import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { ContentContainer } from "./_components/content-container";
import { Header } from "./_components/header";
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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <Header />
            <ContentContainer>{children}</ContentContainer>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
