<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('typeAssoc') }}</h2>
      </v-col>
    </v-row>
    <v-form v-model="valid" ref="form">
      <v-row>
        <!-- Single Name Field -->
        <v-col cols="12">
          <v-text-field
            v-model="name"
            :label="$t('name')"
            :rules="[v => !!v || $t('nameRequired')]" 
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Submit Button -->
      <v-row>
        <v-col cols="12">
          <v-btn :disabled="!valid" color="primary" @click="submitForm">
            {{ $t('submit') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- Type Associations Data Table -->
    <!-- Table des types d'associations -->
    <v-row v-if="typeAssociations.length">
      <v-col cols="12">
        <h3>{{ $t('typeAssocList') }}</h3>
        <v-data-table
          :headers="headers"
          :items="typeAssociations"
          class="elevation-1"
        >
          <template v-slot:item.name_ar="{ item }">
            <div class="text-center">
              {{ item.name_ar }}
            </div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="openEditDialog(item)">
              <i class="mdi mdi-pencil"></i>
            </v-icon>
            <v-icon small @click="openDeleteDialog(item)">
              <i class="mdi mdi-delete"></i>
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>{{ $t('editTypeAssoc') }}</v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="editForm">
            <v-text-field 
              v-model="editFormData.name" 
              :label="$t('name')"
              :rules="[v => !!v || $t('nameRequired')]" 
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeEditDialog">{{ $t('cancel') }}</v-btn>
          <v-btn color="blue darken-1" text @click="submitEdit">{{ $t('save') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>{{ $t('deleteConfirm') }}</v-card-title>
        <v-card-text>
          {{ $t('deleteMessage') }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="closeDeleteDialog">{{ $t('cancel') }}</v-btn>
          <v-btn color="red darken-1" text @click="confirmDelete">{{ $t('delete') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useToast } from "vue-toastification"; // Import the toast

export default {
  data() {
    return {
      valid: false,
      name: "",
      typeAssociations: [], // Initialize as an empty array
      editDialog: false,
      deleteDialog: false,
      editFormData: {
        id: null, // Added to track the current item being edited
        name: "", // Single field for name
      },
      selectedItem: null, // Item selected for deletion
      headers: [
        { text: this.$t('Nom de type association'), value: 'name_ar' }, // Correction du texte de l'en-tête
        { text: this.$t('actions'), value: 'actions', sortable: false }
      ],

    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.fetchTypeAssociations();
  },
  methods: {
    async fetchTypeAssociations() {
      try {
        const response = await this.$axios.get("/api/associations_type");
        this.typeAssociations = response.data.type_associations; 
        console.log("eeeee",this.typeAssociations)
      } catch (error) {
        this.toast.error("Failed to fetch type associations.");
      }
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        // Populate multilingual fields based on single input
        const payload = {
          name_fr: this.name,
          name_en: this.name,
          name_ar: this.name,
        };

        try {
          await this.$axios.post("/api/type_associations", payload);
          this.toast.success("Type Association created successfully!");
          this.resetForm();
          await this.fetchTypeAssociations(); // Refresh the list
        } catch (error) {
          this.toast.error("An error occurred while creating the type association.");
        }
      }
    },
    resetForm() {
      this.name = "";
      this.valid = false; // Reset the valid state
      this.$refs.form.reset(); // Reset the form
      this.$refs.form.resetValidation(); // Reset validation
    },
    openEditDialog(item) {
      // Set the form data for editing
      this.editFormData.id = item.id;
      this.editFormData.name = item.name_fr; // Assuming you store the French name, adapt as needed
      this.editDialog = true;
    },
    closeEditDialog() {
      this.editDialog = false;
    },
    async submitEdit() {
      if (this.$refs.editForm.validate()) {
        // Map the single name to all language fields before submitting
        const payload = {
          name_fr: this.editFormData.name,
          name_en: this.editFormData.name,
          name_ar: this.editFormData.name,
        };

        try {
          await this.$axios.put(`/api/type_associations/${this.editFormData.id}`, payload);
          this.toast.success("Type Association updated successfully!");
          this.fetchTypeAssociations(); // Refresh the list
          this.closeEditDialog();
        } catch (error) {
          this.toast.error("An error occurred while updating the type association.");
        }
      }
    },
    openDeleteDialog(item) {
      this.selectedItem = item; // Store the item to be deleted
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    async confirmDelete() {
      try {
        await this.$axios.delete(`/api/type_associations/${this.selectedItem.id}`);
        this.toast.success("Type Association deleted successfully!");
        this.fetchTypeAssociations(); // Refresh the list
        this.closeDeleteDialog();
      } catch (error) {
        this.toast.error("An error occurred while deleting the type association.");
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: 0 auto;
}

.v-data-table td,
.v-data-table th {
  text-align: center; /* Centrer le texte des cellules et des en-têtes */
}
</style>
