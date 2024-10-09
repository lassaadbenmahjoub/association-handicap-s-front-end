<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            :label="$t('name')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="adresse"
            :label="$t('address')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="telephone"
            :label="$t('phone')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            :label="$t('email')"
            required
            type="email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            :label="$t('password')"
            required
            type="password"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password_confirmation"
            :label="$t('confirm_password')"
            required
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn :disabled="!valid" color="primary" @click="submitForm">
            {{ $t('submit') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>


<script>
import { useToast } from "vue-toastification";
import { ref, onMounted } from "vue";
import { useUserStore } from "~~/stores/user";

export default {
  data() {
    return {
      valid: false,
      name: "",
      prenom: "",
      adresse: "",
      telephone: "",
      email: "",
      password: "",
      password_confirmation: "",
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
          name: this.name,
          adresse: this.adresse,
          telephone: this.telephone,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        };

        // Use axios to post data
        this.$axios
          .post("/api/add/members", payload)
          .then(() => {
            this.resetForm();
          })
          .catch((error) => {
            this.toast.error("Failed to submit the form: " + error.message);
          });
      }
    },
    resetForm() {
      this.name = "";
      this.adresse = "";
      this.telephone = "";
      this.email = "";
      this.password = "";
      this.password_confirmation = "";
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  },
  
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
