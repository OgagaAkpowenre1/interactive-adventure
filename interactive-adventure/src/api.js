// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://9000-idx-interactive-adventure-1737094341845.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/api', // Replace with your backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
