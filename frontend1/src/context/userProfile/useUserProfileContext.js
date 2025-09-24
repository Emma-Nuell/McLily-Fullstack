import { useContext } from "react";
import UserProfileContext from "./UserProfileContext";

const useUserProfileContext = () => useContext(UserProfileContext);

export default useUserProfileContext;