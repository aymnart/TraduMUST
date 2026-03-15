"use client";

import { motion } from "framer-motion";
import { Mic, Globe, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const features = [
  {
    icon: Mic,
    title: "Voice Input",
    description:
      "Simply speak into your microphone. Our app captures your voice with high-quality recording for accurate translation.",
  },
  {
    icon: Globe,
    title: "AI Dubbing",
    description:
      "ElevenLabs AI dubbing technology translates and preserves your vocal characteristics across English and Arabic.",
  },
  {
    icon: Volume2,
    title: "Natural Speech Output",
    description:
      "Listen to your translated message in a natural-sounding voice that maintains the tone and emotion of the original.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function Features() {
  return (
    <SectionWrapper
      id="features"
      className="px-4 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need for{" "}
            <span className="text-muted-foreground">Voice Translation</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powered by cutting-edge AI technology from ElevenLabs, delivering
            seamless voice-to-voice translation.
          </p>
        </div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants}>
              <Card className="group relative overflow-hidden border-border transition-all duration-300 hover:border-foreground/20 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-foreground/10">
                    <feature.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
