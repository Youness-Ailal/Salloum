import { useQuery } from "@tanstack/react-query";
import { getSellEquipments } from "../../services/apiEquipments";

export function useSellEquipmentsRequests() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["sell-equipments"],
    queryFn: getSellEquipments,
  });

  return { isLoading, error, data };
}
