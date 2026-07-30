export const EXERCISE_MEDIA_BUCKET = "exercise-media";

export const EXERCISE_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const EXERCISE_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;

const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const VIDEO_EXTENSIONS: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

/** 5 MB photos */
export const MAX_EXERCISE_IMAGE_BYTES = 5 * 1024 * 1024;
/** 50 MB videos */
export const MAX_EXERCISE_VIDEO_BYTES = 50 * 1024 * 1024;

export function validateExerciseImageFile(file: File): string | null {
  if (
    !(EXERCISE_IMAGE_MIME_TYPES as readonly string[]).includes(file.type)
  ) {
    return "Photos must be JPEG, PNG, WebP, or GIF.";
  }
  if (file.size > MAX_EXERCISE_IMAGE_BYTES) {
    return "Photos must be 5 MB or smaller.";
  }
  return null;
}

export function validateExerciseVideoFile(file: File): string | null {
  if (
    !(EXERCISE_VIDEO_MIME_TYPES as readonly string[]).includes(file.type)
  ) {
    return "Videos must be MP4, WebM, or MOV.";
  }
  if (file.size > MAX_EXERCISE_VIDEO_BYTES) {
    return "Videos must be 50 MB or smaller.";
  }
  return null;
}

export function buildExerciseMediaPath(
  slug: string,
  kind: "photo" | "video",
  contentType: string,
): string | null {
  const ext =
    kind === "photo"
      ? IMAGE_EXTENSIONS[contentType]
      : VIDEO_EXTENSIONS[contentType];
  if (!ext) return null;
  return `${slug}/${kind}.${ext}`;
}

export function buildPlanMediaPath(
  slug: string,
  kind: "photo" | "video",
  contentType: string,
): string | null {
  const ext =
    kind === "photo"
      ? IMAGE_EXTENSIONS[contentType]
      : VIDEO_EXTENSIONS[contentType];
  if (!ext) return null;
  return `plans/${slug}/${kind}.${ext}`;
}
