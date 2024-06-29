import { getFollowedUsers } from "@/lib/follow-service";
import { getRecommended } from "@/lib/recommended-service";
import { Following, FollowingSkeleton } from "./following";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = async () => {
  const recommemded = await getRecommended();
  const follows = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={follows} />
        <Recommended data={recommemded} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
