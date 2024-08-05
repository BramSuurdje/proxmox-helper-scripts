import { Inter } from "next/font/google";
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Proxmox VE Helper-Scripts",
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
  authors: { name: "Bram Suurd" },
  creator: "Bram Suurd",
  publisher: "Bram Suurd",
  description:
    "A Re-designed Front-end for the Proxmox VE Helper-Scripts Repository. Featuring all the scripts you need to streamline your homelab. With a modern and clean design.",
  favicon: "/app/favicon.ico",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://proxmox-helper-scripts.vercel.app/"),
  openGraph: {
    title: "Proxmox VE Helper-Scripts",
    description:
      "A Re-designed Front-end for the Proxmox VE Helper-Scripts Repository. Featuring all the scripts you need to streamline your homelab. With a modern and clean design.",
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
        <script
          defer
          src="/analytics/script.js"
          data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_TOKEN}
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex w-full flex-col justify-center">
            <Navbar />
            <div className="flex flex-col justify-center min-h-screen">
              <div className="flex w-full justify-center">
                <div className="w-full max-w-7xl ">
                  {children}
                  <Toaster richColors />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
