import { NextRequest, NextResponse } from "next/server";
import { pb } from "@/lib/pocketbase";
import { Script } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  try {
    const response = await pb
      .collection("proxmox_scripts")
      .getFirstListItem<Script>(`title="${title}"`, {
        expand: "alerts,alpine_script,default_login",
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
