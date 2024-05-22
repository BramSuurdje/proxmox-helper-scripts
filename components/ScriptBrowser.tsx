'use client'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Category } from "@/lib/types";
import { Badge } from "./ui/badge";
import clsx from "clsx";

const ScriptBrowser = ({
  items,
  selectedScript,
  setSelectedScript,
}: {
  items: Category[];
  selectedScript: string | null;
  setSelectedScript: (script: string | null) => void;
}) => {
  const [links, setLinks] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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
      if (event.key === "Escape") {
        handleSearch("");
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
      <div className="relative">
        <div className="flex items-center mb-1">
          <Input
            className="flex-grow"
            type="text"
            placeholder="Type '/' to search"
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputRef}
            value={searchTerm}
          />
          {searchTerm && (
            <X
              className="w-4 h-4 cursor-pointer ml-2"
              onClick={() => handleSearch("")}
              style={{
                position: 'absolute',
                right: '0.5rem'
              }}
            />
          )}
        </div>
        {searchTerm ? (
          <p className="text-xs text-neutral-500 mb-1 ml-2 animate-fade-left">Press &apos;Esc&apos; to clear the search</p>
        ) : (
          <p className="text-xs text-neutral-500 mb-1">&nbsp;</p>
        )}
      </div>
      <Accordion {...accordionProps}>
        {filteredLinks.map((category) => (
          <AccordionItem
            key={category.collectionId}
            value={category.catagoryName}
            className="sm:text-md flex flex-col"
          >
            <AccordionTrigger>{category.catagoryName}</AccordionTrigger>
            <AccordionContent
              data-state={expandedItems.includes(category.catagoryName) ? "open" : "closed"}
              className="pb-2 pt-0"
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
                      {script.logo && (
                        <Image
                          src={script.logo}
                          priority
                          alt={script.title}
                          width={16}
                          height={16}
                          className="rounded-full mr-1"
                        />
                      )}
                      <span className="flex items-center gap-2">
                        {script.title}
                      </span>
                      <Badge
                        className={clsx(
                          "ml-auto w-[37.69px] justify-center text-center",
                          {
                            "border-primary/75 text-primary/75":
                              script.item_type === "VM",
                            "border-yellow-500/75 text-yellow-500/75":
                              script.item_type === "LXC",
                            "border-none":
                              script.item_type === "",
                            hidden: !["VM", "LXC", ""].includes(script.item_type),
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
