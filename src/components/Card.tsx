import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hoverEffect = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, backgroundColor: "var(--color-bg-hover)" } : undefined}
      onClick={onClick}
      className={cn(
        "bg-bg-secondary rounded-2xl p-6 border border-white/5 shadow-sm transition-colors duration-200",
        hoverEffect && "cursor-pointer hover:border-accent-green/30",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
