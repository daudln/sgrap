import SchoolTable from "./_components/school-table";

export const revalidate = 0;

export default async function Page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Schools</h1>
      </div>
      <SchoolTable />
    </div>
  );
}
