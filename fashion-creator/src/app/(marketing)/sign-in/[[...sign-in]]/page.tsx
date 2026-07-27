import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign In",
  description: "로그인하면 모델, Look, 콘텐츠, 즐겨찾기가 기기 간에 동기화됩니다.",
};

export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 py-16 sm:px-8">
      <SignIn />
    </div>
  );
}
