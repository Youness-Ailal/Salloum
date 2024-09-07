import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiEquipments";

export function useCategories() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchInterval: Infinity,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
  });

  return { isLoading, error, categories };
}
