"use client";

import { DataTable } from "@/components/datatable/data-table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const StudentTable = ({ students }: { students: any[] }) => (
  <DataTable
    columns={[
      { accessorKey: "fullName", header: "Name" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "grade", header: "Grade" },
    ]}
    data={students}
  />
);

const TeacherTable = ({ teachers }: { teachers: any[] }) => (
  <DataTable
    columns={[
      { accessorKey: "fullName", header: "Name" },
      { accessorKey: "specialization", header: "Specialization" },
      {
        accessorKey: "subjects",
        header: "Subjects",
        cell: ({ row }: any) => (
          <div className="flex flex-wrap gap-1">
            {row.original.subjects.map((subj: any) => (
              <Badge key={subj.id} variant="secondary">
                {subj.name}
              </Badge>
            ))}
          </div>
        ),
      },
    ]}
    data={teachers}
  />
);

const SubjectGrid = ({ subjects }: { subjects: any[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
    {subjects.map((subject) => (
      <Card key={subject.id} className="p-4">
        <div className="font-semibold">{subject.name}</div>
        <div className="text-muted-foreground text-sm">{subject.category}</div>
      </Card>
    ))}
  </div>
);

const SchoolDetailPage = ({ id }: { id: string }) => {
  const trpc = useTRPC();

  const { data: school, isLoading } = useSuspenseQuery(
    trpc.school.getOne.queryOptions({ id: id as string })
  );
  const { data: students } = useSuspenseQuery(
    trpc.student.getAll.queryOptions({ schoolId: id as string })
  );

  if (isLoading || !school) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="">
      <Card className="mb-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{school.name}</h1>
            {/* <p className="text-muted-foreground italic">"{school.motto}"</p> */}
          </div>
          <div className="space-x-2">
            <Badge variant="outline">{school.type}</Badge>
            <Badge variant="secondary">{school.level}</Badge>
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div>
            <strong>Registration #:</strong> {school.registrationNumber}
          </div>
          <div>
            <strong>Phone:</strong> {school.phone}
          </div>
          <div>
            <strong>Email:</strong> {school.email}
          </div>
          <div>
            <strong>Website:</strong>{" "}
            {school.website && (
              <a href={school.website} className="underline">
                {school.website}
              </a>
            )}
          </div>
          <div>
            <strong>Region:</strong> {school.region}
          </div>
          <div>
            <strong>District:</strong> {school.district}
          </div>
          <div>
            <strong>Ward:</strong> {school.ward}
          </div>
          <div className="col-span-full">
            <strong>Address:</strong> {school.address}
          </div>
        </div>
      </Card>

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <StudentTable students={students} />
        </TabsContent>
        {/* <TabsContent value="teachers">
          <TeacherTable teachers={teachers} />
        </TabsContent>
        <TabsContent value="subjects">
          <SubjectGrid subjects={subjects} />
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default SchoolDetailPage;
