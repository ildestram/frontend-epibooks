// controllo se effettivamente siamo loggati
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const useAuth = () => {
  const session = JSON.parse(localStorage.getItem("loggedIn"));
  if (session && session.payload.email && session.payload.email.length > 0) {
    return true;
  }
  return false;
};

const ProtectedRoutes = () => {
  const isAuthorized = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;
