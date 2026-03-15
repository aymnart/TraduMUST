import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const apiKey = process.env.ELEVEN_LABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { detail: { message: "ELEVEN_LABS_API_KEY is not set in environment variables." } },
        { status: 500 }
      );
    }

    // Always append watermark for safety/free tier if not present
    if (!formData.has("watermark")) {
      formData.append("watermark", "true");
    }

    const response = await fetch("https://api.elevenlabs.io/v1/dubbing", {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return NextResponse.json(
        errorData || { detail: { message: `Dubbing API HTTP error: ${response.status}` } },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { detail: { message: error.message || "Internal server error" } },
      { status: 500 }
    );
  }
}
