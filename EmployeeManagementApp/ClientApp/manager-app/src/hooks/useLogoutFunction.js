import useAuth from "./useAuth";
import axios from "../apis/axiosInstance";
import useAxiosFunction from "./useAxiosFunction";
import { useNavigate } from "react-router";

const useLogoutFunction = () => {
    const navigate = useNavigate();
    const [data, setData, error, loading, axiosFetch] = useAxiosFunction();
    const { setAuth, auth } = useAuth();

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