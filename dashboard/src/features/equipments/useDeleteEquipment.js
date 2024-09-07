import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteEquipment as deleteEquipmentapi } from "../../services/apiEquipments";

export function useDeleteEquipment() {
  const queryClient = useQueryClient();

  const { status, mutate: deleteEquipment } = useMutation({
    mutationFn: deleteEquipmentapi,
    onSuccess: () => {
      toast.success("Equipment successfully deleted!");
      queryClient.invalidateQueries({
        queryKey: ["equipments"],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { isDeleting: status === "pending", deleteEquipment };
}
