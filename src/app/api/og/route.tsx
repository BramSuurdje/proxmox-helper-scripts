import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const logo = searchParams.get("logo");

  if (!title) {
    return new Response("Missing title parameter", { status: 400 });
  }

  if (!logo) {
    return new Response("Missing logo parameter", { status: 400 });
  }

  try {
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
            src={logo}
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
              fontSize: "48px",
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
    console.error("Error generating image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}