<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '~/stores/user'; // Adjust path as needed

const router = useRouter();
const userStore = useUserStore();

definePageMeta({
    middleware: 'is-logged-in',
    layout: 'blank'
});

const form = ref({
    email: '',
    password: '',
    token_name: 'my-token', // Ensure this is set correctly
    remember: false,
});

const isPasswordVisible = ref(false);

const login = async () => {
    try {
        // Perform login
        await userStore.login(form.value.email, form.value.password,form.value.token_name);
        
        // Get token from localStorage and set axios headers if needed
        const token = window.localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        console.log("eeeeeeeeeee");
        // Redirect to home page or any other page
        await router.push('/dashboard');
    } catch (error) {
        console.error(error);
        alert('Login failed: ' + (error.message || 'An error occurred.'));
    }
};
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
            <h1 class="app-logo-title">ACLAS</h1>
          </div>
        </VCardItem>
        <VCardText>
          <p class="mb-0">
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
                  class="d-flex align-center justify-space-between flex-wrap my-6"
                >
                  <VCheckbox
                    v-model="form.remember"
                    :label="$t('login.rememberMe')"
                  />
                  <a class="text-primary" href="javascript:void(0)">
                    {{ $t("login.forgotPassword") }}
                  </a>
                </div>
                <VBtn block type="submit">
                  {{ $t("login.loginButton") }}
                </VBtn>
              </VCol>
              <VCol cols="12" class="text-body-1 text-center">
                <span class="d-inline-block">
                  {{ $t("login.newHere") }}
                </span>
                <NuxtLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  to="/register"
                >
                  {{ $t("login.createAccount") }}
                </NuxtLink>
              </VCol>
            </VRow>
          </VForm>
          <div class="mt-4 text-center">
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
</style>
