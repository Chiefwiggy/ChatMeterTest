import { TextField, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import React, {useEffect, useState, KeyboardEvent} from 'react'
import "../styles/InputBar.scss"
import validateURL from '../helpers/validateURL';

interface InputBarInterface {
    setInputRef: React.Dispatch<React.SetStateAction<string>>
    submitFunction: Function
}
const InputBar = ({setInputRef, submitFunction}: InputBarInterface) => {


    const [protocol, setProtocol] = useState('https');
    const [urlInput, setUrlInput] = useState('');

    const [isDisabled, setDisabled] = useState<boolean>(false);
    
    useEffect(() => {
        setInputRef(protocol + "://" + urlInput);
    }, [urlInput, protocol])

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUrlInput(event.target.value);
    }

    const handleProtocolChange = (event: SelectChangeEvent<string>): void => {
        setProtocol(event.target.value);
    }

    const handleEnter = async(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            setDisabled(true);
            await submitFunction()
            setUrlInput('');
            setDisabled(false);
        }
    }


    return (
        <div className="InputBar">
            <div className="InputBar-row">
                <Select value={protocol} onChange={handleProtocolChange} className="SelectDropdown">
                    <MenuItem value="https">HTTPS:</MenuItem>
                    <MenuItem value="http">HTTP:</MenuItem>
                </Select>
                <TextField
                className="TextFieldInputBar"
                label="Enter a website"
                variant="outlined"
                fullWidth
                margin="normal"
                value={urlInput}
                onChange={handleTextFieldChange}
                error={!validateURL(protocol + "://" + urlInput)}
                onKeyDown={handleEnter}
                disabled={isDisabled}
                />
            </div>
        </div>
        
    )
}

export default InputBar;