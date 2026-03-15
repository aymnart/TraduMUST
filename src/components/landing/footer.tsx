import { Languages } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="px-4 pb-8 pt-16">
      <div className="mx-auto max-w-7xl">
        <Separator className="mb-8" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
              <Languages className="h-4 w-4 text-background" />
            </div>
            <span className="text-sm font-semibold">TraduMUST</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TraduMUST. Powered by ElevenLabs AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
