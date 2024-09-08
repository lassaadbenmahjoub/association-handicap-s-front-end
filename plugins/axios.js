import axios from 'axios';
import { onMounted } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
    // Set default Axios configurations
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
    axios.defaults.withCredentials = false;
    axios.defaults.proxyHeaders = false;

    // Use `onMounted` to run client-side code
    onMounted(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
    });

    return {
        provide: { 
            axios: axios
        },
    };
});
