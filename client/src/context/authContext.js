import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../config";

export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
    const [currentAdmin, setCurrentAdmin] = useState(
        JSON.parse(localStorage.getItem("admin")) || null
    );

    const login = async (inputs) => {
        const res = await axiosInstance.post(
            "/login",
            inputs,
          );
          setCurrentAdmin(res.data);
    }

    const logout =  () => {
        setCurrentAdmin(null);
      };
    
      useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(currentAdmin));
      }, [currentAdmin]);
    
      return (
        <AuthContext.Provider value={{ currentAdmin, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}