"use client";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  return (
    <div className="flex justify-center">
      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-grid-black/[0.1] dark:bg-grid-white/[0.1]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]"></div>
        <div className="flex animate-fade-up flex-col items-center justify-center">
          <Image src="/logo.png" alt="proxmox" width={150} height={150} />
          <h1 className="relative z-20 bg-gradient-to-b from-[#0080C4] to-[#004c75] bg-clip-text py-4 text-center text-4xl font-bold text-transparent sm:text-left sm:text-5xl">
            Proxmox VE Helper-Scripts
          </h1>
          <p className="bg-gradient-to-b from-neutral-200 to-neutral-500 tracking-tight leading-loose bg-clip-text text-center text-xl sm:text-left">
            Proxmox VE Scripts for{" "}
            <Typewriter
              words={[
                "Streamlining",
                "Automating",
                "Simplifying",
                "Optimizing",
              ]}
              loop={false}
              cursor={true}
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
            Your Homelab
          </p>
          <div className="flex gap-2 py-4">
            <Button asChild variant={"secondary"}>
              <Link href="/scripts">Browse Scripts</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
