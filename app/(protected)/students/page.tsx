import StudentTable from "@/app/(protected)/students/_components/student-table";

export const dynamic = "force-dynamic";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.student.getPaginated.queryOptions({}));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Student</h1>
      </div>
      <StudentTable />
    </HydrationBoundary>
  );
}
