import Footer from "@/components/Footer/Footer";
import NewQuoteForm from "@/components/Quotes/NewQuoteForm";
import PageHeader from "@/components/ui/PageHeader";
import QuoteItem from "@/components/ui/QuoteItem";
import { useQuotesContext } from "@/context/QuotesProvider";
import useEquipments from "@/data/useEquipments";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

function NewQuote() {
  const { quotes: quotesCart } = useQuotesContext();
  const { t } = useTranslation("translate");
  const { equipments } = useEquipments();
  const [searchParams] = useSearchParams();
  const equipId = searchParams.get("id");
  let quotes = quotesCart;
  if (equipId) {
    const oneEqui = equipments
      ?.filter(item => item.id === equipId)
      //@ts-ignore
      .map(item => ({ name: item?.name, image: item?.images[0] }));
    // @ts-ignore
    quotes = oneEqui?.length ? oneEqui : quotesCart;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={t("request_quote")} />
      <div className="container p-2 grid gap-y-3 lg:grid-cols-[2fr_1fr] gap-4 mx-auto mb-8 lg:mb-16">
        <div className="self-start lg:order-1 order-2">
          <p className="mt-2 lg:mt-4 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            {t("your_details")}
          </p>
          <NewQuoteForm quotes={quotes} />
        </div>
        <div className="order-1 lg:order-2">
          {quotes.length > 0 && (
            <p className="mt-2 lg:mt-4 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
              {t("selected_equipments")}
            </p>
          )}
          <div className="flex flex-col gap-2 lg:gap-4 mt-2 max-lg:mt-4">
            {quotes?.map(item => (
              <QuoteItem
                canDelete={Boolean(!equipId)}
                key={item.id}
                quote={item}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewQuote;
