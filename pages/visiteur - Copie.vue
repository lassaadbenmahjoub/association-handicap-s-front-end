<script setup>
import { ref } from 'vue'
import AccountAssociation from '@/views/pages/visiteur/AccountAssociation.vue'
import AccountServices from '@/views/pages/visiteur/AccountServices.vue'
import AccountContact from '@/views/pages/visiteur/AccountContact.vue'
const router = useRouter()
const route = useRoute()
const activeTab = ref(route.params.tab)
// Method to navigate to the login page
const goToLogin = () => {
  router.push('/login')
}
// tabs
const tabs = [
  {
    title: 'الجمعية',
    icon: 'bx-group',
    tab: 'AccountAssociation',
  },
  {
    title: 'الخدمات',
    icon: 'bx-briefcase',
    tab: 'AccountServices',
  },
  {
    title: 'الإتصال',
    icon: 'bx-envelope',
    tab: 'AccountContact',
  },
]


</script>

<template>
  <div>
   
    <VTabs
      v-model="activeTab"
      show-arrows
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- Association -->
      <VWindowItem value="AccountAssociation">
        <AccountAssociation />
      </VWindowItem>

      <!-- Services -->
      <VWindowItem value="AccountServices">
        <AccountServices />
      </VWindowItem>

      <!-- Contact -->
      <VWindowItem value="AccountContact">
        <AccountContact />
      </VWindowItem>
    </VWindow>
    <!-- Bottom Right Button -->
    <div class="bottom-right">
      <VBtn @click="goToLogin" color="primary">
        Retour à la page de connexion
      </VBtn>
    </div>
  </div>
</template>


