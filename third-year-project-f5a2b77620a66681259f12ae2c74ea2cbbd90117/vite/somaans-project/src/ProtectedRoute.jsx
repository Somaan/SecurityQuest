// front-end security
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

//using prop to check sessionStorage is authenticated
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
