'use client'
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import ScriptItem from "@/components/Script";

interface Script {
  title: string;
  scriptID: string;
}

interface Category {
  id: string;
  Catagory_Title: string;
  Items: Script[];
}

export default function Page() {
  // set the items as a state
  const [selectedItem, setSelectedItem] = useState("");

  const [links, setLinks] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [accordionExpanded, setAccordionExpanded] = useState(true); // Initially expanded

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLinks();
        setLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };
    fetchData();
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
    setAccordionExpanded(!!value); // Expand accordion if search term is not empty, otherwise collapse it
  };

  const filteredLinks = searchTerm
    ? links.filter((category) =>
        category.Items.some((script) =>
          script.scriptID.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    : links;
  return (
    <>
      <div className="flex mt-20">
        <div className="min-w-72 max-w-72 flex flex-col">
          <h1 className="mb-5 text-xl font-bold">Scripts</h1>
          <Input
            className="mb-5"
            type="text"
            placeholder="Search scripts..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Accordion type="single" collapsible>
            {filteredLinks.map((category) => (
              <AccordionItem value={category.id} key={category.id}>
                <AccordionTrigger
                  aria-expanded={accordionExpanded ? "true" : "false"}
                  onClick={() => setAccordionExpanded(!accordionExpanded)}
                >
                  {category.Catagory_Title}
                </AccordionTrigger>
                <AccordionContent className="text-md flex flex-col gap-2 text-muted-foreground">
                  {category.Items.filter((script) =>
                    script.scriptID
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  ).map((script, index) => (
                    <p
                      className="cursor-pointer"
                      onClick={() => setSelectedItem(script.scriptID)}
                      key={index}
                    >
                      {script.title}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
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