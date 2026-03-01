import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode, MouseEventHandler } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function Button({ 
  className, 
  variant = "primary", 
  size = "md", 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-accent-green text-bg-primary hover:shadow-[0_0_15px_rgba(34,211,166,0.3)] hover:brightness-105 border border-transparent",
    secondary: "bg-transparent border border-accent-green text-accent-green hover:bg-accent-green/10",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-5 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl font-semibold"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center transition-all duration-200 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
