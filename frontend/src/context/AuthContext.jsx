import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ Children}) => {
    const [user, setUser] = useState(null);

    // Load user from localstorage on refresh
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser ( { token});
        }
    }, []);

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