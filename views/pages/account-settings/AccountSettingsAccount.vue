<script setup>
import { ref, reactive } from 'vue';
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

// Initial state for the form data
const accountData = reactive({
  name: '',
  email: '',
  telephone: '',
  adresse: '',
  avatarImg: '',
  password: '',
  password_confirmation: ''
});

// State to manage avatar input reference and form reset
const refInputEl = ref(null);
const isAccountDeactivated = ref(false);

// Handle file input change to update avatar
const changeAvatar = file => {
  const fileReader = new FileReader();
  const { files } = file.target;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        accountData.avatarImg = fileReader.result;
      }
    };
  }
};

// Reset avatar image to the original
const resetAvatar = () => {
  accountData.avatarImg = accountData.avatarImg; // Ensure you have a way to reset to the original avatar
};

// Reset form data
const resetForm = () => {
  accountData.name = '';
  accountData.email = '';
  accountData.telephone = '';
  accountData.adresse = '';
  accountData.avatarImg = '';
  accountData.password = '';
  accountData.password_confirmation = '';
  isAccountDeactivated.value = false;
};

// Submit form data
const submitForm = async () => {
  try {
    await $axios.put('/api/profile', accountData, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
    alert('Profile updated successfully!');
    resetForm();
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="accountData.avatarImg"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="bx-cloud-upload"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="error"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon
                  icon="bx-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6" @submit.prevent="submitForm">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountData.name"
                  placeholder="John"
                  label="First Name"
                />
              </VCol>
              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.email"
                  label="E-mail"
                  placeholder="johndoe@gmail.com"
                  type="email"
                />
              </VCol>
              <!-- 👉 Telephone -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.telephone"
                  label="Phone Number"
                  placeholder="+1 (917) 543-9876"
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.adresse"
                  label="Address"
                  placeholder="123 Main St, New York, NY 10001"
                />
              </VCol>

              <!-- 👉 Password -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.password"
                  label="Password"
                  placeholder="********"
                  type="password"
                />
              </VCol>

              <!-- 👉 Confirm Password -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="accountData.password_confirmation"
                  label="Confirm Password"
                  placeholder="********"
                  type="password"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit">Save changes</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Deactivate Account -->
      <VCard title="Deactivate Account">
        <VCardText>
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              label="I confirm my account deactivation"
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-3"
          >
            Deactivate Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
