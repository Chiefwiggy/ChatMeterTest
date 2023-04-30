import Axios from 'axios'

interface UserData {
    userId: string
}

const URL = "http://localhost:3001/"
const route = "database/generateUser"

const assignUserId = async (): Promise<string> =>  {
    try {
        const {userId}: UserData = (
            await Axios.post(URL + route)
        ).data;
        return userId;
    } catch (err) {
        return ""
    }
}

export default assignUserId