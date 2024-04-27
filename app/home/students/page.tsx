import CreateStudentForm from "@/components/student/create-student-form";
import SubjectTable from "@/components/subject/subject-table";

export default function Page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Student</h1>
        <CreateStudentForm />
      </div>
      <SubjectTable />
    </div>
  );
}
