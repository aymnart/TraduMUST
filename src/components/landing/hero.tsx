"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

function AnimatedWave() {
  const bars = 40;

  return (
    <div className="flex items-center justify-center gap-[2px] h-32" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-foreground/20"
          animate={{
            height: [
              8 + Math.random() * 16,
              24 + Math.random() * 80,
              8 + Math.random() * 16,
            ],
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" aria-hidden="true" />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Mic className="h-3.5 w-3.5" />
            Powered by ElevenLabs AI
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Break Language Barriers{" "}
          <span className="text-muted-foreground">With Your Voice</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          Speak in English or Arabic and get instant, natural-sounding voice
          translations powered by advanced AI dubbing technology.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/translate">
            <Button size="lg" className="gap-2 cursor-pointer text-base px-8">
              Start Translating
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#features">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 cursor-pointer text-base px-8"
            >
              Learn More
            </Button>
          </a>
        </motion.div>

        <motion.div
          className="mt-16 w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <AnimatedWave />
        </motion.div>
      </div>
    </section>
  );
}
