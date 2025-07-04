"use client";

import DashboardCard from "@/components/dashboard-card";
import { GiTeacher } from "react-icons/gi";
import { LiaSchoolSolid } from "react-icons/lia";
import { MdSubject } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Dashboard() {
  const colors = ["#FF8042", "#AF19FF"];
  const trpc = useTRPC();
  const { data, isLoading } = useSuspenseQuery(
    trpc.stats.getStats.queryOptions()
  );

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-6 grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          icon={<PiStudent className="h-5 w-5" />}
          title="Students"
          subtitle={data.students}
          description="Total student registered"
        />
        <DashboardCard
          icon={<GiTeacher className="h-5 w-5" />}
          title="Teachers"
          subtitle={data.teachers}
          description="Total teachers registered"
        />
        <DashboardCard
          icon={<LiaSchoolSolid className="h-5 w-5" />}
          title="Schools"
          subtitle={data.schools}
          description="Total schools registered"
        />
        <DashboardCard
          icon={<MdSubject className="h-5 w-5" />}
          title="Subjects"
          subtitle={data.subjects}
          description="Total subjects registered"
        />
      </div>
      {/* <Card>
        <PieChartComponent data={studentPieChartData} colors={colors} />
      </Card> */}
    </div>
  );
}
