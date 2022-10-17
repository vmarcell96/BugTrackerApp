import axios from "../apis/axiosInstance";
import useAuth from "./useAuth";
import jwtDecode from "jwt-decode";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {

        try {
            const response = await axios.post('/api/auth/refresh', {'refreshToken': `${auth?.refreshToken}`});
            if (response.data && response.status === 200) {
                const decodedAccessToken = jwtDecode(response.data.accessToken);
                const authData = {
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                    role: decodedAccessToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                    id: decodedAccessToken["ID"]
                };
                setAuth(authData);
                localStorage.setItem("auth", JSON.stringify(authData));
                return response.data.accessToken;
            }
        } catch (error) {
            if (error.response) {
                console.log(error.toJSON());
            } else {
                throw new Error(error.toJSON())
            }
        }
        
    }
  return refresh;
}

export default useRefreshToken