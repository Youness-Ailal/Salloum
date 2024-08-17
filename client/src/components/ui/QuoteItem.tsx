import { quoteType, useQuotesContext } from "@/context/QuotesProvider";
import { BsTrash } from "react-icons/bs";

function QuoteItem({ quote }: { quote: quoteType }) {
  const { id, name, image, description } = quote;
  const { removeQuote } = useQuotesContext();
  function handleRemoveQuote() {
    removeQuote(id);
  }
  return (
    <div className="flex items-center gap-2 lg:gap-5 py-2 lg:py-4 border-b border-sky-950/10">
      <img
        className="max-w-24 object-cover border-r border-sky-950/10 px-2 lg:px-4"
        src={image}
        alt={name}
      />
      <p className="max-w-40 lg:max-w-[500px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {name}{" "}
      </p>
      <button
        onClick={handleRemoveQuote}
        className="ml-auto text-sky-950 text-lg lg:text-xl hover:text-sky-900">
        <BsTrash />
      </button>
    </div>
  );
}

export default QuoteItem;
