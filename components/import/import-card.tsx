import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import ImportTable from "@/components/import-table";
import useConfirm from "@/hooks/use-confirm";
import { useStore } from "@/store/store";
import { Progress } from "@/components/ui/progress";

type Props = {
  data: string[][];
  onSubmit: (data: any[]) => void;
  columns: string[];
  requiredColumns: string[];
  onCancelImport: () => void;
};

const ImportCard = ({
  data,
  onSubmit,
  columns,
  requiredColumns,
  onCancelImport,
}: Props) => {
  const headers = data[0];
  const [body, setBody] = useState(data.slice(1));

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

  const onTableHeadSelectChange = (index: number, value: string | null) => {
    setSelectedColumns(index, value);
  };

  const handleRemoveRow = (indexToRemove: number) => {
    setBody((prevBody) =>
      prevBody.filter((_, index) => index !== indexToRemove)
    );
  };

  const progress = useMemo(() => {
    const selected = Object.values(selectedColumns).filter(
      (value) => value && requiredColumns.includes(value)
    ).length;
    return (selected / requiredColumns.length) * 100;
  }, [selectedColumns, requiredColumns]);

  const handleContinue = () => {
    processAndSubmitData(headers, body, onSubmit);
    resetUploadData();
    onCancelImport();
  };

  const matchedRequiredFields = Object.values(selectedColumns).filter(
    (value) => value && requiredColumns.includes(value)
  ).length;

  return (
    <>
      <ConfirmationDialog />
      <div className="py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center pb-6 gap-6">
          {/* Left Side */}
          <div>
            <h3 className="text-lg font-semibold">Match Columns</h3>
            <p className="text-sm text-muted-foreground">
              Select the corresponding column for each required field.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-x-6">
            <div className="w-56">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">
                  Fields Matched
                </span>
                <span className="text-sm font-medium">
                  {matchedRequiredFields} / {requiredColumns.length}
                </span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
            <div className="flex gap-2" role="group">
              <Button
                variant="outline"
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
                  }
                }}
                disabled={progress < 100}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <ImportTable
          headers={headers}
          body={body}
          selectedColumns={selectedColumns}
          columns={columns}
          onTableHeadSelectChange={onTableHeadSelectChange}
          // onRemoveRow={handleRemoveRow} // This line was commented out in the prompt
        />
      </div>
    </>
  );
};

export default ImportCard;
