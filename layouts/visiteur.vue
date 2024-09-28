<template>
  <div>
    <!-- Custom header slot -->
    <slot name="header" />

    <!-- Main content -->
    <main>
      <slot />
    </main>

    <!-- Custom footer slot -->
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'CustomLayout',
}
</script>

<style scoped>
/* Ajoutez votre style ici */
</style>
