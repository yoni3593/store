import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.253.37:3006'
});

export default instance;