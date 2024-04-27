import { DataTable } from "@/components/data-table";
import CreateSubjectForm from "@/components/subject/create-subject-form";
import SubjectTable from "@/components/subject/subject-table";
import { getSubjects } from "@/server/subjects/actions";
import { Subject } from "@prisma/client";
import { FilterFn } from "@tanstack/react-table";

export default async function Page() {
  const subjects = await getSubjects();
  if (!subjects.success) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Subjects</h1>
        <CreateSubjectForm />
      </div>
      <SubjectTable />
    </div>
  );
}
