"use client";
import ScriptItem from "@/app/scripts/_components/ScriptItem";
import ScriptBrowser from "@/app/scripts/_components/ScriptBrowser";
import { Category } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";

export const dynamic = "force-dynamic"

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch("/api/categories", {
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

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

const fetchAndSortLinks = async (
  setLinks: (links: Category[]) => void,
  setIsLoading: (isLoading: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const categories = await fetchCategories();
    if (categories.length === 0) {
      throw new Error("Empty response");
    }
    const sortedCategories = sortCategories(categories);
    setLinks(sortedCategories);
  } catch (error) {
    console.error("Error fetching links:", error);
  } finally {
    setIsLoading(false);
  }
};

export default function Page() {
  const [links, setLinks] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);

  const fetchLinks = useCallback(() => {
    fetchAndSortLinks(setLinks, setIsLoading);
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return (
    <>
      {!isLoading ? (
        <>
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
        </>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className=""></div>
        </div>
      )}
    </>
  );
}
