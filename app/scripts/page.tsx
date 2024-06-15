"use client";
import ScriptItem from "@/components/ScriptItem";
import ScriptBrowser from "@/components/ScriptBrowser";
import { pb } from "@/lib/pocketbase";
import { Category } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";
import CacheControls from "@/components/CacheControls";
import { toast } from "sonner";

export default function Page() {
  const [links, setLinks] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  const [cacheExpiryTime, setCacheExpiryTime] = useState<Date | null>(null);
  const [isCacheEnabled, setIsCacheEnabled] = useState<boolean>(true);

  const fetchLinks = useCallback(
    async (forceUpdate: boolean = false) => {
      try {
        setIsLoading(true);
        let res;

        if (isCacheEnabled) {
          const cachedLinks = localStorage.getItem("scripts");
          const cacheTime = localStorage.getItem("cacheTime");

          if (!forceUpdate && cachedLinks && cacheTime) {
            const now = new Date().getTime();
            const timeDiff = Math.abs(now - Number(cacheTime));
            const diffInMinutes = Math.floor(timeDiff / 1000 / 60);

            if (diffInMinutes < 30) {
              setLinks(JSON.parse(cachedLinks));
              setCacheExpiryTime(
                new Date(Number(cacheTime) + 1440 * 60 * 1000),
              );
              setIsLoading(false);
              return;
            }
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
          throw error;
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

        if (isCacheEnabled) {
          localStorage.setItem("scripts", JSON.stringify(res));
          const newCacheTime = new Date().getTime();
          localStorage.setItem("cacheTime", String(newCacheTime));
          setCacheExpiryTime(new Date(newCacheTime + 1440 * 60 * 1000));
        }

        setLinks(res as unknown as Category[]);
      } catch (error) {
        console.error("Error fetching links:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [isCacheEnabled],
  );

  useEffect(() => {
    const cacheEnabled = localStorage.getItem("isCacheEnabled");
    if (cacheEnabled !== null) {
      setIsCacheEnabled(cacheEnabled === "true");
    }
    fetchLinks();
  }, [fetchLinks]);

  const handleForceUpdate = () => {
    fetchLinks(true);
    toast.success("Cache has been refreshed!");
  };

  const toggleCache = async () => {
    const newCacheState = !isCacheEnabled;
    setIsCacheEnabled(newCacheState);
    localStorage.setItem("isCacheEnabled", String(newCacheState));

    if (!newCacheState) {
      localStorage.removeItem("scripts");
      localStorage.removeItem("cacheTime");
      toast.warning("Cache has been disabled!");
    } else {
      await fetchLinks(true);
      toast.info("Cache has been enabled!");
    }
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
              </div>
            </div>
          </div>
          {links.length > 0 && (
            <div className="mb-10 flex justify-center">
              <CacheControls
                isCacheEnabled={isCacheEnabled}
                toggleCache={toggleCache}
                handleForceUpdate={handleForceUpdate}
                cacheExpiryTime={cacheExpiryTime}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className=""></div>
        </div>
      )}
    </>
  );
}
