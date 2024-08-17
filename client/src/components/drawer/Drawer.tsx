import { createPortal } from "react-dom";
import BackDrop from "./BackDrop";
import DrawerHeader from "./DrawerHeader";
import Button from "../ui/Button";

type DrawerProps = {
  onClose: () => void;
  title: string;
  subTitle: string;
  handleClick?: () => void;
  children: React.ReactNode;
  buttonName?: string;
  formId?: string | null;
  isLoading?: boolean;
  disabled?: boolean;
};

function Drawer({
  onClose,
  title,
  subTitle,
  handleClick,
  children,
  buttonName = "Save",
  formId = null,
  isLoading = false,
  disabled = false,
}: DrawerProps) {
  return createPortal(
    <>
      <div className="w-[min(100%,700px)] h-screen bg-white fixed flex flex-col  top-0 right-0 z-[999] pt-0 p-4 md:p-8 md:py-0 category-drawer animate-drawer overflow-y-auto pb-0">
        <div className="sticky top-0 bg-white z-10 pt-6">
          <DrawerHeader title={title} subTitle={subTitle} onClose={onClose} />
        </div>
        {children}
        <div className="py-5 bg-white w-full ml-auto flex justify-end sticky bottom-0 mt-auto">
          {formId && (
            <Button
              disabled={disabled || isLoading}
              //@ts-expect-error loading
              isLoading={isLoading}
              form={formId}
              onClick={handleClick}>
              {buttonName}
            </Button>
          )}
          {!formId && (
            <Button
              disabled={disabled || isLoading}
              //@ts-expect-error loading
              isLoading={isLoading}
              onClick={handleClick}>
              {buttonName}
            </Button>
          )}
        </div>
      </div>

      <BackDrop onClick={onClose} />
    </>,
    document.body
  );
}

export default Drawer;
