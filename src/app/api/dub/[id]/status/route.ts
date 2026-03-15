import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const apiKey = process.env.ELEVEN_LABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ELEVEN_LABS_API_KEY is not set securely." },
        { status: 500 }
      );
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/dubbing/${id}`, {
      method: "GET",
      headers: {
        "xi-api-key": apiKey,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Status API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal failure" },
      { status: 500 }
    );
  }
}
