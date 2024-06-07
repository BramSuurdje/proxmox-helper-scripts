"use client";
import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

interface WarningToastProps {
  toastName: string;
  timeoutDuration: number;
  toastDuration: number;
  message: string;
  amountOfVisits: number;
}

export default function WarningToast({
  toastName,
  timeoutDuration,
  toastDuration,
  message,
  amountOfVisits,
}: WarningToastProps) {
  const toastShown = useRef(false);

  const showWarningToast = useCallback(() => {
    toast.warning(message, {
      duration: toastDuration,
    });
  }, [message, toastDuration]);

  useEffect(() => {
    if (toastShown.current) return;
    toastShown.current = true;

    const count = localStorage.getItem(toastName);
    if (count === null) {
      localStorage.setItem(toastName, "1");
      setTimeout(showWarningToast, timeoutDuration);
    } else {
      const visitCount = parseInt(count, 10);
      if (visitCount < amountOfVisits) {
        localStorage.setItem(toastName, (visitCount + 1).toString());
        setTimeout(showWarningToast, timeoutDuration);
      }
    }
  }, [toastName, timeoutDuration, amountOfVisits, showWarningToast]);

  return null;
}
