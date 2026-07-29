import { createClient } from "@/lib/supabase/server";
import { isCurrentUserAdmin } from "@/features/authentication/services/admin";

export type AdminExerciseUpdatePayload = {
  slug: string;
  name: string;
  description: string;
  instructions: string;
  safetyNotes: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  mobilityCategory:
    | "full"
    | "limited_lower"
    | "limited_upper"
    | "seated"
    | "assisted";
  imageUrl: string | null;
  videoUrl: string | null;
};

export async function updateExerciseAsAdmin(payload: AdminExerciseUpdatePayload) {
  if (!(await isCurrentUserAdmin())) {
    return { error: "Admin access required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exercises")
    .update({
      name: payload.name,
      description: payload.description,
      instructions: payload.instructions,
      safety_notes: payload.safetyNotes || null,
      difficulty: payload.difficulty,
      mobility_category: payload.mobilityCategory,
      image_url: payload.imageUrl,
      video_url: payload.videoUrl,
    })
    .eq("slug", payload.slug)
    .select("id, slug")
    .maybeSingle();

  if (error) {
    return { error: error.message };
  }

  if (!data) {
    return {
      error:
        "Exercise row not found in Supabase. Run migration 00005, then try again.",
    };
  }

  return { exercise: data };
}
