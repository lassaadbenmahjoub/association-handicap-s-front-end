<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Créer Publications</h1>
      </v-col>
    </v-row>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-row>
        <!-- Titre Field -->
        <v-col cols="12">
          <v-text-field
            v-model="titre"
            label="Titre"
            :rules="[rules.required]"
            required
          ></v-text-field>
        </v-col>

        <!-- Contenu Field -->
        <v-col cols="12">
          <v-textarea
            v-model="contenu"
            label="Contenu"
            :rules="[rules.required]"
            required
          ></v-textarea>
        </v-col>

        <!-- PDF Field -->
        <v-col cols="12">
          <v-file-input
            v-model="pdf"
            label="Télécharger le fichier PDF"
            :rules="[rules.required]"
            accept="application/pdf"
          ></v-file-input>
        </v-col>

        <!-- Photo Field -->
        <v-col cols="12">
          <v-file-input
            v-model="photo"
            label="Télécharger la photo"
            :rules="[rules.required]"
            accept="image/*"
          ></v-file-input>
        </v-col>

        <!-- Video Field -->
        <v-col cols="12">
          <v-file-input
            v-model="video"
            label="Télécharger la vidéo"
            :rules="[rules.required]"
            accept="video/*"
          ></v-file-input>
        </v-col>
      </v-row>

      <!-- Submit Button -->
      <v-row>
        <v-col cols="12">
          <v-btn :disabled="!valid" color="primary" @click="submitForm">
            Créer
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { useToast } from "vue-toastification"; // Import the toast

export default {
  data() {
    return {
      valid: false,
      titre: "",
      contenu: "",
      pdf: null,
      photo: null,
      video: null,
      rules: {
        required: (value) => !!value || "Ce champ est requis",
      },
    };
  },
  setup() {
    const toast = useToast(); // Initialize toast
    return { toast }; // Return toast object to make it accessible
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append("titre_ar", this.titre);
        formData.append("titre_en", this.titre);
        formData.append("titre_fr", this.titre);
        formData.append("contenu_ar", this.contenu);
        formData.append("contenu_en", this.contenu);
        formData.append("contenu_fr", this.contenu);
        // Only append the file fields if they are selected
        if (this.pdf) {
          formData.append("pdf", this.pdf);
        }
        if (this.photo) {
          formData.append("photo", this.photo);
        }
        if (this.video) {
          formData.append("video", this.video);
        }

        try {
          const response = await this.$axios.post(
            "/api/publications",
            formData
          );
          this.toast.success("Publications créées avec succès !"); // Use toast from setup
          this.resetForm();
        } catch (error) {
          if (error.response?.data?.errors) {
            const errors = error.response.data.errors;
            this.toast.error("Erreurs: " + JSON.stringify(errors));
          } else {
            // Handle generic errors
            this.toast.error(
              error.response?.data?.message ||
                "Une erreur s'est produite lors de la création."
            );
          }
        }
      }
    },
    resetForm() {
      this.titre = "";
      this.contenu = "";
      this.pdf = null;
      this.photo = null;
      this.video = null;
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

v-btn {
  width: 100%;
}
</style>
