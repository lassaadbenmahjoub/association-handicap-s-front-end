<template>
  <div class="card flex justify-center">
    <Button label="Contactez l'Association" @click="visible = true" />

    <Dialog
      v-model:visible="visible"
      modal
      header="Contactez l'Association : {{ association.translations[0].name }}"
      :style="{ width: '30rem' }"
    >
      <v-card>
        <v-card-title
          >Contactez l'Association :
          {{ association.translations[0].name }}</v-card-title
        >
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
                Envoyer
              </v-btn>
            </v-col>
            <v-card-actions>
              <v-btn text @click="close">Fermer</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
     
      
    </Dialog>
  </div>
</template>

<script setup>

import { reactive, defineProps, ref } from "vue";
import { useToast } from "vue-toastification";
import axios from 'axios';

const toast = useToast();
//const visible = ref(false);
const formRef = ref(null); // Create a ref for the form
const formData = reactive({
  nom: "",
  prenom: "",
  adresse: "",
  email: "",
  num_postale: "",
  message: "",
});
const valid = ref(false);

const rules = {
  required: (value) => !!value || "Required.",
  email: (value) => {
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
};

const props = defineProps({
  association: Object,
  visible: Boolean,
});
const visible = ref(props.visible);
const submitForm = async () => {
  if (formRef.value) {
    valid.value = formRef.value.validate(); // Use the form ref to validate
  }
  if (valid.value) {
    const payload = {
      association_id: props.association.id,
      num_postale: formData.num_postale,
      email: formData.email,
      adresse_fr: formData.adresse,
      adresse_en: formData.adresse,
      adresse_ar: formData.adresse,
      prenom_fr: formData.prenom,
      prenom_en: formData.prenom,
      prenom_ar: formData.prenom,
      nom_fr: formData.nom,
      nom_en: formData.nom,
      nom_ar: formData.nom,
      message_fr: formData.message,
      message_en: formData.message,
      message_ar: formData.message,
    };

    console.log('Submitting form with payload:', payload); 
    try {
      const response = await axios.post("/api/receptions", payload);
      toast.success("Message envoyé avec succès!");
      resetForm();
      visible.value = false; // Close the dialog after submission
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        if (errors.email) {
          toast.error(errors.email[0]);
        }
      } else {
        toast.error("Une erreur s'est produite lors de l'envoi du message.");
      }
    }
  }
};

const resetForm = () => {
  formData.nom = "";
  formData.prenom = "";
  formData.adresse = "";
  formData.email = "";
  formData.num_postale = "";
  formData.message = "";
};

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

</script>

