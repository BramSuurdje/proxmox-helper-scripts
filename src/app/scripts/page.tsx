"use client";
import ScriptItem from "@/app/scripts/_components/ScriptItem";
import ScriptBrowser from "@/app/scripts/_components/ScriptBrowser";
import { Category } from "@/lib/types";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic"

const sortCategories = (categories: Category[]): Category[] => {
  return categories.sort((a: Category, b: Category) => {
    if (
      a.catagoryName === "Proxmox VE Tools" &&
      b.catagoryName !== "Proxmox VE Tools"
    ) {
      return -1;
    } else if (
      a.catagoryName !== "Proxmox VE Tools" &&
      b.catagoryName === "Proxmox VE Tools"
    ) {
      return 1;
    } else {
      return a.catagoryName.localeCompare(b.catagoryName);
    }
  });
};

export default function Page() {
  const [links, setLinks] = useState<Category[]>([]);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async (): Promise<Category[]> => {
      const response = await fetch("/api/categories", {});
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    };

    const fetchAndSortCategories = async () => {
      try {
        const categories = await fetchCategories();
        if (categories.length === 0) {
          throw new Error("Empty response");
        }
        const sortedCategories = sortCategories(categories);
        setLinks(sortedCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndSortCategories();
  }, []);

  return (
    <div className="mb-3 min-h-screen">
      <div className="mt-20 flex sm:px-7 xl:px-0">
        <div className="hidden sm:flex">
          <ScriptBrowser
            items={links}
            selectedScript={selectedScript}
            setSelectedScript={setSelectedScript}
          />
        </div>
        <div className="mx-7 w-full sm:mx-0 sm:ml-7">
          <ScriptItem
            items={links}
            selectedScript={selectedScript}
            setSelectedScript={setSelectedScript}
          />
        </div>
      </div>
    </div>
  );
}
