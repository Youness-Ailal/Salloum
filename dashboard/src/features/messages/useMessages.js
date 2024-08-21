import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiEquipments";

export function useMessages() {
  const {
    isLoading,
    data: mesasges,
    error,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });

  return { isLoading, error, mesasges };
}
