"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
            <Languages className="h-5 w-5 text-background" />
          </div>
          <span className="text-lg font-bold tracking-tight">TraduMUST</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            How It Works
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Link href="/translate">
            <Button size="sm" className="cursor-pointer">
              Try Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
