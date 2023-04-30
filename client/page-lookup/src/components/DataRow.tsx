import React, {useEffect, useState} from 'react'
import { RowData } from '../requests/database/getAllRows';
import '../styles/DataRow.scss'


interface RowDataInput {
    data: RowData
}

const DEFAULT_ICO = "https://spells.collinkrueger.com/favicon.ico";


const DataRow = ({data}: RowDataInput) => {

    const {_id, url, title, favicon, timeAccessed} = data;


    const [faviconSource, setFavicon] = useState<string>(DEFAULT_ICO);

    const handleImageError = () => {
        console.log("test");
        setFavicon(DEFAULT_ICO);
    }

    useEffect(() => {
        setFavicon(favicon + '');
    }, [favicon])

    return (
        <div className="DataRow">
            <span><img src={faviconSource} className="faviconImg" onError={handleImageError} /></span>
            <span>{title}</span>
            <span>{url}</span>
        </div>
    )
}

export default DataRow;