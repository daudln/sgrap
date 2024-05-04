import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
export function DataTableSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
          <Skeleton className="w-[250px] h-[30px] rounded-md" />
          <Skeleton className="w-[90px] h-[30px] rounded-md" />
        </div>
        <div className="flex space-x-2 items-center">
          <Skeleton className="w-[90px] h-[30px] rounded-md" />
          <Skeleton className="w-[110px] h-[30px] rounded-md" />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {[1, 2, 3, 4, 5].map((col) => (
                <TableHead key={col}>
                  <Skeleton className="w-[120px] h-[25px] rounded-lg" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((col) => (
              <TableRow key={col}>
                <TableCell>
                  <Skeleton className="w-[120px] h-[25px] rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[120px] h-[25px] rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[120px] h-[25px] rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[120px] h-[25px] rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[120px] h-[25px] rounded-lg" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
