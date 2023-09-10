import axios from "axios"

// call this endpoint to refresh both your refreshtoken and your accesstoken


const refreshToken = async () => {

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
        const res = await axios.get("/api/auth/refresh", config)
        const token = res.data.accessToken
        localStorage.setItem('token', token);
        return true
    } catch (err) {
        return false
    }
}

export default refreshToken