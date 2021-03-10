import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app.collisinternet.com.br',
});

export default api;
