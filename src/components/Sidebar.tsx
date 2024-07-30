import { getCategoryScripts } from "@/lib/actions";
import React from "react";

export default async function Sidebar() {
  const categories = await getCategoryScripts();

  return <div className="border-r border-border min-w-64 min-h-max">
    <ul className="flex flex-col gap-4 p-4">
      {categories.map((category) => (
        <li key={category.id} className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary">{category.name[0]}</span>
          </div>
          <span className="font-semibold">{category.name}</span>
        </li>
      ))}
    </ul>
  </div>;
}
