import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.0.0.5:3006'
});

export default instance;