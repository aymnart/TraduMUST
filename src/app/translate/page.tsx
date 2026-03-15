"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Languages,
  Settings,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { LanguageSelector } from "@/components/translate/language-selector";
import { VoiceRecorderButton } from "@/components/translate/voice-recorder-button";
import { WaveformVisualizer } from "@/components/translate/waveform-visualizer";
import { AudioPlayer } from "@/components/translate/audio-player";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { dubAudio } from "@/lib/elevenlabs";

type TranslationStatus =
  | "idle"
  | "recording"
  | "processing"
  | "success"
  | "error";

export default function TranslatePage() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("ar");
  const [status, setStatus] = useState<TranslationStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dubbedAudioUrl, setDubbedAudioUrl] = useState<string | null>(null);

  const {
    isRecording,
    audioBlob,
    audioUrl: recordedAudioUrl,
    analyserData,
    startRecording,
    stopRecording,
    resetRecording,
    error: recorderError,
  } = useAudioRecorder();

  const swapLanguages = useCallback(() => {
    setSourceLang((prev) => (prev === "en" ? "ar" : "en"));
    setTargetLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const handleStartRecording = useCallback(async () => {
    if (dubbedAudioUrl) {
      URL.revokeObjectURL(dubbedAudioUrl);
      setDubbedAudioUrl(null);
    }
    resetRecording();
    setStatus("recording");
    setErrorMessage("");
    await startRecording();
  }, [dubbedAudioUrl, resetRecording, startRecording]);

  const handleStopRecording = useCallback(async () => {
    stopRecording();

    // Wait a tick for the blob to be set
    await new Promise((resolve) => setTimeout(resolve, 200));
  }, [stopRecording]);

  const handleTranslate = useCallback(async () => {
    if (!audioBlob) return;

    setStatus("processing");
    setErrorMessage("");

    try {
      const dubbedBlob = await dubAudio(
        audioBlob,
        sourceLang,
        targetLang,
        (msg) => setStatusMessage(msg)
      );

      const url = URL.createObjectURL(dubbedBlob);
      setDubbedAudioUrl(url);
      setStatus("success");
      setStatusMessage("Translation complete!");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Translation failed. Please try again."
      );
    }
  }, [audioBlob, sourceLang, targetLang]);

  const handleReset = useCallback(() => {
    if (dubbedAudioUrl) {
      URL.revokeObjectURL(dubbedAudioUrl);
      setDubbedAudioUrl(null);
    }
    resetRecording();
    setStatus("idle");
    setStatusMessage("");
    setErrorMessage("");
  }, [dubbedAudioUrl, resetRecording]);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Back to home">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              <span className="text-sm font-semibold">TraduMUST</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-8">
          {/* Language Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LanguageSelector
              sourceLang={sourceLang}
              targetLang={targetLang}
              onSwap={swapLanguages}
            />
          </motion.div>

          {/* Recorder Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border shadow-sm">
                <CardContent className="flex flex-col items-center gap-6 p-8">
                {/* Waveform Visualizer */}
                <WaveformVisualizer
                  analyserData={analyserData}
                  isRecording={isRecording}
                />

                {/* Record Button */}
                <VoiceRecorderButton
                  isRecording={isRecording}
                  isProcessing={status === "processing"}
                  onStart={handleStartRecording}
                  onStop={handleStopRecording}
                />

                {/* Recorder Error */}
                {recorderError && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {recorderError}
                  </div>
                )}

                {/* Recorded Audio Player */}
                <AnimatePresence>
                  {recordedAudioUrl && !isRecording && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <AudioPlayer
                        audioUrl={recordedAudioUrl}
                        label="Your Recording"
                        onReset={handleReset}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Translate Button */}
                {audioBlob && !isRecording && status !== "processing" && status !== "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      size="lg"
                      className="gap-2 cursor-pointer px-8"
                      onClick={handleTranslate}
                    >
                      <Languages className="h-4 w-4" />
                      Translate to {targetLang === "ar" ? "Tunisian Arabic" : "English"}
                    </Button>
                  </motion.div>
                )}

                {/* Status Message */}
                {status === "processing" && statusMessage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-muted-foreground"
                  >
                    {statusMessage}
                  </motion.p>
                )}

                {/* Error Message */}
                {errorMessage && status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-destructive"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMessage}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Dubbed Audio Output */}
          <AnimatePresence>
            {dubbedAudioUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
              >
                <Card className="border-border shadow-sm">
                  <CardContent className="space-y-4 p-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">Translation Complete</h3>
                    </div>
                    <AudioPlayer
                      audioUrl={dubbedAudioUrl}
                      label={`Translated Audio (${targetLang === "ar" ? "Tunisian Arabic" : "English"})`}
                      showDownload
                    />
                    <div className="flex justify-center pt-2">
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={handleReset}
                      >
                        Translate Another
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
