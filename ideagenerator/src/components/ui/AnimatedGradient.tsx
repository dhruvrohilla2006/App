
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedGradient({ className, children }: AnimatedGradientProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="absolute inset-0 opacity-20 dark:opacity-30 bg-gradient-to-r from-rose-100 via-purple-100 to-indigo-100 dark:from-rose-950 dark:via-purple-950 dark:to-indigo-950 animate-gradient-background"
        style={{ backgroundSize: '400% 400%' }}
      />
      {children}
    </div>
  );
}
