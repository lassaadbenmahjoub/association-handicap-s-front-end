<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-row>
        <!-- Corrected Input for Type Association ID -->
        <v-col cols="12">
          <label for="typeAssociation"
            >Sélectionner un type d'association :</label
          >
          <select v-model="formData.type_association_id" id="typeAssociation">
            <option value="">-- Sélectionner --</option>
            <option
              v-for="type in typeAssociations"
              :key="type.id"
              :value="type.id"
            >
              {{ type.name }}
            </option>
          </select>
        </v-col>

        <!-- Other fields unchanged -->
        <v-col cols="12">
          <v-text-field
            v-model="formData.phone"
            label="Phone"
            :rules="[rules.required]"
            required
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="formData.phone_fax"
            label="Phone Fax"
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="formData.rip" label="RIP"></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="formData.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="address"
            label="Address"
            :rules="[rules.required]"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="name"
            label="Name"
            :rules="[rules.required]"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="description"
            label="Description"
            :rules="[rules.required]"
            required
          ></v-textarea>
        </v-col>
      </v-row>

      <!-- Submit Button -->
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
import { useToast } from "vue-toastification"; // Import the toast

export default {
  data() {
    return {
      valid: false,
      address: "",
      name: "",
      description: "",
      formData: {
        type_association_id: "",
        phone: "",
        phone_fax: "",
        rip: "",
        email: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      selectedType: null,
      typeAssociations: [], // Stockage des types d'associations
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.fetchTypeAssociations(); // Appel à l'API lorsque le composant est monté
  },
  methods: {
    async fetchTypeAssociations() {
      try {
        const response = await this.$axios.get("/api/type_associations");
        if (response.data.success) {
          this.typeAssociations = response.data.type_associations;
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des types d'associations:",
          error
        );
      }
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        const payload = {
          type_association_id: this.formData.type_association_id,
          phone: this.formData.phone,
          phone_fax: this.formData.phone_fax,
          rip: this.formData.rip,
          email: this.formData.email,
          adresse_fr: this.address,
          adresse_en: this.address,
          adresse_ar: this.address,
          name_fr: this.name,
          name_en: this.name,
          name_ar: this.name,
          description_fr: this.description,
          description_en: this.description,
          description_ar: this.description,
        };

        try {
          const response = await this.$axios.post("/api/associations", payload);
          this.toast.success("Association created successfully!");
          this.resetForm();
        } catch (error) {
          if (error.response && error.response.data.errors) {
            const errors = error.response.data.errors;
            if (errors.email) {
              this.toast.error(errors.email[0]);
            }
          } else {
            this.toast.error(
              "An error occurred while creating the association."
            );
          }
        }
      }
    },
    resetForm() {
      this.formData = {
        type_association_id: "",
        phone: "",
        phone_fax: "",
        rip: "",
        email: "",
      };
      this.address = "";
      this.name = "";
      this.description = "";
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
