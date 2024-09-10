import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCategories } from "../../services/apiEquipments";

export function useUpdateCategories() {
  const queryClient = useQueryClient();

  const { mutate: updateCategoriesApi, status } = useMutation({
    mutationFn: updateCategories,
    onSuccess: () => {
      toast.success("categories successfully updated");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: err => toast.error(err.message),
  });

  return { isUpdating: status === "pending", updateCategoriesApi };
}
