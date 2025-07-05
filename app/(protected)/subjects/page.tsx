import SubjectTable from "@/app/(protected)/subjects/_components/subject-table";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const revalidate = 0;

export default async function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.student.getPaginated.queryOptions({}));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Subjects</h1>
        </div>
        <SubjectTable />
      </div>
    </HydrationBoundary>
  );
}
