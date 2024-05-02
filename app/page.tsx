'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import LandingPage from "@/components/LandingPage";
import Footer from "@/components/Footer";

function page() {
  return (
    <>
      <LandingPage />
      <div className="h-screen"></div>
    </>
  );
}

export default page;
