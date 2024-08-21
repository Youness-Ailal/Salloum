import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../../services/apiEquipments";
import { useSearchParams } from "react-router-dom";

export function useAnalitics() {
  const [searParams] = useSearchParams();
  const lastDays = searParams.get("last") || "7";
  const { isLoading, data: analytics } = useQuery({
    queryFn: getAnalytics,
    queryKey: ["analytics"],
  });
  return { isLoading, analytics };
}
