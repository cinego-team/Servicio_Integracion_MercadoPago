import axios from 'axios';
import { config } from './env';

export const axiosServicioVentas = axios.create({
    baseURL: config.MSVentasUrls.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
