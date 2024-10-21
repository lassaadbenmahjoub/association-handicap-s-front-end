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
      address_reception: "", // Nouveau champ pour adresse_reception
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
      isUpdating: false, // État pour savoir si nous sommes en mode mise à jour
      associationId: null, // Pour stocker l'ID de l'association à mettre à jour
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.fetchTypeAssociations(); // Appel à l'API lorsque le composant est monté
    this.checkExistingData(); // Vérifiez les données existantes
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

    async checkExistingData() {
      try {
        const response = await this.$axios.get(`/api/associations`);
        if (response.data.success) {
          const association = response.data.association;
          console.log("yyyy", association);

          // Affecter les données existantes à formData
          this.formData.type_association_id = association.type_association_id;
          this.formData.phone = association.phone; // Correctement assigner le numéro de téléphone
          this.formData.phone_fax = association.phone_fax; // Correctement assigner le fax
          this.formData.rip = association.rip;
          this.formData.email = association.email;

          // Récupération des traductions pour 'fr'
          const translationFR = association.translations.find(
            (t) => t.locale === "fr"
          );
          if (translationFR) {
            this.address = translationFR.adresse;
            this.name = translationFR.name;
            this.description = translationFR.description;
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
      if (!this.formData.type_association_id) {
        this.toast.error("Veuillez sélectionner un type d'association.");
        return;
      }

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
          adresse_reception_fr: this.address_reception, // Ajout de l'adresse réception
          adresse_reception_en: this.address_reception,
          adresse_reception_ar: this.address_reception,
          name_fr: this.name,
          name_en: this.name,
          name_ar: this.name,
          description_fr: this.description,
          description_en: this.description,
          description_ar: this.description,
        };

        try {
          let response;
          if (this.isUpdating) {
            response = await this.$axios.post("/api/associations", payload)
          } else {
            response = await this.$axios.post("/api/associations", payload); // POST pour la création
          }

          this.toast.success(
            this.isUpdating
              ? "Association mise à jour avec succès !"
              : "Association créée avec succès !"
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
              "Une erreur s'est produite lors du traitement de l'association."
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
