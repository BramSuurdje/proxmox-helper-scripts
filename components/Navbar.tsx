"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "../public/logo.png";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "./theme-toggle";
import { LuGitPullRequestDraft } from "react-icons/lu";
import { LuBookOpenCheck } from "react-icons/lu";
import { LuClipboardSignature } from "react-icons/lu";
import { Coffee, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { FaDiscord } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ScriptBrowser from "./ScriptBrowser";

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
        className={`fixed left-0 top-0 z-50 flex w-full justify-center px-7 xl:px-0 ${isScrolled ? "border-b backdrop-blur-lg" : ""}`}
      >
        <div className="flex h-20 w-full max-w-7xl flex-row-reverse items-center justify-between sm:flex-row">
          <h2 className="font-semibold ">
            <Link
              href="/"
              className=" flex flex-row-reverse items-center gap-2 sm:flex-row"
            >
              <Image height={18} width={18} alt="logo" src={logo} />
              <span className="">Proxmox VE Helper-Scripts</span>
            </Link>
          </h2>
          <div className="flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu className="w-8 h-8" />
              </SheetTrigger>
              <SheetContent side={"left"} className="w-full">
                <SheetHeader>
                  <SheetTitle>Proxmox Helper Scripts</SheetTitle>
                  <SheetDescription>
                    <ScriptBrowser />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden gap-2 sm:flex">
            {/* <Button variant="ghost" asChild>
              <Link target="_blank" href="https://discord.gg/2zZ5Y2b">
                <FaDiscord className="mr-2 h-4 w-4" />
                Join Discord
              </Link>
            </Button> */}
            <Button variant="ghost" asChild>
              <Link
                target="_blank"
                href="https://github.com/tteck/Proxmox/blob/main/.github/CONTRIBUTING.md"
              >
                <LuGitPullRequestDraft className="mr-2 h-4 w-4" />
                Contribute
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                target="_blank"
                href="https://github.com/tteck/Proxmox/blob/main/USER_SUBMITTED_GUIDES.md"
              >
                <LuBookOpenCheck className="mr-2 h-4 w-4" />
                Guides
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                target="_blank"
                href="https://github.com/tteck/Proxmox/blob/main/CHANGELOG.md"
              >
                <LuClipboardSignature className="mr-2 h-4 w-4" />
                Changelog
              </Link>
            </Button>
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
