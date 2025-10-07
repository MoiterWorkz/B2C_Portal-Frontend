import { Navigate } from "react-router-dom";
import { useSignInStore } from "../store/useSigninStore";

const PrivateRoute = ({ children }) => {
  const { getCustomerId } = useSignInStore();
  const customerId = getCustomerId();
  return customerId ? children : <Navigate to="/home" />;
};

export default PrivateRoute;
