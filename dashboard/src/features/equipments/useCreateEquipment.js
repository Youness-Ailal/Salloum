import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addEquipment } from "../../services/apiEquipments";

export function useCreateEquipment() {
  const queryClient = useQueryClient();

  const { mutate: createEquipment, status } = useMutation({
    mutationFn: addEquipment,
    onSuccess: () => {
      toast.success("New Equipment successfully created");
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
    },
    onError: err => toast.error(err.message),
  });

  return { isCreating: status === "pending", createEquipment };
}
