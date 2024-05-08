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

const ScriptBrowser = () => {
  const [links, setLinks] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [categoryList, setCategoryList] = useState<string[]>([]);

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/collections/proxmox_items/records`,
      );
      const data = await res.json();
      setLinks(data.items as Category[]);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  // get a list of all the category ids
  useEffect(() => {
    setCategoryList(links.map((category) => category.id));
  }, [links]);

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredLinks = useMemo(() => {
    return links.filter((category) =>
      category.Items.some((script) =>
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
            key={category.id}
            value={category.Catagory_Title}
            className={`sm:text-md flex flex-col gap-2`}
          >
            <AccordionTrigger>{category.Catagory_Title}</AccordionTrigger>
            <AccordionContent>
              {category.Items.filter((script) =>
                script.title.toLowerCase().includes(searchTerm.toLowerCase()),
              ).map((script, index) => (
                <p key={index} className="py-1">
                  <Link
                    href={{
                      pathname: "/scripts",
                      query: { id: script.scriptID },
                    }}
                    className="text-muted-foreground"
                  >
                    {script.title}
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
