import React, { useEffect, useRef, useState } from 'react'
import getAllRows, { RowData } from '../requests/database/getAllRows';
import useUser from '../hooks/useUser';
import DataRow from '../components/DataRow';

import '../styles/RowModule.scss'

interface DataRowsInput {
    reload: boolean
}

const DataRows = ({reload}: DataRowsInput) => {

    const [dataRows, setDataRows] = useState<Array<RowData>>([]);
    
    const {GetUserData} = useUser();

    const fetchData = async() => {
        const data = await getAllRows((await GetUserData()).userID);
        console.log(data);
        setDataRows(data);
    }

    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        fetchData();
    }, [reload])

    return (
        <div className="RowModule">
            <div className="DataRows">
                {
                    dataRows.sort((a: RowData, b: RowData) => {
                        return +new Date(b.timeAccessed) - +new Date(a.timeAccessed);
                    }).map((e) => {
                        return (
                            <DataRow data={e} key={e._id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DataRows;