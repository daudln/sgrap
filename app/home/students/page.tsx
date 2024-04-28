import CreateStudentForm from "./_components/create-student-form";

export default function Page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Student</h1>
        <CreateStudentForm />
      </div>
    </div>
  );
}
