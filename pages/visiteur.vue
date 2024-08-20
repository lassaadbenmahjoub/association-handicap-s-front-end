<script setup>
import { ref, computed } from 'vue'
import AccountAssociation from '@/views/pages/visiteur/AccountAssociation.vue'
import AccountServices from '@/views/pages/visiteur/AccountServices.vue'
import AccountContact from '@/views/pages/visiteur/AccountContact.vue'

import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const activeTab = ref(route.params.tab)

// Method to navigate to the login page
const goToLogin = () => {
  router.push('/login')
}

// Reactive tabs with translations
const tabs = computed(() => [
  {
    title: t('tabs.association'),
    icon: 'bx-group',
    tab: 'AccountAssociation',
  },
  {
    title: t('tabs.services'),
    icon: 'bx-briefcase',
    tab: 'AccountServices',
  },
  {
    title: t('tabs.contact'),
    icon: 'bx-envelope',
    tab: 'AccountContact',
  },
])
</script>

<template>
  <div class="container">
   
    <div class="tabs-container">
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
    </div>

    <!-- Bottom Right Button -->
    <div class="bottom-right">
      <VBtn @click="goToLogin" color="primary">
        {{ t('buttons.returnToLogin') }}
      </VBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ensure the container takes full viewport height */
  padding: 1rem;
}

.tabs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.v-tabs-pill {
  margin-bottom: 1rem; /* Adjust margin as needed */
}

.bottom-right {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000; /* Ensure the button is above other content */
}
</style>
