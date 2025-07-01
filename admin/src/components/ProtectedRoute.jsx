
import { useAuthContext } from "../context/index.js";
import { Navigate, useLocation } from "react-router-dom";
import { SpinnerLoader } from "./Loaders/index.js";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading,} = useAuthContext();
  const location = useLocation();
  

 

  if (loading) {
    return (
      <div>
        <SpinnerLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};
export default ProtectedRoute;

 // useEffect(() => {
  //   const checkAuthorization = async () => {
  //     if (isAuthenticated) {
  //       try {
  //         setIsVerifying(true);
  //         const isValid = await verifyAdminRole();
  //         setIsAuthorized(isValid);
  //       } catch (error) {
  //         console.error("Authorization check failed", error);
  //         setIsAuthorized(false);
  //       } finally {
  //         setIsVerifying(false);
  //       }
  //     } else {
  //       setIsAuthorized(false);
  //       setIsVerifying(false);
  //     }
  //   };
  //   checkAuthorization();
  // }, [isAuthenticated, verifyAdminRole]);