import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  generator: "Next.js",
  applicationName: "Proxmox VE Helper-Scripts",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Proxmox VE",
    "Helper-Scripts",
    "ttech",
    "helper",
    "scripts",
    "proxmox",
    "VE",
  ],
  authors: [{ name: "ttech" }, { name: "Bram" }],
  creator: "ttech, Bram Suurd",
  publisher: "ttech, Bram Suurd",
  favicon: "/app/favicon.ico",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://proxmox-helper-scripts.vercel.app/"),
  openGraph: {
    title: "Proxmox VE Helper-Scripts",
    description: "Scripts for Streamlining Your Homelab with Proxmox VE",
    url: "/defaultimg.png",
    images: [
      {
        url: "https://proxmox-helper-scripts.vercel.app/defaultimg.png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Analytics />
        <SpeedInsights />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen w-full justify-center">
            <Navbar />
            <div className="flex w-full justify-center">
              <div className="max-w-7xl w-full">
                {children}
                <Toaster />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
