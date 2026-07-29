"use server";

import { revalidatePath } from "next/cache";

import { adminExerciseUpdateSchema } from "@/features/admin/schemas/exercise";
import {
  clearExerciseMedia,
  uploadExercisePhoto,
  uploadExerciseVideo,
} from "@/features/admin/services/exercise-media";
import { updateExerciseAsAdmin } from "@/features/admin/services/exercises";

export type AdminExerciseActionState = {
  error?: string;
  success?: string;
};

function asFile(entry: FormDataEntryValue | null): File | null {
  return entry instanceof File && entry.size > 0 ? entry : null;
}

export async function updateAdminExerciseAction(
  _prev: AdminExerciseActionState,
  formData: FormData,
): Promise<AdminExerciseActionState> {
  const parsed = adminExerciseUpdateSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    description: formData.get("description"),
    instructions: formData.get("instructions"),
    safetyNotes: formData.get("safetyNotes") ?? "",
    difficulty: formData.get("difficulty"),
    mobilityCategory: formData.get("mobilityCategory"),
    imageUrl: formData.get("imageUrl") ?? "",
    videoUrl: formData.get("videoUrl") ?? "",
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid exercise data.",
    };
  }

  let imageUrl: string | null = parsed.data.imageUrl || null;
  let videoUrl: string | null = parsed.data.videoUrl || null;

  const removeImage = formData.get("removeImage") === "on";
  const removeVideo = formData.get("removeVideo") === "on";
  const imageFile = asFile(formData.get("imageFile"));
  const videoFile = asFile(formData.get("videoFile"));

  if (removeImage) {
    const cleared = await clearExerciseMedia(parsed.data.slug, "photo");
    if (cleared.error) {
      return { error: cleared.error };
    }
    imageUrl = null;
  } else if (imageFile) {
    const uploaded = await uploadExercisePhoto(parsed.data.slug, imageFile);
    if (uploaded.error || !uploaded.url) {
      return { error: uploaded.error ?? "Photo upload failed." };
    }
    imageUrl = uploaded.url;
  }

  if (removeVideo) {
    const cleared = await clearExerciseMedia(parsed.data.slug, "video");
    if (cleared.error) {
      return { error: cleared.error };
    }
    videoUrl = null;
  } else if (videoFile) {
    const uploaded = await uploadExerciseVideo(parsed.data.slug, videoFile);
    if (uploaded.error || !uploaded.url) {
      return { error: uploaded.error ?? "Video upload failed." };
    }
    videoUrl = uploaded.url;
  }

  const result = await updateExerciseAsAdmin({
    slug: parsed.data.slug,
    name: parsed.data.name,
    description: parsed.data.description,
    instructions: parsed.data.instructions,
    safetyNotes: parsed.data.safetyNotes ?? "",
    difficulty: parsed.data.difficulty,
    mobilityCategory: parsed.data.mobilityCategory,
    imageUrl,
    videoUrl,
  });

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/exercises");
  revalidatePath(`/exercises/${parsed.data.slug}`);
  revalidatePath("/admin/exercises");
  revalidatePath(`/admin/exercises/${parsed.data.slug}`);

  return { success: "Exercise saved." };
}
