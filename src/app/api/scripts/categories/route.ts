import { NextResponse } from "next/server";
import { pb } from "@/lib/pocketbase";
import { Category } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
      const response = await pb.collection("categories").getFullList<Category>({
      expand: "items",
      fields:
        "catagoryName, expand.items.title, expand.items.logo, expand.items.item_type, expand.items.isMostViewed, id",
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
