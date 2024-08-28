import { pb } from "@/lib/pocketbase";
import { Script } from "@/lib/types";
import { ImageResponse } from "next/og";
import { ClientResponseError } from 'pocketbase';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function GET({ params }: { params: { title: string } }) {
  const title = params.title;

  if (!title) {
    return new Response("Missing title parameter", { status: 400 });
  }

  try {
    const item = await fetchScript(title);
    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(to bottom right, #4F46E5, #7C3AED)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "40px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src={item.logo}
                alt={`${item.title} logo`}
                width={100}
                height={100}
                style={{ marginRight: "20px" }}
              />
              <img
                src="https://proxmox-helper-scripts.vercel.app/logo.png"
                alt="Website logo"
                width={100}
                height={100}
              />
            </div>
            <h1
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                color: "#1F2937",
                textAlign: "center",
                margin: "0",
                maxWidth: "800px",
              }}
            >
              {item.title}
            </h1>
          </div>
        </div>
      ),
      {
        ...size,
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

async function fetchScript(title: string): Promise<Script> {
  return await pb.collection('proxmox_scripts').getFirstListItem(`title="${title}"`, {
    fields: "logo,id",
  });
}