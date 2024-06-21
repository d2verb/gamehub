"use client";

import { toast } from "sonner";
import { onFollow } from "@/actions/follow";
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

  const onClick = () => {
    startTransition(() => {
      onFollow(userId)
        .then((follow) => toast.success(`You are now following ${follow.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <Button
      variant="primary"
      onClick={onClick}
      disabled={isFollowing || isPending}>
      Follow
    </Button>
  );
}