'use client'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Category } from "@/lib/types";
import { Badge } from "./ui/badge";
import clsx from "clsx";

const ScriptBrowser = ({ items }: { items: Category[] }) => {
  const [links, setLinks] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);

  useEffect(() => {
    if (items) {
      setLinks(items);
    }
  }, [items]);

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

  useEffect(() => {
    if (searchTerm) {
      const expanded = filteredLinks.map((category) => category.catagoryName);
      setExpandedItems(expanded);
    } else {
      setExpandedItems([]);
    }
  }, [searchTerm, filteredLinks]);

  const handleAccordionChange = (value: string[]) => {
    setExpandedItems(value);
  };

  const accordionProps = useMemo(() => {
    return searchTerm
      ? {
          type: "multiple" as const,
          value: expandedItems,
          onValueChange: handleAccordionChange,
        }
      : {
          type: "single" as const,
          collapsible: true,
          value: expandedItems[0],
          onValueChange: (value: string) => handleAccordionChange([value]),
        };
  }, [searchTerm, expandedItems]);

  const handleSelected = (title: string) => {
    setSelectedScript(title);
  };

  return (
    <div className="flex min-w-72 flex-col sm:max-w-72">
      <h1 className="mb-5 text-xl font-bold">Scripts</h1>
      <Input
        className="mb-5"
        type="text"
        placeholder="Type '/' to search"
        onChange={(e) => handleSearch(e.target.value)}
        ref={inputRef}
      />
      <Accordion {...accordionProps}>
        {filteredLinks.map((category) => (
          <AccordionItem
            key={category.collectionId}
            value={category.catagoryName}
            className="sm:text-md flex flex-col gap-2"
          >
            <AccordionTrigger>{category.catagoryName}</AccordionTrigger>
            <AccordionContent
              data-state={expandedItems.includes(category.catagoryName) ? "open" : "closed"}
            >
              {category.expand.items
                .filter((script) =>
                  script.title.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((script, index) => (
                  <p key={index}>
                    <Link
                      href={{
                        pathname: "/scripts",
                        query: { id: script.title },
                      }}
                      className={`py-1 px-1 hover:rounded-lg hover:bg-neutral-50 hover:dark:bg-neutral-800 hover:dark:bg-neutral-700 flex cursor-pointer items-center justify-between gap-1 text-muted-foreground ${
                        selectedScript === script.title
                          ? "rounded-lg font-semibold dark:text-white bg-neutral-100 dark:bg-neutral-900"
                          : ""
                      }`}
                      onClick={() => handleSelected(script.title)}
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
                            hidden: !["VM", "LXC"].includes(script.item_type),
                          },
                        )}
                      >
                        {script.item_type}
                      </Badge>
                    </Link>
                  </p>
                ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ScriptBrowser;
