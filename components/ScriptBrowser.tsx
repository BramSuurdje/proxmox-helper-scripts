'use client'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Category } from "@/lib/types";

function ScriptBrowser() {
    const [selectedItem, setSelectedItem] = useState("");
    const [links, setLinks] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
      const handleKeyDown = (event: any) => {
        if (event.key === "/") {
          if (inputRef.current) {
            inputRef.current.focus();
          }
          event.preventDefault();
        }
      };

      const fetchData = async () => {
        try {
          const data = await getLinks();
          setLinks(data);
        } catch (error) {
          console.error("Error fetching links:", error);
        }
      };
      fetchData();

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    const getLinks = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/collections/proxmox_items/records`,
      );
      const data = await res.json();
      return data.items as Category[];
    };

    const handleSearch = (value: string) => {
      setSearchTerm(value);
      if (value.length > 0) {
        setIsSearch(true);
      } else {
        setIsSearch(false);
      }
    };
  return (
    <>
      {" "}
      <div className="flex min-w-72 max-w-72 flex-col">
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
          {...(searchTerm ? {} : { collapsible: true })}
        >
          {links.map(
            (category) =>
              category.Items.filter(
                (script) =>
                  !searchTerm ||
                  script.title.toLowerCase().includes(searchTerm.toLowerCase()),
              ).length > 0 && (
                <AccordionItem
                  value={category.id}
                  key={category.id}
                  className={`text-md flex flex-col gap-2`}
                  // if search term is present, open the accordion with the [data-state]
                  {...(isSearch ? { "data-state": "open" } : {})}
                  data-state="open"
                >
                  <AccordionTrigger>{category.Catagory_Title}</AccordionTrigger>
                  <AccordionContent>
                    {category.Items.filter(
                      (script) =>
                        !searchTerm ||
                        script.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()),
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
              ),
          )}
        </Accordion>
      </div>
    </>
  );
}

export default ScriptBrowser