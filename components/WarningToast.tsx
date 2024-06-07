"use client";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function WarningToast() {
  const toastShown = useRef(false);

  useEffect(() => {
    if (toastShown.current) return;
    toastShown.current = true;

    const count = sessionStorage.getItem("toastCount");
    if (count === null) {
      sessionStorage.setItem("toastCount", "1");
      setTimeout(showWarningToast, 1000);
    } else {
      const visitCount = parseInt(count, 10);
      if (visitCount < 3) {
        sessionStorage.setItem("toastCount", (visitCount + 1).toString());
        setTimeout(showWarningToast, 1000);
      }
    }
  }, []);

  const showWarningToast : any = () => {
    toast.warning(
      "Starting from July 2024, the scripts in the repository will require Proxmox Virtual Environment 8.1 or newer.", {
        duration: 5000,
      }
    );
  };

  return null;
}
