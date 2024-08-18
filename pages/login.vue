<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?url'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?url'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  token_name: 'my-token',
  remember: false,
})

const isPasswordVisible = ref(false)

const login = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
      email: form.value.email,
      password: form.value.password,
      token_name: form.value.token_name,
      remember: form.value.remember,
    })

    alert('Login successful!')
    router.push('/')
  } catch (error) {
    console.error(error)
    alert('Login failed: ' + (error.response?.data?.message || 'An error occurred.'))
  }
}

definePageMeta({ layout: 'blank' })
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
            <img src="~/assets/images/logo.png" alt="Logo" style="width: 50px; height: 50px; margin-right: 10px;" />
            <h1 class="app-logo-title">
              ACLAS
            </h1>
          </div>
        </VCardItem>
        <VCardText>
          <h4 class="text-h4 mb-1">
            {{ $t('login.welcome') }}
          </h4>
          <p class="mb-0">
            {{ $t('login.description') }}
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
                  :placeholder="$t('login.emailPlaceholder')"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  :label="$t('login.passwordLabel')"
                  placeholder="......"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
                <div class="d-flex align-center justify-space-between flex-wrap my-6">
                  <VCheckbox
                    v-model="form.remember"
                    :label="$t('login.rememberMe')"
                  />
                  <a class="text-primary" href="javascript:void(0)">
                    {{ $t('login.forgotPassword') }}
                  </a>
                </div>
                <VBtn block type="submit">
                  {{ $t('login.loginButton') }}
                </VBtn>
              </VCol>
              <VCol cols="12" class="text-body-1 text-center">
                <span class="d-inline-block">
                  {{ $t('login.newHere') }}
                </span>
                <NuxtLink class="text-primary ms-1 d-inline-block text-body-1" to="/register">
                  {{ $t('login.createAccount') }}
                </NuxtLink>
              </VCol>
            </VRow>
          </VForm>
          <div class="mt-4 text-center">
            <p>{{ $t('login.learnMore') }}</p>
            <RouterLink to="/visiteur" class="text-primary">{{ $t('login.clickHere') }}</RouterLink>
          </div>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
