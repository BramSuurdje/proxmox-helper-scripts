"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import { EyeOff, Eye, Star } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Category } from "@/lib/types";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import classNames from "clsx";
import { useSearchParams } from "next/navigation";

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
  const [expandedItem, setExpandedItem] = useState<string | undefined>(
    undefined,
  );
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    if (items) {
      setLinks(items);
    }
  }, [items]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setSelectedScript(id);
    } else {
      setSelectedScript(null);
    }
  }, [searchParams, setSelectedScript]);

  const handleSelected = useCallback(
    (title: string) => {
      setSelectedScript(title);
    },
    [setSelectedScript],
  );

  useEffect(() => {
    if (selectedScript) {
      const category = links.find((category) =>
        category.expand.items.some((script) => script.title === selectedScript),
      );
      if (category) {
        setExpandedItem(category.catagoryName);
        handleSelected(selectedScript);
      }
    }
  }, [selectedScript, links, handleSelected]);

  const handleAccordionChange = (value: string | undefined) => {
    setExpandedItem(value);
  };

  return (
    <div className="flex min-w-72 flex-col sm:max-w-72">
      <div className="flex items-end justify-between pb-4">
        <h1 className="text-xl font-bold">Categories</h1>
        <p className="text-xs italic text-muted-foreground">
          {links.reduce(
            (acc, category) => acc + category.expand.items.length,
            0,
          )}{" "}
          Total scripts
        </p>
      </div>
      <div className="rounded-lg">
        <Accordion
          type="single"
          value={expandedItem}
          onValueChange={handleAccordionChange}
          collapsible
        >
          {links.map((category) => (
            <AccordionItem
              key={category.id + ":category"}
              value={category.catagoryName}
              className={classNames("sm:text-md flex flex-col border-none", {
                "rounded-lg bg-accent/30":
                  expandedItem === category.catagoryName,
              })}
            >
              <AccordionTrigger
                className={classNames(
                  "duration-250 rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-accent",
                  { "": expandedItem === category.catagoryName },
                )}
              >
                <div className="mr-2 flex w-full items-center justify-between">
                  <span className="pl-2">{category.catagoryName} </span>
                  <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-muted-foreground hover:no-underline dark:bg-blue-800/20">
                    {category.expand.items.length}
                  </span>
                </div>{" "}
              </AccordionTrigger>
              <AccordionContent
                data-state={
                  expandedItem === category.catagoryName ? "open" : "closed"
                }
                className="pt-0"
              >
                {category.expand.items.map((script, index) => (
                  <p key={index}>
                    <Link
                      href={{
                        pathname: "/scripts",
                        query: { id: script.title },
                      }}
                      className={`flex cursor-pointer items-center justify-between gap-1 px-1 py-1 text-muted-foreground hover:rounded-lg hover:bg-accent/60 hover:dark:bg-accent/20 ${
                        selectedScript === script.title
                          ? "rounded-lg bg-accent font-semibold dark:bg-accent/30 dark:text-white"
                          : ""
                      }`}
                      onClick={() => handleSelected(script.title)}
                      ref={(el) => {
                        linkRefs.current[script.title] = el;
                      }}
                    >
                      <Image
                        src={script.logo}
                        priority={true}
                        alt={script.title}
                        width={16}
                        height={16}
                        className="mr-1 rounded-full"
                      />
                      <span className="flex items-center gap-2">
                        {script.title}
                        {script.isMostViewed && (
                          <Star className="h-3 w-3 text-yellow-500"></Star>
                        )}
                      </span>
                      <Badge
                        className={classNames(
                          "ml-auto w-[37.69px] justify-center text-center",
                          {
                            "text-primary/75": script.item_type === "VM",
                            "text-yellow-500/75": script.item_type === "LXC",
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
    </div>
  );
};

export default ScriptBrowser;
