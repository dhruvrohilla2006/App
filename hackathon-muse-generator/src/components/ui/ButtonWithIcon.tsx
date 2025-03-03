
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ButtonWithIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
}

export function ButtonWithIcon({
  icon: Icon,
  iconPosition = "left",
  variant = "default",
  size = "default",
  children,
  className,
  ...props
}: ButtonWithIconProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative overflow-hidden transition-all group",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === "left" && (
          <Icon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        )}
        <span>{children}</span>
        {Icon && iconPosition === "right" && (
          <Icon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </Button>
  );
}
