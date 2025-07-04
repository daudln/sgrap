import SchoolTable from "@/app/(protected)/schools/_components/school-table";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
export const dynamic = "force-dynamic";

export default async function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.school.getAll.queryOptions({}));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Schools</h1>
      </div>
      <SchoolTable />
    </HydrationBoundary>
  );
}
