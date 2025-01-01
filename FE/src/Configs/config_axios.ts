import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    // baseURL: import.meta.env.VITE_BASE_URL_ONL,
    // baseURL: "https://web-sneakers-m75k.vercel.app/api/v1",
    // baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
})
export default instance