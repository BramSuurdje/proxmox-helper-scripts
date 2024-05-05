import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/Footer";
import React from "react";
import { title } from "process";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "proxmox VE Helper-Scripts | Scripts for Streamlining Your Homelab with Proxmox VE",
  generator: "Next.js",
  applicationName: "Proxmox VE Helper-Scripts",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Proxmox VE",
    "Helper-Scripts",
    "tteck",
    "helper",
    "scripts",
    "proxmox",
    "VE",
  ],
  authors: [{ name: "tteck" }, { name: "Bram" }],
  creator: "tteck, Bram Suurd",
  publisher: "tteck, Bram Suurd",
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
          <div className="flex min-h-screen w-full flex-col justify-center px-7 xl:px-0">
            <Navbar />
            <div className="flex w-full justify-center">
              <div className="w-full max-w-7xl ">
                {children}
                <Toaster />
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
