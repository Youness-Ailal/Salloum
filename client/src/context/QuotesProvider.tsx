import { createContext, useContext, useEffect, useState } from "react";

export type quoteType = {
  id: string;
  name: string;
  description?: string;
  image: string;
};

type QuotecontextValue = {
  quotes: quoteType[];
  addQuote: (quote: quoteType) => void;
  removeQuote: (id: string) => void;
  clearQuotes: () => void;
};

//@ts-ignore
const Quotecontext = createContext<QuotecontextValue>();

function QuotesProvider({ children }: { children: React.ReactNode }) {
  const [quotes, setQuotes] = useState<quoteType[]>(() => {
    const quotesString = localStorage.getItem("quotes");
    return quotesString ? JSON.parse(quotesString) : [];
  });
  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);
  const addQuote = (quote: quoteType) => setQuotes(prev => [...prev, quote]);
  const clearQuotes = () => setQuotes([]);

  const removeQuote = (id: string) =>
    setQuotes(prev => [...prev.filter(item => item.id !== id)]);

  return (
    <Quotecontext.Provider
      value={{
        quotes,
        addQuote,
        removeQuote,
        clearQuotes,
      }}>
      {children}
    </Quotecontext.Provider>
  );
}

export default QuotesProvider;

export function useQuotesContext() {
  const context = useContext(Quotecontext);
  if (context === undefined)
    throw new Error("quote context is used outside QUOTE Provider");
  return context;
}
