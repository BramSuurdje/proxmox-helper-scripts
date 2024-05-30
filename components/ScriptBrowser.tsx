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
import { X, EyeOff, Eye } from "lucide-react";
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
  const [showLogos, setShowLogos] = useState<boolean>(() => {
    const saved = localStorage.getItem('showLogos');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('showLogos', JSON.stringify(showLogos));
  }, [showLogos]);

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
        <div className="mb-1 flex items-center">
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
              className="ml-2 h-4 w-4 cursor-pointer"
              onClick={() => handleSearch("")}
              style={{
                position: "absolute",
                right: "0.5rem",
              }}
            />
          )}
        </div>
        {searchTerm ? (
          <p className="mb-1 ml-2 text-xs text-muted-foreground">
            Press &apos;Esc&apos; to clear the search
          </p>
        ) : (
          <p className="mb-1 ml-2 text-xs text-muted-foreground">
            <a
              className="cursor-pointer"
              onClick={() => setShowLogos(!showLogos)}
            >
              {showLogos ? (
                <>
                  <EyeOff className="mr-1 inline-block h-4 w-4 align-text-bottom" />
                  Hide Logos
                </>
              ) : (
                <>
                  <Eye className="mr-1 inline-block h-4 w-4 align-text-bottom" />
                  Show Logos
                </>
              )}
            </a>
          </p>
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
              data-state={
                expandedItems.includes(category.catagoryName)
                  ? "open"
                  : "closed"
              }
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
                      className={`hover:dark:bg-blue-900/20 flex cursor-pointer items-center justify-between gap-1 px-1 py-1 text-muted-foreground hover:rounded-lg hover:bg-blue-300/20 hover:bg-neutral-50 ${
                        selectedScript === script.title
                          ? "bg-blue-300/20 rounded-lg font-semibold dark:bg-blue-900/20 dark:text-white"
                          : ""
                      }`}
                      onClick={() => handleSelected(script.title)}
                    >
                      {showLogos && script.logo && (
                        <Image
                          src={script.logo}
                          priority
                          alt={script.title}
                          width={16}
                          height={16}
                          className="mr-1 rounded-full"
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
                            "border-none": script.item_type === "",
                            hidden: !["VM", "LXC", ""].includes(
                              script.item_type,
                            ),
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
