import React from 'react'
import { UserContext } from './UserContext';
import assignUserId from '../requests/database/assignUserId';


export interface UserData {
    userID: string | null
}

const UserProvider = ({children}: any) => {
    
    const GetUserData = async(): Promise<UserData> => {
        let userID = localStorage.getItem("userID");
        if (!!userID) {
            return {
                userID
            }
        } else {
            await AssignUserID();
            userID = localStorage.getItem("userID");
            return {
                userID
            }
        }
    }

    const AssignUserID = async(): Promise<void> => {
        localStorage.setItem("userID", await assignUserId());
    }

    return (
        <UserContext.Provider value={{GetUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;