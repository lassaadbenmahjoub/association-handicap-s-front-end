<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "~~/stores/user";
import { useToast } from "vue-toastification";  // Import the toast

const toast = useToast();  // Create the toast instance
const router = useRouter();
const userStore = useUserStore();
const { role, status } = storeToRefs(userStore); 

definePageMeta({
  middleware: "is-logged-in",
  layout: "blank",
});

onMounted(async () => {
  try {
    await userStore.getUser(); 
  } catch (error) {
    console.log(error);
  }
});

const form = ref({
  email: "",
  password: "",
  remember: false,
});

const isPasswordVisible = ref(false);

const login = async () => {
  try {
    await userStore.login(form.value.email, form.value.password);

    const token = window.localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    if (userStore.status === "pending") {
      toast.info("Votre compte est en attente d'approbation.");  // Use toast for info
      return;
    } else if (userStore.status === "rejected") {
      toast.error("Votre compte a été rejeté. Veuillez contacter l'administration.");  // Use toast for error
      return;
    } else if (userStore.status === "approved") {
      toast.success("Connexion réussie !");  // Use toast for success

      if (userStore.role === "super_admin") {
        await router.push("/super-admin-dashboard");
      } else if (userStore.role === "administrateur") {
        await router.push("/admin-dashboard");
      } else if (userStore.role === "membre") {
        await router.push("/member-dashboard");
      } else {
        toast.error("Rôle de compte inconnu.");  // Use toast for unknown role
        return;
      }
    } else {
      toast.error("Statut de compte inconnu.");  // Use toast for unknown status
      return;
    }
  } catch (error) {
    console.error(error);
    toast.error(
      "Échec de la connexion : " +
        (error.message || "Une erreur s'est produite.")
    );  // Use toast for login failure
  }
};
</script>


<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-8">
      <VCard
        class="auth-card"
        max-width="360"
        :class="$vuetify.display.smAndUp ? 'pa-4' : 'pa-2'"
      >
        <VCardItem class="justify-center">
          <div class="d-flex align-items-center">
            <img
              src="~/assets/images/logo.png"
              alt="Logo"
              style="width: 40px; height: 40px; margin-right: 8px"
            />
            <h1 class="app-logo-title text-h5">ACLAS</h1>
          </div>
        </VCardItem>
        <VCardText>
          <p class="mb-2 text-body-2">
            {{ $t("login.description") }}
          </p>
        </VCardText>
        <VCardText>
          <VForm @submit.prevent="login">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  autofocus
                  :label="$t('login.emailLabel')"
                  type="email"
                  :placeholder="$t('login.emailLabel')"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  :label="$t('login.passwordLabel')"
                  :placeholder="$t('login.passwordLabel')"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
                <div
                  class="d-flex align-center justify-space-between flex-wrap my-4"
                >
                  <VCheckbox
                    v-model="form.remember"
                    :label="$t('login.rememberMe')"
                    class="text-body-2"
                  />
                  <a class="text-primary" href="javascript:void(0)">
                    {{ $t("login.forgotPassword") }}
                  </a>
                </div>
                <VBtn block type="submit" class="mb-4">
                  {{ $t("login.loginButton") }}
                </VBtn>
              </VCol>
              <VCol cols="12" class="text-body-2 text-center">
                <span class="d-inline-block">
                  {{ $t("login.newHere") }}
                </span>
                <NuxtLink
                  class="text-primary ms-1 d-inline-block text-body-2"
                  to="/register"
                >
                  {{ $t("login.createAccount") }}
                </NuxtLink>
              </VCol>
            </VRow>
          </VForm>
          <div class="mt-2 text-center">
            <p>{{ $t("login.learnMore") }}</p>
            <RouterLink to="/visiteur" class="text-primary">{{
              $t("login.clickHere")
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
  .auth-card {
    padding: 16px;
  }
  .app-logo-title {
    font-size: 1.2rem;
  }
}
</style>
