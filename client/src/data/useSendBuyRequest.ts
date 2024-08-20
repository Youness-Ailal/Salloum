import { sendBuyRequest } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

function useSendBuyRequest() {
  const { status, mutate: sendRequest } = useMutation({
    mutationFn: sendBuyRequest,
  });

  return { isLoading: status === "pending", sendRequest };
}

export default useSendBuyRequest;
