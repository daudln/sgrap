import TeacherTable from "./_components/teacher-table";

export default async function Page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Subjects</h1>
      </div>
      <TeacherTable />
    </div>
  );
}
