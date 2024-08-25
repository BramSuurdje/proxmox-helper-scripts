'use client';
import { Button } from "@/components/ui/button";
import handleCopy from "./handleCopy";

export default function TextCopyBlock(description: string) {
  const pattern = /`([^`]*)`/g;
  const parts = description.split(pattern);

  const formattedDescription = parts.map((part: string, index: number) => {
    if (index % 2 === 1) {
      return (
        <Button
          variant={"secondary"}
          size={"null"}
          key={index}
          onClick={() => handleCopy("command", part)}
        >
          {part}
        </Button>
      );
    } else {
      return part;
    }
  });

  return formattedDescription;
};
