import { NextRequest, NextResponse } from "next/server";
import { pb } from "@/lib/pocketbase";
import { Script } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);

  try {
    const response = await pb
      .collection("proxmox_scripts")
      .getList<Script>(page, 3, {
        sort: "-created",
        fields: "title, logo, description, created, id",
      });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch script" },
      { status: 500 },
    );
  }
}
