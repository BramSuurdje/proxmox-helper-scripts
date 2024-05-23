import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import React from "react";

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
  description:
    "Scripts for Streamlining Your Homelab with Proxmox VE",
  favicon: "/app/favicon.ico",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://helper-scripts.com/"),
  openGraph: {
    title: "Proxmox VE Helper-Scripts",
    description: "Scripts for Streamlining Your Homelab with Proxmox VE",
    url: "/defaultimg.png",
    images: [
      {
        url: "https://helper-scripts.com/defaultimg.png",
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
        <script
          defer
          src="https://analytics.bramsuurd.nl/script.js"
          data-website-id="7e29b1b6-8b7f-4e97-a5a5-9f335d67b683"
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex w-full flex-col justify-center">
            <Navbar />
            <div className="flex w-full justify-center">
              <div className="w-full max-w-7xl ">
                {children}
                <Toaster richColors />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}