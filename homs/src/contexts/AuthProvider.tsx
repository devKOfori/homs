import React, { createContext, useContext, useEffect, useState } from "react";
import { Staff } from "../components/StaffList";

export interface AuthContextProps {
  auth: {
    accessToken: string | null;
    username: string | null;
    department: string;
    roles: string | null;
  };
  updateAuth: () => void;
  myDepartmentStaffList: Staff[];
}

const AuthContext = createContext<AuthContextProps>();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("accessToken"),
    username: localStorage.getItem("username"),
    department: localStorage.getItem("department"),
    roles: localStorage.getItem("roles"),
  });

  const updateAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    const department = localStorage.getItem("department");
    const roles = localStorage.getItem("roles");
    setAuth({ accessToken, department, roles, username });
  };

  const myDepartmentStaffList = JSON.parse(
    localStorage.getItem("myDepartmentStaffList")
  );

  useEffect(() => {
    updateAuth();
  }, []);
  // console.log(auth)
  return (
    <AuthContext.Provider
      value={{ ...auth, updateAuth, myDepartmentStaffList }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // console.log(`authpro department: ${localStorage.getItem('department')}`)
  return useContext<AuthContextProps>(AuthContext);
}
