import StudentTable from "./_components/student-table";

export const revalidate = 0;

export default function Page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Student</h1>
      </div>
      <StudentTable />
    </div>
  );
}
