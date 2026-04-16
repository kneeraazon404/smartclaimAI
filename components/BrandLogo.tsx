import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export function BrandMark({ size = 36, className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex shrink-0 p-0.5", className)}>
      <Image
        src="/apple-touch-icon.png"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="rounded-xl"
      />
    </span>
  );
}
