import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css"
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
    <html lang="en">
      <head>
        <script
          defer
          src={process.env.NEXT_PUBLIC_UMAMI_ANALYICS_URL}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ANALYTICS_ID}
        ></script>
      </head>
      <body className={cn(inter.className, "bg-background text-foreground min-h-screen")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
