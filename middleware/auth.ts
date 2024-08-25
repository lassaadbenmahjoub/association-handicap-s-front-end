import { defineNuxtRouteMiddleware, navigateTo } from '#app'

const isAuthenticated = (): boolean => {
  if (process.client) {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token); // Debugging line
    return !!token;
  }
  return false;
}

export default defineNuxtRouteMiddleware((to, from) => {
  if (!isAuthenticated()) {
    return navigateTo('/login');
  }
});
