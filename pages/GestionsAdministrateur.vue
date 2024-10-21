<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reactive variables to manage users and loading state
const administrators = ref([]);
const loading = ref(false);

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

// Fetch administrators when the component is mounted
onMounted(fetchAdministrators);
</script>

<template>
  <VCard class="pa-4 my-card">
    <VCardText>
      <h3 class="mb-4 text-center">{{ $t('admin.manageAdministrators') }}</h3>
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
        ]"
      >
        <template v-slot:[`item.status`]="{ item }">
          <div class="d-flex justify-center">
            <span v-if="item.status === 'approved'" class="text-success">{{ $t('admin.accepted') }}</span>
            <span v-if="item.status === 'rejected'" class="text-danger">{{ $t('admin.rejected') }}</span>
            <span v-if="item.status === 'pending'" class="text-warning">{{ $t('admin.pending') }}</span>
          </div>
        </template>
      </VDataTable>
    </VCardText>
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
