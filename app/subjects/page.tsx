import CreateSubjectForm from "@/components/subject/create-subject-form";
import { getSubjects } from "@/server/subjects/actions";

export default async function Page() {
  const subjects = await getSubjects();
  if (!subjects.success) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Subjects</h1>
      <ul>
        {subjects?.data?.map((subject) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>
      <CreateSubjectForm />
    </div>
  );
}
