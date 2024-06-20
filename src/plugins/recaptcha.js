
import { defineNuxtPlugin } from 'nuxt/app';
import { useReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
  const { initReCaptcha } = useReCaptcha();
  initReCaptcha('6LcArvUpAAAAAN8R5yI1RqBy2jn6bAQ4HUC9rs3Q');
});
