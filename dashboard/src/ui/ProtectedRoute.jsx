import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAutoLogin } from "../features/authentication/useAutoLogin";
import { EMAIL_SECRET, PASS_SECRET } from "../services/apiAuth";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const email = localStorage.getItem(EMAIL_SECRET);
const password = localStorage.getItem(PASS_SECRET);
const hasLoclaEmailnPass = email && password;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading: isLogging, login } = useAutoLogin();

  useEffect(() => {
    if (hasLoclaEmailnPass) login({ email, password });
  }, [hasLoclaEmailnPass]);
  const { user, isLoading, isAuthenticated } = useUser();

  const loading = isLogging || isLoading;
  useEffect(
    function () {
      if (!isAuthenticated && !loading) navigate("/login");
    },
    [isAuthenticated, loading, navigate]
  );

  if (loading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
