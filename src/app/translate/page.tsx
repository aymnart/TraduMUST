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
            <Card className="border-border/60 shadow-lg bg-card/80 backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-50" />
              <CardContent className="flex flex-col items-center gap-8 p-12">
                {/* Visualizer / Status Indicator */}
                <div className="relative flex h-36 w-36 items-center justify-center">
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
                            scale: conversation.isSpeaking ? [1, 1.25, 1] : 1,
                            opacity: conversation.isSpeaking ? [0.6, 0.9, 0.6] : 0.3,
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute h-36 w-36 rounded-full bg-primary/20"
                        />
                        <motion.div
                          animate={{
                            scale: conversation.isSpeaking ? [1, 1.1, 1] : 1,
                            opacity: conversation.isSpeaking ? [0.8, 1, 0.8] : 0.4,
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.1,
                          }}
                          className="absolute h-28 w-28 rounded-full bg-primary/30"
                        />
                        <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 border-2 border-primary/40 backdrop-blur-sm shadow-[0_0_30px_rgba(var(--primary),0.3)]">
                          <Activity className="h-8 w-8 text-primary" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle-orb"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary border-2 border-border/80 shadow-inner group transition-all duration-500"
                      >
                        <Mic className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="text-center space-y-3 h-14">
                  <h3 className="text-xl font-semibold text-foreground tracking-tight">
                    {isConnecting
                      ? "Connecting to server..."
                      : isConnected
                        ? conversation.isSpeaking
                          ? "Translating for you..."
                          : "Listening..."
                        : "Ready to translate"}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isConnected
                      ? "Speak normally. The translation is instant."
                      : "Tap below to start a friendly voice session."}
                  </p>
                </div>

                {/* Main Action Button */}
                <div className="flex gap-4 pt-4">
                  {!isConnected ? (
                    <Button
                      size="lg"
                      className="cursor-pointer gap-2 px-10 h-14 rounded-full text-base font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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
                      className="cursor-pointer gap-2 px-10 h-14 rounded-full text-base font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      onClick={handleStopConversation}
                    >
                      <Square className="h-5 w-5 fill-current" />
                      End Session
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
