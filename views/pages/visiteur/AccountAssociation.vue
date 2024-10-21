<template>
  <v-container>
    <!-- Title -->
    <v-row>
      <v-col>
        <h1 class="text-center">Filtrer et Consulter les Associations</h1>
      </v-col>
    </v-row>

    <!-- Filtering Section -->
    <v-row justify="end">
      <v-col cols="12" md="4">
        <Select
          v-model="filter.type_association_id"
          :options="typeAssociations || []"
          optionLabel="name"
          placeholder="Sélectionnez un type d'association"
          checkmark
          :highlightOnSelect="false"
          class="w-full md:w-56"
        />
      </v-col>

      <v-col cols="12" md="4" class="d-flex align-center justify-end">
        <v-btn color="primary" @click="fetchAssociations">Filtrer</v-btn>
        <v-btn color="secondary" class="ml-2" @click="resetFilters"
          >Réinitialiser</v-btn
        >
      </v-col>
    </v-row>

    <!-- Filtered Associations List -->
    <v-row v-if="isFilterApplied">
      <v-col cols="12" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>

      <!-- Display associations -->
      <v-col
        v-for="association in associations"
        :key="association.id"
        cols="12"
        md="6"
      >
        <v-card class="mb-4">
          <v-card-title class="d-flex justify-space-between">
            <span class="font-weight-bold">Nom De Association :</span>
            <span>{{ association.translations[0].name }}</span>
          </v-card-title>
          <v-card-subtitle>
            <v-icon left>mdi-home</v-icon> Adresse De Association:
            {{ association.translations[0].adresse || "Non spécifiée" }}
          </v-card-subtitle>
          <v-card-subtitle>
            <v-icon left>mdi-phone</v-icon> Numéro Télephone:
            {{ association.phone || "Non spécifié" }}
          </v-card-subtitle>
          <v-card-subtitle>
            <v-icon left>mdi-email</v-icon> Adresse Email:
            {{ association.email || "Non spécifié" }}
          </v-card-subtitle>

          <v-divider></v-divider>

          <v-card-text>
            <strong>Description :</strong>
            <p>
              {{
                association.translations[0].description ||
                "Aucune description disponible"
              }}
            </p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              text
              color="primary"
              @click="redirectToRegister(association)"
            >
              Devenir Membre
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- No associations found message -->
      <v-col cols="12" v-if="!loading && Array.isArray(associations) && associations.length === 0">
        <p class="text-center">Aucune association trouvée pour ces critères.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "~/plugins/axios";
import { useRouter } from "vue-router";

const $axios = axios().provide.axios;
const router = useRouter(); // Use Vue Router
const filter = ref({
  name: "",
  type_association_id: null,
});

const typeAssociations = ref([]);
const associations = ref([]);
const selectedAssociation = ref(null);
const loading = ref(false);
const isFilterApplied = computed(() => {
  return filter.value.type_association_id !== null;
});

const fetchTypes = async () => {
  try {
    const response = await $axios.get("/api/type_associations");
    if (response.data.success) {
      typeAssociations.value = response.data.type_associations;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des types d'associations:",
      error
    );
  }
};
const fetchAssociations = async () => {
  loading.value = true;
  const params = {};

  if (filter.value.type_association_id) {
    params.type_association_id = filter.value.type_association_id.id;
  }

  try {
    const response = await $axios.get("/api/filter_associations", { params });
    console.log("Response from API:", response); // Log the full response

    // Directly handle the successful response
    associations.value = response.data.associations;
    console.log("Associations fetched:", associations.value);
  } finally {
    loading.value = false; // Always set loading to false, even if there's an error
  }

  selectedAssociation.value = null; // Clear selection when fetching new associations
};


const resetFilters = () => {
  filter.value.type_association_id = null;
  associations.value = []; // Clear the results
  selectedAssociation.value = null; // Clear selection
};

const redirectToRegister = (association) => {
  const associationName = association.translations[0].name;
  router.push({
    path: "/register",
    query: { associationName, showAssociationField: false, role: "membre" },
  });
};

// Fetch types of associations on component mount
onMounted(fetchTypes);
</script>
