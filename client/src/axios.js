import axios from 'axios';

const instance = axios.create({
    baseURL: `https://${process.env.IP_SERVER}`
});

export default instance;