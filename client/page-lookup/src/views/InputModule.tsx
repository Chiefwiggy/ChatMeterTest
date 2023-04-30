import React, {useState} from 'react'
import InputBar from '../components/InputBar'
import {Button} from '@mui/material'
import validateURL from '../helpers/validateURL';
import useUser from '../hooks/useUser';
import fetchURLData from '../requests/url/fetchURLData';
import sendUserRequest from '../requests/database/sendUserRequest';
import { UserData } from '../hooks/UserProvider';

interface InputModuleParams {
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const InputModule = ({setReload}: InputModuleParams ) => {

    const [inputSite, setInputSite] = useState("");

    const {GetUserData} = useUser() || {};

    const submitRequest = async(): Promise<void> => {
        const user: UserData = await GetUserData();
        const data = await fetchURLData(inputSite);

        if (!data.favicon) {
            data.favicon = "https://spells.collinkrueger.com/favicon.ico"
        }

        await sendUserRequest({...data, url: inputSite}, user.userID || "");

        setReload(prev => !prev);



    }

    const handleClick = async(): Promise<void> => {
        if (validateURL(inputSite)) {
            await submitRequest();
        } else {
            console.log("failed");
        }
    }

    return (
        <div>
            <InputBar setInputRef={setInputSite} submitFunction={handleClick} />
        </div>
    )
}

export default InputModule