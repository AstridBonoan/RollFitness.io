"use server";

import { revalidatePath } from "next/cache";

import { adminExerciseUpdateSchema } from "@/features/admin/schemas/exercise";
import { updateExerciseAsAdmin } from "@/features/admin/services/exercises";

export type AdminExerciseActionState = {
  error?: string;
  success?: string;
};

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

  const result = await updateExerciseAsAdmin({
    slug: parsed.data.slug,
    name: parsed.data.name,
    description: parsed.data.description,
    instructions: parsed.data.instructions,
    safetyNotes: parsed.data.safetyNotes ?? "",
    difficulty: parsed.data.difficulty,
    mobilityCategory: parsed.data.mobilityCategory,
    imageUrl: parsed.data.imageUrl || null,
    videoUrl: parsed.data.videoUrl || null,
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
