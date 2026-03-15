"use client";

import { motion } from "framer-motion";
import { Mic, Sparkles, Headphones } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const steps = [
  {
    number: "01",
    icon: Mic,
    title: "Record Your Voice",
    description: "Tap the microphone and speak naturally in English or Arabic.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Dubbing",
    description: "ElevenLabs processes your audio and translates it with natural voice cloning.",
  },
  {
    number: "03",
    icon: Headphones,
    title: "Listen & Share",
    description: "Play back the translated audio or download it for sharing.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It <span className="text-muted-foreground">Works</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to translate your voice across languages.
          </p>
        </div>

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              variants={itemVariants}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] bg-border md:block" />
              )}

              <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border/50 bg-muted/50">
                  <step.icon className="h-8 w-8 text-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  {step.number}
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
