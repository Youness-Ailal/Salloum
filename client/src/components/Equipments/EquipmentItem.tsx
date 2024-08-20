import { equipment } from "@/utils/constants";
import Button from "../ui/Button";
import { BsBagPlus } from "react-icons/bs";
import { IoBagRemoveOutline } from "react-icons/io5";
import { useQuotesContext } from "@/context/QuotesProvider";
import { cn } from "@/lib/utils";
import { BiMessage } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function EquipmentItem({
  equipment,
  className,
}: {
  equipment: equipment;
  className?: string;
}) {
  const { name, id, image, description } = equipment;
  const navigate = useNavigate();
  const { quotes, addQuote, removeQuote } = useQuotesContext();
  const isInQuote = quotes.findIndex(item => item.id === id) !== -1;

  // const isNewArrival = Math.random() > 0.5;

  function addToQuotes(e) {
    e?.preventDefault();
    addQuote({ name, id, description, image });
  }
  function handleContact() {
    navigate("/new-quote?id=" + id);
  }
  function removeFromQuotes(e) {
    e?.preventDefault();
    removeQuote(id);
  }
  return (
    <div
      // to={"equipments/" + id}
      className={cn(
        "flex flex-col relative overflow-hidden gap-4 xl:gap-6 rounded-sm max-w-96 border border-sky-50",
        className
      )}>
      {/* {isNewArrival && (
        <p className="absolute top-0 left-0 text-center p-2 font-light bg-sky-900/70 text-white w-full tracking-widest">
          NEW ARRIVAL
        </p>
      )} */}
      <div>
        <img src={image} alt={name} className="h-52 w-full object-cover" />
      </div>
      <div className="p-2 bg-sky-50 h-full flex flex-col lg:p-4 justify-between gap-3 xl:gap-5">
        <p className="text-lg xl:text-xl text-gray-800 max-w-72 ">{name} </p>
        <div className="grid grid-cols-[1fr_auto] mt-auto gap-2 lg:gap-4  lg:mt-5">
          <button
            onClick={handleContact}
            className="text-sky-800 p-2 lg:p-3 border rounded-sm border-sky-700 font-semibold text-lg flex items-center gap-2">
            CONTACT US
            <span className="font-bold text-2xl ml-auto">
              <BiMessage />
            </span>
          </button>
          {isInQuote ? (
            <Button
              onClick={removeFromQuotes}
              className="!text-2xl bg-sky-900 hover:bg-sky-950 lg:p-4 lg:px-4 p-3 h-full">
              <IoBagRemoveOutline />
            </Button>
          ) : (
            <Button
              onClick={addToQuotes}
              className="!text-2xl lg:p-4 lg:px-4 p-3 h-full">
              <BsBagPlus />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EquipmentItem;
