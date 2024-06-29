"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  isBlocking: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, isBlocking, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((follow) =>
          toast.success(`You followed ${follow.following.username}`),
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((follow) =>
          toast.success(`You unfollowed ${follow.following.username}`),
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((block) => toast.success(`You blocked ${block.blocked.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((block) =>
          toast.success(`You unblocked ${block.blocked.username}`),
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={isFollowing ? handleUnfollow : handleFollow}
        disabled={isPending}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button
        onClick={isBlocking ? handleUnblock : handleBlock}
        disabled={isPending}
      >
        {isBlocking ? "Unblock" : "Block"}
      </Button>
    </>
  );
};
