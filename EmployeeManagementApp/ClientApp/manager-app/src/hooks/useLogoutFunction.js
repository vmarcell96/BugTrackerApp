import useAuth from "./useAuth";
import axios from "../apis/axiosInstance";
import useAxiosFunction from "./useAxiosFunction";
import { useNavigate } from "react-router";

const useLogoutFunction = () => {
    const navigate = useNavigate();
    const [employees, error, loading, axiosFetch] = useAxiosFunction();
    const { setAuth } = useAuth();

    const logout = () => {
        axiosFetch({
            axiosInstance: axios,
            method: 'DELETE',
            url: '/api/auth/logout',
        });
        setAuth(null);
        localStorage.removeItem("auth");
        navigate("/");
    }
    
  return logout;
}

export default useLogoutFunction