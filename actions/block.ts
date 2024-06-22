"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  // TODO: Adapt to disconnect from livestream
  // TODO: Allow abilityt to kick the guest
  const block = await blockUser(id);

  revalidatePath("/");

  if (block) {
    revalidatePath(`/${block.blocked.username}`);
  }

  return block;
};

export const onUnblock = async (id: string) => {
  const block = await unblockUser(id);

  revalidatePath("/");

  if (block) {
    revalidatePath(`/${block.blocked.username}`);
  }

  return block;
};
