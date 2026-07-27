"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/feedback/toast";

export function FollowButton({ displayName }: { displayName: string }) {
  const [following, setFollowing] = useState(false);
  const { showToast } = useToast();

  return (
    <Button
      variant={following ? "secondary" : "outline"}
      aria-pressed={following}
      onClick={() => {
        setFollowing((current) => !current);
        showToast(following ? `${displayName} 팔로우를 취소했습니다` : `${displayName}님을 팔로우했습니다`);
      }}
    >
      <UserPlus className="h-4 w-4" aria-hidden="true" />
      {following ? "Following" : "Follow"}
    </Button>
  );
}
