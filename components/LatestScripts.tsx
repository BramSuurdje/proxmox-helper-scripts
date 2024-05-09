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

function LatestScripts() {
  const [latestScripts, setLatestScripts] = useState<Script[]>([]);

  async function getLatestScripts() {
    const record = await pb.collection("proxmox_scripts").getList(1, 3, {
      sort: "-created",
    });

    setLatestScripts(record.items as unknown as Script[]);
  }

  useEffect(() => {
    getLatestScripts();
  }, []);

  return (
    <div className="">
      <h2 className="mb-2 text-lg font-semibold ">Newest scripts</h2>
      <div className="min-w flex w-full flex-col gap-4 sm:flex-row">
        {latestScripts.map((item) => (
          <Card key={item.id} className="w-full animate-fade-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex max-h-16 min-h-16 min-w-16 max-w-16 items-center justify-center rounded-lg bg-accent p-1">
                  <Image src={item.logo} height={40} width={40} alt=""></Image>
                </div>
                <h3 className="text-xl">{item.title}</h3>
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
                    query: { id: item.id },
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

export default LatestScripts;
