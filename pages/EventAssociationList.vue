<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">{{ $t('event_list') }}</h2>
        <v-list dense>
          <v-list-item-group>
            <v-list-item
              v-for="(event, index) in events"
              :key="index"
              class="event-block"
            >
              <v-card class="text-center">
                <v-row no-gutters>
                  <!-- Event content -->
                  <v-col
                    cols="12"
                    sm="8"
                  >
                    <v-card-title class="event-title text-center">
                      <strong>{{ event.title }}</strong>
                    </v-card-title>

                    <v-card-subtitle class="text-left">
                      {{ $t('date') }}: {{ formatDate(event.event_date) }}
                    </v-card-subtitle>

                    <v-card-text class="event-description">
                      {{ event.description }}
                    </v-card-text>

                    <v-card-subtitle class="text-left event-location">
                      <!-- Location with icon -->
                      <i class="mdi mdi-map-marker" style="color: #1976d2; margin-right: 8px;"></i>
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
  margin-bottom: 16px;
}

.v-card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.event-title {
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}

.v-card-subtitle {
  margin-bottom: 12px;
  color: #666;
}

.event-description {
  color: #2196f3;
  margin-bottom: 12px;
  background-color: #e3f2fd;
  padding: 10px;
  border-radius: 4px;
}

.event-location {
  margin-top: 12px;
}

.text-left {
  text-align: left;
}
</style>
