/**
 * Canonical adaptive exercise catalog.
 * Media (image_url / video_url) intentionally empty — upload your own assets later.
 * Slugs are stable labels for matching files (e.g. seated-shoulder-press.jpg).
 */

export const DIFFICULTY_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

export type CatalogDifficulty = (typeof DIFFICULTY_LEVELS)[number];

export const FOCUS_AREAS = [
  "seated_upper",
  "seated_core",
  "seated_cardio",
  "limited_lower",
  "limited_upper",
  "full_mobility",
  "assisted",
  "bands_weights",
] as const;

export type FocusArea = (typeof FOCUS_AREAS)[number];

export const FOCUS_AREA_LABELS: Record<FocusArea, string> = {
  seated_upper: "Seated · Upper body",
  seated_core: "Seated · Core",
  seated_cardio: "Seated · Cardio",
  limited_lower: "Limited lower body",
  limited_upper: "Limited upper body",
  full_mobility: "Full mobility",
  assisted: "Assisted movement",
  bands_weights: "Bands & weights",
};

export const DIFFICULTY_LABELS: Record<CatalogDifficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export type CatalogExercise = {
  /** Stable file / upload key — keep filenames aligned with this. */
  slug: string;
  name: string;
  description: string;
  instructions: string;
  difficulty: CatalogDifficulty;
  equipment: string[];
  target_muscles: string[];
  mobility_category:
    | "full"
    | "limited_lower"
    | "limited_upper"
    | "seated"
    | "assisted";
  focus_area: FocusArea;
  safety_notes: string;
  /** Suggested variation names (no media). */
  variations: string[];
  /** Hint for what photo to shoot. */
  photo_label: string;
  /** Hint for what demo video to record. */
  video_label: string;
};

/**
 * Fixed UUIDs so re-running the seed stays idempotent and uploads can map to IDs.
 */
export const CATALOG_EXERCISES: readonly CatalogExercise[] = [
  {
    slug: "seated-shoulder-press",
    name: "Seated Shoulder Press",
    description:
      "Overhead press from a seated or wheelchair position to build shoulder strength.",
    instructions:
      "Sit tall with core braced. Press weights or bands from shoulder height to overhead without arching the low back. Lower with control.",
    difficulty: "beginner",
    equipment: ["dumbbells", "resistance_bands", "wheelchair_accessible"],
    target_muscles: ["shoulders", "triceps"],
    mobility_category: "seated",
    focus_area: "seated_upper",
    safety_notes:
      "Keep elbows slightly forward of the torso. Stop if you feel sharp shoulder pain.",
    variations: ["Single-arm seated press", "Band overhead press"],
    photo_label: "Photo: seated athlete at top of overhead press",
    video_label: "Video: front + slight side demo of full press (15–30s)",
  },
  {
    slug: "seated-lat-pulldown-band",
    name: "Seated Lat Pulldown (Band)",
    description:
      "Pull a resistance band downward to train the back from a seated position.",
    instructions:
      "Anchor the band overhead or high. Sit tall, pull elbows down toward the ribs, then return slowly.",
    difficulty: "beginner",
    equipment: ["resistance_bands", "wheelchair_accessible"],
    target_muscles: ["lats", "biceps", "upper_back"],
    mobility_category: "seated",
    focus_area: "seated_upper",
    safety_notes: "Avoid shrugging. Keep ribs stacked over the pelvis.",
    variations: ["Single-arm pulldown", "Wide-grip pulldown"],
    photo_label: "Photo: mid-pull with elbows by ribs",
    video_label: "Video: seated band lat pulldown, 2–3 clean reps",
  },
  {
    slug: "seated-chest-press-band",
    name: "Seated Chest Press (Band)",
    description:
      "Press forward against band resistance to strengthen the chest and arms while seated.",
    instructions:
      "Anchor the band behind you at mid-chest height. Press hands forward until elbows nearly straighten, then return.",
    difficulty: "beginner",
    equipment: ["resistance_bands", "wheelchair_accessible"],
    target_muscles: ["chest", "triceps", "shoulders"],
    mobility_category: "seated",
    focus_area: "seated_upper",
    safety_notes: "Do not lock elbows aggressively. Keep wrists neutral.",
    variations: ["Single-arm chest press"],
    photo_label: "Photo: arms extended in seated chest press",
    video_label: "Video: seated chest press tempo (2s out, 2s back)",
  },
  {
    slug: "seated-row-band",
    name: "Seated Band Row",
    description:
      "Horizontal pull for upper-back strength and posture from a chair or wheelchair.",
    instructions:
      "Anchor the band in front at mid-torso height. Pull handles to the ribs, squeeze shoulder blades, then extend.",
    difficulty: "beginner",
    equipment: ["resistance_bands", "wheelchair_accessible"],
    target_muscles: ["upper_back", "biceps", "rear_shoulders"],
    mobility_category: "seated",
    focus_area: "seated_upper",
    safety_notes: "Avoid rounding the upper back. Lead with the elbows.",
    variations: ["Neutral-grip row", "Pause row"],
    photo_label: "Photo: end of row with elbows back",
    video_label: "Video: seated row with clear scapular squeeze",
  },
  {
    slug: "seated-bicep-curl",
    name: "Seated Bicep Curl",
    description: "Isolated elbow flexion for arm strength while seated.",
    instructions:
      "Hold dumbbells or bands with arms at your sides. Curl toward the shoulders without swinging, then lower slowly.",
    difficulty: "beginner",
    equipment: ["dumbbells", "resistance_bands", "wheelchair_accessible"],
    target_muscles: ["biceps"],
    mobility_category: "seated",
    focus_area: "seated_upper",
    safety_notes: "Keep elbows pinned near the torso; avoid leaning back.",
    variations: ["Hammer curl", "Alternating curl"],
    photo_label: "Photo: mid-curl with elbows stable",
    video_label: "Video: 3 seated curls, controlled eccentric",
  },
  {
    slug: "seated-overhead-tricep-extension",
    name: "Seated Overhead Tricep Extension",
    description: "Tricep strengthener performed overhead from a stable seat.",
    instructions:
      "Hold one dumbbell or band handle overhead. Bend elbows to lower behind the head, then extend.",
    difficulty: "intermediate",
    equipment: ["dumbbells", "resistance_bands", "wheelchair_accessible"],
    target_muscles: ["triceps"],
    mobility_category: "seated",
    focus_area: "seated_upper",
    safety_notes: "Keep upper arms close to the ears; protect the neck.",
    variations: ["Single-arm extension"],
    photo_label: "Photo: elbows bent behind head (bottom position)",
    video_label: "Video: seated overhead extension, side angle",
  },
  {
    slug: "seated-march",
    name: "Seated March",
    description:
      "Low-impact cardio and hip mobility by marching in place while seated.",
    instructions:
      "Sit tall. Lift one knee at a time as if marching. Swing opposite arm gently if able. Keep a steady rhythm.",
    difficulty: "beginner",
    equipment: ["none", "wheelchair_accessible"],
    target_muscles: ["hip_flexors", "core"],
    mobility_category: "seated",
    focus_area: "seated_cardio",
    safety_notes: "Stay within a pain-free range. Hold chair sides if balance is limited.",
    variations: ["High-knee seated march", "March with arm drive"],
    photo_label: "Photo: one knee lifted in seated march",
    video_label: "Video: 20 seconds continuous seated marching",
  },
  {
    slug: "seated-shadow-boxing",
    name: "Seated Shadow Boxing",
    description:
      "Upper-body cardio using punches from a seated or wheelchair base.",
    instructions:
      "Guard hands near the face. Alternate jabs and crosses with light rotation through the torso. Breathe steadily.",
    difficulty: "beginner",
    equipment: ["none", "wheelchair_accessible"],
    target_muscles: ["shoulders", "core", "arms"],
    mobility_category: "seated",
    focus_area: "seated_cardio",
    safety_notes: "Keep punches controlled. Avoid hyperextending elbows.",
    variations: ["Jab-cross only", "Add hooks"],
    photo_label: "Photo: jab extended from seated guard",
    video_label: "Video: 20–30s seated shadow boxing combo",
  },
  {
    slug: "seated-torso-rotation",
    name: "Seated Torso Rotation",
    description: "Gentle rotational mobility for the mid-back and core.",
    instructions:
      "Sit tall, hands at chest or on a light ball. Rotate slowly left and right while keeping hips facing forward.",
    difficulty: "beginner",
    equipment: ["none", "wheelchair_accessible"],
    target_muscles: ["obliques", "mid_back"],
    mobility_category: "seated",
    focus_area: "seated_core",
    safety_notes: "Move within comfort. Stop if you feel spine pain.",
    variations: ["Hold at end range", "Band-resisted rotation"],
    photo_label: "Photo: rotated torso, hips square",
    video_label: "Video: slow left-right seated rotations",
  },
  {
    slug: "seated-dead-bug",
    name: "Seated Dead Bug Reach",
    description:
      "Core control drill adapted to a chair—opposite arm and knee reach.",
    instructions:
      "Sit tall. Extend one arm forward while the opposite knee lifts slightly. Alternate sides with control.",
    difficulty: "intermediate",
    equipment: ["none", "wheelchair_accessible"],
    target_muscles: ["core", "hip_flexors"],
    mobility_category: "seated",
    focus_area: "seated_core",
    safety_notes: "Do not arch the low back. Exhale on the reach.",
    variations: ["Arms only", "Knees only"],
    photo_label: "Photo: opposite arm and knee extended",
    video_label: "Video: alternating seated dead-bug reaches",
  },
  {
    slug: "chair-supported-sit-to-stand",
    name: "Chair-Supported Sit-to-Stand",
    description:
      "Functional strength for standing up using chair support as needed.",
    instructions:
      "Scoot forward, feet flat. Lean slightly forward, push through legs to stand, using armrests if needed. Sit down with control.",
    difficulty: "beginner",
    equipment: ["none"],
    target_muscles: ["quads", "glutes", "core"],
    mobility_category: "limited_lower",
    focus_area: "limited_lower",
    safety_notes:
      "Use a stable chair. Have a spotter if balance is uncertain.",
    variations: ["Higher seat", "Pause at stand"],
    photo_label: "Photo: mid-rise from chair with hands on armrests",
    video_label: "Video: full sit-to-stand and return, side view",
  },
  {
    slug: "supported-calf-raise",
    name: "Supported Calf Raise",
    description:
      "Ankle and calf strength with hand support for balance.",
    instructions:
      "Hold a counter or chair back. Rise onto the balls of the feet, pause, then lower slowly.",
    difficulty: "beginner",
    equipment: ["none"],
    target_muscles: ["calves"],
    mobility_category: "limited_lower",
    focus_area: "limited_lower",
    safety_notes: "Keep knees soft. Stop if ankles feel unstable.",
    variations: ["Single-leg supported raise"],
    photo_label: "Photo: top of calf raise holding support",
    video_label: "Video: 5 supported calf raises",
  },
  {
    slug: "standing-hip-abduction-support",
    name: "Standing Hip Abduction (Supported)",
    description:
      "Side-leg lifts with support to strengthen outer hips.",
    instructions:
      "Hold a stable surface. Lift one leg out to the side without leaning the torso. Return slowly.",
    difficulty: "beginner",
    equipment: ["none"],
    target_muscles: ["glute_medius", "hips"],
    mobility_category: "limited_lower",
    focus_area: "limited_lower",
    safety_notes: "Keep toes forward. Do not hike the hip.",
    variations: ["Mini-band around ankles"],
    photo_label: "Photo: working leg abducted, torso upright",
    video_label: "Video: supported hip abductions, front angle",
  },
  {
    slug: "wall-push-up",
    name: "Wall Push-Up",
    description:
      "Upper-body push with reduced load—ideal when floor push-ups are limited.",
    instructions:
      "Hands on wall at chest height. Lower chest toward the wall by bending elbows, then press away.",
    difficulty: "beginner",
    equipment: ["none"],
    target_muscles: ["chest", "triceps", "shoulders"],
    mobility_category: "limited_upper",
    focus_area: "limited_upper",
    safety_notes: "Keep a straight line from head to heels or knees as able.",
    variations: ["Counter push-up", "Kneeling wall progression"],
    photo_label: "Photo: body angled into wall push-up",
    video_label: "Video: 3 wall push-ups, side view",
  },
  {
    slug: "scapular-retraction",
    name: "Scapular Retraction (Posture Drill)",
    description:
      "Shoulder-blade squeezes to support posture for limited upper mobility.",
    instructions:
      "Sit or stand tall. Squeeze shoulder blades together gently, hold briefly, then release.",
    difficulty: "beginner",
    equipment: ["none", "wheelchair_accessible"],
    target_muscles: ["upper_back", "rear_shoulders"],
    mobility_category: "limited_upper",
    focus_area: "limited_upper",
    safety_notes: "Keep shoulders down—avoid shrugging toward ears.",
    variations: ["Band pull-apart"],
    photo_label: "Photo: shoulder blades squeezed, chest open",
    video_label: "Video: 5 slow scapular retractions holds",
  },
  {
    slug: "assisted-sit-to-stand-partner",
    name: "Assisted Sit-to-Stand",
    description:
      "Sit-to-stand with caregiver or rail assistance for safety.",
    instructions:
      "With a trained spotter or secure rail, practice rising and sitting. Helper supports as agreed—never pulls on arms aggressively.",
    difficulty: "beginner",
    equipment: ["none"],
    target_muscles: ["quads", "glutes", "core"],
    mobility_category: "assisted",
    focus_area: "assisted",
    safety_notes:
      "Use a gait belt if trained. Clear space for falls. Stop if dizzy.",
    variations: ["Partial stand", "Higher chair"],
    photo_label: "Photo: assisted rise with spotter positioned safely",
    video_label: "Video: assisted sit-to-stand with clear spotting cues",
  },
  {
    slug: "assisted-arm-raise",
    name: "Assisted Arm Raise",
    description:
      "Guided shoulder flexion with partner or self-assist using the other arm.",
    instructions:
      "Support the working arm at the wrist/elbow. Raise within a comfortable range, then lower.",
    difficulty: "beginner",
    equipment: ["none"],
    target_muscles: ["shoulders"],
    mobility_category: "assisted",
    focus_area: "assisted",
    safety_notes: "Never force through pain. Move slowly.",
    variations: ["Table slide assist"],
    photo_label: "Photo: assisted arm elevation mid-range",
    video_label: "Video: assisted arm raise, front angle",
  },
  {
    slug: "bodyweight-squat",
    name: "Bodyweight Squat",
    description:
      "Foundational lower-body strength for members with full mobility.",
    instructions:
      "Feet about shoulder-width. Sit hips back and down, keep heels down, then stand. Arms can reach forward for balance.",
    difficulty: "beginner",
    equipment: ["none"],
    target_muscles: ["quads", "glutes", "core"],
    mobility_category: "full",
    focus_area: "full_mobility",
    safety_notes: "Knees track over mid-foot. Depth only as comfortable.",
    variations: ["Box squat", "Pause squat"],
    photo_label: "Photo: bottom of squat, chest up",
    video_label: "Video: 3 bodyweight squats, side view",
  },
  {
    slug: "glute-bridge",
    name: "Glute Bridge",
    description: "Hip extension on the floor or firm mat for posterior chain strength.",
    instructions:
      "Lie on your back, knees bent, feet flat. Drive through heels to lift hips, squeeze glutes, then lower.",
    difficulty: "beginner",
    equipment: ["none"],
    target_muscles: ["glutes", "hamstrings", "core"],
    mobility_category: "full",
    focus_area: "full_mobility",
    safety_notes: "Do not over-arch the low back. Keep ribs down.",
    variations: ["Single-leg bridge", "Feet elevated"],
    photo_label: "Photo: hips lifted in bridge",
    video_label: "Video: glute bridge with visible squeeze at top",
  },
  {
    slug: "bird-dog",
    name: "Bird Dog",
    description: "Opposite arm and leg reach for core and spinal stability.",
    instructions:
      "On hands and knees, extend one arm and the opposite leg. Hold briefly, return, switch sides.",
    difficulty: "intermediate",
    equipment: ["none"],
    target_muscles: ["core", "glutes", "back"],
    mobility_category: "full",
    focus_area: "full_mobility",
    safety_notes: "Keep hips level. Avoid rotating the pelvis.",
    variations: ["Hold 3 seconds", "Knee-hover bird dog"],
    photo_label: "Photo: full bird-dog extension",
    video_label: "Video: alternating bird dogs, side angle",
  },
  {
    slug: "band-pull-apart",
    name: "Band Pull-Apart",
    description: "Rear-shoulder and upper-back activation with a light band.",
    instructions:
      "Hold a band at shoulder height. Pull apart until arms are wide, squeeze, then return with control.",
    difficulty: "beginner",
    equipment: ["resistance_bands"],
    target_muscles: ["rear_shoulders", "upper_back"],
    mobility_category: "full",
    focus_area: "bands_weights",
    safety_notes: "Use a light band. Keep elbows soft.",
    variations: ["Diagonal pull-apart"],
    photo_label: "Photo: band fully opened at chest height",
    video_label: "Video: band pull-aparts, front view",
  },
  {
    slug: "dumbbell-goblet-squat",
    name: "Dumbbell Goblet Squat",
    description: "Squat pattern loaded with a dumbbell held at the chest.",
    instructions:
      "Hold one dumbbell vertically at the chest. Squat down with upright torso, then stand.",
    difficulty: "intermediate",
    equipment: ["dumbbells"],
    target_muscles: ["quads", "glutes", "core"],
    mobility_category: "full",
    focus_area: "bands_weights",
    safety_notes: "Choose a manageable weight. Heels stay down.",
    variations: ["Heel-elevated goblet squat"],
    photo_label: "Photo: bottom of goblet squat with dumbbell at chest",
    video_label: "Video: 3 goblet squats, side view",
  },
  {
    slug: "dumbbell-romanian-deadlift",
    name: "Dumbbell Romanian Deadlift",
    description: "Hinge pattern for hamstrings and glutes with dumbbells.",
    instructions:
      "Soft knees. Hinge at hips, push hips back, lower dumbbells along the thighs, then stand tall by driving hips forward.",
    difficulty: "intermediate",
    equipment: ["dumbbells"],
    target_muscles: ["hamstrings", "glutes", "back"],
    mobility_category: "full",
    focus_area: "bands_weights",
    safety_notes: "Keep a flat back. Stop before the low back rounds.",
    variations: ["Single-leg RDL (bodyweight first)"],
    photo_label: "Photo: hinge position with flat back",
    video_label: "Video: dumbbell RDL, side view showing hip hinge",
  },
  {
    slug: "cable-face-pull-adaptive",
    name: "Adaptive Face Pull",
    description:
      "Rear-delt and upper-back pull using a cable or band; seated option encouraged.",
    instructions:
      "Pull the handle or band toward the face with elbows high. Squeeze rear shoulders, then return.",
    difficulty: "intermediate",
    equipment: ["cable_machine", "resistance_bands", "adaptive_machines"],
    target_muscles: ["rear_shoulders", "upper_back"],
    mobility_category: "seated",
    focus_area: "bands_weights",
    safety_notes: "Use moderate resistance. Avoid yanking the neck forward.",
    variations: ["Seated face pull", "Standing face pull"],
    photo_label: "Photo: elbows high at end of face pull",
    video_label: "Video: adaptive/seated face pull, 3 reps",
  },
] as const;

export function getCatalogBySlug(slug: string): CatalogExercise | undefined {
  return CATALOG_EXERCISES.find((exercise) => exercise.slug === slug);
}

export function groupCatalogByFocusArea() {
  return FOCUS_AREAS.map((area) => ({
    area,
    label: FOCUS_AREA_LABELS[area],
    exercises: CATALOG_EXERCISES.filter((exercise) => exercise.focus_area === area),
  })).filter((group) => group.exercises.length > 0);
}
