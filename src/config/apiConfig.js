import axios from "axios";

export const API_BASE_URL = "https://wanderlustbackend-production-c840.up.railway.app";

// export const API_BASE_URL = "http://localhost:5354";

export const api = axios.create({ 
    baseURL: API_BASE_URL,
    headers: { 
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,  
        "Content-Type": "application/json" 
    }
});
