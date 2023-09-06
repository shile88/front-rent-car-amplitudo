import {createContext, useContext, useEffect, useState} from "react";

import {adminService} from "../services/AdminService.js";
import {storageKeys} from "../config/config.js";
import {storageService} from "../services/StorageService.js";

/*const users = [
    {
        id: 1,
        email: 'edina.mehmedovic@amplitudo.me',
        password: '12345678',
        name: 'Edina Mehmedovic'
    },
    {
        id: 2,
        email: 'ana.markovic@amplitudo.me',
        password: '87654321',
        name: 'Ana Markovic'
    }
]*/

const AdminContext = createContext();

const AdminProvider = ({children}) => {
    const [adminData, setAdminData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const getAdmin = async () => {
        setDataLoaded(false)
        if(storageService.exists(storageKeys.USER)){
            adminService.getCurrentAdminData()
                .then(r => {
                    setAdminData(r)
                    setDataLoaded(true)
                })
                .catch(() => {
                    setAdminData(null)
                    setDataLoaded(true)
                })
        }else{
            setAdminData(null)
            setDataLoaded(true)
        }
    }

    const logout = () => {
        setAdminData(null)
        storageService.clear()
    }

    useEffect(() => {
        getAdmin()
    }, [])
    

    return <AdminContext.Provider value={{
        adminData: adminData,
        refreshAdminData: () => getAdmin(),
        logout: () => logout()
    }}>
        {dataLoaded && children}
    </AdminContext.Provider>
}

export const useAdminData = () => {
    return useContext(AdminContext)
}

export default AdminProvider;