"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "/public/logo.png";
import Image from "next/image";
import { ModeToggle } from "./theme-toggle";

import { navbarLinks } from "@/config/siteConfig";

import MobileNav from "./MobileNav";
import StarOnGithubButton from "./ui/star-on-github-button";
import CommandMenu from "./CommandMenu";
import { FaGithub } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { MessagesSquare, MoonIcon, Scroll, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";


export const dynamic = "force-dynamic";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();


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
        className={`fixed left-0 top-0 z-50 flex w-screen justify-center px-4 xl:px-0 ${
          isScrolled ? "glass border-b bg-background/50" : ""
        }`}
      >
        <div className="flex h-20 w-full max-w-7xl flex-row-reverse items-center justify-between sm:flex-row">
          <Link
            href={"/"}
            className="flex cursor-pointer flex-row-reverse items-center gap-2 font-semibold sm:flex-row"
          >
            <Image height={18} width={18} alt="logo" src={logo} />
            <span className="hidden lg:block">Proxmox VE Helper-Scripts</span>
          </Link>
          {/* <MobileNav /> */}
          <div className="flex gap-2">
            <CommandMenu />
            <StarOnGithubButton />
            {navbarLinks.map(({ href, event, icon, text }) => (
              <TooltipProvider key={event}>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <Button variant="ghost" size={"icon"} asChild>
                      <Link
                        target="_blank"
                        href={href}
                        data-umami-event={event}
                      >
                        {icon}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    {text}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    type="button"
                    size="icon"
                    className={cn("px-2")}
                    aria-label="Toggle theme"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <SunIcon className="size-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
                    <MoonIcon className="hidden size-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Theme Toggle
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
