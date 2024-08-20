import { useQuery } from "@tanstack/react-query";
import { getEquipments } from "../../services/apiEquipments";

export function useEquipments() {
  const {
    isLoading,
    data: equipments,
    error,
  } = useQuery({
    queryKey: ["equipments"],
    queryFn: getEquipments,
  });

  return { isLoading, error, equipments };
}
