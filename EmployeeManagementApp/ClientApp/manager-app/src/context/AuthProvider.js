import { createContext } from "react";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import axios from "../apis/axiosInstance";
import { useNavigate } from "react-router";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            if (response.data && response.status === 200) {
                const decodedAccessToken = jwtDecode(response.data.accessToken);
                const authData = {
                    ...response.data,
                    role: decodedAccessToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                    id: decodedAccessToken["ID"]
                };
                setAuth(authData);
                localStorage.setItem("auth", JSON.stringify(authData));
                console.log(JSON.stringify(authData));
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

    
    
    const isTokenExpired = () => {
        if (!auth) {
            return true
        }
        const { exp } = jwtDecode(auth?.accessToken)

        return (Date.now() < exp * 1000)
    }


    return (
        <AuthContext.Provider value={{ auth, setAuth, login, checkExpired: isTokenExpired }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;