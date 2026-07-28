"use client";

import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/feedback/toast";
import { useFavoriteCreators } from "@/lib/favorites-store";

export function FollowButton({ creatorId, displayName }: { creatorId: string; displayName: string }) {
  const { isFavorite, toggleFavorite } = useFavoriteCreators();
  const { showToast } = useToast();
  const following = isFavorite(creatorId);

  return (
    <Button
      variant={following ? "secondary" : "outline"}
      aria-pressed={following}
      onClick={() => {
        toggleFavorite(creatorId);
        showToast(following ? `${displayName} 팔로우를 취소했습니다` : `${displayName}님을 팔로우했습니다`);
      }}
    >
      <UserPlus className="h-4 w-4" aria-hidden="true" />
      {following ? "Following" : "Follow"}
    </Button>
  );
}
