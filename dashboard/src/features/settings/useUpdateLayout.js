import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateLayout } from "../../services/apiEquipments";

export function useUpdateLayout() {
  const queryClient = useQueryClient();

  const { mutate: update, status } = useMutation({
    mutationFn: updateLayout,
    onSuccess: () => {
      toast.success("Layout updated successfully ");
      queryClient.invalidateQueries({ queryKey: ["layout"] });
    },
    onError: err => toast.error(err.message),
  });

  return { isUpdating: status === "pending", update };
}
