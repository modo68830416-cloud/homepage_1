import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "회원가입",
  description: "프리미엄부동산 회원가입.",
};

export default function SignupPage() {
  return <SignupForm />;
}
