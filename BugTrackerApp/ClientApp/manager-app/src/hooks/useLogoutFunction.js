//Packages
import { useNavigate } from "react-router";
//Hooks
import useAuth from "./useAuth";
import useAxiosFunction from "./useAxiosFunction";
//Misc
import axios from "../apis/axiosInstance";

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