'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "next-themes";

function page() {
  const { theme, resolvedTheme } = useTheme();

  const isLight = theme === "light" || resolvedTheme === "light";

  const imageUrl = isLight
    ? "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/png/proxmox.png"
    : "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/png/proxmox-light.png";
    
  return (
    <div className="">
      <div className="flex h-screen items-center justify-center gap-48">
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-4xl font-extrabold">Proxmox helper scripts</h1>
          <div>
            <p>
              {" "}
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
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1250}
              />
              Your Homelab
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/scripts">Get Started</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <div>
          <Image
            width={250}
            height={250}
            src={imageUrl}
            alt="proxmox logo"
            className="animate-fade-left animate-once animate-ease-in-out"
          ></Image>
        </div>
      </div>
      <div className="-z-10 h-screen"></div>
    </div>
  );
}

export default page;
