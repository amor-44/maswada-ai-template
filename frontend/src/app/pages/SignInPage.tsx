import { SignIn } from "@clerk/react";

export function SignInPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignIn path="/sign-in" routing="path" fallbackRedirectUrl="/" />
    </div>
  );
}