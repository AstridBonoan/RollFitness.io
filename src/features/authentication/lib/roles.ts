export const APP_ROLES = ["member", "admin"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export function isAppRole(value: unknown): value is AppRole {
  return (
    typeof value === "string" &&
    (APP_ROLES as readonly string[]).includes(value)
  );
}

export function isAdminRole(role: unknown): boolean {
  return role === "admin";
}
