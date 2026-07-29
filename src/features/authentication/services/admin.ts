import { redirect } from "next/navigation";

import { isAdminRole } from "@/features/authentication/lib/roles";
import { getAuthUser } from "@/features/authentication/services/session";
import { getCurrentProfile } from "@/features/user-profile/services/profile";

export async function getCurrentAppRole() {
  const profile = await getCurrentProfile();
  return profile?.role ?? "member";
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  return isAdminRole(await getCurrentAppRole());
}

/**
 * Requires a signed-in admin. Non-admins are sent to account.
 */
export async function requireAdmin() {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login?next=/admin");
  }

  const admin = await isCurrentUserAdmin();
  if (!admin) {
    redirect("/account");
  }

  return user;
}
