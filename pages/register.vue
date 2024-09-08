<script setup>
import authV1BottomShape from "@images/svg/auth-v1-bottom-shape.svg?url";
import authV1TopShape from "@images/svg/auth-v1-top-shape.svg?url";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from '~~/stores/user';

const router = useRouter();
const userStore = useUserStore();
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  nom_association: "",
  type_organisation: "",
  adresse: "", // Ensure this is included if required
  telephone: "",
  role: "",
  privacyPolicies: false,
});
const isPasswordVisible = ref(false);
const errors = ref(null);

const register = async () => {
  errors.value = null;

  if (!form.value.privacyPolicies) {
    alert("Vous devez accepter la politique de confidentialité et les conditions.");
    return;
  }

  try {
    await userStore.register(
      form.value.name,
      form.value.email,
      form.value.password,
      form.value.password_confirmation,
      form.value.nom_association,
      form.value.type_organisation,
      form.value.adresse, // Ensure this matches the backend field names
      form.value.telephone,
      form.value.role
    );
    router.push('/login');
  } catch (error) {
    console.error(error);
    errors.value = error.response?.data?.errors || 'Une erreur est survenue.';
  }
};

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
</style>
