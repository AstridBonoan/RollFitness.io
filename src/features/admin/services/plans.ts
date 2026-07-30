import { createClient } from "@/lib/supabase/server";
import { isCurrentUserAdmin } from "@/features/authentication/services/admin";
import type { FitnessGoal, MobilityLevel } from "@/types/database";

export type AdminPlanUpdatePayload = {
  slug: string;
  title: string;
  description: string;
  goalType: FitnessGoal;
  difficulty: "beginner" | "intermediate" | "advanced";
  mobilityLevel: MobilityLevel;
  estimatedDurationMinutes: number;
  imageUrl: string | null;
  videoUrl: string | null;
};

export async function updatePlanAsAdmin(payload: AdminPlanUpdatePayload) {
  if (!(await isCurrentUserAdmin())) {
    return { error: "Admin access required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workouts")
    .update({
      title: payload.title,
      description: payload.description,
      goal_type: payload.goalType,
      difficulty: payload.difficulty,
      mobility_level: payload.mobilityLevel,
      estimated_duration_minutes: payload.estimatedDurationMinutes,
      image_url: payload.imageUrl,
      video_url: payload.videoUrl,
      is_template: true,
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
        "Plan row not found in Supabase. Run migration 00008, then try again.",
    };
  }

  return { plan: data };
}
