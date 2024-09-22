<template>
  <Dialog
    v-model:visible="visible" 
    modal
    :style="{ width: '30rem' }"
  >
    <v-card>
      <v-card-title>
        Contactez l'Association :
        {{ association.translations[0].name }}
      </v-card-title>
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
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="close">Fermer</v-btn>
        <v-btn :disabled="!valid" color="primary" @click="submitForm">Envoyer</v-btn>
      </v-card-actions>
    </v-card>
  </Dialog>
</template>


<script setup>
import { reactive, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const toast = useToast()
const formRef = ref(null)
const formData = reactive({
  nom: '',
  prenom: '',
  adresse: '',
  email: '',
  num_postale: '',
  message: ''
})
const valid = ref(false)

const rules = {
  required: value => !!value || 'Required.',
  email: value => {
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return pattern.test(value) || 'Invalid e-mail.'
  }
}

const props = defineProps({
  association: Object,
  visible: Boolean
})

const emit = defineEmits(['close'])

// Watch for changes in the visible prop
watch(() => props.visible, (newValue) => {
  visible.value = newValue
})

const visible = ref(props.visible)

const submitForm = async () => {
  if (formRef.value) {
    valid.value = formRef.value.validate()
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
    try {
      await axios.post('/api/receptions', payload)
      toast.success('Message envoyé avec succès!')
      resetForm()
      visible.value = false
      emit('close')
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message.")
    }
  }
}

const close = () => {
  emit('close')
  visible.value = false
}

const resetForm = () => {
  formData.nom = ''
  formData.prenom = ''
  formData.adresse = ''
  formData.email = ''
  formData.num_postale = ''
  formData.message = ''
}
</script>
