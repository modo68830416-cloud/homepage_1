"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import type { TeamMember, TeamRole } from "@/types/creator-business";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { useToast } from "@/components/feedback/toast";

const ROLE_LABEL: Record<TeamRole, string> = {
  owner: "Owner",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

export function TeamPanel({ members }: { members: TeamMember[] }) {
  const [inviteEmail, setInviteEmail] = useState("");
  const { showToast } = useToast();

  function handleInvite(event: React.FormEvent) {
    event.preventDefault();
    if (!inviteEmail.trim()) return;
    showToast("초대 메일은 DEMO 모드에서 실제 발송되지 않습니다", "info");
    setInviteEmail("");
  }

  return (
    <GlassPanel className="rounded-xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Users className="h-4 w-4 text-accent-lime" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-foreground">Team</h2>
        <Badge tone="mock" className="ml-auto">
          DEMO
        </Badge>
      </div>

      <ul className="flex flex-col gap-3">
        {members.map((member) => (
          <li key={member.id} className="flex items-center gap-3">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border-strong">
              <PlaceholderArt seed={member.id} icon={Users} label={member.name} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
              <p className="truncate text-xs text-foreground-subtle">{member.email}</p>
            </div>
            <Badge tone="mock">{ROLE_LABEL[member.role]}</Badge>
          </li>
        ))}
      </ul>

      <form onSubmit={handleInvite} className="mt-5 flex gap-2 border-t border-border pt-4">
        <input
          type="email"
          value={inviteEmail}
          onChange={(event) => setInviteEmail(event.target.value)}
          placeholder="초대할 이메일 주소"
          aria-label="초대할 이메일 주소"
          className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent-lime focus:outline-none"
        />
        <Button type="submit" variant="secondary" className="text-xs">
          초대하기
        </Button>
      </form>
    </GlassPanel>
  );
}
