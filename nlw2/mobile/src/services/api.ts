import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.26.131.50:3333'
});

export default api;