import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pb } from "@/lib/pocketbase";
import { useEffect, useState } from "react";
import { Script } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { extractDate } from "@/lib/time";

export default function MostViewedScripts() {
  const [latestScripts, setLatestScripts] = useState<Script[]>([]);

  async function getLatestScripts() {
    try {
      const res = await pb.collection("proxmox_scripts").getList(1, 3, {
        sort: "mostViewedPosition",
        filter: "isMostViewed = true",
      });
      setLatestScripts(res.items as unknown as Script[]);
    } catch (error) {
      console.error("Error fetching scripts:", error);
    }
  }



  useEffect(() => {
    getLatestScripts();
  }, []);

  return (
    <div className="">
      <h2 className="mb-2 animate-fade-up text-lg font-semibold animate-delay-150">
        Most Viewed Scripts
      </h2>
      <div className="min-w flex w-full flex-row flex-wrap gap-4">
        {latestScripts.map((item) => (
          <Card
            key={item.id}
            className=" min-w-[250px] flex-1 flex-grow animate-fade-up animate-delay-150"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex max-h-16 min-h-16 min-w-16 max-w-16 items-center justify-center rounded-lg bg-accent p-1">
                  <Image src={item.logo} height={40} width={40} alt=""></Image>
                </div>
                <h3 className="text-xl">
                  {item.title} {item.item_type}
                </h3>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Date added: {extractDate(item.created)}
              </p>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3 text-card-foreground">
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="">
              <Button asChild variant="secondary">
                <Link
                  href={{
                    pathname: "/scripts",
                    query: { id: item.title },
                  }}
                  className="text-muted-foreground"
                >
                  View Script
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
