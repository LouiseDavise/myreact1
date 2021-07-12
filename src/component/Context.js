import React, {createContext, useState} from 'react';
import {getLocalStorage,setLocalStorage} from '../api/index';

// Create new context (variable name : AuthContext)
// that can be imported by another component

export const AuthContext = createContext();

const USER_KEY = 'user';

export default function AuthContextProvider(props){

    const [userData, setUserData] = useState(getLocalStorage(USER_KEY));

    const updateUserData = (new_userData) => {
        setLocalStorage(USER_KEY, new_userData);
        setUserData(new_userData);
    }

    return(
        <AuthContext.Provider value={
            {userData,
            updateUserData}
        }>
            {props.children}

        </AuthContext.Provider>
    )


}