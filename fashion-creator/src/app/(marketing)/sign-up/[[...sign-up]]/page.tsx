import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "회원가입하면 모델, Look, 콘텐츠, 즐겨찾기가 기기 간에 동기화됩니다.",
};

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 py-16 sm:px-8">
      <SignUp />
    </div>
  );
}
