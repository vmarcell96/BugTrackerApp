import { createContext } from "react";
import { useState } from "react";
import axios from "../apis/axiosInstance";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const AUTH_ENDPOINT = "/api/auth"
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await axios.post(AUTH_ENDPOINT + "/login", { username, password });
            if (response.data && response.status === 200) {
                const decodedToken = jwtDecode(response.data.accessToken);
                const authData = {
                    ...response.data,
                    role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                };
                setAuth(authData);
                localStorage.setItem("auth", JSON.stringify(authData));
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                console.log(error.toJSON());
            } else {
                throw new Error(error.toJSON())
            }
        }
    }

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
        navigate("/");
    }
    
    const isTokenExpired = () => {
        if (!auth) {
            return true
        }
        const { exp } = jwtDecode(auth?.accessToken)

        return (Date.now() < exp * 1000)
    }


    return (
        <AuthContext.Provider value={{ auth, login, logout, checkExpired: isTokenExpired }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;