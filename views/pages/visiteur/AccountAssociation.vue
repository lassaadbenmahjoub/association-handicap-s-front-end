<script setup>
import { ref } from 'vue'

const associationInfo = ref({
  quiSommesNous: `...`,
  notreVision: `.................`,
  notreMessage: `..........................................`,
  nosObjectifs: ``,
  valeursDirectrices: `الإستقلالية ...الشفافية...التعاون ...التميز...التجدد...`
})
</script>

<template>
  <div class="visiteur-page pa-4" dir="rtl">
    <h1 class="mb-4">التعريف بالجمعية</h1>

    <section class="mb-4">
      <h2>من نحن</h2>
      <p>{{ associationInfo.quiSommesNous }}</p>
    </section>

    <section class="mb-4">
      <h2>رؤيتنا</h2>
      <p>{{ associationInfo.notreVision }}</p>
    </section>

    <section class="mb-4">
      <h2>رسالتنا</h2>
      <p>{{ associationInfo.notreMessage }}</p>
    </section>

    <section class="mb-4">
      <h2>أهدافنا</h2>
      <p>{{ associationInfo.nosObjectifs }}</p>
    </section>

    <section class="mb-4">
      <h2>القيم الموجهة</h2>
      <p>{{ associationInfo.valeursDirectrices }}</p>
    </section>
  </div>
</template>

<style scoped>
.visiteur-page {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  text-align: right; /* Align text to the right */
}

.visiteur-page h1,
.visiteur-page h2,
.visiteur-page p {
  text-align: right; /* Ensure text alignment is right for RTL */
}

.visiteur-page h1 {
  font-size: 2rem;
  color: #333;
}

.visiteur-page h2 {
  font-size: 1.5rem;
  color: #555;
}

.visiteur-page p {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}
</style>
