import { quoteType, useQuotesContext } from "@/context/QuotesProvider";
import { BsTrash } from "react-icons/bs";

function QuoteItem({
  quote,
  canDelete = true,
}: {
  quote: quoteType;
  canDelete?: boolean;
}) {
  const { id, name, image } = quote;
  const { removeQuote } = useQuotesContext();
  function handleRemoveQuote() {
    removeQuote(id);
  }
  return (
    <div className="flex items-center gap-2 lg:gap-5 py-2 px-2 lg:py-4 border-b border-sky-950/10">
      <img
        className="lg:w-28 aspect-[6/4] w-20 object-cover border-r border-sky-950/10 px-2"
        src={image}
        alt={name}
      />
      <p className="max-w-40 lg:max-w-[500px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {name}{" "}
      </p>
      {canDelete && (
        <button
          onClick={handleRemoveQuote}
          className="ml-auto text-sky-950 text-lg lg:text-xl hover:text-sky-900">
          <BsTrash />
        </button>
      )}
    </div>
  );
}

export default QuoteItem;
