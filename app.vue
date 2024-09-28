<script setup>
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'

const { isMobile } = useDevice()
if (isMobile)
  configStore.appContentLayoutNav = 'vertical'
</script>

<template>
  <VApp>
      
      <NuxtLayout>
      <LanguageSwitcher />
      <NuxtPage />
    </NuxtLayout>
    
  </VApp>
</template>
