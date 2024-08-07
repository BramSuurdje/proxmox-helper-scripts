import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { ClipboardCheck } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleCopy = (type: string, value: any) => {
    navigator.clipboard.writeText(value);

    let warning = localStorage.getItem("warning");

    if (warning === null) {
      localStorage.setItem("warning", "1");
      setTimeout(() => {
        toast.error(
          "be careful when copying scripts from the internet. Always remember check the source!",
          { duration: 8000 },
        );
      }, 500);
    }

  toast.success(
    `copied ${type} to clipboard`, {
        icon: <ClipboardCheck className="h-4 w-4" />,
      }
    );
  };