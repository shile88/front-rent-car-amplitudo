import {createContext, useContext, useEffect, useState} from "react";

import {storageKeys} from "../config/config.js";
import {storageService} from "../services/StorageService.js";
import { userService } from "../services/UserService.js";

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

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const getUser = async () => {
        setDataLoaded(false)
        if(storageService.exists(storageKeys.USER)){
            userService.getCurrentUserData()
                .then(r => {
                    setUserData(r)
                    setDataLoaded(true)
                })
                .catch(() => {
                    setUserData(null)
                    setDataLoaded(true)
                })
        }else{
            setUserData(null)
            setDataLoaded(true)
        }
    }

    const logout = () => {
        setUserData(null)
        storageService.clear()
    }

    useEffect(() => {
        getUser()
    }, [])
    

    return <UserContext.Provider value={{
        userData: userData,
        refreshUserData: () => getUser(),
        logout: () => logout()
    }}>
        {dataLoaded && children}
    </UserContext.Provider>
}

export const useUserData = () => {
    return useContext(UserContext)
}

export default UserProvider;