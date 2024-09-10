import { getCategories } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useCategories() {
  const { data: categoriesApi, isLoading: categoriesLoading } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });

  return { categoriesApi, categoriesLoading };
}

export default useCategories;
