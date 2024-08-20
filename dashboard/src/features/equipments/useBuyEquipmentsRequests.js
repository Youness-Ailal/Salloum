import { useQuery } from "@tanstack/react-query";
import { getBuyEquipments } from "../../services/apiEquipments";

export function useBuyEquipmentsRequests() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["buy-equipments"],
    queryFn: getBuyEquipments,
  });

  return { isLoading, error, data };
}
