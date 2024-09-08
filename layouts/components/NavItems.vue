<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
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
