import Footer from "@/components/Footer/Footer";
import NewQuoteForm from "@/components/Quotes/NewQuoteForm";
import PageHeader from "@/components/ui/PageHeader";
import QuoteItem from "@/components/ui/QuoteItem";
import { useQuotesContext } from "@/context/QuotesProvider";
import { equipment, featuredEquipments } from "@/utils/constants";
import { useSearchParams } from "react-router-dom";

function NewQuote() {
  const { quotes: quotesCart } = useQuotesContext();
  const equipments: equipment[] = featuredEquipments;
  const [searchParams] = useSearchParams();
  const equipId = searchParams.get("id");
  let quotes = quotesCart;
  if (equipId) {
    const oneEqui = equipments.filter(item => item.id === equipId);
    quotes = oneEqui.length ? oneEqui : quotesCart;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={"Request a Quote"} />
      <div className="container mx-auto mb-8 lg:mb-16">
        {quotes.length > 0 && (
          <p className=" mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Selected Equipments
          </p>
        )}
        <div className="flex flex-col gap-2 lg:gap-4 mt-2 max-lg:mt-4">
          {quotes?.map(item => (
            <QuoteItem quote={item} />
          ))}
        </div>
        <div>
          <p className=" mt-2 lg:mt-4 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Your details
          </p>
          <NewQuoteForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewQuote;
