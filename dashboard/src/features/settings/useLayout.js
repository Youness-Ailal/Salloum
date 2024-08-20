import { useQuery } from "@tanstack/react-query";
import { getLayout } from "../../services/apiEquipments";

export function useLayout() {
  const {
    isLoading,
    error,
    data: layout,
  } = useQuery({
    queryKey: ["layout"],
    queryFn: getLayout,
    staleTime: Infinity,
  });

  return { isLoading, error, layout };
}
