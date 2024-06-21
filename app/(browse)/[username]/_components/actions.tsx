"use client";

import { toast } from "sonner";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
};

export const Actions = ({
  isFollowing,
  userId
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((follow) => toast.success(`You are now following ${follow.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((follow) => toast.success(`You are now unfollowed ${follow.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  }

  const onClick = isFollowing ? handleUnfollow : handleFollow;

  return (
    <Button
      variant="primary"
      onClick={onClick}
      disabled={isPending}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}