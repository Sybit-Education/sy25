import axios from 'axios';

export const base = axios.create({
  baseURL: `${import.meta.env.VITE_APP_NOCODB_URL}`,
  headers: {
    'X-Xc-Token': `${import.meta.env.VITE_APP_NOCODB_TOKEN}`
  }
});

export default base;
