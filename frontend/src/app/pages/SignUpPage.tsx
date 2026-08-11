import { SignUp } from "@clerk/react";

export function SignUpPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignUp path="/sign-up" routing="path" fallbackRedirectUrl="/" />
    </div>
  );
}