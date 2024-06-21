"use server";

import { revalidatePath } from "next/cache";

import { followUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
  try {
    const follow = await followUser(id);

    revalidatePath("/");

    if (follow) {
      revalidatePath(`/${follow.following.username}`);
    }

    return follow;
  } catch {
    throw new Error("Internal Error");
  };
};