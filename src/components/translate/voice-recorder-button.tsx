"use client";

import { Mic, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VoiceRecorderButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function VoiceRecorderButton({
  isRecording,
  isProcessing,
  onStart,
  onStop,
}: VoiceRecorderButtonProps) {
  const handleClick = () => {
    if (isProcessing) return;
    if (isRecording) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Pulse ring for recording state */}
        {isRecording && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-destructive"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <Button
          size="icon"
          variant={isRecording ? "destructive" : "default"}
          className={cn(
            "relative h-20 w-20 rounded-full cursor-pointer transition-all duration-200",
            isRecording && "shadow-lg",
            isProcessing && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleClick}
          disabled={isProcessing}
          aria-label={
            isProcessing
              ? "Processing..."
              : isRecording
                ? "Stop recording"
                : "Start recording"
          }
        >
          {isProcessing ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : isRecording ? (
            <Square className="h-7 w-7" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        {isProcessing
          ? "Processing..."
          : isRecording
            ? "Tap to stop recording"
            : "Tap to start recording"}
      </p>
    </div>
  );
}
