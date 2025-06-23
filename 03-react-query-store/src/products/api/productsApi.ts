import axios from 'axios';

const productsApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export { productsApi };