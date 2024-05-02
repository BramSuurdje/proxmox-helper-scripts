import React from "react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <div className="mt-20 w-full bg-secondary py-6 text-center">{year}</div>
  );
}
