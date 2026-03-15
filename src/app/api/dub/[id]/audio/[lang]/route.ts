import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; lang: string }> }
) {
  try {
    const { id, lang } = await params;
    const apiKey = process.env.ELEVEN_LABS_API_KEY;

    if (!apiKey) {
      return new NextResponse("ELEVEN_LABS_API_KEY is not set.", { status: 500 });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/dubbing/${id}/audio/${lang}`,
      {
        method: "GET",
        headers: {
          "xi-api-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      return new NextResponse(`Audio API error: ${response.status}`, { status: response.status });
    }

    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "audio/mpeg",
        "Content-Disposition": `attachment; filename="dubbed_${lang}.mp3"`,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message || "Internal audio fetch error", {
      status: 500,
    });
  }
}
