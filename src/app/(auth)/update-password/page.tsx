import type { Metadata } from "next";

import { AuthShell } from "@/features/authentication/components/auth-shell";
import { UpdatePasswordForm } from "@/features/authentication/components/update-password-form";

export const metadata: Metadata = {
  title: "Update password",
};

export default function UpdatePasswordPage() {
  return (
    <AuthShell
      title="Choose a new password"
      description="You’re signed in through your reset link. Set a new password to continue."
    >
      <UpdatePasswordForm />
    </AuthShell>
  );
}
