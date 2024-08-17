import { useQuotesContext } from "@/context/QuotesProvider";
import Drawer from "../drawer/Drawer";
import QuoteItem from "../ui/QuoteItem";
import { useNavigate } from "react-router-dom";

function QuotesDrawer({ setShowQuote }) {
  const { quotes } = useQuotesContext();
  const navigate = useNavigate();
  return (
    <Drawer
      onClose={() => setShowQuote(false)}
      title="Your Quotes Items"
      subTitle=""
      handleClick={() => navigate("/new-quote")}
      buttonName="PLACE QUOTE"
      disabled={!quotes?.length}>
      {quotes.length > 0 ? (
        <ul className="flex flex-col py-2 lg:py-5 gap-1">
          {quotes?.map(item => (
            <QuoteItem key={item.id} quote={item} />
          ))}
        </ul>
      ) : (
        <p className="py-4 lg:py-7 text-lg lg:text-2xl text-center my-auto text-sky-950">
          Start adding Equipments :)
        </p>
      )}
    </Drawer>
  );
}

export default QuotesDrawer;
