import { Children } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ Children}) => {
    const [user, setUser] = useState(null);

    const login = (data) => {
        localStorage.setItem("token", data.token);
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
        {Children}
        </AuthContext.Provider>
    );
};