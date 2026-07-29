import { createClient } from "@/lib/supabase/server";
import {
  AVATAR_BUCKET,
  buildAvatarObjectPath,
  validateAvatarFile,
} from "@/features/user-profile/lib/avatar";

/**
 * Uploads a profile avatar to Supabase Storage and returns its public URL.
 */
export async function uploadAvatar(file: File) {
  const validationError = validateAvatarFile(file);
  if (validationError) {
    return { error: validationError };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to upload a profile picture." };
  }

  const path = buildAvatarObjectPath(user.id, file.type);
  if (!path) {
    return { error: "Unsupported image type." };
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
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
  } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);

  // Cache-bust so updated images refresh immediately in the UI.
  const avatarUrl = `${publicUrl}?v=${Date.now()}`;

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("user_id", user.id);

  if (profileError) {
    return { error: profileError.message };
  }

  return { avatarUrl };
}

export async function removeAvatar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to remove a profile picture." };
  }

  const { data: files, error: listError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .list(user.id);

  if (listError) {
    return { error: listError.message };
  }

  const paths = (files ?? [])
    .map((file) => `${user.id}/${file.name}`)
    .filter(Boolean);

  if (paths.length > 0) {
    const { error: removeError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .remove(paths);

    if (removeError) {
      return { error: removeError.message };
    }
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("user_id", user.id);

  if (profileError) {
    return { error: profileError.message };
  }

  return { success: true as const };
}
