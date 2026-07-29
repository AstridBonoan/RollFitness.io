import Image from "next/image";

import { cn } from "@/lib/utils";

type ProfileAvatarProps = {
  name?: string | null;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "size-10 text-sm",
  md: "size-16 text-lg",
  lg: "size-24 text-2xl",
} as const;

const sizePixels = {
  sm: 40,
  md: 64,
  lg: 96,
} as const;

function initialsFromName(name?: string | null) {
  if (!name?.trim()) {
    return "RF";
  }

  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "RF";
}

export function ProfileAvatar({
  name,
  avatarUrl,
  size = "md",
  className,
}: ProfileAvatarProps) {
  const initials = initialsFromName(name);

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name ? `Profile photo of ${name}` : "Profile photo"}
        width={sizePixels[size]}
        height={sizePixels[size]}
        className={cn(
          "rounded-full object-cover ring-2 ring-border",
          sizeClasses[size],
          className,
        )}
        unoptimized={avatarUrl.includes("?v=")}
      />
    );
  }

  return (
    <div
      aria-hidden={!name}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-secondary font-display font-semibold text-secondary-foreground ring-2 ring-border",
        sizeClasses[size],
        className,
      )}
      role={name ? "img" : undefined}
      aria-label={name ? `Avatar placeholder for ${name}` : undefined}
    >
      {initials}
    </div>
  );
}
