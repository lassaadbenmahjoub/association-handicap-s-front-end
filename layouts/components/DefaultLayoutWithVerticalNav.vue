<script setup>
import NavItems from "@/layouts/components/NavItems.vue";
import VerticalNavLayout from "@layouts/components/VerticalNavLayout.vue";
import Footer from "@/layouts/components/Footer.vue";
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue";
import UserProfile from "@/layouts/components/UserProfile.vue";
import GlobalMenu from "~/components/GlobalMenu.vue";
import { useUserStore } from "~~/stores/user";
import { storeToRefs } from "pinia";


// Ref to hold the language check
const isArabic = ref(false);

const userStore = useUserStore();
const { nom_association } = storeToRefs(userStore);
onMounted(async () => {
  // Get the preferred language from localStorage
  const preferredLanguage = localStorage.getItem('preferredLanguage');

  // Check if the preferred language is Arabic ("ar")
  if (preferredLanguage === 'ar') {
    isArabic.value = true;
  }
  try {
    await userStore.getUser();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="container">
    <GlobalMenu />
    <VerticalNavLayout>
      <!-- 👉 navbar -->
      <template #navbar="{ toggleVerticalOverlayNavActive }">
        <div class="d-flex h-100 align-center">
          <!-- 👉 Vertical nav toggle in overlay mode -->
          <IconBtn
            class="ms-n3 d-lg-none"
            @click="toggleVerticalOverlayNavActive(true)"
          >
            <VIcon icon="bx-menu" />
          </IconBtn>

          <!-- 👉 Search -->
          <div
            class="d-flex align-center cursor-pointer ms-lg-n3"
            style="user-select: none"
          >
            <!-- 👉 Search Trigger button -->
            <IconBtn>
              <VIcon icon="bx-search" />
            </IconBtn>

            <span class="d-none d-md-flex align-center text-disabled ms-2">
              <span class="me-2">Search</span>
              <span class="meta-key">&#8984;K</span>
            </span>
          </div>

          <VSpacer />

          <NavbarThemeSwitcher class="me-1" />

          <UserProfile />
        </div>
      </template>

      <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
        <NuxtLink class="app-logo app-title-wrapper">
          <!-- eslint-disable vue/no-v-html -->
          <div class="d-flex">
            <img
              src="~/assets/images/logo.png"
              alt="Logo"
              style="width: 100px; height: auto"
            />
          </div>
          <!-- eslint-enable -->

          <h1 class="app-logo-title" :dir="isArabic ? 'rtl' : 'ltr'">
            {{ nom_association }}
          </h1>
        </NuxtLink>

        <IconBtn
          class="d-block d-lg-none"
          @click="toggleIsOverlayNavActive(false)"
        >
          <VIcon icon="bx-x" />
        </IconBtn>
      </template>

      <template #vertical-nav-content>
        <NavItems />
      </template>

      <!-- 👉 Pages -->
      <slot />

      <!-- 👉 Footer -->
      <template #footer>
        <Footer />
      </template>
    </VerticalNavLayout>
  </div>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 0.85rem; /* Smaller font size */
    font-weight: 400; /* Normal font weight (not bold) */
    line-height: 1rem; /* Adjusted line height for the smaller font */
    text-transform: uppercase;
    white-space: normal; /* Ensure text wraps */
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 170px; /* Adjust max-width for wrapping */
    text-align: left; /* Align text to the left by default */
    color: rgba(102, 51, 153, 0.781);
    direction: ltr; /* Left-to-right for default (non-Arabic) text */
    margin-left: -52px; /* Avoid negative margin */

  /* Arabic (RTL) Support */
  &[dir='rtl'] {
    text-align: right; /* Align text to the right */
    direction: rtl; /* Right-to-left text flow */
    margin-right: -34px;
  }
  }
}

.app-title-wrapper {
  display: flex;
  justify-content: flex-start; /* Aligns the content to the left */
  align-items: center; /* Aligns vertically with the logo */
}

</style>
