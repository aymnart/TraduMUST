export interface DubbingResponse {
  dubbing_id: string;
  expected_duration_sec: number;
}

export interface DubbingStatus {
  dubbing_id: string;
  name: string;
  status: "dubbing" | "dubbed" | "failed";
  target_languages: string[];
  error?: string;
  detail?: any;
}

/**
 * Create a dubbing job from an audio Blob by calling our local API proxy.
 */
export async function createDubbing(
  audioBlob: Blob,
  sourceLang: string,
  targetLang: string
): Promise<DubbingResponse> {
  const formData = new FormData();
  formData.append("file", audioBlob, "recording.webm");
  formData.append("source_lang", sourceLang);
  formData.append("target_lang", targetLang);

  const response = await fetch("/api/dub", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.detail?.message || error?.error || `Dubbing failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Poll the dubbing status from our local proxy until it's done or failed.
 */
export async function getDubbingStatus(dubbingId: string): Promise<DubbingStatus> {
  const response = await fetch(`/api/dub/${dubbingId}/status`);

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.error || `Failed to get dubbing status: ${response.status}`);
  }

  return response.json();
}

/**
 * Get the dubbed audio file as a Blob through our proxy.
 */
export async function getDubbedAudio(
  dubbingId: string,
  targetLang: string
): Promise<Blob> {
  const response = await fetch(`/api/dub/${dubbingId}/audio/${targetLang}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get dubbed audio: ${response.status} - ${errorText}`);
  }

  return response.blob();
}

/**
 * Full dubbing pipeline: create → poll → get audio.
 * Returns the dubbed audio Blob.
 */
export async function dubAudio(
  audioBlob: Blob,
  sourceLang: string,
  targetLang: string,
  onStatusUpdate?: (status: string) => void
): Promise<Blob> {
  onStatusUpdate?.("Starting dubbing...");

  const { dubbing_id } = await createDubbing(audioBlob, sourceLang, targetLang);

  onStatusUpdate?.("Processing audio...");

  // Poll for completion
  const maxAttempts = 150; // 5 minutes max (150 * 2000ms)
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const status = await getDubbingStatus(dubbing_id);

    if (status.status === "dubbed") {
      onStatusUpdate?.("Retrieving translated audio...");
      return getDubbedAudio(dubbing_id, targetLang);
    }

    if (status.status === "failed") {
      throw new Error(status.error || "Dubbing failed");
    }

    onStatusUpdate?.(`Processing audio... (${i + 1})`);
  }

  throw new Error("Dubbing timed out after 5 minutes");
}
