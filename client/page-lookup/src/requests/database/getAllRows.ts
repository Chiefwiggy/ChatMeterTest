import Axios from 'axios'


const URL = "http://localhost:3001/"
const route = "database/getAll"

export interface RowData {
    _id: string;
    url: string;
    title: string;
    favicon?: string;
    userId?: string;
    timeAccessed: Date;
    __v: number;
}

const getAllRows = async (user: string): Promise<Array<RowData>> =>  {
    try {
        const data = await Axios.get(URL+route, {
            headers: {
                'X-User': user
            }
        })
        return data.data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default getAllRows