<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-row>
        <!-- Corrected Input for Type organisation ID -->
        <v-col cols="12">
          <label for="typeorganisation"
            >Sélectionner un type d'organisation :</label
          >
          <select v-model="formData.type_organisation_id" id="typeorganisation">
            <option value="">-- Sélectionner --</option>
            <option
              v-for="type in typeOrganisations"
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
            type="text"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="formData.phone_fax"
            label="Phone Fax"
            type="text"
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
            v-model="address_reception"
            label="Address Reception"
            :rules="[rules.required]"
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

        <v-col cols="12">
          <v-textarea
            v-model="category"
            label="Category"
            :rules="[rules.required]"
            required
          ></v-textarea>
        </v-col>
      </v-row>

      <!-- Submit Button -->
      <v-row>
        <v-col cols="12">
          <v-btn :disabled="!valid" color="primary" @click="submitForm">
            {{ isUpdating ? "Update" : "Submit" }}
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
      category: "",
      address_reception: "", // Nouveau champ pour adresse_reception
      formData: {
        type_organisation_id: "",
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
        phone: (value) => {
          const pattern = /^[+]?[\d\s-]{6,15}$/; // This allows +, digits, spaces, and hyphens
          return pattern.test(value) || "Invalid phone number.";
        },
      },
      selectedType: null,
      typeOrganisations: [], // Stockage des types d'organisations
      isUpdating: false, // État pour savoir si nous sommes en mode mise à jour
      organisationId: null, // Pour stocker l'ID de l'organisation à mettre à jour
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.fetchTypeOrganisations(); // Appel à l'API lorsque le composant est monté
    this.checkExistingData(); // Vérifiez les données existantes
  },
  methods: {
    async fetchTypeOrganisations() {
      try {
        const response = await this.$axios.get("/api/type_organisations");
        console.log(response.data); // Log the entire response data to inspect the structure

        if (response.data.success) {
          console.log("Response data structure:", response.data); // Log to check data structure
          this.typeOrganisations = response.data.type_organisation; // Make sure this is the correct key
          console.log("tttt", this.typeOrganisations); // Log the result
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des types d'organisations:",
          error
        );
      }
    },

    async checkExistingData() {
      try {
        const response = await this.$axios.get(`/api/organisations`);

        if (response.data.success) {
          const organisation = response.data.Organisation;
          console.log("yyyyyyyy", organisation);

          // Affecter les données existantes à formData
          this.formData.type_organisation_id =
          organisation.type_organisation_id;
          this.formData.phone = organisation.phone; // Correctement assigner le numéro de téléphone
          this.formData.phone_fax = organisation.phone_fax; // Correctement assigner le fax
          this.formData.rip = organisation.rip;
          this.formData.email = organisation.email;
          console.log("Phone:", this.formData.phone);
          // Récupération des traductions pour 'fr'
          const translationFR = organisation.translations.find(
            (t) => t.locale === "fr"
          );
          if (translationFR) {
            this.address = translationFR.adresse;
            this.name = translationFR.name;
            this.description = translationFR.description;
            this.category = translationFR.category;
            this.address_reception = translationFR.adresse_reception; // Nouveau champ
          }

          this.isUpdating = true; // Passer en mode mise à jour
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données existantes:",
          error
        );
      }
    },

    async submitForm() {
      if (!this.formData.type_organisation_id) {
        this.toast.error("Veuillez sélectionner un type d'organisation.");
        return;
      }

      if (this.$refs.form.validate()) {
        const payload = {
          type_organisation_id: this.formData.type_organisation_id,
          phone: this.formData.phone,
          phone_fax: this.formData.phone_fax,
          rip: this.formData.rip,
          email: this.formData.email,
          adresse_fr: this.address,
          adresse_en: this.address,
          adresse_ar: this.address,
          adresse_reception_fr: this.address_reception, // Ajout de l'adresse réception
          adresse_reception_en: this.address_reception,
          adresse_reception_ar: this.address_reception,
          name_fr: this.name,
          name_en: this.name,
          name_ar: this.name,
          description_fr: this.description,
          description_en: this.description,
          description_ar: this.description,

          category_fr: this.category,
          category_en: this.category,
          category_ar: this.category,
        };

        try {
          let response;
          if (this.isUpdating) {
            response = await this.$axios.post("/api/organisations", payload);
          } else {
            response = await this.$axios.post("/api/organisations", payload); // POST pour la création
          }

          this.toast.success(
            this.isUpdating
              ? "organisation mise à jour avec succès !"
              : "organisation créée avec succès !"
          );
          this.resetForm();
        } catch (error) {
          if (error.response && error.response.data.errors) {
            const errors = error.response.data.errors;
            if (errors.email) {
              this.toast.error(errors.email[0]);
            }
          } else {
            this.toast.error(
              "Une erreur s'est produite lors du traitement de l'organisation."
            );
          }
        }
      }
    },

    resetForm() {
      this.formData = {
        type_organisation_id: "",
        phone: "",
        phone_fax: "",
        rip: "",
        email: "",
      };
      this.address = "";
      this.name = "";
      this.description = "";
      this.category = "";
      this.address_reception = ""; // Réinitialiser adresse réception
      this.isUpdating = false; // Réinitialiser l'état
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
