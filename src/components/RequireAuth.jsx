import { useLocation, Navigate, Outlet } from "react-router";
import jwt_decode from "jwt-decode";

const RequireAuth = () => {
  const location = useLocation();
  const token = window.localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const { exp } = jwt_decode(token);
  const current = Date.now();
  const currentSeconds = Math.floor(current / 1000);

  if (exp < currentSeconds) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
