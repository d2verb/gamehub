import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser, isBlockedUser } from "@/lib/block-service";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isBlockedByThisUser = await isBlockedByUser(user.id);

  if (isBlockedByThisUser) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockedUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <p>User name: {user.username}</p>
      <p>User ID: {user.id}</p>
      <p>is following: {`${isFollowing}`}</p>
      <Actions
        isFollowing={isFollowing}
        isBlocking={isBlocking}
        userId={user.id}
      />
    </div>
  );
};
