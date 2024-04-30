import DashboardCard from "@/components/dashboard-card";
import React from "react";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdSubject } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { LiaSchoolSolid } from "react-icons/lia";
import { GenderDistribution } from "@/components/gender-distribution-chart";
import { BarChartHero } from "@/components/bar-chart";
import CountUp from "react-countup";
export default function Dashboard() {
  return (
    <div className="p-6 grid gap-4">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* <CountUp end={100} /> */}
        <DashboardCard
          icon={<PiStudent className="h-6 w-6" />}
          title="Students"
          subtitle="12,300"
          iconBackgroundColor="bg-yellow-300 dark:bg-background"
          backgroundColor="bg-yellow-100"
        />
        <DashboardCard
          icon={<GiTeacher className="h-6 w-6" />}
          title="Teachers"
          subtitle="3,240"
          iconBackgroundColor="bg-violet-300"
          backgroundColor="bg-violet-100"
        />
        <DashboardCard
          icon={<MdSubject className="h-6 w-6" />}
          title="Subjects"
          subtitle="23"
          iconBackgroundColor="bg-blue-300"
          backgroundColor="bg-blue-100"
        />
        <DashboardCard
          icon={<SiGoogleclassroom className="h-6 w-6" />}
          title="Classes"
          subtitle="6"
          iconBackgroundColor="bg-orange-300"
          backgroundColor="bg-orange-100"
        />
        <DashboardCard
          icon={<LiaSchoolSolid className="h-6 w-6" />}
          title="Schools"
          subtitle="6"
          iconBackgroundColor="bg-red-300"
          backgroundColor="bg-red-100"
        />
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <GenderDistribution />
      </section>
    </div>
  );
}
