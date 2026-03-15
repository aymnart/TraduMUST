"use client";

import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSelectorProps {
  sourceLang: string;
  targetLang: string;
  onSwap: () => void;
}

const languageLabels: Record<string, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇺🇸" },
  ar: { label: "Arabic", flag: "🇸🇦" },
};

export function LanguageSelector({ sourceLang, targetLang, onSwap }: LanguageSelectorProps) {
  const source = languageLabels[sourceLang];
  const target = languageLabels[targetLang];

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden border-border/50 shadow-md transition-shadow hover:shadow-lg bg-card/50 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="relative flex min-h-[5rem] items-center justify-between px-6">
          {/* Source Language */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Translating from</span>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={sourceLang}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xl bg-background rounded-full p-1 shadow-sm border border-border/50">{source.flag}</span>
                  <span className="text-lg font-semibold text-foreground">{source.label}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center px-4 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={onSwap}
              className="h-12 w-12 rounded-full border-border/50 bg-background shadow-sm hover:shadow-md hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all cursor-pointer group"
            >
              <ArrowRightLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </Button>
          </div>

          {/* Target Language */}
          <div className="flex-1 text-right items-end justify-end flex flex-col">
            <div className="flex flex-col gap-1 items-end">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Translating to</span>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={targetLang}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-2 flex-row-reverse"
                >
                  <span className="text-xl bg-background rounded-full p-1 shadow-sm border border-border/50">{target.flag}</span>
                  <span className="text-lg font-bold text-primary">{target.label}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
