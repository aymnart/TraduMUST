"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/section-wrapper";

export function CTASection() {
  return (
    <SectionWrapper className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-muted/30 p-8 text-center sm:p-16">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Break Language Barriers?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Start translating your voice between English and Arabic in seconds.
              No sign-up required.
            </p>
            <div className="mt-8">
              <Link href="/translate">
                <Button size="lg" className="gap-2 cursor-pointer text-base px-8">
                  Start Translating Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
