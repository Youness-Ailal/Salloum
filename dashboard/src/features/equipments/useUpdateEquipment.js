import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateEquipmentApi } from "../../services/apiEquipments";

export function useUpdateEquipment() {
  const queryClient = useQueryClient();

  const { mutate: updateEquipment, status } = useMutation({
    mutationFn: updateEquipmentApi,
    onSuccess: () => {
      toast.success("Equipment successfully updated");
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
    },
    onError: err => toast.error(err.message),
  });

  return { isUpdating: status === "pending", updateEquipment };
}
