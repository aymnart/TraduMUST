"use client";

import { motion } from "framer-motion";

interface WaveformVisualizerProps {
  analyserData: Uint8Array | null;
  isRecording: boolean;
}

export function WaveformVisualizer({ analyserData, isRecording }: WaveformVisualizerProps) {
  const bars = 48;

  if (!isRecording || !analyserData) {
    return (
      <div className="flex h-24 items-center justify-center gap-[2px]" aria-hidden="true">
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full bg-muted-foreground/30"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-24 items-center justify-center gap-[2px]" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const dataIndex = Math.floor((i / bars) * analyserData.length);
        const value = analyserData[dataIndex] || 0;
        const height = Math.max(4, (value / 255) * 96);

        return (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-foreground/60"
            animate={{ height }}
            transition={{ duration: 0.05, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}
