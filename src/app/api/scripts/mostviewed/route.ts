import { NextRequest, NextResponse } from "next/server";
import { pb } from "@/lib/pocketbase";
import { Script } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const response = await pb
      .collection("proxmox_scripts")
      .getList<Script>(1, 3, {
        filter: `isMostViewed = true`,
        fields: "title, logo, description, created, id"
      })

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch script" },
      { status: 500 },
    );
  }
}
