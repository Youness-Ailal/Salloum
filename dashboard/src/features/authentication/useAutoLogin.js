import { useMutation, useQueryClient } from "@tanstack/react-query";
import { autoLogin } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useAutoLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = window.location.pathname;

  const { mutate: login, status } = useMutation({
    mutationFn: ({ email, password }) => autoLogin({ email, password }),
    onSuccess: user => {
      queryClient.setQueryData(["user"], user);
      navigate(location ? location : "/dashboard", { replace: true });
    },
    onError: err => {
      toast.error(err.message || "Provided email or password are incorrect");
    },
  });

  return { login, isLoading: status === "pending" };
}
