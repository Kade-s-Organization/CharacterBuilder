import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/auth";

export const ProtectRoutes = () => {
  const token = useSelector(selectCurrentToken);
  return token ? <Outlet /> : <Navigate to="/login" exact />;
};
