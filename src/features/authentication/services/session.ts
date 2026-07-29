import { createClient } from "@/lib/supabase/server";

/**
 * Verifies the current JWT via getClaims (preferred for authorization).
 * Returns null when the visitor is signed out or the token is invalid.
 */
export async function getAuthClaims() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  return data.claims;
}

export async function requireAuthClaims() {
  const claims = await getAuthClaims();

  if (!claims) {
    return null;
  }

  return claims;
}

/**
 * Fresh Auth user record when profile fields beyond JWT claims are needed.
 */
export async function getAuthUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return data.user;
}
