"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "../public/logo.png";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "./theme-toggle";
import { Coffee } from "lucide-react";
import { useState, useEffect } from "react";
import { FaDiscord } from "react-icons/fa";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-50 flex w-full justify-center ${isScrolled ? "border-b backdrop-blur-lg" : ""}`}
      >
        <div className="flex h-20 w-full max-w-7xl items-center justify-between">
          <h1 className="font-semibold ">
            <Link href="/" className=" flex items-center gap-2">
              <Image height={18} width={18} alt="logo" src={logo} />
              Proxmox VE Helper-Scripts
            </Link>
          </h1>
          <div className="flex gap-2">
            {/* <Button variant="ghost" asChild>
              <Link target="_blank" href="https://discord.gg/2zZ5Y2b">
                <FaDiscord className="mr-2 h-4 w-4" />
                Join Discord
              </Link>
            </Button> */}
            <Button variant="ghost" asChild>
              <Link
                target="_blank"
                href="https://ko-fi.com/proxmoxhelperscripts"
              >
                <Coffee className="mr-2 h-4 w-4" />
                Buy me a coffee
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link target="_blank" href="https://github.com/tteck/Proxmox">
                <FaGithub className="mr-2 h-4 w-4" />
                View on Github
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
