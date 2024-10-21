import axios from 'axios';
import { useToast } from 'vue-toastification'; // Import useToast for toast notifications
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

    // Retrieve the toast service from Vue Toastification
    const toast = useToast(); // Use useToast to access toast functionality

    // Global error handling with Axios
    axios.interceptors.response.use(
        response => response,
        error => {
            const code = parseInt(error.response && error.response.status);

            // Redirect if error is 404 (not found)
            if (code === 404) {
                nuxtApp.$router.push('/not-found');
                toast.error('Page non trouvée');
                return Promise.reject(error); // Prevent further processing
            }

            // Handle server errors
            if (code === 500) {
                toast.error('Erreur serveur, veuillez réessayer plus tard.');
                return Promise.reject(error); // Prevent further processing
            }
            if (code === 408) {
                toast.error('Erreur serveur, Aucune data trouvée pour ces critères..');
                return Promise.reject(error); // Prevent further processing
            }
            // Handle validation errors (422)
            if (code === 422) {
                const errors = error.response.data.errors;
                for (const key in errors) {
                    toast.error(`${key}: ${errors[key].join(', ')}`);
                }
                return Promise.reject(error); // Prevent further processing
            }

            // Handle authentication errors (401)
            if (code === 401) {
                toast.error("Échec de l'authentification : identifiants invalides.");
                return Promise.reject(error); // Prevent further processing
            }

            // Handle account approval errors (403)
            if (code === 403) {
                toast.error("Votre compte n'est pas encore approuvé ou est bloqué .");
                return Promise.reject(error); // Prevent further processing
            }

         


            // Handle conflict errors (409)
            if (code === 409) {
                toast.error("Conflit : cet email est déjà enregistré.");
                return Promise.reject(error); // Prevent further processing
            }

            // Fallback for other errors
            toast.error('Une erreur s\'est produite. Veuillez réessayer.');
            return Promise.reject(error);
        }
    );

    return {
        provide: { 
            axios: axios
        },
    };
});
