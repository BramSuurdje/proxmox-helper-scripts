"use client";
import ScriptItem from "@/app/scripts/_components/ScriptItem";
import ScriptBrowser from "@/app/scripts/_components/ScriptBrowser";
import { Category } from "@/lib/types";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async (): Promise<Category[]> => {
      const response = await fetch("/api/categories", {
        next: { revalidate: 60 * 60 * 24 },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    };

    const fetchAndSortCategories = async () => {
      try {
        setLoading(true);
        const categories = await fetchCategories();
        if (categories.length === 0) {
          throw new Error("Empty response");
        }
        const sortedCategories = sortCategories(categories);
        setLinks(sortedCategories);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAndSortCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background px-4 md:px-6">
        <div className="space-y-2 text-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      </div>
    );
  }

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
