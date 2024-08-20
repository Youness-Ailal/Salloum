import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, status } = useMutation({
    mutationFn: signupApi,
    onSuccess: fullName => {
      toast.success(fullName + " Account's successfully created!");
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { signup, isLoading: status === "pending" };
}
