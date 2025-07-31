
import { useAuthContext } from "../context/index.js";
import { Navigate, useLocation } from "react-router-dom";
import { SpinnerLoader } from "./Loaders/index.js";
// import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const {  loading, isAuthenticated, verifyAdminRole} = useAuthContext();
  const location = useLocation();
  // const [isValidating, setIsValidating] = useState(true)
  // const [isActuallyAuthenticated, setIsActuallyAuthenticated] = useState(false)
  
  // useEffect(() => {
  //   let isMounted = true;
    
  //   const checkAuth = async () => {
  //     if (!isAuthenticated()) {
  //       if (isMounted) setIsValidating(false);
  //       return;
  //     }
      
  //     try {
  //       const isValid = await validateToken();
  //       if (isMounted && !isValid) {
  //         setIsValidating(false);
  //       }
  //     } catch (error) {
  //       if (isMounted) setIsValidating(false);
  //     } finally {
  //       if (isMounted) setIsValidating(false);
  //     }
  //   };

  //   checkAuth();
    
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [isAuthenticated, verifyAdminRole, location]);
 

  if (loading) {
    return (
      <div className = "flex justify-center items-center h-screen">
        <SpinnerLoader />
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};
export default ProtectedRoute;

