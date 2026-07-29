import { createClient } from "@/lib/supabase/server";
import { isCurrentUserAdmin } from "@/features/authentication/services/admin";
import {
  EXERCISE_MEDIA_BUCKET,
  buildExerciseMediaPath,
  validateExerciseImageFile,
  validateExerciseVideoFile,
} from "@/features/admin/lib/exercise-media";

async function uploadExerciseMediaFile(
  slug: string,
  kind: "photo" | "video",
  file: File,
) {
  if (!(await isCurrentUserAdmin())) {
    return { error: "Admin access required." };
  }

  const validationError =
    kind === "photo"
      ? validateExerciseImageFile(file)
      : validateExerciseVideoFile(file);
  if (validationError) {
    return { error: validationError };
  }

  const path = buildExerciseMediaPath(slug, kind, file.type);
  if (!path) {
    return { error: "Unsupported file type." };
  }

  const supabase = await createClient();

  // Remove prior photo/video variants for this slug so extensions don't stack.
  const { data: existing, error: listError } = await supabase.storage
    .from(EXERCISE_MEDIA_BUCKET)
    .list(slug);

  if (listError) {
    return { error: listError.message };
  }

  const stale = (existing ?? [])
    .filter((item) => item.name.startsWith(`${kind}.`))
    .map((item) => `${slug}/${item.name}`);

  if (stale.length > 0) {
    const { error: removeError } = await supabase.storage
      .from(EXERCISE_MEDIA_BUCKET)
      .remove(stale);
    if (removeError) {
      return { error: removeError.message };
    }
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(EXERCISE_MEDIA_BUCKET)
    .upload(path, bytes, {
      contentType: file.type,
      upsert: true,
      cacheControl: "3600",
    });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(EXERCISE_MEDIA_BUCKET).getPublicUrl(path);

  return { url: `${publicUrl}?v=${Date.now()}` };
}

export async function uploadExercisePhoto(slug: string, file: File) {
  return uploadExerciseMediaFile(slug, "photo", file);
}

export async function uploadExerciseVideo(slug: string, file: File) {
  return uploadExerciseMediaFile(slug, "video", file);
}

export async function clearExerciseMedia(slug: string, kind: "photo" | "video") {
  if (!(await isCurrentUserAdmin())) {
    return { error: "Admin access required." };
  }

  const supabase = await createClient();
  const { data: existing, error: listError } = await supabase.storage
    .from(EXERCISE_MEDIA_BUCKET)
    .list(slug);

  if (listError) {
    return { error: listError.message };
  }

  const paths = (existing ?? [])
    .filter((item) => item.name.startsWith(`${kind}.`))
    .map((item) => `${slug}/${item.name}`);

  if (paths.length > 0) {
    const { error: removeError } = await supabase.storage
      .from(EXERCISE_MEDIA_BUCKET)
      .remove(paths);
    if (removeError) {
      return { error: removeError.message };
    }
  }

  return { success: true as const };
}
