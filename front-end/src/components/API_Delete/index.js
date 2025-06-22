import axios from "axios";
import Swal_show from "components/Swal";

const api = axios.create({
    baseURL: 'https://localhost:5004',
    withCredentials: true,
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const handleApiError = (error) => {
    console.error('API Error:', error);

    if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error setting up the request:', error.message);
    }

    Swal_show('error', 'Something went wrong');
};

const deleteRequest = async (url) => {
    try {
        const response = await api.delete(url);
        if (response.data.status === 'success') {
            Swal_show('success', response.data.message);
        } else {
            Swal_show('error', "Error");
        }
    } catch (error) {
        handleApiError(error);
    }
};

export default deleteRequest;
