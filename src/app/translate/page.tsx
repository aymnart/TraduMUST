"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useConversation } from "@elevenlabs/react";
import {
  Languages,
  ArrowLeft,
  AlertCircle,
  Mic,
  Square,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { LanguageSelector } from "@/components/translate/language-selector";

export default function TranslatePage() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("ar");

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs Agent");
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs Agent");
    },
    onMessage: (message) => {
      console.log("Message received:", message);
    },
    onError: (error) => {
      console.error("Conversation error:", error);
    },
  });

  const swapLanguages = useCallback(() => {
    setSourceLang((prev) => (prev === "en" ? "ar" : "en"));
    setTargetLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const handleStartConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "",
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const handleStopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Failed to stop conversation:", error);
    }
  }, [conversation]);

  const isConnected = conversation.status === "connected";
  const isConnecting = conversation.status === "connecting";

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
              <CardContent className="flex flex-col items-center gap-8 p-10">
                {/* Visualizer / Status Indicator */}
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    {isConnected ? (
                      <motion.div
                        key="active-orb"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative flex items-center justify-center"
                      >
                        <motion.div
                          animate={{
                            scale: conversation.isSpeaking ? [1, 1.2, 1] : 1,
                            opacity: conversation.isSpeaking ? [0.5, 0.8, 0.5] : 0.2,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute h-32 w-32 rounded-full bg-primary/20"
                        />
                        <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                          <Activity className="h-8 w-8 text-primary" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle-orb"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 border border-border"
                      >
                        <Mic className="h-8 w-8 text-muted-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="text-center space-y-2 h-10">
                  <h3 className="text-lg font-medium">
                    {isConnecting
                      ? "Connecting..."
                      : isConnected
                        ? conversation.isSpeaking
                          ? "Agent is translating..."
                          : "Listening to you..."
                        : "Ready to translate"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isConnected
                      ? "Speak normally. The agent will respond instantly."
                      : "Click below to start a real-time voice session."}
                  </p>
                </div>

                {/* Main Action Button */}
                <div className="flex gap-4">
                  {!isConnected ? (
                    <Button
                      size="lg"
                      className="cursor-pointer gap-2 px-8 h-12 rounded-full"
                      onClick={handleStartConversation}
                      disabled={isConnecting}
                    >
                      <Mic className="h-5 w-5" />
                      {isConnecting ? "Connecting..." : "Start Conversation"}
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      variant="destructive"
                      className="cursor-pointer gap-2 px-8 h-12 rounded-full"
                      onClick={handleStopConversation}
                    >
                      <Square className="h-5 w-5 fill-current" />
                      Stop
                    </Button>
                  )}
                </div>

              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
