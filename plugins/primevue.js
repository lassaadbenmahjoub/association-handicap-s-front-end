import { defineNuxtPlugin } from "#app";
import "primeicons/primeicons.css"; // icons
import Button from "primevue/button";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Button", Button);
});
