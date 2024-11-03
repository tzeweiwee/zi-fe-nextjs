import { auth } from "@/auth";
import { SignInButton } from "@/src/lib/components/auth/SignInButton";
import { SignOutButton } from "@/src/lib/components/auth/SignOutButton";
import Image from "next/image";

export const Header = async () => {
  const session = await auth();

  const isSignedIn = !!session;
  const user = session?.user;

  return (
    <header>
      <nav>
        <div className="flex justify-between items-center bg-gray-800 text-white p-4">
          <label className="text-2xl">Zurich Insurance Test App</label>
          {isSignedIn ? (
            <div className="flex gap-1">
              {user?.name && user.image && (
                <div className="flex items-center gap-2">
                  <label className="text-gray-200 text-sm">
                    Welcome {user.name}!
                  </label>
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
              )}
              <SignOutButton />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </nav>
    </header>
  );
};
