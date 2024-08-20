import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteSellRequestApi } from "../../services/apiEquipments";

export function useDeleteSellRequest() {
  const queryClient = useQueryClient();

  const { status, mutate: deleteRequest } = useMutation({
    mutationFn: deleteSellRequestApi,
    onSuccess: () => {
      toast.success("Request deleted successfully ");

      queryClient.invalidateQueries({
        queryKey: ["sell-equipments"],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { isDeleting: status === "pending", deleteRequest };
}
