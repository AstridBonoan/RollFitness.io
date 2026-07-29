/**
 * Application-wide constants for RollnFitness.
 */

export const APP_NAME = "RollnFitness";
export const APP_DESCRIPTION =
  "Accessibility-first adaptive wellness for people with physical disabilities, wheelchair users, and rehabilitation patients.";

export const FITNESS_GOALS = [
  "strength",
  "weight_management",
  "mobility",
  "endurance",
] as const;

export const MOBILITY_LEVELS = [
  "full",
  "limited_lower",
  "limited_upper",
  "seated",
  "assisted",
] as const;

export const EQUIPMENT_OPTIONS = [
  "none",
  "resistance_bands",
  "dumbbells",
  "cable_machine",
  "adaptive_machines",
  "wheelchair_accessible",
] as const;

export const COMMUNITY_INTERESTS = [
  "healthy_cooking",
  "adaptive_sports",
  "home_workouts",
  "meal_prep",
] as const;

export const NUTRITION_CATEGORIES = [
  "weight_management",
  "strength_building",
  "healthy_habits",
] as const;
