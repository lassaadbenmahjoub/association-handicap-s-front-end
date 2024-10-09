<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('event_list') }}</h2>
        <v-list dense>
          <v-list-item-group>
            <v-list-item
              v-for="(event, index) in events"
              :key="index"
              class="event-block"
              :class="{'bg-light': index % 2 === 0, 'bg-dark': index % 2 !== 0}"
            >
              <v-card class="text-center text-sm-start">
                <v-row no-gutters>
                  <!-- Event content -->
                  <v-col
                    cols="12"
                    sm="8"
                    order="2"
                    order-sm="1"
                  >
                    <v-card-title>
                      <strong>{{ event.title }}</strong>
                    </v-card-title>

                    <v-card-subtitle>
                      {{ $t('date') }}: {{ formatDate(event.event_date) }}
                    </v-card-subtitle>

                    <v-card-text class="event-description">
                      {{ event.description }}
                    </v-card-text>

                    <v-card-subtitle>
                      <!-- Location with icon -->
                      <v-icon left color="primary">mdi-map-marker</v-icon> 
                      {{ $t('location') }}: {{ event.location }}<br />
                      {{ $t('capacity') }}: {{ event.capacity }}<br />
                      {{ $t('contact_email') }}: {{ event.contact_email }}
                    </v-card-subtitle>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import axios from "~/plugins/axios";

export default {
  setup() {
    const events = ref([]); 
    const $axios = axios().provide.axios;
    const toast = useToast();

    const fetchEvents = async () => {
      try {
        const response = await $axios.get("/api/evenements");
        events.value = response.data.evenements;
      } catch (error) {
        toast.error("Erreur lors de la récupération des événements : " + error.message);
      }
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    onMounted(() => {
      fetchEvents();
    });

    return {
      events,
      formatDate,
    };
  },
};
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: 0 auto;
}

.event-block {
  padding: 12px;
  margin-bottom: 8px;
}

.v-card {
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-weight: bold;
  color: #333;
}

.v-card-subtitle {
  margin-bottom: 8px;
  color: #666;
}

.event-description {
  color: #2196f3;
  margin-bottom: 8px;
  background-color: #e3f2fd;
  padding: 8px;
  border-radius: 4px;
}

.bg-light {
  background-color: #f9f9f9; /* Light background for even-indexed events */
}

.bg-dark {
  background-color: #f0f0f0; /* Darker background for odd-indexed events */
}
</style>
