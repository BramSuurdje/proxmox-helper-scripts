import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
}

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const logo = searchParams.get("logo");

  if (!title || !logo) {
    return new Response("Invalid request", { status: 400 });
  }

  return new ImageResponse(
    (
      <div
        className="bg-background h-full w-full flex flex-col justify-center items-center"
      >
        <img
          src={logo}
          alt={title}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
        <p
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            position: "absolute",
            bottom: "20px",
            left: "20px",
            textShadow: "2px 2px 2px black",
          }}
        >
          {title}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}