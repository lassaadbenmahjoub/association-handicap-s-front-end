<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n"; // Import Vue I18n

import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";

// 👉 Images
import chart from "@images/cards/chart.png";
import paypal from "@images/cards/paypal-error.png";
import wallet from "@images/cards/wallet-info.png";

// Définir les métadonnées de la page
definePageMeta({
  middleware: "is-logged-out",
});



// Créer des variables réactives pour stocker le nombre d'utilisateurs
const usersCount = ref(0);
const usersCountAccepted = ref(0);
const usersCountPending = ref(0);
const usersCountRejected = ref(0);

// Fonction pour récupérer le nombre d'utilisateurs depuis l'API
const fetchUsersCount = async () => {
  try {
    const response = await axios.get("/api/users/membre");
    usersCount.value = response.data.total;
    usersCountAccepted.value = response.data.accepted;
    usersCountPending.value = response.data.pending;
    usersCountRejected.value = response.data.rejected;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

// Appeler la fonction de récupération lors du montage du composant
onMounted(() => {
  fetchUsersCount();
});
</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol cols="12" md="12">
      <AnalyticsCongratulations />
    </VCol>

    <!-- 👉 Widgets Users & Statuses -->
    <VCol cols="12" md="6">
      <VRow>
        <!-- 👉 Total Users -->
        <VCol cols="12" sm="6" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: $t('total_users'),
              image: chart,
              stats: usersCount,
            }"
          />
        </VCol>

        <!-- 👉 Users Accepted -->
        <VCol cols="12" sm="6" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: $t('accepted_users'),
              image: wallet,
              stats: usersCountAccepted,
            }"
          />
        </VCol>

        <!-- 👉 Users Pending -->
        <VCol cols="12" sm="6" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: $t('pending_users'),
              image: paypal,
              stats: usersCountPending,
            }"
          />
        </VCol>

        <!-- 👉 Users Rejected -->
        <VCol cols="12" sm="6" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: $t('rejected_users'),
              image: wallet,
              stats: usersCountRejected,
            }"
          />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
