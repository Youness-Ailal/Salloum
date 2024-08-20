import { getLayout } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useLayout() {
  const { isLoading, data: layout } = useQuery({
    queryKey: ["layout"],
    queryFn: getLayout,
  });
  return { isLoading, layout };
}

export default useLayout;
