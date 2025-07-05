import { Button } from "@/components/ui/button";
import ImportTable from "@/components/import-table";
import useConfirm from "@/hooks/use-confirm";
import { useStore } from "@/store/store";

type Props = {
  data: string[][];
  onSubmit: (data: any[]) => void;
  columns: string[];
  requiredColumns: string[];
};

const ImportCard = ({ data, onSubmit, columns, requiredColumns }: Props) => {
  const onCancelImport = useStore((s) => s.onCancelImport);
  const setSelectedColumns = useStore((s) => s.setSelectedColumns);
  const selectedColumns = useStore((s) => s.selectedColumns);
  const processAndSubmitData = useStore((state) => state.processAndSubmitData);
  const resetUploadData = useStore((state) => state.resetUploadData);

  const [ConfirmationDialog, confirm] = useConfirm(
    "Import Data",
    "Are you sure you want to import this data?",
    "Cancel",
    "Import",
    "destructive",
    "default"
  );
  const headers = data[0];
  const body = data.slice(1);
  const onTableHeadSelectChange = (index: number, value: string | null) => {
    setSelectedColumns(index, value);
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const headers = data[0];
    const body = data.slice(1);
    processAndSubmitData(headers, body, onSubmit);
    resetUploadData();
  };

  return (
    <>
      <ConfirmationDialog />
      <div className="py-4">
        <div className="flex justify-between items-center pb-6">
          <h3 className="text-lg font-semibold">Import Data</h3>
          <div className="flex gap-2 self-end" role="group">
            <Button
              size="sm"
              onClick={() => {
                onCancelImport();
                resetUploadData();
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={async () => {
                const ok = await confirm();
                if (ok) {
                  handleContinue();
                  onCancelImport();
                }
              }}
              disabled={progress < requiredColumns.length}
            >
              Submit ({progress} / {requiredColumns.length})
            </Button>
          </div>
        </div>
        <ImportTable
          headers={headers}
          body={body}
          selectedColumns={selectedColumns}
          columns={columns}
          onTableHeadSelectChange={onTableHeadSelectChange}
        />
      </div>
    </>
  );
};

export default ImportCard;
