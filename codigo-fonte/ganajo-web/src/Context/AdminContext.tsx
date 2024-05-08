import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import { Admin } from "../DTOs/Admin";

interface AdminContextType {
    admin: Admin | undefined,
    setAdminInStorage(admin : Admin | undefined):void
}

interface AdminContextProviderProps {
    children : React.ReactNode
}

const adminContextInitialState : AdminContextType = {
    admin: undefined,
    setAdminInStorage: () => {}
}

export const AdminContext = createContext<AdminContextType>(adminContextInitialState);

export const AdminProvider = ({children} : AdminContextProviderProps) => {
    const [admin, setAdmin] = useState<Admin>();

    useEffect(() => {
        const jsonString = JSON.parse(sessionStorage.getItem('admin') ?? '');
        if(jsonString === ''){
            setAdmin(undefined);
            return;
        }
            
        const adminByStorage = jsonString as Admin;
        setAdmin(adminByStorage);
    }, [])

    function setAdminInStorage(admin : Admin | undefined){
        setAdmin(admin);
        sessionStorage.setItem('admin', JSON.stringify(admin === undefined ? '' : admin))
    }

    return <AdminContext.Provider value={{admin, setAdminInStorage}}>
        {children}
    </AdminContext.Provider>
}

export const useAdminContext = () => {
    return useContext(AdminContext);
}