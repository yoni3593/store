import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://balloon-shop.onrender.com'
});

export default instance;