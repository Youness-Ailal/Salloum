import { getEquipments } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useEquipments() {
  const { isLoading, data: equipments } = useQuery({
    queryKey: ["equipments"],
    queryFn: getEquipments,
  });
  return { isLoading, equipments };
}

export default useEquipments;
