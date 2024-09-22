import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type contextValue = {
  category: string;
  changeCategory: (category: string) => void;
  setFilterSubcategories: Dispatch<SetStateAction<string[]>>;
  filterSubcategories: string[];
};
//@ts-ignore
const productContext = createContext<contextValue>();

export default function ProductFilterProvider({ children }) {
  const [category, setCategory] = useState("");
  const [filterSubcategories, setFilterSubcategories] = useState<string[]>([]);

  function changeCategory(category: string) {
    setCategory(prev => (prev === category ? "" : category));
  }

  return (
    <productContext.Provider
      //@ts-ignore
      value={{
        category,
        changeCategory,
        filterSubcategories,
        setFilterSubcategories,
      }}>
      {children}
    </productContext.Provider>
  );
}

export function useProductFilterContext() {
  const context = useContext(productContext);
  if (context === undefined)
    throw new Error("context is used outside QUOTE Provider");
  return context;
}
