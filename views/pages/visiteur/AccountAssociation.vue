<template>
  <v-container>
    <!-- Titre de la page -->
    <v-row>
      <v-col>
        <h1 class="text-center">Filtrer et Afficher les Associations</h1>
      </v-col>
    </v-row>

    <!-- Section de filtrage -->
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="filter.name"
          label="Nom de l'association"
          outlined
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="filter.type_association_id"
          :items="types"
          label="Type d'Association"
          outlined
        ></v-select>
      </v-col>

      <v-col cols="12" md="4" class="d-flex align-center">
        <v-btn color="primary" @click="fetchAssociations">Filtrer</v-btn>
        <v-btn color="secondary" class="ml-2" @click="resetFilters">Réinitialiser</v-btn>
      </v-col>
    </v-row>

    <!-- Liste des associations si un filtre est appliqué -->
    <v-row v-if="isFilterApplied">
      <v-col cols="12" v-if="loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>

      <v-col v-for="association in associations" :key="association.id" cols="12" md="6">
        <v-card>
          <v-card-title>{{ association.translations[0].name }}</v-card-title>
          <v-card-title>{{ association.translations[0].adresse }}</v-card-title>
          <v-card-title>{{ association.translations[0].adresse_reception }}</v-card-title>
          <v-card-title>{{ association.translations[0].email }}</v-card-title>
          <v-card-subtitle>Type: {{ association.type_association_id }}</v-card-subtitle>
          <v-card-text>
            {{ association.translations[0].description }}
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Message si aucune association n'est trouvée -->
      <v-col cols="12" v-if="associations.length === 0 && !loading">
        <p class="text-center">Aucune association trouvée pour ces critères.</p>
      </v-col>
    </v-row>

    <!-- Message si aucun filtre n'est appliqué -->
    <v-row v-else>
      <v-col cols="12">
        <p class="text-center">Veuillez appliquer un filtre pour voir les associations.</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      filter: {
        name: '',
        type_association_id: null,
      },
      types: [], // Liste des types d'associations
      associations: [], // Liste des associations
      loading: false, // Indicateur de chargement
    };
  },
  computed: {
    // Vérifier si un filtre est appliqué
    isFilterApplied() {
      return this.filter.name !== '' || this.filter.type_association_id !== null;
    }
  },
  mounted() {
    this.fetchTypes(); // Récupérer la liste des types d'associations
  },
  methods: {
    // Fonction pour récupérer les types d'association
    async fetchTypes() {
      try {
        const response = await this.$axios.get('/api/type_associations');
        this.types = response.data.types;
      } catch (error) {
        console.error('Erreur lors de la récupération des types d\'associations:', error);
      }
    },

    // Fonction pour récupérer les associations filtrées
    async fetchAssociations() {
      this.loading = true;
      try {
        const params = {
          name: this.filter.name,
          type_association_id: this.filter.type_association_id,
        };

        const response = await this.$axios.get('/api/associations', { params });
        this.associations = response.data.associations;
      } catch (error) {
        console.error('Erreur lors de la récupération des associations:', error);
      } finally {
        this.loading = false;
      }
    },

    // Fonction pour réinitialiser les filtres
    resetFilters() {
      this.filter.name = '';
      this.filter.type_association_id = null;
      this.associations = []; // Vider les résultats
    },
  },
};
</script>
