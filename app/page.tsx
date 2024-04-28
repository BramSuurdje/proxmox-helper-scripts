import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
        
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex w-full  flex-col gap-2 text-left">
          <h1 className="w-full text-4xl font-extrabold">
            Proxmox helper scripts
          </h1>
          <p>Scripts for Streamlining Your Homelab with Proxmox VE</p>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/scripts">Get Started</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
