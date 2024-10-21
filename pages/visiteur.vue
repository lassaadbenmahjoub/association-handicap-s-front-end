<template>
  <CustomLayout>
    <!-- Custom header slot -->
    <template #header>
      <Header />
    </template>

    <!-- Main content of the page -->
    <div class="content">
      <h1 :class="titleClass">{{ $t('title_text') }}</h1>
      <p>Nous offrons des services et des activités culturelles et de loisirs pour les aveugles.</p>
    </div>

    <!-- Video grid section -->
    <div class="video-grid">
      <!-- First video -->
      <video autoplay loop class="small-video" controls>
        <source src="~/assets/video/mental.mp4" type="video/mp4" />
        Votre navigateur ne prend pas en charge la vidéo.
      </video>
      
   
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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'; // Assurez-vous d'importer useI18n

const titleClass = computed(() => {
  const locale = useI18n().locale; // Assurez-vous d'avoir accès à votre instance i18n
  return {
    'animate-text': true, // L'animation est toujours active
    'slideIn': locale === 'fr' || locale === 'en',
    'slideInRight': locale === 'ar',
    'blue-text': locale === 'fr' || locale === 'en',
    'gray-text': locale === 'ar',
    'lightblue-text': locale === 'en' // En anglais on met en bleu ciel
  };
});

// Define page meta for layout
definePageMeta({
  layout: 'custom'
});
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh; /* Hauteur ajustée pour l'espace du contenu */
  position: relative;
  z-index: 1;
}

.content h1 {
  position: relative;
  z-index: 2;
}

.video-grid {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espacement entre les vidéos */
  margin-top: 20px;
}

.small-video {
  width: 300px; /* Largeur ajustée de la vidéo */
  height: 200px; /* Hauteur ajustée de la vidéo */
  object-fit: cover;
  border-radius: 10px; /* Bordures arrondies pour un meilleur style */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Effet d'ombre pour un style esthétique */
}

.animate-text {
  animation: slideIn 6s ease-in-out infinite alternate;
}

@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(0);
  }
}

.blue-text {
  color: blue;
}

.gray-text {
  color: gray;
}

.titleClass {
  color: lightblue;
}
</style>
