"use server";

import { revalidatePath } from "next/cache";

import { adminPlanUpdateSchema } from "@/features/admin/schemas/plan";
import {
  clearPlanMedia,
  uploadPlanPhoto,
  uploadPlanVideo,
} from "@/features/admin/services/exercise-media";
import { updatePlanAsAdmin } from "@/features/admin/services/plans";

export type AdminPlanActionState = {
  error?: string;
  success?: string;
};

function asFile(entry: FormDataEntryValue | null): File | null {
  return entry instanceof File && entry.size > 0 ? entry : null;
}

export async function updateAdminPlanAction(
  _prev: AdminPlanActionState,
  formData: FormData,
): Promise<AdminPlanActionState> {
  const parsed = adminPlanUpdateSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    goalType: formData.get("goalType"),
    difficulty: formData.get("difficulty"),
    mobilityLevel: formData.get("mobilityLevel"),
    estimatedDurationMinutes: formData.get("estimatedDurationMinutes"),
    imageUrl: formData.get("imageUrl") ?? "",
    videoUrl: formData.get("videoUrl") ?? "",
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid plan data.",
    };
  }

  let imageUrl: string | null = parsed.data.imageUrl || null;
  let videoUrl: string | null = parsed.data.videoUrl || null;

  const removeImage = formData.get("removeImage") === "on";
  const removeVideo = formData.get("removeVideo") === "on";
  const imageFile = asFile(formData.get("imageFile"));
  const videoFile = asFile(formData.get("videoFile"));

  if (removeImage) {
    const cleared = await clearPlanMedia(parsed.data.slug, "photo");
    if (cleared.error) return { error: cleared.error };
    imageUrl = null;
  } else if (imageFile) {
    const uploaded = await uploadPlanPhoto(parsed.data.slug, imageFile);
    if (uploaded.error || !uploaded.url) {
      return { error: uploaded.error ?? "Photo upload failed." };
    }
    imageUrl = uploaded.url;
  }

  if (removeVideo) {
    const cleared = await clearPlanMedia(parsed.data.slug, "video");
    if (cleared.error) return { error: cleared.error };
    videoUrl = null;
  } else if (videoFile) {
    const uploaded = await uploadPlanVideo(parsed.data.slug, videoFile);
    if (uploaded.error || !uploaded.url) {
      return { error: uploaded.error ?? "Video upload failed." };
    }
    videoUrl = uploaded.url;
  }

  const result = await updatePlanAsAdmin({
    slug: parsed.data.slug,
    title: parsed.data.title,
    description: parsed.data.description,
    goalType: parsed.data.goalType,
    difficulty: parsed.data.difficulty,
    mobilityLevel: parsed.data.mobilityLevel,
    estimatedDurationMinutes: parsed.data.estimatedDurationMinutes,
    imageUrl,
    videoUrl,
  });

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/plans");
  revalidatePath(`/plans/${parsed.data.slug}`);
  revalidatePath("/admin/plans");
  revalidatePath(`/admin/plans/${parsed.data.slug}`);

  return { success: "Plan saved." };
}
