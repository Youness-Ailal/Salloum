import { equipment } from "@/utils/constants";
import Button from "../ui/Button";
import { BsBagPlus } from "react-icons/bs";
import { IoBagRemoveOutline } from "react-icons/io5";
import { useQuotesContext } from "@/context/QuotesProvider";
import { cn } from "@/lib/utils";
import { BiMessage } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function EquipmentItem({
  equipment,
  className,
}: {
  equipment: equipment;
  className?: string;
}) {
  const { name, id, images, description, stock } = equipment;
  const { t } = useTranslation(["translate"]);

  const stockText =
    stock?.toLowerCase() === "in stock" ? t("stock_in") : t("stock_out");

  const isInStock = stock?.toLowerCase() === "in stock";
  const navigate = useNavigate();
  const { quotes, addQuote, removeQuote } = useQuotesContext();
  const isInQuote = quotes.findIndex(item => item.id === id) !== -1;

  //@ts-ignore
  function addToQuotes(e) {
    e?.preventDefault();
    addQuote({ name, id, description, image: images[0] });
  }
  function handleContact(e) {
    e?.preventDefault();
    navigate("/new-quote?id=" + id);
  }
  //@ts-ignore
  function removeFromQuotes(e) {
    e?.preventDefault();
    removeQuote(id);
  }
  return (
    <Link
      to={"/equipments/" + id}
      className={cn(
        "flex flex-col group relative rounded max-w-72 lg:max-w-96 hover:border-sky-300 border border-sky-200 overflow-hidden",
        { "grayscale-[.4]": !isInStock },
        className
      )}>
      <div className="relative">
        {!isInStock && (
          <p className="absolute w-full bg-red-600/80 !grayscale-0 text-red-50 text-base lg:text-lg uppercase font-medium p-2 top-1/2 -translate-y-1/2 left-0 z-50 text-center">
            {t("soldOut")}{" "}
          </p>
        )}
        <img
          src={images[0]}
          alt={name}
          className="h-52 border-b border-sky-200 w-full object-cover"
        />
      </div>
      <div className="group-hover:bg-sky-100/60 bg-sky-100/50 p-2 lg:p-4 h-full flex flex-col justify-between gap-1 xl:gap-2">
        <p
          className={cn(
            "uppercase text-start font-light text-sm tracking-widest",
            {
              "text-teal-600": isInStock,
              "text-red-500": !isInStock,
            }
          )}>
          {stockText}
        </p>
        <p className="text-lg group-hover:text-sky-900 group-hover:underline line-clamp-2 xl:text-xl text-sky-950 font-medium w-full my-2">
          {name}{" "}
        </p>
        <div className="grid grid-cols-[1fr_auto] mt-auto gap-2 lg:gap-4  lg:mt-5">
          <button
            onClick={handleContact}
            className="text-sky-800 p-2 lg:p-3 border rounded-sm border-sky-700 font-semibold text-lg flex items-center gap-2 uppercase outline outline-1 outline-transparent hover:outline-sky-700">
            {t("get_quote")}
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
    </Link>
  );
}

export default EquipmentItem;
