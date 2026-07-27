import type { Metadata } from "next";
import { teamMembers } from "@/data/creator-business";
import { BrandKitForm } from "@/components/creator/brand-kit-form";
import { DefaultExportSettings } from "@/components/creator/default-export-settings";
import { TeamPanel } from "@/components/creator/team-panel";

export const metadata: Metadata = {
  title: "Creator Settings",
  description: "브랜드 킷, 기본 출력 설정, 팀을 관리하세요.",
};

export default function CreatorSettingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Settings</h1>
      <div className="flex flex-col gap-6">
        <BrandKitForm />
        <DefaultExportSettings />
        <TeamPanel members={teamMembers} />
      </div>
    </div>
  );
}
