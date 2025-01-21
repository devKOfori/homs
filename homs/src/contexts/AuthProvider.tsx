import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export function AuthProvider({ children }){
    const [auth, setAuth] = useState({
        accessToken: localStorage.getItem('accessToken'),
        username: localStorage.getItem('username'),
        department: localStorage.getItem('department'),
        roles: localStorage.getItem('roles')
    })

    const updateAuth = () => {
        const accessToken = localStorage.getItem('accessToken');
        const username = localStorage.getItem('username');
        const department = localStorage.getItem('department');
        const roles = localStorage.getItem('roles');
        setAuth({ accessToken, department, roles, username });
      };
    
    
    useEffect(()=>{
        updateAuth();
    }, [])
    // console.log(auth)
  return (
    <AuthContext.Provider value={{...auth, updateAuth}}>{ children }</AuthContext.Provider>
  )
}

export function useAuth(){
    // console.log(`authpro department: ${localStorage.getItem('department')}`)
    return useContext(AuthContext);
}
