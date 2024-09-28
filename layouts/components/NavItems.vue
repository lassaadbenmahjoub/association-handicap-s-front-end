<script setup>
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";

import { computed } from "vue";
import { useUserStore } from "~/stores/user";

// Récupérer le store utilisateur
const userStore = useUserStore();

// Calculer si le lien doit être affiché en fonction du rôle
const showGestionsSuperAdministrateur = computed(
  () => userStore.role === "super_admin"
);

// Calculer si les liens doivent être affichés pour les administrateurs
const showGestionsAssociation = computed(
  () => userStore.role === "administrateur"
);
</script>

<template>
  <!-- 👉 Dashboards VerticalNavGroup-->
  <VerticalNavLink
    :item="{
      title: $t('Nav.Dashboards'),
      icon: 'bx-home-smile',
      to: '/super-admin-dashboard',
    }"
  />
  <!-- 👉 Apps & Pages -->
  <template v-if="showGestionsSuperAdministrateur">
    <VerticalNavLink
      :item="{
        title: $t('Nav.GestionsAdministrateur'),
        icon: 'bx-user',
        to: '/GestionsAdministrateur',
      }"
    />
  </template>
<!-- Liens pour administrateur -->
  <template v-if="showGestionsAssociation">
    <VerticalNavLink
      :item="{
        title: $t('Nav.GestionsAssociation'),
        icon: 'bx-user',
        to: '/GestionsAssociation',
      }"
    />
    <VerticalNavLink
    :item="{
      title: $t('Nav.TypeAssociation'),
      icon: 'bx-user',
      to: '/TypeAssociation',
    }"
  />


  <VerticalNavLink
    :item="{
      title: $t('Nav.AccountSettings'),
      icon: 'bx-user',
      to: '/account-settings',
    }"
  />

</template>
</template>
