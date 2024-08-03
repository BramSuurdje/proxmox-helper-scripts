"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "../public/logo.png";
import Image from "next/image";
import { ModeToggle } from "./theme-toggle";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Category } from "@/lib/types";
import { Badge } from "./ui/badge";
import { pb } from "@/lib/pocketbase";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { navBarLinks } from "@/config/siteConfig";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [links, setLinks] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        setShouldFocusInput(true);
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (shouldFocusInput) {
      inputRef.current?.focus();
      setShouldFocusInput(false);
    }
  }, [shouldFocusInput]);

  const fetchLinks = async () => {
    const res = await fetch("/api/categories", {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const links = await res.json();
    setLinks(links);
  };

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
            className="cursor-pointer font-semibold"
            onClick={removeCookieAndRedirect}
          >
            <a
              href="/"
              className=" flex flex-row-reverse items-center gap-2 sm:flex-row"
            >
              <Image height={18} width={18} alt="logo" src={logo} />
              <span>Proxmox VE Helper-Scripts</span>
            </a>
          </h2>
          <div className="flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger onClick={fetchLinks}>
                <Menu className="h-8 w-8" />
              </SheetTrigger>
              <SheetContent
                side={"left"}
                className="max-w-screen max-h-screen w-full overflow-y-scroll"
              >
                <SheetHeader>
                  <SheetTitle>Proxmox VE Helper-Scripts</SheetTitle>
                  <SheetDescription className=" overflow-scroll">
                    <div className="flex min-w-72 flex-col overflow-scroll sm:max-w-72">
                      <p className="mb-5 text-xl font-bold">Scripts</p>
                      <Accordion
                        type={searchTerm ? "multiple" : "single"}
                        collapsible
                        className="overflow-scroll"
                      >
                        {links.map((category) => (
                          <AccordionItem
                            key={category.collectionId}
                            value={category.catagoryName}
                            className={`sm:text-md flex flex-col gap-2 text-left text-foreground`}
                          >
                            <AccordionTrigger>
                              {category.catagoryName}
                            </AccordionTrigger>
                            <AccordionContent>
                              {category.expand.items
                                .filter((script) =>
                                  script.title
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()),
                                )
                                .map((script, index) => (
                                  <div key={index} className="py-1">
                                    <SheetClose asChild>
                                      <Link
                                        href={{
                                          pathname: "/scripts",
                                          query: { id: script.title },
                                        }}
                                        className="flex justify-between text-muted-foreground"
                                      >
                                        {script.title}{" "}
                                        <Badge
                                          className={clsx(
                                            "w-[37.69px] justify-center text-center",
                                            {
                                              "border-primary/75 text-primary/75":
                                                script.item_type === "VM",
                                              "border-yellow-500/75 text-yellow-500/75":
                                                script.item_type === "LXC",
                                              hidden: !["VM", "LXC"].includes(
                                                script.item_type,
                                              ),
                                            },
                                          )}
                                        >
                                          {script.item_type}
                                        </Badge>
                                      </Link>
                                    </SheetClose>
                                  </div>
                                ))}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden gap-1 sm:flex">
            {navBarLinks.map(({ href, event, icon, text }) => (
              <Button key={event} variant="ghost" asChild>
                <Link target="_blank" href={href} data-umami-event={event}>
                  {icon} {text}
                </Link>
              </Button>
            ))}
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
