<script setup>
import AccountAssociation from '@/views/pages/visiteur/AccountAssociation.vue';
import AccountContact from '@/views/pages/visiteur/AccountContact.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Router and Route setup
const router = useRouter()
const route = useRoute()

// Active Tab setup
const activeTab = ref('AccountAssociation')

// Method to navigate to the login page
const goToLogin = () => {
  router.push('/login')
}



// Ensure activeTab matches route params on mount
onMounted(() => {
  if (route.params.tab) {
    activeTab.value = route.params.tab
  }
})

// Define page metadata
definePageMeta({
  layout: 'custom'
})

</script>

<template>
  <div class="tabs-container">
   
    

    <!-- Tab content -->
    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- Association -->
      <VWindowItem value="AccountAssociation">
        <AccountAssociation />
      </VWindowItem>
    </VWindow>

    <!-- Bottom Right Button -->
    <div class="bottom-right">
      <VBtn @click="goToLogin" color="primary">
        {{ $t('buttons.returnToLogin') }}
      </VBtn>
    </div>
  </div>
</template>

<style scoped>
.tabs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Center vertically */
}

.centered-tabs {
  display: flex;
  justify-content: center;
  width: 100%; /* Ensure the tabs container takes full width */
}

.bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
