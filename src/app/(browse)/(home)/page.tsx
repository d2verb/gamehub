import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/results";

export default function Home() {
  return (
    <div className="f-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
