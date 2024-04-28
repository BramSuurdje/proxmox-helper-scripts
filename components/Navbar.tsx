"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "../public/logo.png";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "./theme-toggle";
import { Coffee } from "lucide-react";

function Navbar() {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex h-20 w-full max-w-7xl items-center justify-between">
          <h1 className="font-semibold ">
            <Link href="/" className=" flex items-center gap-2">
              <Image height={18} width={18} alt="logo" src={logo} />
              Proxmox VE Helper-Scripts
            </Link>
          </h1>
          <div className="flex gap-2">
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
