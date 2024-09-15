<script setup>
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import VerticalNavGroup from "@layouts/components/VerticalNavGroup.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";

import { computed } from "vue";
import { useUserStore } from "~/stores/user";

// Récupérer le store utilisateur
const userStore = useUserStore();

// Calculer si le lien doit être affiché en fonction du rôle
const showGestionsAdministrateur = computed(
  () => userStore.role === "super_admin"
);
</script>

<template>
  <!-- 👉 Dashboards VerticalNavGroup-->
  <VerticalNavLink
    :item="{
      title: $t('Nav.Dashboards'),
      badgeContent: '0',
      badgeClass: 'bg-error',
      icon: 'bx-home-smile',
      to: '/super-admin-dashboard',
    }"
  />

  <!-- 👉 Front Pages -->
  <VerticalNavGroup
    :item="{
      title: $t('Nav.FrontPages'),
      icon: 'bx-file',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  >
  </VerticalNavGroup>
  <!-- 👉 Apps & Pages -->
  <template v-if="showGestionsAdministrateur">
    <VerticalNavLink
      :item="{
        title: $t('Nav.GestionsAdministrateur'),
        icon: 'bx-user',
        to: '/GestionsAdministrateur',
      }"
    />
  </template>

 
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

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: $t('Nav.AppsPages'),
    }"
  />
  <VerticalNavLink
    :item="{
      title: $t('Nav.AccountSettings'),
      icon: 'bx-user',
      to: '/account-settings',
    }"
  />
  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
      heading: $t('Nav.UserInterface'),
    }"
  />
  <VerticalNavLink
    :item="{
      title: $t('Nav.Typography'),
      icon: 'bx-text',
      to: '/typography',
    }"
  />

  <!-- 👉 Forms & Tables -->
  <VerticalNavSectionTitle
    :item="{
      heading: $t('Nav.FormsTables'),
    }"
  />

  <VerticalNavLink
    :item="{
      title: $t('Nav.Tables'),
      icon: 'bx-table',
      to: '/tables',
    }"
  />

  <!-- 👉 Others -->
  <VerticalNavSectionTitle
    :item="{
      heading: $t('Nav.Others'),
    }"
  />
</template>
