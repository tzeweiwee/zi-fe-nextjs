import { signOut } from "@/auth";
import { Button } from "@/src/components/common/Button";

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
