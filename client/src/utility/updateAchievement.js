import axios from "axios"
import refreshToken from "./refreshToken";

let refreshCheck = true

// call this endpoint whenever an achievement is unlocked


const updateAchievement = async (value) => {

    const JWT = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'token': JWT,
            'Accept' : 'application/json',
        },
        withCredentials: true
    }

    try {
        const res = await axios.put("/api/achievement", { data: value },  config)
        refreshCheck = true
        return true
    } catch (err) {
        if (err.response.data === 'accesstoken expired') {
            const res = await refreshToken()
            if (res && refreshCheck) {
                refreshCheck = false
                const res = await updateAchievement(value)
                return res
            } else {
                return false
            }
        } else {
            return false
        }
    }
}

export default updateAchievement