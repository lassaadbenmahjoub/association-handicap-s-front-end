import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    
    if (to.fullPath === '/auth/login' && userStore.id) {
        return navigateTo('/dashboard')
    }

    if (to.fullPath === '/auth/register' && userStore.id) {
        return navigateTo('/login')
    }
})
