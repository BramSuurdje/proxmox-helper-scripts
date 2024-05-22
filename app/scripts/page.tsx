'use client'
import ScriptItem from "@/components/Script";
import ScriptBrowser from "@/components/ScriptBrowser";
import Particles from "@/components/ui/particles";
import { pb } from "@/lib/pocketbase";
import { Category } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [links, setLinks] = useState<Category[]>([]);
  const [isLoading , setIsLoading] = useState(true)
  const [selectedScript, setSelectedScript] = useState<string | null>(null);

  const fetchLinks = async () => {
    try {
      setIsLoading(true)
      const res = await pb.collection("categories").getFullList({
        expand: "items",
        sort: "order",
        requestKey: "desktop",
      });
      setLinks(res as unknown as Category[]);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching links:", error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <Particles
            className="animate-fade-in absolute  inset-0 -z-10"
            quantity={100}
          />
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
          <div className="animate-pulse"></div>
        </div>
      )}
    </>
  );
}
