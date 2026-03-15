"use client";

import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSelectorProps {
  sourceLang: string;
  targetLang: string;
  onSwap: () => void;
}

const languageLabels: Record<string, { name: string; flag: string }> = {
  en: { name: "English", flag: "EN" },
  ar: { name: "Tunisian Arabic", flag: "TN" },
};

export function LanguageSelector({ sourceLang, targetLang, onSwap }: LanguageSelectorProps) {
  const source = languageLabels[sourceLang];
  const target = languageLabels[targetLang];

  return (
    <div className="flex items-center justify-center gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={`source-${sourceLang}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
        >
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm font-medium"
          >
            {source.flag} · {source.name}
          </Badge>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full cursor-pointer transition-all duration-200 hover:scale-105"
        onClick={onSwap}
        aria-label="Swap languages"
      >
        <motion.div
          whileTap={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRightLeft className="h-4 w-4" />
        </motion.div>
      </Button>

      <AnimatePresence mode="wait">
        <motion.div
          key={`target-${targetLang}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm font-medium"
          >
            {target.flag} · {target.name}
          </Badge>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
