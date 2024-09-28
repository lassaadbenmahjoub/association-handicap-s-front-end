<template>
  <CustomLayout>
    <!-- Custom header slot -->
    <template #header>
      <Header />
    </template>

    <!-- Main content of the page -->
    <div>
      <h1>Bienvenue sur notre association</h1>
      <p>Nous offrons des services et des activités culturelles et de loisirs pour les aveugles.</p>
    </div>

    <!-- Custom footer slot -->
    <template #footer>
      <Footer />
    </template>
  </CustomLayout>
</template>

<script setup>
// Import your layout and components
import CustomLayout from '~/layouts/visiteur.vue';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
definePageMeta({
  layout: 'custom'
})
</script>

<style scoped>
/* Ajoutez votre style ici */
</style>
