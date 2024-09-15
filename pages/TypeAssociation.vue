<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-row>
        <!-- Single Name Field -->
        <v-col cols="12">
          <v-text-field
            v-model="name"
            label="Name"
          ></v-text-field>
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
      name: "",
      formData: {
        name_fr: "",
        name_en: "",
        name_ar: "",
      },
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        // Populate multilingual fields based on single input
        const payload = {
          name_fr: this.name,
          name_en: this.name,
          name_ar: this.name,
        };

        try {
          const response = await this.$axios.post(
            "/api/type_associations",
            payload
          );
          this.toast.success("Type Association created successfully!");
          this.resetForm();
        } catch (error) {
          if (error.response && error.response.data.errors) {
            const errors = error.response.data.errors;
          } else {
            this.toast.error(
              "An error occurred while creating the type association."
            );
          }
        }
      }
    },
    resetForm() {
      this.formData = {
        name_fr: "",
        name_en: "",
        name_ar: "",
      };
      this.name = "";
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
