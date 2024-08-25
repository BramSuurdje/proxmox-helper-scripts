"use client";
import React, { useEffect, useRef, useState } from "react";
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
import clsx from "clsx";
import { Menu } from "lucide-react";
import Link from "next/link"

export default function MobileNav() {
  const [links, setLinks] = useState<Category[]>([]);

  const fetchLinks = async () => {
    const res = await fetch("/api/scripts/categories", {
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const links = await res.json();
    setLinks(links);
  };

  return (
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
                  type={"single"}
                  collapsible
                  className="overflow-scroll"
                >
                  {links.map((category) => (
                    <AccordionItem
                      key={category.categoryId}
                      value={category.catagoryName}
                      className={`sm:text-md flex flex-col gap-2 text-left text-foreground`}
                    >
                      <AccordionTrigger>
                        {category.catagoryName}
                      </AccordionTrigger>
                      <AccordionContent>
                        {category.expand.items.map((script, index) => (
                          <div key={"navbar:" + index} className="py-1">
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
                                      "border-blue-500/75 text-blue-500/75":
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
  );
}
