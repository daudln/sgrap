import CreateSubjectForm from "@/app/home/subjects/_components/create-subject-form";
import SubjectTable from "@/app/home/subjects/_components/subject-table";
import { getSubjects } from "@/app/home/subjects/_actions/actions";

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
