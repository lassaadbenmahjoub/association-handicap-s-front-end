<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard title="Manage Association Presentation">
          <VCardText>
            <VForm @submit.prevent="submitForm">
              <VRow>
                <!-- Language Selector -->
                <VCol cols="12" md="6">
                  <VSelect
                    v-model="selectedLanguage"
                    :items="languages"
                    label="Select Language"
                    required
                  ></VSelect>
                </VCol>

                <!-- Dynamic Fields Based on Selected Language -->
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="form.de_nous"
                    :label="`De Nous (${selectedLanguage.toUpperCase()})`"
                    required
                    hint="Enter the content for 'De Nous'"
                  ></VTextField>
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="form.notre_vision"
                    :label="`Notre Vision (${selectedLanguage.toUpperCase()})`"
                    required
                    hint="Enter the content for 'Notre Vision'"
                  ></VTextField>
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="form.notre_message"
                    :label="`Notre Message (${selectedLanguage.toUpperCase()})`"
                    required
                    hint="Enter the content for 'Notre Message'"
                  ></VTextField>
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="form.nos_objectifs"
                    :label="`Nos Objectifs (${selectedLanguage.toUpperCase()})`"
                    required
                    hint="Enter the content for 'Nos Objectifs'"
                  ></VTextField>
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="form.de_nouvelles_valeurs"
                    :label="`De Nouvelles Valeurs (${selectedLanguage.toUpperCase()})`"
                    required
                    hint="Enter the content for 'De Nouvelles Valeurs'"
                  ></VTextField>
                </VCol>

                <VCol cols="12">
                  <VBtn
                    type="submit"
                    :color="isNewRecord ? 'primary' : 'success'"
                  >
                    {{ isNewRecord ? "Create" : "Update" }}
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export default {
  name: "AssociationPresentationManage",
  setup() {
    const form = ref({
      de_nous: "",
      notre_vision: "",
      notre_message: "",
      nos_objectifs: "",
      de_nouvelles_valeurs: "",
    });

    const languages = ["fr", "ar", "en"];
    const selectedLanguage = ref("fr");
    const isNewRecord = ref(true); // Track if it's a new record or update

    // Fetch existing data if editing
    const fetchExistingData = async () => {
      try {
        const response = await $axios.get("/api/associations");
        const data = response.data;

        if (data.success && data.association_presentations.length > 0) {
          const presentation = data.association_presentations[0];

          // Map translations to form fields
          const translations = data.translations || [];
          const translation = translations.find(
            (t) => t.locale === selectedLanguage.value
          );

          if (translation) {
            form.value.de_nous = translation.de_nous || "";
            form.value.notre_vision = translation.notre_vision || "";
            form.value.notre_message = translation.notre_message || "";
            form.value.nos_objectifs = translation.nos_objectifs || "";
            form.value.de_nouvelles_valeurs = translation.de_nouvelles_valeurs || "";
          } else {
            // Reset fields if no translation is found
            form.value.de_nous = "";
            form.value.notre_vision = "";
            form.value.notre_message = "";
            form.value.nos_objectifs = "";
            form.value.de_nouvelles_valeurs = "";
          }

          isNewRecord.value = false; // Mark as update mode
        }
      } catch (error) {
        console.error("Error fetching existing data:", error);
      }
    };

    // Fetch data when component is mounted
    onMounted(() => {
      fetchExistingData();
    });

    // Handle form submission
    const submitForm = async () => {
      try {
        const dataToSend = {
          ...form.value,
          locale: selectedLanguage.value
        };

        if (isNewRecord.value) {
          await $axios.post("/api/associations", dataToSend);
          alert("Association presentation created successfully!");
        } else {
          await $axios.put(`/api/associations/1`, dataToSend); // Use PUT for update
          alert("Association presentation updated successfully!");
        }
        resetForm(); // Reset form after successful submission
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to create or update association presentation.");
      }
    };

    // Reset form fields
    const resetForm = () => {
      form.value = {
        de_nous: "",
        notre_vision: "",
        notre_message: "",
        nos_objectifs: "",
        de_nouvelles_valeurs: "",
      };
      isNewRecord.value = true; // Mark as create mode
    };

    return {
      form,
      languages,
      selectedLanguage,
      submitForm,
      resetForm,
      fetchExistingData,
      isNewRecord,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
