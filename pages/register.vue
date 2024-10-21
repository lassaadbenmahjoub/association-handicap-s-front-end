<script setup>
import authV1BottomShape from "@images/svg/auth-v1-bottom-shape.svg?url";
import authV1TopShape from "@images/svg/auth-v1-top-shape.svg?url";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from '~~/stores/user';
import { useToast } from "vue-toastification";  
import waitImage from '@images/wait.jpg'; 

const route = useRoute();
const associationName  = ref(route.query.associationName ); 
const toast = useToast();
const router = useRouter();
const userStore = useUserStore();
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  nom_association: "",
  type_organisation: "",
  adresse: "",
  telephone: "",
  role: "",
  privacyPolicies: false,
});
const isPasswordVisible = ref(false);
const errors = ref(null);
const loading = ref(false); // Step 1: Add loading state
const isAssociationNameVisible = ref(true);
const isRoleDisabled = ref(true);
const register = async () => {
  errors.value = null;

  if (!form.value.privacyPolicies) {
    toast.error("Vous devez accepter la politique de confidentialité et les conditions."); // Remplacement de alert() par toast
    return;
  }

  loading.value = true; // Set loading to true when registration starts


  try {
    await userStore.register(
      form.value.name,
      form.value.email,
      form.value.password,
      form.value.password_confirmation,
      form.value.nom_association,
      form.value.type_organisation,
      form.value.adresse,
      form.value.telephone,
      form.value.role
    );
    router.push('/login');
  } finally {
    loading.value = false; // Set loading to false after registration completes
  }
};

// Check the query parameter on mount
onMounted(() => {
  isAssociationNameVisible.value = route.query.showAssociationField !== "false";
  if (route.query.associationName) {
    form.value.nom_association = route.query.associationName; // Affecte la valeur ici
  }
   // Vérifiez si le paramètre de rôle est défini dans la requête
   if (route.query.role === "membre") {
    form.value.role = "membre";
  } else {
    form.value.role = ""; // ou un autre rôle par défaut si nécessaire
  }
  isRoleDisabled.value = route.query.showAssociationField === "false"; 
});
definePageMeta({ layout: "blank" });
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <VImg
        :src="authV1TopShape"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <VImg
        :src="authV1BottomShape"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <div class="d-flex align-items-center">
            <img
              src="~/assets/images/logo.png"
              alt="Logo"
              style="width: 50px; height: 50px; margin-right: 10px"
            />
            <h1 class="app-logo-title">
              {{ $t("welcome") }}
            </h1>
          </div>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">
            {{ $t("association_management") }}
          </h4>
        </VCardText>

        <VCardText>
          <div v-if="loading" class="loading-container">
            <VImg
              :src="waitImage"  
              alt="Loading"
              class="loading-image"
            />
          </div>
          
          <VForm @submit.prevent="register">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="form.name"
                  autofocus
                  :label="$t('name')"
                  :placeholder="$t('admin_placeholder')"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  :label="$t('email')"
                  type="email"
                  placeholder="admin@gmail.com"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  :label="$t('password')"
                  placeholder="............."
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="form.password_confirmation"
                  :label="$t('confirm_password')"
                  :placeholder="$t('password_placeholder')"
                  :type="isPasswordVisible ? 'text' : 'password'"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-if="isAssociationNameVisible"
                  v-model="form.nom_association"
                  :label="$t('association_name')"
                  :placeholder="$t('association_name_placeholder')"
                />
              </VCol>

              <VCol cols="12">
                <VSelect
                  v-model="form.type_organisation"
                  :label="$t('organization_type')"
                  :items="['Centre', 'Association', 'Organisme']"
                  :placeholder="$t('select_type_placeholder')"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="form.telephone"
                  :label="$t('phone')"
                  type="number"
                  :placeholder="$t('phone_placeholder')"
                />
              </VCol>

              <VCol cols="12">
                <VSelect
                  v-model="form.role"
                  :label="$t('role')"
                  :items="['administrateur', 'membre']"
                  :placeholder="$t('select_role_placeholder')"
                  :disabled="isRoleDisabled"
                />
              </VCol>

              <div class="d-flex align-center my-6">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel for="privacy-policy" style="opacity: 1">
                  <span class="me-1 text-high-emphasis">{{
                    $t("privacy_policy")
                  }}</span>
                </VLabel>
              </div>

              <VBtn block type="submit"> {{ $t("register.register") }} </VBtn>
            </VRow>
          </VForm>
          <div class="mt-4 text-center">
            <p>{{ $t("login.learnMore") }}</p>
            <RouterLink to="/visiteur" class="text-primary">{{
              $t("login.clickHere")
            }}</RouterLink>
          </div>
          <div class="mt-4 text-center">
            <RouterLink to="/login" class="text-primary">{{
              $t("register.clickHere")
            }}</RouterLink>
          </div>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>
<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";

.auth-wrapper {
  background-image: url("~/assets/images/profile.jpg");
  background-size: cover; /* Adjust to cover the entire element */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent image repetition */
  min-height: 100vh; /* Ensure the wrapper takes full height */
}

.loading-container {
  display: flex; /* Utilisez flex pour centrer le contenu */
  justify-content: center; /* Centre horizontalement */
  align-items: center; /* Centre verticalement */
  height: 100vh; /* Prend toute la hauteur de la page */
  position: absolute; /* Positionnez-le de manière absolue pour le centrer */
  top: 0; /* Remise à zéro du haut */
  left: 0; /* Remise à zéro du gauche */
  right: 0; /* Remise à zéro du droit */
  bottom: 0; /* Remise à zéro du bas */
  background-color: rgba(255, 255, 255, 0.7); /* Optionnel : Ajoutez un fond semi-transparent */
  z-index: 1000; /* S'assurer qu'il est au-dessus des autres éléments */
}

.loading-image {
  width: 800px; /* Ajustez la largeur à votre convenance */
  height: 750px; /* Ajustez la hauteur à votre convenance */
}
</style>
