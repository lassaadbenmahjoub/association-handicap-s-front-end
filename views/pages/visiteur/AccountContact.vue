
<script setup>
import { ref } from 'vue'

const associationInfo = ref({
  quiSommesNous: `Nous sommes l'Association de Culture et de Loisir pour les Aveugles de Sfax, une organisation dédiée à la promotion des activités culturelles et de loisirs pour les personnes aveugles.`,
  notreVision: `Notre vision est de créer une société inclusive où les personnes aveugles ont accès à toutes les opportunités culturelles et récréatives.`,
  notreMessage: `Nous croyons en l'importance de l'accessibilité et de l'inclusion pour tous, et nous travaillons pour éliminer les barrières auxquelles les personnes aveugles sont confrontées.`,
  nosObjectifs: `Nos objectifs incluent la sensibilisation à l'importance de l'accessibilité, la promotion des droits des personnes aveugles, et la création d'activités culturelles et récréatives adaptées.`,
  valeursDirectrices: `Nos valeurs directrices sont l'inclusion, la dignité, le respect, et l'égalité pour tous.`,
})
</script>

<template>
  <div class="visiteur-page pa-4">
    <h1 class="mb-4">Présentation de l'association</h1>

    <section class="mb-4">
      <h2>Qui sommes-nous ?</h2>
      <p>{{ associationInfo.quiSommesNous }}</p>
    </section>

    <section class="mb-4">
      <h2>Notre vision</h2>
      <p>{{ associationInfo.notreVision }}</p>
    </section>

    <section class="mb-4">
      <h2>Notre message</h2>
      <p>{{ associationInfo.notreMessage }}</p>
    </section>

    <section class="mb-4">
      <h2>Nos objectifs</h2>
      <p>{{ associationInfo.nosObjectifs }}</p>
    </section>

    <section class="mb-4">
      <h2>Valeurs directrices</h2>
      <p>{{ associationInfo.valeursDirectrices }}</p>
    </section>
  </div>
</template>

<style scoped>
.visiteur-page {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
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
