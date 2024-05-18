import { validateRequest } from "@/auth";
import DashboardCard from "@/components/dashboard-card";
import db from "@/db";
import { school } from "@/db/schema/school";
import { subject } from "@/db/schema/subject";
import { teacher } from "@/db/schema/teacher";
import { count } from "drizzle-orm";
import { redirect } from "next/navigation";
import { GiTeacher } from "react-icons/gi";
import { LiaSchoolSolid } from "react-icons/lia";
import { MdSubject } from "react-icons/md";
import { PiStudent } from "react-icons/pi";

export default async function Dashboard() {
  const [schools] = await db.select({ count: count() }).from(school);
  const [subjects] = await db.select({ count: count() }).from(subject);
  const [teachers] = await db.select({ count: count() }).from(teacher);
  const { user } = await validateRequest();
  if (!user) {
    return redirect("auth/login");
  }
  const [students] = await db.select({ count: count() }).from(school);

  const colors = ["#FF8042", "#AF19FF"];
  return (
    <div className="p-6 grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          icon={<PiStudent className="h-5 w-5" />}
          title="Students"
          subtitle={students.count}
          description="Total student registered"
        />
        <DashboardCard
          icon={<GiTeacher className="h-5 w-5" />}
          title="Teachers"
          subtitle={teachers.count}
          description="Total teachers registered"
        />
        <DashboardCard
          icon={<LiaSchoolSolid className="h-5 w-5" />}
          title="Schools"
          subtitle={schools.count}
          description="Total schools registered"
        />

        <DashboardCard
          icon={<MdSubject className="h-5 w-5" />}
          title="Subjects"
          subtitle={subjects.count}
          description="Total subjects registered"
        />
      </div>
      {/* <Card>
        <PieChartComponent data={studentPieChartData} colors={colors} />
      </Card> */}
    </div>
  );
}
