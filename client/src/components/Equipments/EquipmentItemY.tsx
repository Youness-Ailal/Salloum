import { equipment } from "@/utils/constants";
import Button from "../ui/Button";
import { BsBagPlus } from "react-icons/bs";
import { IoBagRemoveOutline } from "react-icons/io5";
import { useQuotesContext } from "@/context/QuotesProvider";
import { cn } from "@/lib/utils";
import { BiMessage } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function EquipmentItemY({
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
        "flex flex-col p-2 items-start sm:grid sm:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] w-full group relative bg-sky-100/60 gap-8 whitespace-nowrap text-ellipsis rounded-sm border-2 border-sky-200 hover:border-sky-300 hover:shadow-md hover:bg-sky-100/80 transition-all",
        { "grayscale-[.4]": !isInStock },
        className
      )}>
      <div className="relative overflow-hidden">
        {!isInStock && (
          <p className="absolute w-full bg-red-600/80 !grayscale-0 text-red-50 text-base lg:text-lg uppercase font-medium p-2 top-1/2 -translate-y-1/2 left-0 z-50 text-center">
            {t("soldOut")}{" "}
          </p>
        )}
        <img
          src={images[0]}
          alt={name}
          className={cn(
            "xl:w-96 xl:h-60 h-52 w-80 object-cover rounded border-2 border-sky-200/70"
          )}
        />
      </div>
      <div className="p-2 lg:p-4 flex w-full flex-col  h-full gap-1 xl:gap-2 overflow-hidden">
        <p
          className={cn(
            "uppercase text-start font-light text-sm tracking-widest",
            {
              "text-lime-700": isInStock,
              "text-red-500": !isInStock,
            }
          )}>
          {stockText}
        </p>
        <p className="text-lg group-hover:text-sky-900 group-hover:underline xl:text-2xl text-sky-800 font-medium my-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {name}{" "}
        </p>
        <p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-96 opacity-75 text-sky-950">
          {description}
        </p>
        <div className="flex flex-wrap sm:grid sm:grid-cols-[1fr_auto] max-w-[500px] pt-4 mt-auto gap-2 lg:gap-4  lg:mt-5">
          <button
            onClick={handleContact}
            className="text-sky-800 p-2 lg:p-3 px-4 border rounded-sm border-sky-700 font-semibold text-lg flex items-center gap-2 uppercase outline outline-1 outline-transparent hover:outline-sky-700">
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

export default EquipmentItemY;
