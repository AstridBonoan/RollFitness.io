export const AVATAR_BUCKET = "avatars";
export const AVATAR_MAX_BYTES = 2 * 1024 * 1024;
export const AVATAR_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export function getAvatarExtension(mimeType: string) {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return null;
  }
}

export function validateAvatarFile(file: File) {
  if (!AVATAR_ALLOWED_TYPES.includes(file.type as (typeof AVATAR_ALLOWED_TYPES)[number])) {
    return "Use a JPG, PNG, WEBP, or GIF image.";
  }

  if (file.size > AVATAR_MAX_BYTES) {
    return "Profile pictures must be 2 MB or smaller.";
  }

  if (!getAvatarExtension(file.type)) {
    return "Unsupported image type.";
  }

  return null;
}

export function buildAvatarObjectPath(userId: string, mimeType: string) {
  const extension = getAvatarExtension(mimeType);
  if (!extension) {
    return null;
  }

  return `${userId}/avatar.${extension}`;
}
