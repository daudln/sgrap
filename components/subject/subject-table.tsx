"use client";

import { DataTable } from "@/components/data-table";
import CreateSubjectForm from "@/components/subject/create-subject-form";
import { getSubjects } from "@/server/subjects/actions";
import { Subject } from "@prisma/client";
import { FilterFn } from "@tanstack/react-table";
import { useState, useTransition } from "react";

const multiColumnFilterFn: FilterFn<Subject> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.name} ${row.original.name} ${row.original.code} ${row.original.id}`;
  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase());
};

export default function StudentTable() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetSubjects = async () => {
    startTransition(async () => {
      const { data, status, message } = await getSubjects();
      if (!status) {
        setError(message);
      }
      if (data) {
        setSubjects(data);
      }
    });
  };

  return (
    <div>
      <h1 className="text-lg font-semibold md:text-2xl">Subjects</h1>
      <DataTable
        data={subjects}
        columns={[
          { accessorKey: "code", header: "Code" },
          { accessorKey: "name", header: "Name" },
          {
            accessorKey: "description",
            header: "Description",
            filterFn: multiColumnFilterFn,
          },
        ]}
      />
      <CreateSubjectForm />
    </div>
  );
}
