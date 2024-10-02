<script setup>
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
      icon: 'bx bx-home-smile',  // Corrected icon class
      to: '/super-admin-dashboard',
    }"
  />
  <!-- 👉 Apps & Pages -->
  <template v-if="showGestionsSuperAdministrateur">
    <VerticalNavLink
      :item="{
        title: $t('Nav.GestionsAdministrateur'),
        icon: 'bx bx-user-circle', // Changed icon to a specific user icon
        to: '/GestionsAdministrateur',
      }"
    />
  </template>
  <!-- Liens pour administrateur -->
  <template v-if="showGestionsAssociation">
    <VerticalNavLink
      :item="{
        title: $t('Nav.GestionsAssociation'),
        icon: 'bx bx-group', // Changed icon to a group icon
        to: '/GestionsAssociation',
      }"
    />
    <VerticalNavLink
      :item="{
        title: $t('Nav.TypeAssociation'),
        icon: 'bx bx-tag', // Changed icon to a tag icon
        to: '/TypeAssociation',
      }"
    />
    <VerticalNavLink
      :item="{
        title: $t('Nav.AddMembre'),
        icon: 'bx bx-user-plus', // Changed icon to a user plus icon
        to: '/MemberAssociation',
      }"
    />
    <VerticalNavLink
      :item="{
        title: $t('Nav.ListMembre'),
        icon: 'bx bx-list-ul', // Changed icon to a list icon
        to: '/MemberAssociationList',
      }"
    />
    <VerticalNavLink
    :item="{
      title: $t('Nav.EventAssociation'),
      icon: 'bx bx-calendar', // Changed icon to a list icon
      to: '/EventAssociation',
    }"
  />
    <VerticalNavLink
      :item="{
        title: $t('Nav.AccountSettings'),
        icon: 'bx bx-cog', // Changed icon to a settings gear icon
        to: '/account-settings',
      }"
    />
  </template>
</template>
