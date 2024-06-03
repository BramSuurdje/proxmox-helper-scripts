'use client';
import ScriptItem from "@/components/Script";
import ScriptBrowser from "@/components/ScriptBrowser";
import { pb, pbBackup } from "@/lib/pocketbase";
import { Category } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";
import CacheControls from "@/components/CacheControls";

export default function Page() {
  const [links, setLinks] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  const [cacheExpiryTime, setCacheExpiryTime] = useState<Date | null>(null);
  const [isCacheEnabled, setIsCacheEnabled] = useState<boolean>(true);
  const [showCacheControls, setShowCacheControls] = useState<boolean>(true);

  const fetchLinks = useCallback(async (forceUpdate: boolean = false) => {
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
            setCacheExpiryTime(new Date(Number(cacheTime) + 30 * 60 * 1000));
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

      if (isCacheEnabled) {
        localStorage.setItem("scripts", JSON.stringify(res));
        const newCacheTime = new Date().getTime();
        localStorage.setItem("cacheTime", String(newCacheTime));
        setCacheExpiryTime(new Date(newCacheTime + 30 * 60 * 1000));
      }

      setLinks(res as unknown as Category[]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching links:", error);
      setIsLoading(false);
    }
  }, [isCacheEnabled]);

  useEffect(() => {
    const cacheEnabled = localStorage.getItem("isCacheEnabled");
    if (cacheEnabled !== null) {
      setIsCacheEnabled(cacheEnabled === "true");
    }
    fetchLinks();
  }, [fetchLinks]);

  const handleForceUpdate = () => {
    fetchLinks(true);
  };

  const toggleCache = () => {
    const newCacheState = !isCacheEnabled;
    setIsCacheEnabled(newCacheState);
    localStorage.setItem("isCacheEnabled", String(newCacheState));
  };

  const handleScriptSelect = (script: string | null) => {
    if (!selectedScript && script) {
      setShowCacheControls(false);
      setTimeout(() => {
        setShowCacheControls(true);
      }, 50);
    }
    setSelectedScript(script);
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
                  setSelectedScript={handleScriptSelect}
                />
              </div>
              <div className="mx-7 w-full sm:mx-0 sm:ml-7">
                <ScriptItem
                  items={links}
                  selectedScript={selectedScript}
                  setSelectedScript={handleScriptSelect}
                />
                {links.length > 0 && showCacheControls && (
                  <CacheControls
                    isCacheEnabled={isCacheEnabled}
                    toggleCache={toggleCache}
                    handleForceUpdate={handleForceUpdate}
                    cacheExpiryTime={cacheExpiryTime}
                  />
                )}
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
