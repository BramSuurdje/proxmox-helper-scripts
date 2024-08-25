"use client";
import { X } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();

  const closeScript = () => {
    router.push("/scripts");
  };

  return <X onClick={closeScript} className="cursor-pointer" />;
}
