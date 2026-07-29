import {
  EQUIPMENT_LABELS,
  MOBILITY_LEVEL_LABELS,
} from "@/features/user-profile/lib/labels";
import {
  DIFFICULTY_LABELS,
  FOCUS_AREA_LABELS,
  type CatalogDifficulty,
  type FocusArea,
} from "@/features/workout-library/data/catalog";
import type { MobilityLevel } from "@/types/database";

export function labelEquipment(value: string): string {
  if (value in EQUIPMENT_LABELS) {
    return EQUIPMENT_LABELS[value as keyof typeof EQUIPMENT_LABELS];
  }
  return value.replaceAll("_", " ");
}

export function labelMobility(value: string): string {
  if (value in MOBILITY_LEVEL_LABELS) {
    return MOBILITY_LEVEL_LABELS[value as MobilityLevel];
  }
  return value.replaceAll("_", " ");
}

export function labelDifficulty(value: CatalogDifficulty): string {
  return DIFFICULTY_LABELS[value];
}

export function labelFocusArea(value: FocusArea): string {
  return FOCUS_AREA_LABELS[value];
}

export function labelMuscle(value: string): string {
  return value.replaceAll("_", " ");
}
