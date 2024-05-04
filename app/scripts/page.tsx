"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import ScriptItem from "@/components/Script";
import { Category } from "@/lib/types";

export default function Page() {
  const [selectedItem, setSelectedItem] = useState("");
  const [links, setLinks] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
  };

  return (
    <>
      <div className="mt-20 flex">
        <div className="flex min-w-72 max-w-72 flex-col">
          <h1 className="mb-5 text-xl font-bold">Scripts</h1>
          <Input
            className="mb-5"
            type="text"
            placeholder="Type '/' to search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchTerm}
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
                    script.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                ).length > 0 && (
                  <AccordionItem
                    value={category.id}
                    key={category.id}
                    className={`text-md flex flex-col gap-2`}
                  >
                    <AccordionTrigger>
                      {category.Catagory_Title}
                    </AccordionTrigger>
                    <AccordionContent>
                      {category.Items.filter(
                        (script) =>
                          !searchTerm ||
                          script.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                      ).map((script, index) => (
                        <p
                          className="cursor-pointer py-1 text-muted-foreground"
                          onClick={() => setSelectedItem(script.scriptID)}
                          key={index}
                        >
                          {script.title}
                        </p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ),
            )}
          </Accordion>
        </div>
        <div className="flex">
          <div className="h-screen w-full">
            <ScriptItem scriptID={selectedItem} />
          </div>
        </div>
      </div>
    </>
  );
}
