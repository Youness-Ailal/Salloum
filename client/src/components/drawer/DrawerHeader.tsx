import { IoCloseOutline } from "react-icons/io5";

// Define prop types for DrawerHeader
interface DrawerHeaderProps {
  onClose: () => void;
  title: string;
  subTitle: string;
}

function DrawerHeader({ onClose, title, subTitle }: DrawerHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b pb-8 border-[rgb(61,67,74,.3)]">
      <div className="text-primary space-y-1">
        <p className="text-lg lg:text-2xl text-sky-950">{title}</p>
        <p className="text-sm font-light">{subTitle}</p>
      </div>
      <button
        onClick={onClose}
        className="p-3 hover:bg-gray-200 rounded-full bg-gray-100 text-2xl">
        <IoCloseOutline />
      </button>
    </div>
  );
}

export default DrawerHeader;
