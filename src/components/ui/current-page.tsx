"use client";
import { usePathname } from "next/navigation";

export default function CurrentPage() {
  const pathname = usePathname();
  const currentPage = pathname.split("/")[1];

  return (
    <>
      {currentPage && (
        <div className="absolute right-4 z-50 top-4 flex items-center justify-between space-x-1 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm">
          <span className="text-muted-foreground">Current Page:</span>
          <span>{currentPage}</span>
        </div>
      )}
    </>
  );
}
