import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const sortCategories = (categories: Category[]): Category[] => {
  return categories.sort((a: Category, b: Category) => {
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
};

export default function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [links, setLinks] = React.useState<Category[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categories: Category[] = await response.json();
        if (categories.length === 0) {
          throw new Error("Empty response");
        }
        const sortedCategories = sortCategories(categories);
        setLinks(sortedCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64",
        )}
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">Search scripts...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.45rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="search for a script..." />
        <CommandList>
          <CommandEmpty>No scripts found.</CommandEmpty>
          {links.map((category) => (
            <CommandGroup
              key={"category:" + category.categoryId}
              heading={category.catagoryName}
            >
              {category.expand.items.map((script) => (
                <CommandItem
                  key={"script:"+script.id}
                  value={script.title}
                  onSelect={() => {
                    setOpen(false);
                    router.push(`/scripts?id=${script.title}`);
                  }}
                >
                  <div className="flex gap-2" onClick={() => setOpen(false)}>
                    <Image
                      src={script.logo}
                      height={16}
                      width={16}
                      alt=""
                      className="h-5 w-5"
                    />
                    <span>{script.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {script.item_type}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
