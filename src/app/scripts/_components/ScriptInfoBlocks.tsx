"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { Category, Script } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { extractDate } from "@/lib/time";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 3;

export function LatestScripts() {
  const [page, setPage] = useState(1);
  const [latestScripts, setLatestScripts] = useState<Script[]>([]);

  useEffect(() => {
    fetch(`/api/scripts/latest?page=${page}`)
      .then((res) => res.json())
      .then((data: any) => {
        if (Array.isArray(data.items)) {
          setLatestScripts(data.items as Script[]);
        } else {
          console.error("Unexpected data format: ", data);
          setLatestScripts([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const goToNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = page * ITEMS_PER_PAGE;

  return (
    <div className="">
      {latestScripts.length > 0 && (
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-semibold">Newest Scripts</h2>
          <div className="flex items-center justify-end gap-1">
            {page > 1 && (
              <div
                className="cursor-pointer select-none p-2 text-sm font-semibold"
                onClick={goToPreviousPage}
              >
                Previous
              </div>
            )}
            {endIndex < latestScripts.length && (
              <div
                onClick={goToNextPage}
                className="cursor-pointer select-none p-2 text-sm font-semibold"
              >
                {page === 1 ? "More.." : "Next"}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="min-w flex w-full flex-row flex-wrap gap-4">
        {latestScripts.map((item) => (
          <Card
            key={item.id}
            className="min-w-[250px] flex-1 flex-grow bg-accent/30"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-accent p-1">
                  <Image
                    src={item.logo}
                    height={64}
                    width={64}
                    alt=""
                    className="h-11 w-11 object-contain"
                  />
                </div>
                <p className="text-xl">
                  {item.title} {item.item_type}
                </p>
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
                  href={`/scripts/${item.title}`}
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

export function MostViewedScripts() {
  const [scripts, setScripts] = useState<Script[]>([]);

  useEffect(() => {
    fetch("/api/scripts/mostviewed")
      .then((res) => res.json())
      .then((data: any) => {
        if (Array.isArray(data.items)) {
          setScripts(data.items as Script[]);
        } else {
          console.error("Unexpected data format: ", data);
          setScripts([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="">
      {scripts.length > 0 && (
        <>
          <h2 className="text-lg font-semibold">Most Viewed Scripts</h2>
        </>
      )}
      <div className="min-w flex w-full flex-row flex-wrap gap-4">
        {scripts.map((item: Script) => (
          <Card
            key={item.id}
            className="min-w-[250px] flex-1 flex-grow bg-accent/30"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex max-h-16 min-h-16 min-w-16 max-w-16 items-center justify-center rounded-lg bg-accent p-1">
                  <Image
                    src={item.logo}
                    height={64}
                    width={64}
                    alt=""
                    className="h-11 w-11 object-contain"
                  />
                </div>
                <p className="text-xl">
                  {item.title} {item.item_type}
                </p>
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
                  href={`/scripts/${item.title}`}
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
