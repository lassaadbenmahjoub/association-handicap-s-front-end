<template>
  <v-card>
    <v-card-title>Contactez l'Association  : {{ association.translations[0].name }}</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="formData.nom"
          label="Nom"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.prenom"
          label="Prénom"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.adresse"
          label="Adresse"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.email"
          label="Email"
          :rules="[rules.required, rules.email]"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.num_postale"
          label="Numéro postal"
          :rules="[rules.required]"
          required
          type="number"
        ></v-text-field>
        <v-textarea
          v-model="formData.message"
          label="Message"
          :rules="[rules.required]"
          required
        ></v-textarea>
        <v-col cols="12">
          <v-btn :disabled="!valid" color="primary" @click="submitForm">
            Submit
          </v-btn>
        </v-col>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from '~/plugins/axios';
import { useToast } from 'vue-toastification';

const toast = useToast();
const formData = reactive({
  nom: '',
  prenom: '',
  adresse: '',
  email: '',
  num_postale: '',
  message: ''
});
const valid = ref(false);

const rules = {
  required: value => !!value || 'Required.',
  email: value => {
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(value) || 'Invalid e-mail.';
  }
};

const props = defineProps({
  association: Object
});

const submitForm = async () => {
  if (valid.value) {
    const payload = {
      association_id: props.association.id,
      num_postale: formData.num_postale,
      email: formData.email,
      adresse_fr: formData.adresse,
      adresse_en: formData.adresse,
      adresse_ar: formData.adresse,
      nom_fr: formData.nom,
      nom_en: formData.nom,
      nom_ar: formData.nom,
      message_fr: formData.message,
      message_en: formData.message,
      message_ar: formData.message,
    };

    try {
      const response = await axios().provide.axios.post('/api/receptions', payload);
      toast.success('Message sent successfully!');
      resetForm();
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        if (errors.email) {
          toast.error(errors.email[0]);
        }
      } else {
        toast.error('An error occurred while sending the message.');
      }
    }
  }
};

const resetForm = () => {
  formData.nom = '';
  formData.prenom = '';
  formData.adresse = '';
  formData.email = '';
  formData.num_postale = '';
  formData.message = '';
};

</script>
