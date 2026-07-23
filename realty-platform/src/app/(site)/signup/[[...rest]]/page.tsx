import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "회원가입",
  description: "프리미엄부동산 회원가입.",
};

export default function SignupPage() {
  return (
    <div className="flex justify-center px-6 py-16">
      <SignUp />
    </div>
  );
}
