import DashboardCard from "@/components/dashboard-card";
import React from "react";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdSubject } from "react-icons/md";
import { LiaSchoolSolid } from "react-icons/lia";
import prisma from "@/lib/utils";
import PieChartComponent from "@/components/pie-chart";
import { Card } from "@/components/ui/card";

export default async function Dashboard() {
  const schools = await prisma.school.count();
  const subjects = await prisma.subject.count();
  const teachers = await prisma.teacher.count();
  const students = await prisma.student.count();
  const maleStudentCount = await prisma.profile.count({
    where: {
      gender: "MALE",
      type: "STUDENT",
    },
  });
  const femaleStudentCount = await prisma.profile.count({
    where: {
      gender: "FEMALE",
      type: "STUDENT",
    },
  });
  console.log(femaleStudentCount);

  const studentPieChartData = [
    {
      name: "Male",
      value: 30,
    },
    {
      name: "Female",
      value: 2,
    },
  ];
  const colors = ["#FF8042", "#AF19FF"];
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
      <Card>
        <PieChartComponent data={studentPieChartData} colors={colors} />
      </Card>
    </div>
  );
}
