'use client'
import ScriptItem from "@/components/Script";
import ScriptBrowser from "@/components/ScriptBrowser";
import { pb, pbBackup } from "@/lib/pocketbase";
import { Category } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [links, setLinks] = useState<Category[]>([]);
  const [isLoading , setIsLoading] = useState(true)
  const [selectedScript, setSelectedScript] = useState<string | null>(null);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      let res;
      try {
        res = await (pb.collection("categories").getFullList({
          expand: "items",
          sort: "order",
          requestKey: "desktop",
        }) as Promise<Category[]>);
        if (res.length === 0) {
          throw new Error("Empty response");
        }
      } catch (error) {
        console.error("Error fetching links from pb:", error);
        res = await (pbBackup.collection("categories").getFullList({
          expand: "items",
          sort: "order",
          requestKey: "desktop",
        }) as Promise<Category[]>);
        if (res.length === 0) {
          throw new Error("Empty response");
        }
      }
      res = res.sort((a: Category, b: Category) => {
        if (a.catagoryName === "Proxmox VE Tools" && b.catagoryName !== "Proxmox VE Tools") {
          return -1;
        } else if (a.catagoryName !== "Proxmox VE Tools" && b.catagoryName === "Proxmox VE Tools") {
          return 1;
        } else {
          return a.catagoryName.localeCompare(b.catagoryName);
        }
      });

      setLinks(res as unknown as Category[]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching links:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <div className="min-h-screen mb-3">
            <div className="mt-20 flex  sm:px-7 xl:px-0">
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
        <div className="flex justify-center items-center h-screen">
          <div className=""></div>
        </div>
      )}
    </>
  );
}
