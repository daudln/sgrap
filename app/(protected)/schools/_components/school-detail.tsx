import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentTable from "../../students/_components/student-table";
import TeachersTable from "../../teachers/_components/teacher-table";
import prisma from "@/lib/utils";

const SchoolDetails = async ({ id }: { id: string }) => {
  const school = await prisma.school.findUnique({
    where: {
      uuid: id,
    },
  });
  return (
    <Tabs defaultValue="students" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="teachers">Teachers</TabsTrigger>
      </TabsList>
      <TabsContent value="students">
        <Card>
          <CardHeader>
            <CardTitle>Students at {school?.name}</CardTitle>
            <CardDescription>{school?.motto}</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentTable />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="teachers">
        <Card>
          <CardHeader>
            <CardTitle>Teachers at {school?.name}</CardTitle>
            <CardDescription>{school?.motto}</CardDescription>
          </CardHeader>
          <CardContent>
            <TeachersTable />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SchoolDetails;
