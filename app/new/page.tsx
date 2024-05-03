"use client";
import { pb } from "@/lib/pocketbase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clipboard, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { extractDate } from "@/lib/time";
import { toast } from "sonner";


interface Script {
  title: string;
  scriptID: string;
}

interface Category {
  id: string;
  Catagory_Title: string;
  Items: Script[];
}

type Scripts = {
  id: string;
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

const getCatagories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/collections/proxmox_items/records`,
  );
  const data = await res.json();
  return data.items as Category[];
};

const getItems = async () => {
  const records = await pb.collection("proxmox_scripts").getFullList({
    sort: "-created",
  });
  return records as unknown as Scripts[];
};

  function handleCopy(type: string, value: any) {
    navigator.clipboard.writeText(value);
    toast(
      <div className="flex items-center gap-2">
        <Clipboard className="h-4 w-4" />
        <span>Copied {type} to clipboard</span>
      </div>,
    );
  }


function Page() {
  const [selectedItem, setSelectedItem] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Scripts[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const categories = await getCatagories();
        const items = await getItems();
        setCategories(categories);
        setItems(items);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="mt-20">
      {categories.map((category: Category) => (
        <div key={category.id} className="flex flex-col">
          <h2 className="w-full text-muted-foreground">
            {category.Catagory_Title}
          </h2>{" "}
          <div className="flex flex-grow flex-row flex-wrap justify-center gap-5">
            {category.Items.map((script: Script) => {
              const item = items.find((item) => item.id === script.scriptID);
              if (item) {
                return (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div
                        className="flex min-w-[400px] max-w-[400px] cursor-pointer flex-col rounded-lg border border-b bg-gray-900 p-4 backdrop-blur-xl"
                        onClick={() => setSelectedItem(item.id)}
                      >
                        <div className="flex justify-between">
                          <div className="flex h-[100px] w-[100px] flex-col items-center justify-center bg-contain object-contain">
                            <Image
                              src={item.logo}
                              alt={item.title}
                              width={100}
                              height={100}
                              className="min-h-[100px] min-w-[100px]"
                            />
                          </div>
                          <div>
                            <h3 className="line-clamp-1 text-lg font-semibold">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogDescription>
                          <div className="">
                            {item && (
                              <>
                                <div className="mr-4 flex flex-col">
                                  <div className="flex justify-between">
                                    <div className="flex">
                                      <Image
                                        className="h-48 w-48 rounded-lg bg-[#0080C4] object-contain p-5"
                                        src={item.logo}
                                        width={400}
                                        height={400}
                                        alt={item.title}
                                        priority={true}
                                      />
                                      <div className="ml-4 flex flex-col justify-between">
                                        <div className="flex h-full w-full flex-col justify-between">
                                          <div>
                                            <h1 className="text-xl font-semibold">
                                              {item.title}
                                            </h1>
                                            <p className="w-full text-lg text-muted-foreground">
                                              Date added:{" "}
                                              {extractDate(item.created)}
                                            </p>
                                          </div>
                                          <div className="flex gap-5">
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
                                            {item.hasAlpineScript && (
                                              <div>
                                                <h2 className="text-lg font-semibold">
                                                  Default Alpine settings
                                                </h2>
                                                <p className="text-muted-foreground">
                                                  CPU: {item.alpine_default_cpu}
                                                </p>
                                                <p className="text-muted-foreground">
                                                  RAM: {item.alpine_default_ram}
                                                </p>
                                                <p className="text-muted-foreground">
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
                                          <Link
                                            target="_blank"
                                            href={item.website}
                                          >
                                            Website
                                          </Link>
                                        </Button>
                                      )}
                                      {item.documentation && (
                                        <Button variant="outline" asChild>
                                          <Link
                                            target="_blank"
                                            href={item.documentation}
                                          >
                                            Documentation
                                          </Link>
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                  <Separator className="mt-7" />
                                  <div>
                                    <div className="mt-6">
                                      <h2 className="text-xl font-semibold">
                                        Description
                                      </h2>
                                      <p>{item.description}</p>

                                      {item.alert1 && (
                                        <div className="mt-6 flex flex-col gap-1">
                                          <p className="flex items-center gap-2">
                                            <Info className="h-4 w-4" />
                                            {item.alert1}
                                          </p>
                                          {item.alert2 && (
                                            <p className="flex items-center gap-2">
                                              <Info className="h-4 w-4" />
                                              {item.alert2}
                                            </p>
                                          )}
                                          {item.alert3 && (
                                            <p className="flex items-center gap-2">
                                              <Info className="h-4 w-4" />
                                              {item.alert3}
                                            </p>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    <Separator className="mt-7" />
                                    <div className="mt-6">
                                      <h2 className="text-xl font-semibold">
                                        How to{" "}
                                        {item.item_type ? "install" : "use"}
                                      </h2>
                                      {item.item_type && (
                                        <>
                                          <p>
                                            To create a new Proxmox VE{" "}
                                            {item.title} {item.item_type}, run
                                            the command below in the Proxmox VE
                                            Shell.
                                          </p>
                                          {item.isUpdateable && (
                                            <p>
                                              To Update {item.title}, run the
                                              command below (or type update) in
                                              the LXC Console.
                                            </p>
                                          )}
                                        </>
                                      )}

                                      <p className="mt-3 pb-1 pl-1 text-sm text-muted-foreground">
                                        click to copy
                                      </p>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          handleCopy(
                                            "install command",
                                            item.installCommand,
                                          )
                                        }
                                      >
                                        {item.installCommand}
                                      </Button>

                                      {item.hasAlpineScript && (
                                        <>
                                          <Separator className="mt-7" />

                                          <h2 className="mt-6 text-xl font-semibold">
                                            Alpine Linux
                                          </h2>
                                          <p>
                                            As an alternative option, you can
                                            use Alpine Linux and the{" "}
                                            {item.title} package to create a{" "}
                                            {item.title} {item.item_type}{" "}
                                            container with faster creation time
                                            and minimal system resource usage.
                                          </p>

                                          <p className="mt-3">
                                            To create a new Proxmox VE Alpine-
                                            {item.title} {item.item_type}, run
                                            the command below in the{" "}
                                            <span className="text-semibold">
                                              Proxmox VE Shell
                                            </span>
                                          </p>

                                          <p className="mt-3 pb-1 pl-1 text-sm text-muted-foreground">
                                            click to copy
                                          </p>
                                          <Button
                                            variant="outline"
                                            onClick={() =>
                                              handleCopy(
                                                "install command",
                                                item.alpineScript,
                                              )
                                            }
                                          >
                                            {item.alpineScript}
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                    {item.port != 0 && (
                                      <div className="mt-6">
                                        <h2 className="text-xl font-semibold">
                                          Default Port
                                        </h2>
                                        <p className="mt-3 pb-1 pl-1 text-sm text-muted-foreground">
                                          click to copy
                                        </p>
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            handleCopy("port", item.port)
                                          }
                                        >
                                          {item.port}
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
