import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_COINGECKO_API_URL,
    headers: {
        'x-cg-demo-api-key': process.env.REACT_APP_COINGECKO_API_KEY
    }
});

export default api;
