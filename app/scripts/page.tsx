'use client';
import ScriptItem from "@/components/Script";
import ScriptBrowser from "@/components/ScriptBrowser";
import { Button } from "@/components/ui/button";
import { pb, pbBackup } from "@/lib/pocketbase";
import { Category } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [links, setLinks] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  const [cacheExpiryTime, setCacheExpiryTime] = useState<Date | null>(null);

  const fetchLinks = async (forceUpdate: boolean = false) => {
    try {
      setIsLoading(true);
      let res;
      const cachedLinks = localStorage.getItem("scripts");
      const cacheTime = localStorage.getItem("cacheTime");

      if (!forceUpdate && cachedLinks && cacheTime) {
        const now = new Date().getTime();
        const timeDiff = Math.abs(now - Number(cacheTime));
        const diffInMinutes = Math.floor(timeDiff / 1000 / 60);

        if (diffInMinutes < 30) {
          setLinks(JSON.parse(cachedLinks));
          setCacheExpiryTime(new Date(Number(cacheTime) + 30 * 60 * 1000));
          setIsLoading(false);
          return;
        }
      }

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

      localStorage.setItem("scripts", JSON.stringify(res));
      const newCacheTime = new Date().getTime();
      localStorage.setItem("cacheTime", String(newCacheTime));
      setCacheExpiryTime(new Date(newCacheTime + 30 * 60 * 1000));
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

  const handleForceUpdate = () => {
    fetchLinks(true);
  };

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
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">
                    The scripts are cached in your browser to optimize performance. Use the button below
                    to re-poll the server for changes.
                  </p>
                  {cacheExpiryTime && (
                    <p className="text-xs text-muted-foreground">
                      Cache will expire automatically at {cacheExpiryTime.toLocaleTimeString()}
                    </p>
                  )}
                  <div className="px-2 py-4">
                    <Button variant="outline" onClick={handleForceUpdate}>
                      Reload via API
                    </Button>
                  </div>
                </div>
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
