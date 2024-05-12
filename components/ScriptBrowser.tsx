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
import { pb } from "@/lib/pocketbase";

const ScriptBrowser = () => {
  const [links, setLinks] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
      // you can also fetch all records at once via getFullList
      const res = await pb.collection("categories").getFullList({
        expand: "items",
        sort: "order",
        requestKey: "desktop",
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
    <div className="min-w-72 sm:max-w-72 flex-col flex">
      <h1 className="mb-5 text-xl font-bold">Scripts</h1>
      <Input
        className="mb-5"
        type="text"
        placeholder="Type '/' to search"
        onChange={(e) => handleSearch(e.target.value)}
        ref={inputRef}
      />
      <Accordion type={searchTerm ? "multiple" : "single"} collapsible>
        {filteredLinks.map((category) => (
          <AccordionItem
            key={category.collectionId}
            value={category.catagoryName}
            className={`sm:text-md flex flex-col gap-2`}
          >
            <AccordionTrigger>{category.catagoryName}</AccordionTrigger>
            <AccordionContent>
              {category.expand.items.filter((script) =>
                script.title.toLowerCase().includes(searchTerm.toLowerCase()),
              ).map((script, index) => (
                <p key={index} className="py-1">
                  <Link
                    href={{
                      pathname: "/scripts",
                      query: { id: script.id },
                    }}
                    className="text-muted-foreground"
                  >
                    {script.title}{" "}{script.item_type}
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
