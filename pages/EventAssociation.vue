<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Ajouter un Événement</h2>
        <v-form ref="form" v-model="valid">
          <!-- Champ pour sélectionner l'association -->
          <v-text-field
            v-model="event.association_id"
            label="ID de l'Association"
            :rules="[v => !!v || 'ID d\'association requis']"
          />
          <v-text-field
            v-model="event.title"
            label="Titre"
            :rules="[v => !!v || 'Titre requis']"
          />
          <v-text-field
            v-model="event.event_date"
            label="Date"
            type="date"
            :rules="[v => !!v || 'Date requise']"
          />
          <v-textarea
            v-model="event.description"
            label="Description"
            :rules="[v => !!v || 'Description requise']"
          />
          <v-text-field
            v-model="event.location"
            label="Lieu"
            :rules="[v => !!v || 'Lieu requis']"
          />

          <v-btn color="green darken-1" @click="addEvent">Ajouter l'Événement</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import axios from "~/plugins/axios"; // Assurez-vous d'avoir configuré axios

export default {
  setup() {
    const event = ref({
      association_id: "", // Ajout de l'ID de l'association
      title: "",
      event_date: "", // Renommé pour correspondre au champ attendu
      description: "",
      location: "",
    });
    const $axios = axios().provide.axios;
    const toast = useToast();
    const valid = ref(false);

    // Fonction pour ajouter un événement
    const addEvent = async () => {
      if (valid.value) {
        try {
          await $axios.post("/api/add/evenements", event.value);
          toast.success("Événement ajouté avec succès.");
          resetForm(); // Réinitialiser le formulaire après l'ajout
        } catch (error) {
          toast.error("Erreur lors de l'ajout de l'événement : " + error.message);
        }
      } else {
        toast.error("Veuillez remplir tous les champs requis.");
      }
    };

    // Réinitialiser le formulaire
    const resetForm = () => {
      event.value = {
        association_id: "", // Réinitialiser l'ID de l'association
        title: "",
        event_date: "",
        description: "",
        location: "",
      };
    };

    return {
      event,
      valid,
      addEvent,
      resetForm,
    };
  },
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
