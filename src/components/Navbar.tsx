"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "/public/logo.png";
import Image from "next/image";
import { ModeToggle } from "./theme-toggle";

import { useRouter } from "next/navigation";
import { navBarLinks } from "@/config/siteConfig";

import MobileNav from "./MobileNav";
import StarOnGithubButton from "./ui/star-on-github-button";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const removeCookieAndRedirect = () => {
    removeCookie();
    router.push("/");
  };

  function removeCookie() {
    document.cookie =
      "visited=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-50 flex w-screen justify-center px-7 xl:px-0 ${
          isScrolled ? "glass border-b bg-background/50" : ""
        }`}
      >
        <div className="flex h-20 w-full max-w-7xl flex-row-reverse items-center justify-between sm:flex-row">
          <h2
            className="flex cursor-pointer flex-row-reverse items-center gap-2 font-semibold sm:flex-row"
            onClick={removeCookieAndRedirect}
          >
            <Image height={18} width={18} alt="logo" src={logo} />
            <span className="hidden lg:block">Proxmox VE Helper-Scripts</span>
          </h2>
          <MobileNav />
          <div className="hidden gap-1 sm:flex">
            {navBarLinks.map(({ href, event, icon, text }) => (
              <Button key={event} variant="ghost" asChild>
                <Link target="_blank" href={href} data-umami-event={event}>
                  {icon} {text}
                </Link>
              </Button>
            ))}
            <StarOnGithubButton />
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
