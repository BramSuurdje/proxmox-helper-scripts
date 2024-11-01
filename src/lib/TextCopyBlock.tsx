import { Button } from "@/components/ui/button";
import handleCopy from "./handleCopy";
import { Copy } from "lucide-react";

export default function TextCopyBlock(description: string) {
  const pattern = /`([^`]*)`/g;
  const parts = description.split(pattern);

  const formattedDescription = parts.map((part: string, index: number) => {
    if (index % 2 === 1) {
      return (
        <span
          key={index}
          className="bg-secondary py-1 px-2 rounded-lg inline-flex items-center gap-2"
        >
          {part}
          <Copy
            className="size-3 cursor-pointer"
            onClick={() => handleCopy("command", part)}
          />
        </span>
      );
    } else {
      return part;
    }
  });

  return formattedDescription;
}
