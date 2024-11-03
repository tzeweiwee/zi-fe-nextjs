import { Button } from "@lib/components/ui/button";
import Link from "next/link";

export const SignInButton = () => {
  return (
    <Link href="/api/auth/signin">
      <Button>Sign in</Button>
    </Link>
  );
};
