<script setup>
import { onMounted } from 'vue'
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
definePageMeta({
  middleware: 'is-logged-out'
})
const { isLoggedIn } = storeToRefs(userStore)
const router = useRouter()

// Vérifie si l'utilisateur est connecté
const checkUser = async () => {
  try {
    await userStore.getUser()
    console.log("User login status:", isLoggedIn.value)
    if (!isLoggedIn.value) {
      router.push('/login')
    }
  } catch (error) {
    router.push('/login')
  }
}

// Appelle la fonction de vérification lors du montage du composant
onMounted(() => {
  checkUser()
})
</script>


<template>
  <DefaultLayoutWithVerticalNav>
    <slot />
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
@use "@layouts/styles/default-layout";
</style>
