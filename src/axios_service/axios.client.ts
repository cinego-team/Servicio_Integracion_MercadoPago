import axios from 'axios';
import { config } from './env';

export const axiosServicioVentas = axios.create({
    baseURL: config.MSVentasUrls.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosServicioVentas.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (token) {
        config.headers.Authorization = token;
    }
    if (refreshToken) {
        config.headers['refresh-token'] = refreshToken;
    }

    return config;
});
