"use client";

import { DataTable } from "@/components/data-table";
import useSubjects from "@/hooks/useSubjects";
import { getSubjects } from "@/server/subjects/actions";
import { Subject } from "@prisma/client";
import { FilterFn } from "@tanstack/react-table";
import { useEffect, useState, useTransition } from "react";

const multiColumnFilterFn: FilterFn<Subject> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.name} ${row.original.description} ${row.original.code} ${row.original.id}`;
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

  useEffect(() => {
    fetSubjects();
  }, []);

  return (
    <DataTable
      data={subjects}
      columns={[
        {
          accessorKey: "s/n",
          header: "S/N",
          accessorFn: (row, index) => index + 1,
        },
        { accessorKey: "code", header: "Code", filterFn: multiColumnFilterFn },
        { accessorKey: "name", header: "Name", filterFn: multiColumnFilterFn },
        {
          accessorKey: "description",
          header: "Description",
          filterFn: multiColumnFilterFn,
        },
      ]}
    />
  );
}
