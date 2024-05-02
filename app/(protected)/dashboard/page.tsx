import DashboardCard from "@/components/dashboard-card";
import React from "react";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdSubject } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { LiaSchoolSolid } from "react-icons/lia";
import { GenderDistribution } from "@/components/gender-distribution-chart";
import prisma from "@/lib/utils";

export default async function Dashboard() {
  const schools = await prisma.school.count();
  const subjects = await prisma.subject.count();
  const teachers = await prisma.teacher.count();
  const students = await prisma.student.count();
  return (
    <div className="p-6 grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          icon={<PiStudent className="h-5 w-5" />}
          title="Students"
          subtitle={students}
          description="Total student registered"
        />
        <DashboardCard
          icon={<GiTeacher className="h-5 w-5" />}
          title="Teachers"
          subtitle={teachers}
          description="Total teachers registered"
        />
        <DashboardCard
          icon={<LiaSchoolSolid className="h-5 w-5" />}
          title="Schools"
          subtitle={schools}
          description="Total schools registered"
        />

        <DashboardCard
          icon={<MdSubject className="h-5 w-5" />}
          title="Subjects"
          subtitle={subjects}
          description="Total subjects registered"
        />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <GenderDistribution />
      </section>
    </div>
  );
}
