import { signOutAction } from "@/features/authentication/actions/auth";
import { Button } from "@/components/ui/button";

type LogoutButtonProps = {
  className?: string;
};

export function LogoutButton({ className }: LogoutButtonProps) {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant="outline" className={className}>
        Sign out
      </Button>
    </form>
  );
}
