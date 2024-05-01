import Image from "next/image";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex  h-[50rem] w-full flex-col items-center justify-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="animate-fade-up flex flex-col items-center justify-center">
        <Image src="/logo.png" alt="proxmox" width={150} height={150} />
        <h1 className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-4 text-4xl font-bold text-transparent sm:text-5xl">
          Proxmox VE Helper-Scripts
        </h1>
        <p className="bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-xl">
          {" "}
          Proxmox VE Scripts for{" "}
          <Typewriter
            words={["Streamlining", "Automating", "Simplifying", "Optimizing"]}
            loop={false}
            cursor={true}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1250}
          />
          Your Homelab
        </p>
        <div className="flex gap-2 py-4">
          <Button asChild>
            <Link href="/scripts">Get Started</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
