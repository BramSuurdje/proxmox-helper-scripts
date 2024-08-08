import { NextRequest, NextResponse } from "next/server";
import { pb } from "@/lib/pocketbase";
import { Category } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const response = await pb.collection("categories").getFullList({
      expand: "items.alpine_script",
      sort: "order",
    });

    const res = NextResponse.json(response as unknown as Category[]);
    return res;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
