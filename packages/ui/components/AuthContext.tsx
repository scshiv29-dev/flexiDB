"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { accLogin } from "@flexidb/appwrite";

// Define the shape of the context value
interface AuthContextValue {
  isLoggedIn: boolean;
  login: (email: string, password: string,appwriteUrl:string,appwriteprojectID:string) => void;
  logout: () => void;
}

// Create the initial context value
const initialAuthContextValue: AuthContextValue = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

// Create the AuthContext
const AuthContext = createContext<AuthContextValue>(initialAuthContextValue);

// Define the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("cookieFallback");
      if (value) {
        setIsLoggedIn(true);
      }
    }
  }, []);
  const login = async (email: string, password: string,appwriteUrl: string,appwriteprojectID:string) => {
    const res: any = await accLogin(email,password,appwriteUrl,appwriteprojectID);
    
    if (res) {
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    // Perform logout logic here
    localStorage.removeItem("cookieFallback");
    setIsLoggedIn(false);
  };

  const authContextValue: AuthContextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Define a custom hook to conveniently access the AuthContext
export const useAuth = (): AuthContextValue => useContext(AuthContext);
