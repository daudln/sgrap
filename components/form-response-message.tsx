import { cn } from "@/lib/utils";
import { RxExclamationTriangle, RxCheckCircled } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";
interface FormErrorProps {
  message?: string;
  type?: "success" | "error" | "warning";
  classNames?: string;
}

const FormResponseMessage = ({
  message,
  type = "success",
  classNames,
}: FormErrorProps) => {
  return (
    <div
      className={cn(
        "p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive justify-center",
        type === "error" && "text-destructive bg-destructive/15",
        type === "success" && "bg-emerald-500/15 text-emerald-500",
        type === "warning" && "bg-amber-500/15 text-amber-500",
        classNames
      )}
    >
      {type === "success" && <RxCheckCircled className="w-5 h-5" />}
      {type === "warning" && <RxExclamationTriangle className="w-5 h-5" />}
      {type === "error" && <MdOutlineCancel className="w-5 h-5" />}
      <p>{message}</p>
    </div>
  );
};

export default FormResponseMessage;
