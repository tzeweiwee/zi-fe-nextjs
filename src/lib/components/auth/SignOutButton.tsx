import { signOut } from "@/auth";
import { Button } from "@lib/components/ui/button";

export const SignOutButton = () => {
  return (
    <Button
      onClick={async () => {
        "use server";
        await signOut();
      }}
    >
      Sign out
    </Button>
  );
};
