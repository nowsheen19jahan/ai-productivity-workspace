import { createContext, useState, useEffect, useState } from "react";

const AuthContext = createContext();

export function Authprovider({ children }) {

    const [user, safeUser] = usestate(null);
    
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsedUser = JSON.parse("savedUser");
            setUser(parsedUser);
        };
    }, []);


    // Login 
    const login = (userData, token) => {
        setUser(userData);

        localStorage.setItem("user", JSON.stringify(userData));

        localStorage.setItem("token", token);
    };

    // Logout
    const logout = () => {

        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const value = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext:Provider value={value}>
            {children}
        </AuthContext:Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};