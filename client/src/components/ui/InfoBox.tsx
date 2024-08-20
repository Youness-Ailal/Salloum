import { cn } from "@/lib/utils";
import { CgClose } from "react-icons/cg";

export type infoBoxProps = {
  type: "success" | "error";
  message: string;
  clear?: () => void;
};
function InfoBox({ type, message, clear }: infoBoxProps) {
  return (
    <div
      className={cn(
        "p-3 w-full lg:p-4 my-2 rounded-sm grid items-center grid-cols-[1fr_40px] text-lg justify-between gap-4",
        {
          "bg-red-100 text-red-700": type === "error",
        },
        {
          "bg-green-100 text-green-700": type === "success",
        }
      )}>
      <p>{message}</p>
      <button onClick={clear} className="flex p-1 items-center justify-center">
        <CgClose />
      </button>
    </div>
  );
}

export default InfoBox;
