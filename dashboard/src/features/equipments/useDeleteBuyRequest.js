import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBuyRequestApi } from "../../services/apiEquipments";

export function useDeleteBuyRequest() {
  const queryClient = useQueryClient();

  const { status, mutate: deleteRequest } = useMutation({
    mutationFn: deleteBuyRequestApi,
    onSuccess: () => {
      toast.success("Request deleted successfully ");

      queryClient.invalidateQueries({
        queryKey: ["buy-equipments"],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { isDeleting: status === "pending", deleteRequest };
}
