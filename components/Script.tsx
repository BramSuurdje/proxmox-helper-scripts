import { pb } from "@/lib/pocketbase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { extractDate } from "@/lib/time";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Clipboard, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type ScriptProps = {
  scriptID: string;
};

type Script = {
  title: string;
  description: string;
  installCommand: string;
  logo: string;
  updated: string;
  created: string;
  default_cpu: string;
  default_ram: string;
  default_hdd: string;
  port: number;
  item_type: string;
  website: string;
  documentation: string;
  isUpdateable: boolean;
  post_install: string;
  hasAlpineScript: boolean;
  alpineScript: string;
  alpine_default_cpu: string;
  alpine_default_ram: string;
  alpine_default_hdd: string;
  alert1: string;
  alert2: string;
  alert3: string;
};

type RecordModel = {
  title: string;
  description: string;
  installCommand: string;
  logo: string;
  updated: string;
};

const ScriptItem: React.FC<ScriptProps> = ({ scriptID }) => {
  const [item, setItem] = useState<Script | null>(null);

  const getItem = async () => {
    const record = await pb
      .collection("proxmox_scripts")
      .getOne(`${scriptID}`, {});
    setItem(record as unknown as Script);
  };

  useEffect(() => {
    if (scriptID) {
      getItem();
    }
  }, [scriptID]);

  function handleCopy(type: string, value: any) {
    navigator.clipboard.writeText(value);
    toast(
      <div className="flex items-center gap-2">
        <Clipboard className="h-4 w-4" />
        <span>Copied {type} to clipboard</span>
      </div>,
    );
  }

  return (
    <div className="fixed h-full w-full max-w-4xl">
      {scriptID === "" ? (
        <div className="flex h-screen w-full items-center justify-center"></div>
      ) : (
        <div className="ml-10 mt-10 flex h-screen w-full">
          {item && (
            <>
              <div className="mr-4 flex flex-col">
                <div className="flex justify-between">
                  <div className="flex">
                    <Image
                      className="h-32 w-32 rounded-lg bg-[#8C9A9A] object-contain p-5"
                      src={item.logo}
                      width={400}
                      height={400}
                      alt={item.title}
                      priority={true}
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
                  <div className="flex items-end justify-end gap-2">
                    {item.website && (
                      <Button variant="outline" asChild>
                        <Link target="_blank" href={item.website}>
                          Website
                        </Link>
                      </Button>
                    )}
                    {item.documentation && (
                      <Button variant="outline" asChild>
                        <Link target="_blank" href={item.documentation}>
                          Documentation
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                <Separator className="mt-7" />
                <div>
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold">Description</h2>
                    <p className="text-sm">{item.description}</p>

                    {item.alert1 && (
                      <div className="mt-4 flex flex-col gap-1">
                        <p className="flex items-center gap-2 text-sm">
                          <Info className="h-4 w-4" />
                          {item.alert1}
                        </p>
                        {item.alert2 && (
                          <p className="flex  items-center gap-2 text-sm">
                            <Info className="h-4 w-4" />
                            {item.alert2}
                          </p>
                        )}
                        {item.alert3 && (
                          <p className="flex items-center gap-2 text-sm">
                            <Info className="h-4 w-4" />
                            {item.alert3}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <Separator className="mt-5" />
                  <div className="mt-5">
                    <h2 className="text-lg font-semibold">
                      How to {item.item_type ? "install" : "use"}
                    </h2>
                    {item.item_type && (
                      <>
                        <p className="text-sm">
                          To create a new Proxmox VE {item.title}{" "}
                          {item.item_type}, run the command below in the Proxmox
                          VE Shell.
                        </p>
                        {item.isUpdateable && (
                          <p className="text-sm">
                            To Update {item.title}, run the command below (or
                            type update) in the LXC Console.
                          </p>
                        )}
                      </>
                    )}

                    <p className="mt-3 pb-1 pl-1 text-xs text-muted-foreground">
                      click to copy
                    </p>
                    <Button
                      variant="outline"
                      size={"sm"}
                      onClick={() =>
                        handleCopy("install command", item.installCommand)
                      }
                    >
                      {item.installCommand}
                    </Button>

                    {item.hasAlpineScript && (
                      <>
                        <Separator className="mt-5" />

                        <h2 className="mt-5 text-lg font-semibold">
                          Alpine Linux
                        </h2>
                        <p className="text-sm">
                          As an alternative option, you can use Alpine Linux and
                          the {item.title} package to create a {item.title}{" "}
                          {item.item_type} container with faster creation time
                          and minimal system resource usage.
                        </p>

                        <p className="mt-2 text-sm">
                          To create a new Proxmox VE Alpine-{item.title}{" "}
                          {item.item_type}, run the command below in the{" "}
                          <span className="text-semibold">
                            Proxmox VE Shell
                          </span>
                        </p>

                        <p className="mt-3 pb-1 pl-1 text-xs text-muted-foreground">
                          click to copy
                        </p>
                        <Button
                          variant="outline"
                          size={"sm"}
                          onClick={() =>
                            handleCopy("install command", item.alpineScript)
                          }
                        >
                          {item.alpineScript}
                        </Button>
                      </>
                    )}
                  </div>
                  {item.port != 0 && (
                    <div className="mt-6">
                      <h2 className="text-lg font-semibold">Default Port</h2>
                      <p className="mt-3 pb-1 pl-1 text-xs text-muted-foreground">
                        click to copy
                      </p>
                      <Button
                        variant="outline"
                        size={"sm"}
                        onClick={() => handleCopy("port", item.port)}
                      >
                        {item.port}
                      </Button>
                    </div>
                  )}
                </div>
                {item.post_install && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold">Post Install</h2>
                    <p>
                      {item.title} requires some extra steps post-install, you
                      can follow this guide to fully set it up.
                    </p>
                    <p className="mt-1 pb-1 pl-1 text-sm text-muted-foreground">
                      click to copy
                    </p>
                    <Button variant="outline" asChild>
                      <Link href={item.post_install}>Guide</Link>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ScriptItem;
