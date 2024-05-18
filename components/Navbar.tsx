"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "../public/logo.png";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "./theme-toggle";
import {
  LuGitPullRequestDraft,
  LuBookOpenCheck,
  LuClipboardSignature,
} from "react-icons/lu";
import { Coffee, Menu } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Category } from "@/lib/types";
import { pb } from "@/lib/pocketbase";
import { Badge } from "./ui/badge";
import clsx from "clsx";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [links, setLinks] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);

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
    try {
      const res = await pb.collection("categories").getFullList({
        expand: "items",
        requestKey: "navbar",
      });
      setLinks(res as unknown as Category[]);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-50 flex w-screen justify-center px-7 xl:px-0 ${
          isScrolled ? "border-b backdrop-blur-lg" : ""
        }`}
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
              <SheetTrigger onClick={() => setShouldFocusInput(false)}>
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
          <div className="hidden gap-2 sm:flex">
            {[
              {
                href: "https://github.com/tteck/Proxmox/blob/main/.github/CONTRIBUTING.md",
                event: "Contributing",
                icon: <LuGitPullRequestDraft className="mr-2 h-4 w-4" />,
                text: "Contribute",
              },
              {
                href: "https://github.com/tteck/Proxmox/blob/main/USER_SUBMITTED_GUIDES.md",
                event: "Guides",
                icon: <LuBookOpenCheck className="mr-2 h-4 w-4" />,
                text: "Guides",
              },
              {
                href: "https://github.com/tteck/Proxmox/blob/main/CHANGELOG.md",
                event: "Change Log",
                icon: <LuClipboardSignature className="mr-2 h-4 w-4" />,
                text: "Changelog",
              },
              {
                href: "https://ko-fi.com/proxmoxhelperscripts",
                event: "ko-fi",
                icon: <Coffee className="mr-2 h-4 w-4" />,
                text: "Buy me a coffee",
              },
              {
                href: "https://github.com/tteck/Proxmox",
                event: "View on GitHub",
                icon: <FaGithub className="mr-2 h-4 w-4" />,
                text: "View on Github",
              },
            ].map(({ href, event, icon, text }) => (
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
