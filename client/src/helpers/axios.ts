import axios from "axios";


const baseUrl = 'http://localhost:3000/api';


export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken') || 'null'}`
    },
});


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 403 && originalRequest.url === `${baseUrl}/refresh-token`) {
            window.location.href = '/login';
            return Promise.reject(error);
        }

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const accessToken = await axiosInstance.post(`${baseUrl}/refresh-token`, {
                    refreshToken: localStorage.getItem('refreshToken'),
                });
                localStorage.setItem('accessToken', accessToken.data.accessToken);
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken.data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (_error) {
                return Promise.reject(_error);
            }
        }
        return Promise.reject(error);
    }
);