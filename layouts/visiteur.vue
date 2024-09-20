<template>
  <div class="custom">
    <!-- Slot pour le header -->
    <slot name="header">
      <p><i>Default #header slot content for <code>layouts/custom.vue</code></i></p>
    </slot>
    
    <!-- Contenu principal -->
    <slot />

    <!-- Slot pour le footer -->
    <slot name="footer">
      <p><i>Default #footer slot content for <code>layouts/custom.vue</code></i></p>
    </slot>
  </div>
</template>

<style scoped>
.custom {
  border: 1px solid #a795ec;
  padding: 1rem;
  position: relative;
  background-color: #a795ec87;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.custom::before {
  content: 'layouts/custom.vue';
  position: absolute;
  top: 2px;
  left: 5px;
  color: #583ccb;
  font-family: monospace;
}

.custom > slot {
  flex-grow: 1;
}

/* Style pour le footer */
.custom footer {
  border-top: 1px solid #583ccb;
  padding-top: 1rem;
  margin-top: 2rem;
  text-align: center;
  color: #583ccb;
  background-color: #f1f1f1;
}
</style>
