//Packages
import { useContext } from "react";
//Hooks
import { AuthContext } from "../context/AuthProvider";



function useAuth() {
    return useContext(AuthContext);
}

export default useAuth;