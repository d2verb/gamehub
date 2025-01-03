"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import type { Block } from "@prisma/client";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL || "",
  process.env.LIVEKIT_API_KEY || "",
  process.env.LIVEKIT_API_SECRET || "",
);

export const onBlock = async (id: string) => {
  const self = await getSelf();

  let block: Block | undefined;

  try {
    block = await blockUser(id);
  } catch {
    // This means user is a guest
  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch {
    // This means user is not in the room
  }

  revalidatePath(`/u/${self.username}/community`);

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
