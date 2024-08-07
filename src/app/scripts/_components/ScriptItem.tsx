"use client";
import Image from "next/image";
import { Suspense, useEffect, useState, useMemo } from "react";
import { extractDate } from "@/lib/time";
import { Button } from "../../../components/ui/button";
import {
  Info,
  X,
  Code,
  Globe,
  BookOpenText,
  ExternalLink,
  Copy,
  Clipboard,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Category, Script } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MostViewedScripts, LatestScripts } from "./ScriptInfoBlocks";
import { Card } from "@/components/ui/card";
import { handleCopy } from "@/lib/utils";

function ScriptItem({
  items,
  selectedScript,
  setSelectedScript,
}: {
  items: Category[];
  selectedScript: string | null;
  setSelectedScript: (script: string | null) => void;
}) {
  const [item, setItem] = useState<Script | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (items) {
      const script = items
        .map((category) => category.expand.items)
        .flat()
        .find((script) => script.title === id);
      setItem(script || null);

      if (script && !selectedScript) {
        setSelectedScript(script.title);
      }
    }
  }, [id, items, setSelectedScript, selectedScript]);

  const pattern = useMemo(
    () =>
      /(https:\/\/github\.com\/tteck\/Proxmox\/raw\/main\/(ct|misc|vm)\/([^\/]+)\.sh)/,
    [],
  );

  const installCommand = useMemo(() => {
    if (item) {
      const keys = Object.keys(item);
      for (const key of keys) {
        const value = item[key as keyof Script];
        if (
          typeof value === "string" &&
          pattern.test(value) &&
          !value.includes("alpine") &&
          !value.includes("discussions") &&
          !value.includes("2>/dev/null")
        ) {
          return value;
        }
      }
    }
    return null;
  }, [item, pattern]);

  const sourceUrl = useMemo(() => {
    const transformUrlToInstallScript = (url: string) => {
      if (url.includes("/misc/") || url.includes("/vm/")) {
        return url;
      } else if (url.includes("/ct/")) {
        return url.replace("/ct/", "/install/").replace(/\.sh$/, "-install.sh");
      }
      return url;
    };

    if (installCommand) {
      const match = installCommand.match(pattern);
      return match ? transformUrlToInstallScript(match[0]) : null;
    }
    return null;
  }, [installCommand, pattern]);

  const closeScript = () => {
    // remove the id from the url and reset the state
    window.history.pushState({}, document.title, window.location.pathname);
    setSelectedScript(null);
  };

  const descriptionCodeBlock = (description: string) => {
    const pattern = /`([^`]*)`/g;
    const parts = description.split(pattern);

    const formattedDescription = parts.map((part: string, index: number) => {
      if (index % 2 === 1) {
        return (
          <Button
            variant={"secondary"}
            size={"null"}
            key={index}
            onClick={() => handleCopy("command", part)}
          >
            {part}
          </Button>
        );
      } else {
        return part;
      }
    });

    return formattedDescription;
  };

  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  const handleWindowSizeChange = () => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }
  }, []);

  const isMobile = width <= 640;

  return (
    <Suspense fallback={null}>
      {item && (
        <div className="mr-7 mt-0 flex w-full min-w-fit">
          <div className="flex w-full min-w-fit">
            <div className="flex w-full flex-col">
              <div className="flex h-[36px] min-w-max items-center justify-between">
                <h2 className="text-lg font-semibold">Selected Script</h2>
                <X onClick={closeScript} className="cursor-pointer" />
              </div>
              <div className="rounded-lg border bg-accent/20 p-4">
                <div className="flex justify-between">
                  <div className="flex">
                    <Image
                      className="h-32 w-32 rounded-lg bg-accent/60 object-contain p-3 shadow-md"
                      src={item.logo}
                      width={400}
                      height={400}
                      alt={item.title}
                      priority
                    />
                    <div className="ml-4 flex flex-col justify-between">
                      <div className="flex h-full w-full flex-col justify-between">
                        <div>
                          <h1 className="text-lg font-semibold">
                            {item.title}
                          </h1>
                          <p className="w-full text-sm text-muted-foreground">
                            Date added: {extractDate(item.created)}
                          </p>
                        </div>
                        <div className="flex gap-5">
                          {item.default_cpu && (
                            <div>
                              <h2 className="text-md font-semibold">
                                Default settings
                              </h2>
                              <p className="text-sm text-muted-foreground">
                                CPU: {item.default_cpu}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                RAM: {item.default_ram}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                HDD: {item.default_hdd}
                              </p>
                            </div>
                          )}
                          {item.hasAlpineScript && (
                            <div>
                              <h2 className="text-md font-semibold">
                                Default Alpine settings
                              </h2>
                              <p className="text-sm text-muted-foreground">
                                CPU: {item.alpine_default_cpu}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                RAM: {item.alpine_default_ram}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                HDD: {item.alpine_default_hdd}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden flex-col justify-between gap-2 sm:flex">
                    <div className="flex flex-col gap-2">
                      {item.interface && (
                        <div className="flex items-center justify-end">
                          <h2 className="mr-2 text-end text-lg font-semibold">
                            Interface:
                          </h2>{" "}
                          <Button
                            variant={"secondary"}
                            size={"sm"}
                            onClick={() =>
                              handleCopy("interface", item.interface)
                            }
                          >
                            {item.interface}
                          </Button>
                        </div>
                      )}
                      {!item.interface && item.port !== 0 && (
                        <div className="flex items-center justify-end">
                          <h2 className="mr-2 text-end text-lg font-semibold">
                            Default Port:
                          </h2>{" "}
                          <Button
                            variant={"secondary"}
                            size={"sm"}
                            onClick={() => handleCopy("port", item.port)}
                          >
                            {item.port}
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      {item.website && (
                        <Button variant="secondary" asChild>
                          <Link target="_blank" href={item.website}>
                            <span className="flex items-center gap-2">
                              <Globe className="h-4 w-4" /> Website
                            </span>
                          </Link>
                        </Button>
                      )}
                      {item.documentation && (
                        <Button variant="secondary" asChild>
                          <Link target="_blank" href={item.documentation}>
                            <span className="flex items-center gap-2">
                              <BookOpenText className="h-4 w-4" />
                              Documentation
                            </span>
                          </Link>
                        </Button>
                      )}
                      {item.post_install && (
                        <Button variant="secondary" asChild>
                          <Link target="_blank" href={item.post_install}>
                            <span className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              Post Install
                            </span>
                          </Link>
                        </Button>
                      )}
                      {sourceUrl && (
                        <Button variant="secondary" asChild>
                          <Link target="_blank" href={sourceUrl}>
                            <span className="flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              Source Code
                            </span>
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <Separator className="mt-4" />
                <div>
                  <div className="mt-4">
                    <div className="p-2">
                      <h2 className="mb-2 max-w-prose text-lg font-semibold">
                        Description
                      </h2>
                      <p className="text-sm">
                        {descriptionCodeBlock(item.description)}
                      </p>
                    </div>
                    {item.alert1 && (
                      <div className="mt-4 flex flex-col gap-2">
                        <p className="inline-flex items-center gap-2 rounded-lg border border-red-500/25 bg-destructive/25 p-2 pl-4 text-sm">
                          <Info className="h-4 min-h-4 w-4 min-w-4" />
                          {descriptionCodeBlock(item.alert1)}
                        </p>
                        {item.alert2 && (
                          <p className="inline-flex items-center gap-2 rounded-lg border border-red-500/25 bg-destructive/25 p-2 pl-4 text-sm">
                            <Info className="min-w-42 h-4 min-h-4 w-4" />
                            {descriptionCodeBlock(item.alert2)}
                          </p>
                        )}
                        {item.alert3 && (
                          <p className="inline-flex items-center gap-2 rounded-lg border border-red-500/25 bg-destructive/25 p-2 pl-4 text-sm">
                            <Info className="h-4 min-h-4 w-4 min-w-4" />
                            {descriptionCodeBlock(item.alert3)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 rounded-lg border bg-accent/50">
                    <h2 className="px-4 py-2 text-lg font-semibold">
                      How to {item.item_type ? "install" : "use"}
                    </h2>
                    <Separator className="w-full"></Separator>
                    <div className="p-4">
                      {item.hasAlpineScript ? (
                        <Tabs
                          defaultValue="default"
                          className="mt-2 w-full max-w-4xl"
                        >
                          <TabsList>
                            <TabsTrigger value="default">Default</TabsTrigger>
                            <TabsTrigger value="alpine">
                              Alpine Linux
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="default">
                            {item.item_type && (
                              <>
                                <p className="text-sm">
                                  To create a new Proxmox VE {item.title}{" "}
                                  {item.item_type}, run the command below in the
                                  Proxmox VE Shell.
                                </p>
                                {item.isUpdateable && (
                                  <p className="text-sm">
                                    To Update {item.title}, run the command
                                    below (or type update) in the LXC Console.
                                  </p>
                                )}
                              </>
                            )}
                            <div className="mt-3 flex">
                              <Card className="flex items-center overflow-x-auto bg-secondary pl-4">
                                <code className="overflow-x-auto whitespace-pre-wrap text-nowrap break-all pr-4 text-sm">
                                  {!isMobile && installCommand
                                    ? installCommand
                                    : "Copy install command"}
                                </code>
                                <div
                                  className=" right-0 cursor-pointer bg-primary-foreground px-4 py-2"
                                  onClick={() =>
                                    handleCopy(
                                      "install command",
                                      installCommand,
                                    )
                                  }
                                >
                                  <Clipboard className="w-4 cursor-pointer"></Clipboard>
                                </div>
                              </Card>
                            </div>
                          </TabsContent>
                          <TabsContent value="alpine">
                            {item.hasAlpineScript && (
                              <>
                                <p className="mt-2 max-w-2xl text-sm">
                                  As an alternative option, you can use Alpine
                                  Linux and the {item.title} package to create a{" "}
                                  {item.title} {item.item_type} container with
                                  faster creation time and minimal system
                                  resource usage. You are also obliged to adhere
                                  to updates provided by the package maintainer.
                                </p>
                                <p className="mt-2 flex text-sm">
                                  To create a new Proxmox VE Alpine-{item.title}{" "}
                                  {item.item_type}, run the command below in the
                                  Proxmox VE Shell
                                </p>
                                <div className="mt-3 flex">
                                  <Card className="flex items-center overflow-x-auto bg-secondary pl-4">
                                    <code className="overflow-x-auto whitespace-pre-wrap text-nowrap break-all pr-4 text-sm">
                                      {!isMobile && installCommand
                                        ? installCommand
                                        : "Copy install command"}
                                    </code>
                                    <div
                                      className=" right-0 cursor-pointer bg-primary-foreground px-4 py-2"
                                      onClick={() =>
                                        handleCopy(
                                          "install command",
                                          installCommand,
                                        )
                                      }
                                    >
                                      <Clipboard className="w-4 cursor-pointer"></Clipboard>
                                    </div>
                                  </Card>
                                </div>
                              </>
                            )}
                          </TabsContent>
                        </Tabs>
                      ) : (
                        <>
                          {item.item_type && (
                            <>
                              <p className="text-sm">
                                To create a new Proxmox VE {item.title}{" "}
                                {item.item_type}, run the command below in the
                                Proxmox VE Shell.
                              </p>
                              {item.isUpdateable && (
                                <p className="text-sm">
                                  To Update {item.title}, run the command below
                                  (or type update) in the LXC Console.
                                </p>
                              )}
                            </>
                          )}
                          <div className="mt-3 flex">
                            <Card className="flex items-center overflow-x-auto bg-secondary pl-4">
                              <code className="overflow-x-auto whitespace-pre-wrap text-nowrap break-all pr-4 text-sm">
                                {!isMobile && installCommand
                                  ? installCommand
                                  : "Copy install command"}
                              </code>
                              <div
                                className=" right-0 cursor-pointer bg-primary-foreground px-4 py-2"
                                onClick={() =>
                                  handleCopy("install command", installCommand)
                                }
                              >
                                <Clipboard className="w-4 cursor-pointer"></Clipboard>
                              </div>
                            </Card>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {id ? null : (
        <div className="flex w-full flex-col gap-5">
          <LatestScripts items={items} />
          {/* <RecentlyUpdatedScripts items={items} /> */}
          <MostViewedScripts items={items} />
        </div>
      )}
    </Suspense>
  );
}

export default ScriptItem;
