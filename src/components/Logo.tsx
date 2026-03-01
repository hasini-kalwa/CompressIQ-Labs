import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      {/* Top Part */}
      {/* Top Face */}
      <path d="M50 0 L93.3 25 L50 50 L6.7 25 L50 0Z" fill="#22D3A6" />
      {/* Right Face */}
      <path d="M93.3 25 V58.3 L50 83.3 V50 L93.3 25Z" fill="#10B981" />
      {/* Left Face (Inner) */}
      <path d="M6.7 25 V58.3 L50 83.3 V50 L6.7 25Z" fill="#059669" />

      {/* Bottom Part (Offset down) */}
      {/* Top Face (Hidden/Inner) */}
      <path d="M50 58.3 L93.3 83.3 L50 108.3 L6.7 83.3 L50 58.3Z" fill="#22D3A6" opacity="0.9" />
      {/* Right Face */}
      <path d="M93.3 83.3 V116.6 L50 141.6 V108.3 L93.3 83.3Z" fill="#10B981" />
      {/* Left Face */}
      <path d="M6.7 83.3 V116.6 L50 141.6 V108.3 L6.7 83.3Z" fill="#059669" />
      
      {/* Let's try a simpler, cleaner geometric construction that matches the "S" shape */}
      {/* Clear and redraw */}
      <rect width="100" height="116" fill="transparent" />
      
      {/* Top Segment */}
      <path d="M50 0 L100 29 L50 58 L0 29 L50 0Z" fill="#22D3A6" />
      <path d="M100 29 V63 L50 92 V58 L100 29Z" fill="#10B981" />
      
      {/* Bottom Segment */}
      <path d="M50 58 L100 87 L50 116 L0 87 L50 58Z" fill="#22D3A6" />
      <path d="M0 87 V53 L50 24 V58 L0 87Z" fill="#059669" />
    </svg>
  );
}
