import { pb } from "@/lib/pocketbase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { extractDate } from "@/lib/time";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Clipboard } from "lucide-react";
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
  default_cpu: string;
  default_ram: string;
  default_hdd: string;
  port: number;
  item_type: string;
  website: string;
  documentation: string;
  isUpdateable: boolean;
  post_install: string;
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
      </div>
    );
  }

  return (
    <div className="h-full w-full">
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
                      className="h-48 w-48"
                      src={item.logo}
                      width={400}
                      height={400}
                      alt={item.title}
                    />
                    <div className="ml-4 flex flex-col justify-between">
                      <div className="w-full">
                        <h1 className="text-xl font-semibold">{item.title}</h1>
                        <p className="w-full text-lg text-muted-foreground">
                          Last updated: {extractDate(item.updated)}
                        </p>
                      </div>
                      {item.default_cpu && (
                        <div>
                          <h2 className="text-lg font-semibold">
                            Default settings
                          </h2>
                          <p className="text-muted-foreground">
                            CPU: {item.default_cpu}
                          </p>
                          <p className="text-muted-foreground">
                            RAM: {item.default_ram}
                          </p>
                          <p className="text-muted-foreground">
                            HDD: {item.default_hdd}
                          </p>
                        </div>
                      )}
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
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p>{item.description}</p>
                  </div>
                  <Separator className="mt-7" />
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold">
                      How to {item.item_type ? "install" : "use"}
                    </h2>
                    {item.item_type && (
                      <p>
                        To create a new Proxmox VE {item.title} {item.item_type}
                        , run the command below in the Proxmox VE Shell.
                      </p>
                    )}
                    {item.isUpdateable ? (
                      <p>
                        To Update {item.title}, run the command below (or type
                        update) in the LXC Console.
                      </p>
                    ) : (
                      <p>
                        Run the command below in the <b>Proxmox VE Shell</b>.
                      </p>
                    )}

                    <p className="mt-3 pb-1 pl-1 text-sm text-muted-foreground">
                      click to copy
                    </p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleCopy("install command", item.installCommand)
                      }
                    >
                      {item.installCommand}
                    </Button>
                  </div>
                  {item.port != 0 && (
                    <div className="mt-6">
                      <h2 className="text-xl font-semibold">Default Port</h2>
                      <p className="mt-3 pb-1 pl-1 text-sm text-muted-foreground">
                        click to copy
                      </p>
                      <Button
                        variant="outline"
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
