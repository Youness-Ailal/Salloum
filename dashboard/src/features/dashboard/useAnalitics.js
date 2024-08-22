import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../../services/apiEquipments";

export function useAnalitics() {
  const { isLoading, data: analytics } = useQuery({
    queryFn: getAnalytics,
    queryKey: ["analytics"],
  });
  return { isLoading, analytics };
}
