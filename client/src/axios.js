import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.253.1:3005'
});

export default instance;