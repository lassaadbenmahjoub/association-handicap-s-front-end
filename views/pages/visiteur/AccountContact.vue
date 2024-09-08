<script setup>
import { ref } from 'vue'
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

// Define a ref to hold reception info
const formData = ref({
  nom: '',
  prenom: '',
  adresse: '',
  email: '',
  num_postale: '',
  message: ''
})

// Define a function to handle form submission
const handleSubmit = async () => {
  const form = new FormData();
  form.append('nom_fr', formData.value.nom);
  form.append('nom_ar', formData.value.nom);
  form.append('nom_en', formData.value.nom);
  form.append('adresse_fr', formData.value.adresse);
  form.append('adresse_ar', formData.value.adresse);
  form.append('adresse_en', formData.value.adresse);
  form.append('prenom_fr', formData.value.prenom);
  form.append('prenom_ar', formData.value.prenom);
  form.append('prenom_en', formData.value.prenom);
  form.append('message_fr', formData.value.message);
  form.append('message_ar', formData.value.message);
  form.append('message_en', formData.value.message);
  form.append('num_postale', formData.value.num_postale);
  form.append('email', formData.value.email);

  try {
    // Replace with the actual endpoint for form submission
    await $axios.post('/api/receptions', form);
    alert('Données envoyées avec succès!')
  } catch (error) {
    console.error('Échec de l\'envoi des données:', error)
  }
}
</script>

<template>
  <v-container class="pa-4">
    <v-card>
      <v-card-title>Information de réception</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" sm="6" class="mb-4">
              <v-text-field
                label="Nom"
                v-model="formData.nom"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <v-text-field
                label="Prénom"
                v-model="formData.prenom"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <v-text-field
                label="Adresse"
                v-model="formData.adresse"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <v-text-field
                label="Email"
                v-model="formData.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <v-text-field
                label="Numéro postal"
                v-model="formData.num_postale"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <v-textarea
                label="Message"
                v-model="formData.message"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-btn @click="handleSubmit" color="primary">Valider</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.visiteur-page {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  margin: auto;
}

.visiteur-page h1 {
  font-size: 2rem;
  color: #333;
  text-align: center;
}

.visiteur-page p {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin: 10px 0;
}

.visiteur-page p strong {
  color: #333;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
