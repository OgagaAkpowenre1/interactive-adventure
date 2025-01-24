// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://interactive-adventure-production.up.railway.app/api', // Replace with your backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }, 
});

export default axiosInstance;
