// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-03-02",

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  extends: ["../ui"],

  modules: ["@nuxtjs/tailwindcss"],
});
