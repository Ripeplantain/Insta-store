import axios from "axios";



const baseUrl = 'http://localhost:3000/api';


const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
        'Content-Type': 'application/json',
        },
    });
    
    const protectedInstance = axios.create({
        baseURL: baseUrl,
        headers: {
        'Content-Type': 'application/json',
        },
    });
    
    protectedInstance.interceptors.request.use(async req => {
        const token = localStorage.getItem('accessToken') || 'null'
        req.headers['Authorization'] = `Bearer ${token}`
        return req
    })

    return { axiosInstance, protectedInstance};
}

export default useAxios