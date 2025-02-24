import React, { createContext, useContext, useEffect, useState } from "react";
import { Staff } from "../components/StaffList";

export interface AuthContextProps {
  auth: {
    accessToken: string | null;
    username: string | null;
    userId: string | null;
    profileId: string | null;
    department: string | null;
    roles: string | null;
  };
  updateAuth: () => void;
  myDepartmentStaffList: Staff[];
}

const AuthContext = createContext<AuthContextProps>({
  auth: {
    accessToken: null,
    username: null,
    userId: null,
    profileId: null,
    department: "",
    roles: null,
  },
  updateAuth: () => {},
  myDepartmentStaffList: [],
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("accessToken"),
    username: localStorage.getItem("username"),
    department: localStorage.getItem("department"),
    roles: localStorage.getItem("roles"),
    userId: localStorage.getItem("userId"),
    profileId: localStorage.getItem("profileId"),
  });

  const updateAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    const department = localStorage.getItem("department");
    const roles = localStorage.getItem("roles");
    const userId = localStorage.getItem("userId");
    const profileId = localStorage.getItem("profileId");
    setAuth({ accessToken, department, roles, username, userId, profileId });
  };

  const myDepartmentStaffList = JSON.parse(
    localStorage.getItem("myDepartmentStaffList") ?? "[]"
  );

  useEffect(() => {
    updateAuth();
  }, []);
  // console.log(auth)
  return (
    <AuthContext.Provider
      value={{ auth, updateAuth, myDepartmentStaffList }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // console.log(`authpro department: ${localStorage.getItem('department')}`)
  return useContext<AuthContextProps>(AuthContext);
}
