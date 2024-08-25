'use client';
import { Button } from '@/components/ui/button';
import handleCopy from '@/lib/handleCopy';
import React from 'react'

export default function InterFaces({ item }: { item: any }) {
  return (
    <div className="flex flex-col gap-2">
      {item.interface && (
        <div className="flex items-center justify-end">
          <h2 className="mr-2 text-end text-lg font-semibold">Interface:</h2>{" "}
          <Button
            variant={"secondary"}
            size={"sm"}
            onClick={() => handleCopy("interface", item.interface)}
          >
            {item.interface}
          </Button>
        </div>
      )}
      {!item.interface && item.port !== 0 && (
        <div className="flex items-center justify-end">
          <h2 className="mr-2 text-end text-lg font-semibold">Default Port:</h2>{" "}
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
  );
}
