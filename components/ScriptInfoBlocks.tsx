import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Category } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { extractDate } from "@/lib/time";

const ITEMS_PER_PAGE = 3;

export function LatestScripts({ items }: { items: Category[] }) {
  const [page, setPage] = useState(1);

  const latestScripts = useMemo(() => {
    if (!items) return [];
    const scripts = items.flatMap((category) => category.expand.items || []);
    return scripts.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );
  }, [items]);

  const goToNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = page * ITEMS_PER_PAGE;

  if (!items) {
    return null;
  }

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
                className=" cursor-pointer select-none p-2 text-sm font-semibold"
              >
                {page === 1 ? "More.." : "Next"}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="min-w flex w-full flex-row flex-wrap gap-4">
        {latestScripts.slice(startIndex, endIndex).map((item) => (
          <Card
            key={item.id}
            className=" min-w-[250px] flex-1 flex-grow bg-accent/30"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex max-h-16 min-h-16 min-w-16 max-w-16 items-center justify-center rounded-lg bg-accent p-1">
                  <Image src={item.logo} height={40} width={40} alt="" />
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
              <CardDescription className=" line-clamp-3 text-card-foreground">{item.description}</CardDescription>
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

export function MostViewedScripts({ items }: { items: Category[] }) {
  const [page, setPage] = useState(1);

  const mostViewedScripts = useMemo(() => {
    if (!items) return [];
    const scripts = items.flatMap((category) => category.expand.items || []);
    const mostViewedScripts = scripts
      .filter((script) => script.isMostViewed)
      .map((script) => ({
        ...script,
      }))
      .sort((a, b) => a.mostViewedPosition - b.mostViewedPosition);
    return mostViewedScripts;
  }, [items]);

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
      {mostViewedScripts.length > 0 && (
        <>
          <h2 className="text-lg font-semibold">Most Viewed Scripts</h2>
          <p className="mb-2 text-sm text-muted-foreground">
            This data, unfortunately, is not directly influenced by interacting
            with the website. (yet)
          </p>
        </>
      )}
      <div className="min-w flex w-full flex-row flex-wrap gap-4">
        {mostViewedScripts.slice(startIndex, endIndex).map((item) => (
          <Card
            key={item.id}
            className=" min-w-[250px] flex-1 flex-grow bg-accent/30"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex max-h-16 min-h-16 min-w-16 max-w-16 items-center justify-center rounded-lg bg-accent p-1">
                  <Image src={item.logo} height={40} width={40} alt="" />
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
              <CardDescription className=" line-clamp-3 text-card-foreground">{item.description}</CardDescription>
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
      <div className="flex justify-end gap-1 p-2">
        {page > 1 && (
          <Button onClick={goToPreviousPage} variant="outline">
            Previous
          </Button>
        )}
        {endIndex < mostViewedScripts.length && (
          <Button onClick={goToNextPage} variant="outline">
            {page === 1 ? "More.." : "Next"}
          </Button>
        )}
      </div>
    </div>
  );
}

export function RecentlyUpdatedScripts({
  items,
}: {
  items: Category[];
}) {
  const [page, setPage] = useState(1);

  const updatedScripts = useMemo(() => {
    if (!items) return [];
    const scripts = items.flatMap((category) => category.expand.items || []);
    const updatedScripts = scripts.map((script) => ({
      ...script,
      updated: new Date(script.updated),
    }));
    return updatedScripts.sort(
      (a, b) => b.updated.getTime() - a.updated.getTime(),
    );
  }, [items]);

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
      {updatedScripts.length > 0 && (
        <div className="flex w-full items-center justify-between">
          <h2 className="mb-2 text-lg font-semibold">
            Recently Updated Scripts
          </h2>
          <div className="flex items-center justify-end gap-1">
            {page > 1 && (
              <div
                className="cursor-pointer select-none p-2 text-sm font-semibold"
                onClick={goToPreviousPage}
              >
                Previous
              </div>
            )}
            {endIndex < updatedScripts.length && (
              <div
                onClick={goToNextPage}
                className=" cursor-pointer select-none p-2 text-sm font-semibold"
              >
                {page === 1 ? "More.." : "Next"}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="min-w flex w-full flex-row flex-wrap gap-4">
        {updatedScripts.slice(startIndex, endIndex).map((item) => (
          <Card
            key={item.id}
            className=" min-w-[250px] flex-1 flex-grow bg-accent/30"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex max-h-16 min-h-16 min-w-16 max-w-16 items-center justify-center rounded-lg bg-accent p-1">
                  <Image src={item.logo} height={40} width={40} alt="" />
                </div>
                <h3 className="text-xl">
                  {item.title} {item.item_type}
                </h3>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Last updated: {item.updated.toISOString().split("T")[0]}
              </p>
            </CardHeader>
            <CardContent>
              <CardDescription className=" line-clamp-3 text-card-foreground">{item.description}</CardDescription>
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