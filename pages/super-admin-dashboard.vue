<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";

// 👉 Images
import chart from "@images/cards/chart.png";
import paypal from "@images/cards/paypal-error.png";
import wallet from "@images/cards/wallet-info.png";

// Définir les métadonnées de la page
definePageMeta({
  middleware: "is-logged-out",
});

// En-têtes du tableau de données
const headers = [
  { text: "Name", value: "name" },
  { text: "Email", value: "email" },
  { text: "adresse", value: "adresse" },
  { text: "telephone", value: "telephone" },
  { text: "Status", value: "status", sortable: false, align: 'center' },
  { text: "Action", value: "action", sortable: false },
];

const toast = useToast();

// Créer des variables réactives pour stocker le nombre d'utilisateurs
const usersList = ref([]); // Add this to store the user list
const dialogUsers = ref(false); // Dialog visibility for users list
const usersCount = ref(0);
const usersCountAccepted = ref(0);
const usersCountPending = ref(0);
const usersCountRejected = ref(0);
const dialog = ref(false);

// Créer des variables réactives pour stocker les listes d'utilisateurs
const dialogAccepted = ref(false);
const dialogRejected = ref(false);
const acceptedUsers = ref([]);
const rejectedUsers = ref([]);
const pendingUsers = ref([]);

// Fonction pour récupérer le nombre d'utilisateurs depuis l'API
const fetchUsersCount = async () => {
  try {
    const response = await axios.get("/api/users");
    usersCount.value = response.data.total;
    usersCountAccepted.value = response.data.accepted;
    usersCountPending.value = response.data.pending;
    usersCountRejected.value = response.data.rejected;

  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

// Fonction pour ouvrir le dialogue des utilisateurs en attente
const openDialog = async () => {
  try {
    const response = await axios.get("/api/administrators_pendings");
    pendingUsers.value = response.data.administrators;
    console.log("eeeeeeeeeeeeeee", pendingUsers.value);
    if (pendingUsers.value.length > 0) {
      dialog.value = true;
    } else {
      toast.info("Aucun utilisateur en attente.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

// Fonction pour récupérer les utilisateurs acceptés depuis l'API
const openAcceptedDialog = async () => {
  try {
    const response = await axios.get("/api/administrators_approveds");
    acceptedUsers.value = response.data.administrators;
    if (acceptedUsers.value.length > 0) {
      dialogAccepted.value = true;
    } else {
      toast.info("Aucun utilisateur  acceptés.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

// Fonction pour récupérer les utilisateurs rejetés depuis l'API
const openRejectedDialog = async () => {
  try {
    const response = await axios.get("/api/administrators_rejecteds");
    rejectedUsers.value = response.data.administrators;
    if (rejectedUsers.value.length > 0) {
      dialogRejected.value = true;
    } else {
      toast.info("Aucun utilisateur rejetés.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

// Fonction pour fermer le dialogue
const closeDialog = () => {
  dialog.value = false;
  fetchUsersCount();
};
// Fonction pour fermer le dialogue des utilisateurs acceptés
const closeDialogAccepted = () => {
  dialogAccepted.value = false;
  fetchUsersCount(); // Refresh user counts
};

// Fonction pour fermer le dialogue des utilisateurs rejetés
const closeDialogRejected = () => {
  dialogRejected.value = false;
  fetchUsersCount(); // Refresh user counts
};
// Fonction pour gérer l'action d'acceptation ou de rejet d'un utilisateur
const handleUserAction = async (user, action) => {
  const endpoint =
    action === "approve"
      ? `/api/approve-registration/${user.id}`
      : `/api/reject-registration/${user.id}`;

  try {
    await axios.post(endpoint);
    // Retirer l'utilisateur de la liste après l'action
    pendingUsers.value = pendingUsers.value.filter((u) => u.id !== user.id);

    // Afficher un message toast
    if (action === "approve") {
      toast.success(`Utilisateur ${user.name} accepté avec succès !`);
    } else {
      toast.error(`Utilisateur ${user.name} rejeté avec succès !`);
    }
  } catch (error) {
    console.error(`Erreur lors de la ${action} de l'utilisateur:`, error);
    toast.error(`Erreur lors de la ${action} de l'utilisateur ${user.name}.`);
  }
};


const openUserDialog = async () => {
  try {
    const response = await axios.get("/api/administrators");
    usersList.value = response.data.administrators;
    if (usersList.value.length > 0) {
      dialogUsers.value = true;
    } else {
      toast.info("Aucun utilisateur trouvé.");
    }
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
    <VCol cols="12">
      <VRow>
        <!-- 👉 Total Users -->
        <VCol cols="12" sm="6" md="3">
          <CardStatisticsVertical
            v-bind="{
              title: $t('total_users'),
              image: chart,
              stats: usersCount,
            }"
            @click="openUserDialog"
          />
        </VCol>

        <VCol cols="12" sm="6" md="3">
          <CardStatisticsVertical
            v-bind="{
              title: $t('accepted_users'),
              image: wallet,
              stats: usersCountAccepted,
            }"
            @click="openAcceptedDialog"
          />
        </VCol>

        <VCol cols="12" sm="6" md="3">
          <CardStatisticsVertical
            v-bind="{
              title: $t('rejected_users'),
              image: wallet,
              stats: usersCountRejected,
            }"
            @click="openRejectedDialog"
          />
        </VCol>

        <!-- 👉 Users Pending (cliquer ici pour afficher la liste) -->
        <VCol cols="12" sm="6" md="3">
          <CardStatisticsVertical
            v-bind="{
              title: $t('pending_users'),
              image: paypal,
              stats: usersCountPending,
            }"
            @click="openDialog"
          />
        </VCol>
      </VRow>
    </VCol>

    <!-- VDialog pour afficher la liste des utilisateurs en attente -->
    <VDialog v-model="dialog" max-width="800px">
      <VCard>
        <VCardTitle style="text-align: center; font-weight: bold">{{
          $t("pending_users_list")
        }}</VCardTitle>
        <VCardText>
          <!-- Table des utilisateurs en attente -->
          <VDataTable
            :headers="headers"
            :items="pendingUsers"
            item-value="name"
            class="elevation-1"
          >
            <template #item.action="{ item }">
              <div style="display: flex; gap: 8px">
                <!-- Flexbox for button spacing -->
                <VBtn
                  color="secondary"
                  @click="handleUserAction(item, 'approve')"
                  >{{ $t("admin.confirm") }}</VBtn
                >
                <VBtn
                  color="primary"
                  @click="handleUserAction(item, 'reject')"
                  >{{ $t("admin.cancel") }}</VBtn
                >
              </div>
            </template>
          </VDataTable>
        </VCardText>

        <!-- Bouton de fermeture -->
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="closeDialog">{{ $t("close") }}</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <!-- Dialog for accepted users -->
    <VDialog v-model="dialogAccepted" max-width="800px">
      <VCard>
        <VCardTitle style="text-align: center; font-weight: bold">{{
          $t("accepted_users")
        }}</VCardTitle>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="acceptedUsers"
            item-value="name"
            class="elevation-1"
          >
            <template #item.action="{ item }">
              <div style="display: flex; gap: 8px">
                <VBtn
                  color="secondary"
                  @click="handleUserAction(item, 'reject')"
                  >{{ $t("admin.cancel") }}</VBtn
                >
              </div>
            </template>
          </VDataTable>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="closeDialogAccepted">{{
            $t("close")
          }}</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Dialog for rejected users -->
    <VDialog v-model="dialogRejected" max-width="800px">
      <VCard>
        <VCardTitle style="text-align: center; font-weight: bold">{{
          $t("rejected_users")
        }}</VCardTitle>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="rejectedUsers"
            item-value="name"
            class="elevation-1"
          >
            <template #item.action="{ item }">
              <div style="display: flex; gap: 8px">
                <VBtn
                  color="secondary"
                  @click="handleUserAction(item, 'approve')"
                  >{{ $t("admin.confirm") }}</VBtn
                >
              </div>
            </template>
          </VDataTable>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="closeDialogRejected">{{
            $t("close")
          }}</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Dialog to display the user list -->
    <VDialog v-model="dialogUsers" max-width="800px">
      <VCard>
        <VCardTitle style="text-align: center; font-weight: bold">{{
          $t("users_list")
        }}</VCardTitle>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="usersList"
            item-value="name"
            class="elevation-1"
          />
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="dialogUsers = false">{{
            $t("close")
          }}</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>

<style scoped>
.mdi-check-circle {
  cursor: pointer;
  margin-right: 8px;
}

.mdi-cancel {
  cursor: pointer;
}

.icon-large {
  font-size: 60px; /* Increase the size of the icons */
}

.card-statistics {
  height: 100%; /* Ensure all cards have the same height */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute space between elements */
}

.card-statistics img {
  width: 100%; /* Ensure images fit within their containers */
  height: auto; /* Maintain aspect ratio */
}
</style>
