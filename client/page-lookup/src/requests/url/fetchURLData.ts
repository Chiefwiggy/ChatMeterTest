import Axios from 'axios'

interface URLData {
    favicon?: string,
    title: string
}

const URL = "http://localhost:3001/"
const route = "url/fetch"

const fetchURLData = async (url: string): Promise<URLData> =>  {
    try {
        const response: URLData = (
            await Axios.post(URL + route, 
                {
                    url
                }
            )
        ).data;
        return response;
    } catch (err) {
        return {
            title: ''
        }
    }
}

export default fetchURLData;