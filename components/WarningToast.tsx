"use client";
import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Link from "next/link";

interface WarningToastProps {
  toastName: string;
  timeoutDuration: number;
  toastDuration: number;
  message: string;
  amountOfVisits: number;
  toastButtonMessage: string;
}

export function WarningToast({
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

export function InfoToastWithButton({
  toastName,
  timeoutDuration,
  toastDuration,
  message,
  amountOfVisits,
  toastButtonMessage,
}: WarningToastProps) {
  const toastShown = useRef(false);

  const showWarningToast = useCallback(() => {
    toast.info(
      <div className="flex flex-col gap-3">
        <p className="lg text-black dark:text-white">{message}</p>
        <div>
          <Button className="text-white">
            <Link
              href="https://insigh.to/b/proxmox-ve-helper-scripts"
              data-umami-event="Give Feedback"
              target="_blank"
            >
              {toastButtonMessage}
            </Link>
          </Button>
        </div>
      </div>,
      { duration: toastDuration },
    );
  }, [message, toastDuration, toastButtonMessage]);

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
