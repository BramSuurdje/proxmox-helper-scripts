"use client";
import ScriptItem from "@/components/ScriptItem";
import ScriptBrowser from "@/components/ScriptBrowser";
import { pb } from "@/lib/pocketbase";
import { Category } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";

const getFullList = async (): Promise<Category[]> => {
  const response = await pb.collection("categories").getFullList({
    expand: "items",
    sort: "order",
    requestKey: "desktop",
  });
  return response as unknown as Category[];
};

const sortCategories = (categories: Category[]): Category[] => {
  return categories.sort((a: Category, b: Category) => {
    if (a.catagoryName === "Proxmox VE Tools" && b.catagoryName !== "Proxmox VE Tools") {
      return -1;
    } else if (a.catagoryName !== "Proxmox VE Tools" && b.catagoryName === "Proxmox VE Tools") {
      return 1;
    } else {
      return a.catagoryName.localeCompare(b.catagoryName);
    }
  });
};

const fetchAndSortLinks = async (setLinks: (links: Category[]) => void, setIsLoading: (isLoading: boolean) => void) => {
  try {
    setIsLoading(true);
    const categories = await getFullList();
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
          <div className="absolute left-0 top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="mb-3 min-h-screen">
            <div className="mt-20 flex sm:px-7 xl:px-0">
              <div className="hidden sm:flex">
                <ScriptBrowser items={links} selectedScript={selectedScript} setSelectedScript={setSelectedScript} />
              </div>
              <div className="mx-7 w-full sm:mx-0 sm:ml-7">
                <ScriptItem items={links} selectedScript={selectedScript} setSelectedScript={setSelectedScript} />
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
