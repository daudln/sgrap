import Dashboard from "@/app/(protected)/_components/dashboard";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.stats.getStats.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
