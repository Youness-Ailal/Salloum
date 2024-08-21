import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteMessage } from "../../services/apiEquipments";

export function useDeleteMessage() {
  const queryClient = useQueryClient();

  const { status, mutate: deleteRequest } = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      toast.success("message deleted successfully ");

      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { isDeleting: status === "pending", deleteRequest };
}
