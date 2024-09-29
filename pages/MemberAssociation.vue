<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="prenom" label="Prenom" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="name" label="Name" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="adresse" label="Adresse" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="phone" label="Téléphone" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="email" label="Email" required type="email"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="password" label="Mot de passe" required type="password"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="password_confirmation" label="Confirmer le mot de passe" required type="password"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn :disabled="!valid" color="primary" @click="submitForm">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { useToast } from "vue-toastification";
import { ref, onMounted } from "vue";
import { useUserStore } from '~~/stores/user'

export default {
  data() {
    return {
      valid: false,
      name: "",
      prenom: "",
      adresse: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
      users_id: null, // Initialize users_id
    };
  },
  setup() {
    const toast = useToast();
    const userStore = useUserStore(); // Use user store to get user info
    const form = ref(null); // Reference to the form
    return { toast, userStore, form };
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        // Populate multilingual fields based on single input
        const payload = {
          name_fr: this.name,
          name_en: this.name,
          name_ar: this.name,
          prenom_fr: this.prenom,
          prenom_en: this.prenom,
          prenom_ar: this.prenom,
          adresse_fr: this.adresse,
          adresse_en: this.adresse,
          adresse_ar: this.adresse,
          phone: this.phone,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          users_id: this.users_id, // Add users_id to payload
        };

        // Use axios to post data
        this.$axios.post("/api/members", payload).then(() => {
          this.resetForm();
        }).catch((error) => {
          this.toast.error("Failed to submit the form: " + error.message);
        });
      }
    },
    resetForm() {
      this.name = "";
      this.prenom = "";
      this.adresse = "";
      this.phone = "";
      this.email = "";
      this.password = "";
      this.password_confirmation = "";
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  },
  async mounted() {
    // Fetch user information and set users_id
    console.log("Tentative de récupération des informations de l'utilisateur...");
    try {
      await this.userStore.getUser();
      this.users_id = this.userStore.userId; // Set users_id from user store
      console.log("ID de l'utilisateur:", this.users_id); // Check user ID here
    } catch (error) {
      console.log("Erreur lors de la récupération des informations de l'utilisateur:", error);
    }
  }
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
