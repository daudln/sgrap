import { Button } from "@/components/ui/button";
import { useCSVReader } from "react-papaparse";
import { Upload } from "lucide-react";
type Props = {
  onUpload: (results: any) => void;
};

const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();
  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" variant="outline" className="h-8" {...getRootProps()}>
          <Upload className="mr-2 size-4" />
          Import CSV
        </Button>
      )}
    </CSVReader>
  );
};

export default UploadButton;
