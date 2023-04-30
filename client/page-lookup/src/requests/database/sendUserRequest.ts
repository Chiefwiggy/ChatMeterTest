import Axios from 'axios'
import useUser from '../../hooks/useUser'

interface SendURLData {
    favicon?: string,
    url: string,
    title: string
}

const URL = "http://localhost:3001/"
const route = "database/sendURL"

const sendUserRequest = async (data: SendURLData, user: string): Promise<void> =>  {


    try {
        await Axios.post(URL+route, data, {
            headers: {
                'X-User': user
            }
        })
    } catch (err) {
        console.error(err);
    }
}

export default sendUserRequest