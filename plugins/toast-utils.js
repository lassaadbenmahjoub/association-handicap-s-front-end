// plugins/toast-utils.js

import { useToast } from 'vue-toastification';

const toast = useToast();

export function handleApiError(error) {
  const message = error.response?.data?.message || error.message || 'Une erreur s\'est produite.';
  toast.error(`Échec : ${message}`);
}

export function showSuccess(message) {
  toast.success(message);
}

export function showInfo(message) {
  toast.info(message);
}

export function showError(message) {
  toast.error(message);
}
