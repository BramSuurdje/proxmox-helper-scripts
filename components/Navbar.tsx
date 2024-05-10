"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
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
import { FaDiscord } from "react-icons/fa";
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

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [links, setLinks] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
          inputRef.current?.focus();
          event.preventDefault();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

  const fetchLinks = async () => {
    try {
      const res = await pb.collection("categories").getFullList({
        expand: "items",
        requestKey : "navbar"
      });
      setLinks(res as unknown as Category[]);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredLinks = useMemo(() => {
    return links.filter((category) =>
      category.expand.items.some((script) =>
        script.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [links, searchTerm]);

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-50 flex w-screen justify-center px-7 xl:px-0 ${isScrolled ? "border-b backdrop-blur-lg" : ""}`}
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
                <Menu className="h-8 w-8" />
              </SheetTrigger>
              <SheetContent side={"left"} className="max-w-screen w-full">
                <SheetHeader>
                  <SheetTitle>Proxmox Helper Scripts</SheetTitle>
                  <SheetDescription>
                    <div className="flex min-w-72 flex-col sm:max-w-72">
                      <h1 className="mb-5 text-xl font-bold">Scripts</h1>
                      <Input
                        className="mb-5"
                        type="text"
                        placeholder="Type '/' to search"
                        onChange={(e) => handleSearch(e.target.value)}
                        ref={inputRef}
                      />
                      <Accordion
                        type={searchTerm ? "multiple" : "single"}
                        collapsible
                      >
                        {filteredLinks.map((category) => (
                          <AccordionItem
                            key={category.collectionId}
                            value={category.catagoryName}
                            className={`sm:text-md flex flex-col gap-2`}
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
                                  
                                  <p key={index} className="py-1">
                                    <SheetClose>
                                    <Link
                                      href={{
                                        pathname: "/scripts",
                                        query: { id: script.id },
                                      }}
                                      className="text-muted-foreground"
                                    >
                                      {script.title} {script.item_type}
                                    </Link>
                                    </SheetClose>
                                  </p>
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
