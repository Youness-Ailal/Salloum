import { sendSellRequest } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

function useSendSellRequest() {
  const { status, mutate: sendRequest } = useMutation({
    mutationFn: sendSellRequest,
  });

  return { isLoading: status === "pending", sendRequest };
}

export default useSendSellRequest;
