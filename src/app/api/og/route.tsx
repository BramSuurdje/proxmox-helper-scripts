import { pb } from "@/lib/pocketbase";
import { Script } from "@/lib/types";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { ClientResponseError } from 'pocketbase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return new Response("Missing title parameter", { status: 400 });
  }

  try {
    const script: Script = await pb.collection('proxmox_scripts').getFirstListItem(`title="${title}"`, {
      fields: "logo,id",
    });

    return new ImageResponse(
      (
        <div
          style={{
            background: "rgb(30,41,59)",
            backgroundImage: "linear-gradient(67deg, rgba(30, 41, 59, 1) 0%, rgba(15, 23, 42, 1) 50%, rgba(30, 41, 59, 1) 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <img
            src="https://proxmox-helper-scripts.vercel.app/logo.png"
            alt="Proxmox Helper Scripts"
            style={{
              width: "75px",
              height: "75px",
              position: "absolute",
              top: "10px",
              left: "5px",
              objectFit: "contain",
            }}
          /> */}
          <img
            src={script.logo}
            alt={title}
            style={{
              maxWidth: "40%",
              maxHeight: "40%",
              objectFit: "contain",
            }}
          />
          <p
            style={{
              color: "white",
              fontSize: "64px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {title}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    console.error("Error fetching script or generating image:", error);
    
    if (error instanceof ClientResponseError && error.status === 404) {
      return new Response("Script not found", { status: 404 });
    }
    
    return new Response("Error generating image", { status: 500 });
  }
}