import React, {useEffect, useState} from 'react'
import InputModule from '../views/InputModule';
import DataRows from '../views/DataRows';

const MainPage = () => {

    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        console.log("test");
    }, [reload])

    return (
        <div>
            <h1>Chatmeter Title Bot</h1>
            <InputModule setReload={setReload}/>
            <DataRows reload={reload} />
        </div>
    )
}

export default MainPage;