import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "로그인",
  description: "프리미엄부동산에 로그인하세요.",
};

export default function LoginPage() {
  return (
    <div className="flex justify-center px-6 py-16">
      <SignIn />
    </div>
  );
}
