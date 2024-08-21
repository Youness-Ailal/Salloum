import { sendMessage } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export function useSendMessage() {
  const { status, mutate } = useMutation({
    mutationFn: sendMessage,
  });
  return { isSending: status === "pending", send: mutate };
}
