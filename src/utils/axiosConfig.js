import axios from "axios";
import { BASE_URL } from "./constants";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use((response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = "/login";
        };
    });
export default api;