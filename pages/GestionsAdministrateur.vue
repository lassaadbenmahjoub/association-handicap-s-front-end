<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reactive variables to manage users and loading state
const administrators = ref([]);
const loading = ref(false);

// Variables for confirmation dialog
const dialog = ref(false);
const selectedUserId = ref(null);
const selectedAction = ref(null);
const isButtonDisabled = ref(false);

// Fetch administrators from the API and populate the administrators array
const fetchAdministrators = async () => {
  try {
    loading.value = true;

    const response = await axios.get('/api/administrators');
    administrators.value = response.data.administrators;

  } catch (error) {
    console.error('Error fetching administrators:', error);
  } finally {
    loading.value = false;
  }
};

// Show confirmation dialog
const showConfirmationDialog = (userId, action) => {
  selectedUserId.value = userId;
  selectedAction.value = action;
  dialog.value = true;
};

// Handle the confirmation of action
const confirmAction = async () => {
  if (!selectedUserId.value || !selectedAction.value) return;

  try {
    isButtonDisabled.value = true;

    const endpoint = selectedAction.value === 'approve'
      ? `/api/approve-registration/${selectedUserId.value}`
      : `/api/reject-registration/${selectedUserId.value}`;

    await axios.post(endpoint); // Send request to approve or reject registration

    // Log success message for debugging
    console.log(`${selectedAction.value === 'approve' ? 'Approved' : 'Rejected'} user with ID: ${selectedUserId.value}`);
    
    fetchAdministrators(); // Refresh the list after updating the status
  } catch (error) {
    console.error(`Error ${selectedAction.value === 'approve' ? 'approving' : 'rejecting'} user:`, error);
  } finally {
    dialog.value = false;
    isButtonDisabled.value = false;
  }
};

// Fetch administrators when the component is mounted
onMounted(fetchAdministrators);
</script>

<template>
  <VCard class="pa-4 my-card">
    <VCardText>
      <h3 class="mb-4 text-center">Manage Administrators</h3>
      <VDataTable 
        :items="administrators" 
        :loading="loading" 
        item-value="id"
        class="elevation-1"
        :headers="[
          { text: 'Name', value: 'name' },
          { text: 'Teléphone', value: 'telephone' },
          { text: 'Status', value: 'status' },
          { text: 'Role', value: 'role' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex justify-center">
            <VBtn 
              color="success" 
              small
              :disabled="isButtonDisabled"
              @click="showConfirmationDialog(item.id, 'approve')"
              class="mx-2"
            >
              Accept
            </VBtn>
            <VBtn 
              color="error" 
              small
              :disabled="isButtonDisabled"
              @click="showConfirmationDialog(item.id, 'reject')"
            >
              Reject
            </VBtn>
          </div>
        </template>
      </VDataTable>
    </VCardText>
    
    <!-- Confirmation Dialog -->
    <VDialog v-model="dialog" max-width="400">
      <VCard>
        <VCardTitle class="headline">Confirm Action</VCardTitle>
        <VCardText>
          Are you sure you want to 
          <span class="font-weight-bold">{{ selectedAction === 'approve' ? 'approve' : 'reject' }}</span>
          this user?
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="blue darken-1" text @click="dialog = false">Cancel</VBtn>
          <VBtn color="green darken-1" text @click="confirmAction">Confirm</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    
  </VCard>
</template>


<style lang="scss">
.my-card {
  max-width: 1000px;
  margin: 0 auto;
}

.v-card-text {
  padding-bottom: 16px;
}

.v-btn {
  min-width: 100px;
}

@media (max-width: 600px) {
  .my-card {
    max-width: 100%;
  }
  
  .v-btn {
    min-width: 80px;
  }

  .v-data-table-header th, 
  .v-data-table__wrapper td {
    font-size: 0.9rem;
  }
}

.text-center {
  text-align: center;
}
</style>
