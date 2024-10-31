import { Button } from "@/src/components/common/Button";
import Link from "next/link";

export const SignInButton = () => {
  return (
    <Link href="/api/auth/signin">
      <Button>Sign in</Button>
    </Link>
  );
};
